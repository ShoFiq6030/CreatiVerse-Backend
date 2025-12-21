const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contest',
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['success', "pending", 'failed'],
        required: true
    },
    transactionId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
