/**
 * Copyright 2017 IBM All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License')
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an 'AS IS' BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
var util = require('util')
var path = require('path')
var fs = require('fs')
var txId = null
var config = require('../config.json')
var network = require('../models/network.js')
var log = network.getlog('Join-Channel')
// network.fbc.addConfigFile(path.join(__dirname, 'network-config.json'))
var ORGS = network.ORGS
var allEventhubs = []

//
// Attempt to send a request to the orderer with the sendCreateChain method
//
var joinChannel = function* (channelName, peers, username, org) {
  // on process exit, always disconnect the event hub
  var closeConnections = function (isSuccess) {
    if (isSuccess) {
      log.debug('\n============ Join Channel is SUCCESS ============\n')
    } else {
      log.debug('\n!!!!!!!! ERROR: Join Channel FAILED !!!!!!!!\n')
    }
    log.debug('')
    for (var key in allEventhubs) {
      var eventhub = allEventhubs[key]
      if (eventhub && eventhub.isconnected()) {
        // log.debug('Disconnecting the event hub')
        eventhub.disconnect()
      }
    }
  }
  // log.debug('\n============ Join Channel ============\n')
  log.info(util.format(
    'Calling peers in organization "%s" to join the channel', org))

  var client = network.getClientForOrg(org)
  var channel = network.getChannelForOrg(org)
  var eventhubs = []

  return network.getOrgAdmin(org).then((admin) => {
    log.info(util.format('received member object for admin of the organization "%s": ', org))
    txId = client.newTransactionID()
    let request = {
      txId: txId
    }

    return channel.getGenesisBlock(request)
  }).then((genesisBlock) => {
    txId = client.newTransactionID()
    var request = {
      targets: network.newPeers(peers),
      txId: txId,
      block: genesisBlock
    }

    for (let key in ORGS[org]) {
      if (ORGS[org].hasOwnProperty(key)) {
        if (key.indexOf('peer') === 0) {
          let data = fs.readFileSync(path.join(__dirname, ORGS[org][key]['tls_cacerts']))
          let eh = client.newEventHub()
          eh.setPeerAddr(ORGS[org][key].events, {
            pem: Buffer.from(data).toString(),
            'ssl-target-name-override': ORGS[org][key]['server-hostname']
          })
          eh.connect()
          eventhubs.push(eh)
          allEventhubs.push(eh)
        }
      }
    }

    var eventPromises = []
    eventhubs.forEach((eh) => {
      let txPromise = new Promise((resolve, reject) => {
        let handle = setTimeout(reject, parseInt(config.eventWaitTime))
        eh.registerBlockEvent((block) => {
          clearTimeout(handle)
          // in real-world situations, a peer may have more than one channels so
          // we must check that this block came from the channel we asked the peer to join
          if (block.data.data.length === 1) {
            // Config block must only contain one transaction
            var channelHeader = block.data.data[0].payload.header.channel_header
            if (channelHeader.channel_id === channelName) {
              resolve()
            } else {
              reject()
            }
          }
        })
      })
      eventPromises.push(txPromise)
    })
    let sendPromise = channel.joinChannel(request)
    return Promise.all([sendPromise].concat(eventPromises))
  }, (err) => {
    log.error('Failed to enroll user \'' + username + '\' due to error: ' +
      err.stack ? err.stack : err)
    throw new Error('Failed to enroll user \'' + username +
      '\' due to error: ' + err.stack ? err.stack : err)
  }).then((results) => {
    log.debug(util.format('Join Channel R E S P O N S E : %j', results))
    if (results[0] && results[0][0] && results[0][0].response && results[0][0]
      .response.status === 200) {
      log.info(util.format(
        'Successfully joined peers in organization %s to the channel \'%s\'',
        org, channelName))
      closeConnections(true)
      let response = {
        success: true,
        message: util.format(
          'Successfully joined peers in organization %s to the channel \'%s\'',
          org, channelName)
      }
      return response
    } else {
      log.error(' Failed to join channel')
      closeConnections()
      throw new Error('Failed to join channel')
    }
  }, (err) => {
    log.error('Failed to join channel due to error: ' + err.stack ? err.stack : err)
    closeConnections()
    throw new Error('Failed to join channel due to error: ' + err.stack ? err.stack : err)
  })
}
exports.joinChannel = joinChannel
