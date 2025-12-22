const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, getAllUsers,deleteUser,getUserContestParticipated,getUserContestWin } = require('./user.controller');
const auth = require('../../middlewares/auth');

router.get('/profile/:id', auth(), getUserProfile);
router.patch('/profile/:id', auth(), updateUserProfile);
router.get('/all-users', auth('admin'), getAllUsers);
router.delete('/delete-user/:id', auth('admin'), deleteUser);
router.get('/contest-participated/:userId', auth(), getUserContestParticipated);
router.get('/contest-win/:userId', auth(), getUserContestWin);

module.exports = router;
