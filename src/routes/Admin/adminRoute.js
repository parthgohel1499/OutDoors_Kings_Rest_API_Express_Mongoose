import express from 'express';
const router = express.Router();
import { EditUser, viewUser, deleteUser, viewContactUs, deleteContactUs, OrderStatus, allOrders, viewFeedback } from '../../controllers/Admin/adminController';
import { adminAuthentication } from '../../services/jwtTokenServices';

router.get('/viewuser', adminAuthentication, viewUser);

router.delete('/deleteuser/:userId', adminAuthentication, deleteUser);

router.put('/editUser/:userId', adminAuthentication, EditUser);

router.get('/view/contactUs', adminAuthentication, viewContactUs);

router.delete('/delete/contactUs/:userId', adminAuthentication, deleteContactUs);

router.post('/Accept-Reject/Order', adminAuthentication, OrderStatus)

router.get('/view/all-orders', adminAuthentication, allOrders)

router.get('/view-delete/feedback', adminAuthentication, viewFeedback)

module.exports = router;