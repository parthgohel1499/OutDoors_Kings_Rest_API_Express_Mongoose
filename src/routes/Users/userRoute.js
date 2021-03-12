import express from 'express';
const router = express.Router();
import { RegUser, login, forgotPassword, verifyToken, deleteAccount, contactUs, Feedback, UpdateProfile } from '../../controllers/Users/userControllers';
import Validation from '../../middlewares/UserValidator';
import { userAuthentication } from '../../services/jwtTokenServices';


router.post('/Register', Validation.authValidator('registration'), RegUser);

router.post('/login', login);

router.post('/forgotPassword', forgotPassword);

router.post('/verifyToken', verifyToken);

router.post('/delete/account/:userId', deleteAccount);

router.post('/contactUs', userAuthentication, contactUs);

router.post('/Feedback', userAuthentication, Feedback);

router.post('/update-user-profile/:userId', userAuthentication, UpdateProfile)



module.exports = router;

