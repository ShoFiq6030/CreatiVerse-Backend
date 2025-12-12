const express = require('express');
const router = express.Router();
const { getUserProfile } = require('./user.controller');
const auth = require('../../middlewares/auth');

router.get('/profile/:id',auth(), getUserProfile);

module.exports = router;