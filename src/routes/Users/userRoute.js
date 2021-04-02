import express from 'express';
const router = express.Router();
import LINK from '../../utils/InternalLinks'
import {
    RegUser,
    login,
    forgotPassword,
    verifyToken,
    deleteAccount,
    contactUs,
    Feedback,
    UpdateProfile,
    storePaymentdetails,
    userProfile
} from '../../controllers/Users/userControllers';
import Validation from '../../middlewares/UserValidator';
import { userAuthentication } from '../../services/jwtTokenServices';

const { USER } = LINK;

router.post(USER.REGISTER, Validation.authValidator('registration'), RegUser);

router.post(USER.LOGIN, login);

router.post(USER.FORGOTPASSWORD, forgotPassword);

router.post(USER.VERIFYTOKEN, verifyToken);

router.post(USER.DELETEACCOUNT, deleteAccount);

router.post(USER.CONTACTUS, userAuthentication, contactUs);

router.post(USER.FEEDBACK, userAuthentication, Feedback);

router.post(USER.UPDATE_USER_PROFILE, userAuthentication, UpdateProfile)

router.post(USER.PAYMENTDATA, userAuthentication, storePaymentdetails)

router.get(USER.USERPROFILE, userAuthentication, userProfile)

module.exports = router;

