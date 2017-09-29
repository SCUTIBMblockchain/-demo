const hospital = require('../controllers/hospital')

var routers = {
  '/referral': hospital.referralRequest
}

module.exports = routers
