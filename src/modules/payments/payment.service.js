const SSLCommerzPayment = require("sslcommerz-lts");
const { getContestById } = require("../contests/contest.controller");
const { ssl_commerz_store_id, ssl_commerz_store_password } = require("../../config");
const Contest = require("../contests/contest.model");
const Payment = require("./payment.model");
const config = require("../../config");

const { ObjectId } = require("mongoose").Types;

const processPayment = async (contestId, user) => {

    const contest = await Contest.findById(contestId);

    if (!contest) {
        return ({
            success: false,
            message: "contest not found"
        });
    }
    const tran_id = new ObjectId().toString();
    // console.log(user);

    const data = {
        total_amount: contest.price,
        currency: 'BDT',
        tran_id: tran_id, // use unique tran_id for each api call
        success_url: `${config.backend_url}/payments/update-status/${tran_id}`,
        fail_url: `${config.backend_url}/payments/fail/${tran_id}/${contestId}`,
        cancel_url: `${config.backend_url}/payments/fail/${tran_id}/${contestId}`,
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'online',
        product_name: contest.contestName,
        product_category: contest.contestType,
        product_profile: 'general',
        cus_name: user.name,
        cus_email: user.email,
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const sslcz = new SSLCommerzPayment(ssl_commerz_store_id, ssl_commerz_store_password, is_live = false)

    try {
        const apiResponse = await sslcz.init(data);
        
        await Payment.findOneAndDelete({
            userId: user.id,
            contestId: contest._id,
        })


        await Payment.insertOne({
            userId: user.id,
            contestId: contest._id,
            amount: contest.price,
            status: 'pending',
            transactionId: tran_id
        });


        return { success: true, url: apiResponse.GatewayPageURL, tran_id };
    } catch (err) {
        return { success: false, message: err.message || 'payment init failed' };
    }



}



module.exports = { processPayment };