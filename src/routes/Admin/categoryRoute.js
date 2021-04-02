import express from 'express';
const router = express.Router();
import LINK from '../../utils/InternalLinks'
import { addcategory, viewCategory, editCategory, deleteCategory } from '../../controllers/Admin/categoryController';
import multerImage from '../../utils/imageUpload';
import { adminAuthentication } from '../../services/jwtTokenServices';

const { CATEGORY } = LINK;

router.post(CATEGORY.ADD_CATEGORY, adminAuthentication,
    multerImage.upload.single('categoryImage'), addcategory)

router.get(CATEGORY.VIEW_CATEGORY, viewCategory)

router.put(CATEGORY.UPDATE_CATEGORY, adminAuthentication, multerImage.upload.single('categoryImage'), editCategory)

router.delete(CATEGORY.DELETE_CATEGORY, adminAuthentication, deleteCategory)

module.exports = router;