import express from 'express';
const router = express.Router();
import LINK from '../../utils/InternalLinks'
import { addOrder, getOrders, viewOrderById } from '../../controllers/Users/OrderControllers';
import multerImage from '../../utils/imageUpload';
import { userAuthentication } from '../../services/jwtTokenServices';

const { ORDER } = LINK

router.post(ORDER.MAKE_ORDER, userAuthentication, multerImage.upload.single('Image'), addOrder)

router.get(ORDER.VIEW_ORDER, userAuthentication, getOrders)

router.get(ORDER.VIEW_ORDER_BY_ID, userAuthentication, viewOrderById)

module.exports = router;