const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, getAllUsers,deleteUser } = require('./user.controller');
const auth = require('../../middlewares/auth');

router.get('/profile/:id', auth(), getUserProfile);
router.patch('/profile/:id', auth(), updateUserProfile);
router.get('/all-users', auth('admin'), getAllUsers);
router.delete('/delete-user/:id', auth('admin'), deleteUser);

module.exports = router;
