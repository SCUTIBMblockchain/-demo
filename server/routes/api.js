
const router = require('koa-router')()

var channel = require('../controllers/channel')
var install = require('../models/installChaincode.js')
var instantiate = require('../models/instantiateChaincode.js')
var invoke = require('../models/invokeTransaction.js')
var query = require('../models/query.js')
var user = require('../controllers/user')

//* 以下api 与demo关联不大, 未来做开发者界面再搞
// Create Channel
router.post('/channels', channel.createChannel)
// Join Channels
router.post('/channels/:channelName/peers', channel.joinChannel)

// todo 测试该api
// Register and enroll user
router.post('/users', user.enrollUser)

// todo 移植api到koa上
// Install chaincode on target peers
router.post('/chaincodes', install.installChaincode)
// Instantiate chaincode on target peers
router.post('/channels/:channelName/chaincodes', instantiate.instantiateChaincode)
// Invoke transaction on chaincode on target peers
router.post('/channels/:channelName/chaincodes/:chaincodeName', invoke.invokeChaincode)
// Query
// Query on chaincode on target peers
router.get('/channels/:channelName/chaincodes/:chaincodeName', query.queryChaincode)
//  Query Get Block by BlockNumber
router.get('/channels/:channelName/blocks/:blockId', query.getBlockByNumber)
// Query Get Transaction by Transaction ID
router.get('/channels/:channelName/transactions/:trxnId', query.getTransactionByID)
// Query Get Block by Hash
router.get('/channels/:channelName/blocks', query.getBlockByHash)
// Query for Channel Information
router.get('/channels/:channelName', query.getChainInfo)
// Query to fetch all Installed/instantiated chaincodes
router.get('/chaincodes', query.getInstalledChaincodes)
// Query to fetch channels
router.get('/channels', query.getChannels)
module.exports = router
