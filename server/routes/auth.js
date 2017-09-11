const authA = require('../controllers/adminSign')
const authD = require('../controllers/doctorSign')
const infoOfDoc = require('../controllers/doctorDashbord')
const router = require('koa-router')()

var network = require('../models/network.js')
var createChannel = require('../controllers/channel').createChannel
var install = require('../models/installChaincode.js')
var instantiate = require('../models/instantiateChaincode.js')
var invoke = require('../models/invokeTransaction.js')
var query = require('../models/query.js')

// For admin to build connect
router.get('/admin', authA.buildConnect)
// For admin to login
router.post('/admin', authA.postAdminAuth)
// For doctor to build connect
router.get('/doctor', authD.buildConnect)
// For doctor to login
router.post('/doctor', authD.postDoctorAuth)
// Load in doctorDashboard
router.get('/doctorDash/:id', infoOfDoc.getMedicalLogs, infoOfDoc.getTransactions)
// Register and enroll user
router.post('/users', network.getRegisteredUsers)
// Create Channel
router.post('/channels', createChannel)
// Install chaincode on target peers
router.post('/chaincodes', install.installChaincode)
// Instantiate chaincode on target peers
router.post('/channels/:channelName/chaincodes', instantiate.instantiateChaincode)
// Invoke transaction on chaincode on target peers
router.post('/channels/:channelName/chaincodes/:chaincodeName', invoke.invokeChaincode)
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
