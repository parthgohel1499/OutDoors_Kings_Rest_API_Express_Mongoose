import express from 'express';
const router = express.Router();
import { addOrder, getOrders, viewOrderById } from '../../controllers/Users/OrderControllers';
import multerImage from '../../services/imageUpload';
import { userAuthentication } from '../../services/jwtTokenServices';

router.post('/Make-Orders', userAuthentication, multerImage.upload.single('Image'), addOrder)

router.get('/view-orders', userAuthentication, getOrders)

router.get('/getOrderById/:OrderId', userAuthentication, viewOrderById)

module.exports = router;