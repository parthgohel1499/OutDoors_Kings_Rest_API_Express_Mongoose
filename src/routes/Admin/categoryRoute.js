import express from 'express';
const router = express.Router();
import { addcategory, viewCategory, editCategory, deleteCategory } from '../../controllers/Admin/categoryController';
import multerImage from '../../services/imageUpload';
import { adminAuthentication } from '../../services/jwtTokenServices';

router.post('/addcategory', adminAuthentication,
    multerImage.upload.single('categoryImage'), addcategory)

router.get('/viewcategory', viewCategory)

router.put('/editcategory/:categoryId', adminAuthentication, multerImage.upload.single('categoryImage'), editCategory)

router.delete('/deletecategory/:categoryId', adminAuthentication, deleteCategory)

module.exports = router;    