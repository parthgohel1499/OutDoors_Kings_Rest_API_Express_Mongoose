import express from 'express';
const router = express.Router();
import { addArea, viewArea, deleteArea, editArea } from '../../controllers/Admin/AreaController';
import { areaValidator } from '../../middlewares/areaValidation';
import { adminAuthentication } from '../../services/jwtTokenServices'

router.post('/add-area', adminAuthentication, areaValidator('areaValidation'), addArea);

router.get('/view-area', viewArea);

router.delete('/delete-area/:areaId', adminAuthentication, deleteArea);

router.put('/edit-area/:areaId', adminAuthentication, editArea)

module.exports = router;