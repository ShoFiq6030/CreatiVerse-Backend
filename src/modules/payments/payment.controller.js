const config = require("../../config");
const Payment = require("./payment.model");
const { processPayment } = require("./payment.service");

const submissionPayment = async (req, res) => {
    const { contestId, } = req.body
    const user = req.user

    try {
        // Simulate payment processing logic
        const paymentResult = await processPayment(contestId, user);

        if (!paymentResult.success) {
            return res.status(400).json({
                success: false,
                message: paymentResult.message || "Payment processing failed"
            });
        }

        // console.log(paymentResult.url);
        res.status(200).json(paymentResult);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Payment processing failed",
            error: error.message
        });
    }
};

const updatePaymentStatus = async (req, res) => {
    try {
        const { tran_id } = req.params;
        if (!tran_id) {
            return res.status(400).json({
                success: false,
                message: "Transaction ID is required"
            });
        }
        const payment = await Payment.findOneAndUpdate(
            { transactionId: tran_id },
            { status: 'success' },
            { new: true }
        )
        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found"
            });
        }
        res.redirect(`${config.frontend_url}/payment-success?tran_id=${tran_id}`);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getPaymentInfoByUserIdAndContestId = async (req, res) => {
    try {
        const { userId, contestId } = req.query;
        console.log(userId, contestId);
        const payment = await Payment.findOne({ userId, contestId });
        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "No payment information found for the given user and contest"
            });
        }

        res.status(200).json({
            success: true,
            message: "Payment information retrieved successfully",
            data: payment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getPaymentInfoWithTransactionId = async (req, res) => {
    try {
        const { tran_id } = req.params;
        const payment = await Payment.findOne({ transactionId: tran_id });
        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "No payment information found for the given transaction ID"
            });
        }

        res.status(200).json({
            success: true,
            message: "Payment information retrieved successfully",
            data: payment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    submissionPayment,
    updatePaymentStatus,
    getPaymentInfoByUserIdAndContestId,
    getPaymentInfoWithTransactionId
};