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

// 请求所有接收到的转诊单
const getReferrals = function* () {
  const msg = {
    referralId: this.accept.headers.referralid,
    hospitalId: this.accept.headers.hospitalid
  }
  const result = yield referral.queryReferrals(msg)
  this.body = result
}

const getReferralId = function () {
  const patientId = this.params.patientId
  const referralId = referral.generateRefferralId(patientId)
  this.body = referralId
}

module.exports = {
  getSendReferrals,
  getReceiveReferrals,
  getReferrals,
  getReferralId
}
