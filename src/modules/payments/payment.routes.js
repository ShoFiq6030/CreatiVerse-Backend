const auth = require("../../middlewares/auth")
const { submissionPayment, updatePaymentStatus, getPaymentInfoByUserIdAndContestId, getPaymentInfoWithTransactionId, failedPayment } = require("./payment.controller")
const router = require("express").Router()





router.post("/process-payment", auth(), submissionPayment)

router.post("/update-status/:tran_id", updatePaymentStatus)
router.post("/fail/:tran_id/:contestId", failedPayment)
router.get("/get-payment-info/:tran_id", auth(), getPaymentInfoWithTransactionId)
router.get("/payment-info", auth(), getPaymentInfoByUserIdAndContestId)




module.exports = router