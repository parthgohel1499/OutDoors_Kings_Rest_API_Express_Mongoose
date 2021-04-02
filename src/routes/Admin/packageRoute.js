import express from 'express';
const router = express.Router();
import LINK from '../../utils/InternalLinks'
import { addPackage, viewPackage, deletePackage, editPackage } from '../../controllers/Admin/PackageController'
import { adminAuthentication } from '../../services/jwtTokenServices';

const { PACKAGE } = LINK

router.post(PACKAGE.ADD_PACKAGE, adminAuthentication, addPackage);

router.get(PACKAGE.VIEW_PACKAGE, viewPackage);

router.delete(PACKAGE.DELETE_PACKAGE, adminAuthentication, deletePackage);

router.put(PACKAGE.UPDATE_PACKAGE, adminAuthentication, editPackage);

module.exports = router;