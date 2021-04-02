import {
    addAreaService,
    viewAreaService,
    updateArea,
    deleteAreaService
} from '../../services/area.service'
import { validationResult } from 'express-validator';

async function addArea(req, res) {

    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation Error.');
            error.statusCode = 400;
            error.data = errors.array();
            throw error;
        }
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        return res.send(error)
    }

    try {
        const { areaname, pincode } = req.body;

        const addArea = await addAreaService(areaname, pincode)
        res.status(200).send({ message: addArea, Status: 200 })

    } catch (error) {
        res.status(400).send({ mesage: error.message, status: 400, data: null });
    }
}

async function viewArea(req, res) {

    try {
        const { areaId } = req.query;

        const viewArea = await viewAreaService(areaId)

        res.status(200).send({ message: "success !", data: viewArea, status: 200 })

    } catch (error) {
        res.status(400).send({ message: error.message, status: 400 });
    }
}

async function deleteArea(req, res) {
    try {
        const { areaId } = req.params;

        const deleteAreaSuccess = await deleteAreaService(areaId);
        res.status(200).send({ message: deleteAreaSuccess, Status: 200 })


    } catch (error) {
        res.status(400).send({ message: error.message, status: 400 });
    }

}

async function editArea(req, res) {

    try {
        const { areaId } = req.params;
        const { areaname, pincode } = req.body;

        const update = await updateArea(areaId, areaname, pincode)
        res.status(200).send({ message: update, status: 200 })

    } catch (error) {
        res.status(500).send({ message: error.message, status: 500 });
    }

}

export { addArea, viewArea, deleteArea, editArea }