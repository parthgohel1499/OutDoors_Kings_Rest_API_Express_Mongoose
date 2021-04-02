import express from 'express';
const router = express.Router();
import LINK from '../../utils/InternalLinks';
import { EditUser, viewUser, deleteUser, viewContactUs, deleteContactUs, OrderStatus, allOrders, viewFeedback } from '../../controllers/Admin/adminController';
import { adminAuthentication } from '../../services/jwtTokenServices';

const { ADMIN } = LINK

router.get(ADMIN.VIEWUSER, adminAuthentication, viewUser);

router.delete(ADMIN.DELETE_USER, adminAuthentication, deleteUser);

router.put(ADMIN.UPDATE_USER, adminAuthentication, EditUser);

router.get(ADMIN.VIEW_CONTACTUS, adminAuthentication, viewContactUs);

router.delete(ADMIN.DELETE_CONTACTUS, adminAuthentication, deleteContactUs);

router.post(ADMIN.UPDATE_ORDER_STATUS, adminAuthentication, OrderStatus)

router.get(ADMIN.ALLORDERS, adminAuthentication, allOrders)

router.get(ADMIN.VIEW_DELETE_FEEDBACK, adminAuthentication, viewFeedback)

module.exports = router;