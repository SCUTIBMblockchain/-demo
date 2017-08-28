const jwt = require('koa-jwt')
const network = require('composer-client')

var client = new network.BusinessNetworkConnection()

const buildConnect = function* () {
  return client.connect('connetion.json', 'org-acme-biznet', 'admin', 'adminpw')
  .then(function (businessNetworkDefinition) {
    console.log('doctor connect good')
  })
}

const postDoctorAuth = function* () {
  const userInfo = {
    name: 'doctor',
    password: 'doctorpw'
  }
  if (userInfo !== null) {                              // passwd not right
    if (userInfo.password !== 'adminpw') {
      this.body = {
        success: false,
        info: 'WrongInfo'
      }
    } else {                                    // messages pass to userToken
      const userToken = {
        name: userInfo.name,
        password: userInfo.password
      }
      const secret = 'vue-koa-demo'                      // config the cryptoKey
      const token = jwt.sign(userToken, secret)         // sign the token
      this.body = {
        success: true,
        token: token                                      // return the token
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
  postDoctorAuth
}
