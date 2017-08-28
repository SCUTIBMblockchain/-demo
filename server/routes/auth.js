const authA = require('../controllers/adminSign')
const authD = require('../controllers/doctorSign')
const infoOfDoc = require('../controllers/doctorDashbord')
const router = require('koa-router')()

router.get('/admin', authA.buildConnect)
router.post('/admin', authA.postAdminAuth)
router.get('/doctor', authD.buildConnect)
router.post('/doctor', authD.postDoctorAuth)
router.get('/doctorDash/:id', infoOfDoc.getMedicalLogs, infoOfDoc.getTransactions)

module.exports = router
