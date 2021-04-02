import express from 'express';
const router = express.Router();
import LINK from '../../utils/InternalLinks'
import { addArea, viewArea, deleteArea, editArea } from '../../controllers/Admin/AreaController';
import { areaValidator } from '../../middlewares/areaValidation';
import { adminAuthentication } from '../../services/jwtTokenServices'

const { AREA } = LINK

router.post(AREA.ADD_AREA, adminAuthentication, areaValidator('areaValidation'), addArea);

router.get(AREA.VIEW_AREA, viewArea);

router.delete(AREA.DELETE_AREA, adminAuthentication, deleteArea);

router.put(AREA.UPDATE_AREA, adminAuthentication, editArea)

module.exports = router;