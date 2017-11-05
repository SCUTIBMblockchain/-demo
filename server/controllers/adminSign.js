const jwt = require('koa-jwt')
const network = require('composer-client')

var client = new network.BusinessNetworkConnection()

const buildConnect = function* () {
  return client.connect('connection.json', 'org-acme-biznet', 'admin', 'adminpw')
  .then(function (businessNetworkDefinition) {
    console.log('admin connect good')
  })
}

const postAdminAuth = function* () {
  const data = this.request.body
  const hopitals = {
    user1: {
      Id: 'hospital01',
      password: 'hospital01pw'
    },
    user2: {
      Id: 'hospital02',
      password: 'hospital02pw'
    }
  }
  if (userInfo.name === data.name) {
    if (userInfo.password !== data.password) {         // passwd not right
      this.body = {
        success: false,
        info: 'Wrong password!'
      }
    } else {                                           // messages pass to userToken
      const userToken = {
        name: userInfo.name,
        password: userInfo.password
      }
      const secret = 'vue-koa-demo'                    // config the cryptoKey
      const token = jwt.sign(userToken, secret)        // sign the token
      this.body = {
        success: true,
        token: token                                   // return the token
      }
    }
  } else {
    this.body = {
      success: false,
      info: 'Not exists!'
    }
  }
}

module.exports = {
  buildConnect,
  postAdminAuth
}
