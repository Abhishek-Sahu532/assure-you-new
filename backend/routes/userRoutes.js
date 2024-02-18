const express = require('express');
const router = express.Router();
const {registerUser, loginUser,forgetPassword, logOut, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUserDetail, updateUserRole, deleteUser, google} = require('../controllers/userController')
const {isAuthenticate, authorizeRoles}  = require('../middlewares/auth')

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forget').post(forgetPassword);
router.route('/password/reset/:token').put(resetPassword)
router.route('/logout').get(logOut);
router.route('/me').get(isAuthenticate, getUserDetails) //when user logged in the app, only it will check the details.
router.route('/password/update').put(isAuthenticate, updatePassword); // user will update own password after login
router.route('/me/update').put(isAuthenticate, updateProfile); 

router.route('/admin/users').get(isAuthenticate, authorizeRoles('admin'), getAllUser);
router.route('/admin/user/:id').get(isAuthenticate, authorizeRoles('admin'), getSingleUserDetail).put(isAuthenticate, authorizeRoles('admin'), updateUserRole).delete(isAuthenticate, authorizeRoles('admin'), deleteUser)

router.route('/google').post(google)


module.exports = router