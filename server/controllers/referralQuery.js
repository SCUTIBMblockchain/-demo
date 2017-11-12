const referral = require('../models/referral')
const patient = require('../models/patient')

function count (obj) {
  var objType = typeof obj
  if (objType === 'string') {
    return obj.length
  } else if (objType === 'object') {
    var objLen = 0
    for (var i in obj) {
      objLen++
    }
    return objLen
  }
  return false
}

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
  const data = this.request.body
  const msg = {
    referralId: data.referralId,
    hospitalId: data.hospitalId
  }
  const result = yield referral.queryReferrals(msg)
  this.body = result
}

// 请求病人的所有referralInfo
const getReferralsByPatientId = function* () {
  const msg = this.params.patientId
  const referralString = yield referral.queryReferralsByPatientId(msg)
  const patientString = yield patient.queryPatientByPatientId(msg)
  var patientMessage = JSON.parse(patientString)
  var referralMessage = JSON.parse(referralString)
  var HospitalName = null
  var ref
  var con = count(referralMessage)
  for (var i = 0; i < con; i++) {
    if (referralMessage[i].FromInfo.hospitalId === 'hospital01') {
      HospitalName = '人民医院'
    } else {
      HospitalName = '华工校医院'
    }
    ref = {
      'Id': referralMessage[i].Id,
      'State': referralMessage[i].State,
      'Date': referralMessage[i].Date,
      'Name': patientMessage.Name,
      'PIN': patientMessage.PIN,
      'Gender': patientMessage.Gender,
      'Age': patientMessage.Age,
      'Resident': patientMessage.Resident,
      'Phone': patientMessage.Phone,
      'Birthplace': patientMessage.Birthplace,
      'Nationality': patientMessage.Nationality,
      'Occupation': patientMessage.Occupation,
      'FromInfo': {
        'Section': referralMessage[i].FromInfo.Section,
        'HospitalName': HospitalName,
        'Doctor': referralMessage[i].FromInfo.Doctor,
        'Phone': referralMessage[i].FromInfo.Phone,
        'ReferralType': referralMessage[i].ReferralType,
        'RelationDemand': referralMessage[i].RelationDemand,
        'PayWay': referralMessage[i].Payway,
        'IllnessState': referralMessage[i].IllnessState
      },
      'ToInfo': {
        'Section': referralMessage[i].ToInfo.Section,
        'Doctor': referralMessage[i].ToInfo.Doctor,
        'Phone': referralMessage[i].ToInfo.Phone,
        'RejectReason': referralMessage[i].ToInfo.ReasonIfRejected
      }
    }
  }
  this.body = ref
}

//根据转诊单ID查询转诊单
const getReferralByreffralId = function* () {
  const msg = this.params.referralId
  
  const referralString = yield referral.queryReferralByreferralId(msg)
  var referralMessage = JSON.parse(referralString)
  patientId=referralMessage.PatientId
  const patientString = yield patient.queryPatientByPatientId(patientId)
  var patientMessage = JSON.parse(patientString)
 
  var HospitalName = null
    if (referralMessage.FromInfo.hospitalId === 'hospital01') {
      HospitalName = '人民医院'
    } else {
      HospitalName = '华工校医院'
    }
    var ref = {
      'Id': referralMessage.Id,
      'State': referralMessage.State,
      'Date': referralMessage.Date,
      'Name': patientMessage.Name,
      'patientId': patientId,
      'PIN': patientMessage.PIN,
      'Gender': patientMessage.Gender,
      'Age': patientMessage.Age,
      'Resident': patientMessage.Resident,
     'Phone': patientMessage.Phone,
      'Birthplace': patientMessage.Birthplace,
      'Nationality': patientMessage.Nationality,
      'Occupation': patientMessage.Occupation,
      'FromInfo': {
        'Section': referralMessage.FromInfo.Section,
        'HospitalName': HospitalName,
        'Doctor': referralMessage.FromInfo.Doctor,
        'Phone': referralMessage.FromInfo.Phone,
        'ReferralType': referralMessage.ReferralType,
        'RelationDemand': referralMessage.RelationDemand,
        'PayWay': referralMessage.Payway,
        'IllnessState': referralMessage.IllnessState
      },
      'ToInfo': {
        'Section': referralMessage.ToInfo.Section,
        'Doctor': referralMessage.ToInfo.Doctor,
        'Phone': referralMessage.ToInfo.Phone,
        'RejectReason': referralMessage.ToInfo.ReasonIfRejected
      }
    }
  this.body = ref
}

const createReferralProfileInfo = function* () {
  const patientId = this.params.patientId
  const referralId = referral.generateRefferralId(patientId)
  const patientString = yield patient.queryPatientByPatientId(patientId)
  var msg = JSON.parse(patientString)
  var ref = {
    'Id': referralId,
    'State': msg.State,
    'Date': msg.Date,
    'Name': msg.Name,
    'PatientId': patientId,
    'PIN': msg.PIN,
    'Gender': msg.Gender,
    'Age': msg.Age,
    'Resident': msg.Resident,
    'Phone': msg.Phone,
    'Birthplace': msg.Birthplace,
    'Nationality': msg.Nationality,
    'Occupation': msg.Occupation,
    'FromInfo': {
      'Section': null,
      'HospitalName': null,
      'Doctor': null,
      'Phone': null,
      'ReferralType': null,
      'RelationDemand': null,
      'PayWay': null,
      'IllnessState': null
    },
    'ToInfo': {
      'Section': null,
      'Doctor': null,
      'Phone': null,
      'RejectReason': null
    }
  }
  this.body = ref
}

module.exports = {
  getSendReferrals,
  getReceiveReferrals,
  getReferrals,
  createReferralProfileInfo,
  getReferralsByPatientId,
  getReferralByreffralId
}
