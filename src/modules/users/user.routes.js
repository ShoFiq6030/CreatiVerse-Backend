const express = require('express');
const router = express.Router();
const { getUserProfile,updateUserProfile } = require('./user.controller');
const auth = require('../../middlewares/auth');

router.get('/profile/:id',auth(), getUserProfile);
router.patch('/profile/:id',auth(), updateUserProfile);

module.exports = router;