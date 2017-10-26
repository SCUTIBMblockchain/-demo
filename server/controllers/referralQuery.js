const referral = require('../models/referral')

// 请求所有发送的转诊单
const getSendReferrals = function* () {
  const hospitalId = this.params.hospitalId
  const result = yield referral.querySendReferrals(hospitalId)
  this.body = result
}

// 请求所有接收到的转诊单
const getReceiveReferrals = function* () {
  const hospitalId = this.params.hospitalId
  const result = yield referral.queryReceiveReferrals(hospitalId)
  this.body = result
}

module.exports = {
  getSendReferrals,
  getReceiveReferrals
}
