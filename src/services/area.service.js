import { areaModel } from '../models/models';
import { verifyObjectId } from '../utils/verifyId'

const addAreaService = async (areaname, pincode) => {
    const addArea = new areaModel({
        areaname: areaname,
        pincode: pincode
    })

    const query = { areaname: areaname };
    const isExist = await areaModel.FindAreaByName(query)

    if (!isExist) {
        const insertarea = await addArea.save();

        if (!insertarea) {
            throw new Error("Unable to insert data !")
        }
        return "Area Added Successfully !"
    }
    throw new Error("This Area Is Already Exist !")
}

const viewAreaService = async (areaId) => {
    if (areaId) {
        if (verifyObjectId(areaId)) {
            const query = { _id: areaId }
            const findId = await areaModel.FindAreaById(query);

            if (!findId) {
                throw new Error("Not Exist !")
            }
            return findId;
        }
        throw new Error("Incorrect User Id !")
    }
    const getAllData = await areaModel.FindAllAreas();
    console.log("all area : ", getAllData);
    return getAllData;
}

const updateArea = async (areaId, areaname, pincode) => {
    if (verifyObjectId(areaId)) {

        const findArea = await areaModel.findById({ _id: areaId })
        if (!findArea) {
            throw new Error("Area Not Found !")
        }
        const checkArea = await areaModel.FindAreaByName({ areaname: areaname });

        if (!checkArea) {
            const filter = { _id: areaId }
            const update = {
                areaname: areaname, pincode: pincode
            }
            await areaModel.updateArea(filter, update)

            return "Area is updated successfully !"
        }
        return `area is already exist ! ${checkArea.areaname}`
    }
    throw new Error("Incorrect ID !")
}

const deleteAreaService = async (areaId) => {
    if (verifyObjectId(areaId)) {
        const isExist = await areaModel.FindAreaById({ _id: areaId });

        if (!isExist) {
            throw new Error("This Area Is Not Exist !")
        }
        await areaModel.deleteArea({ _id: areaId })
        return "Area Delete Successfull !"
    }
    throw new Error("Incorrect ID !")
}

export {
    addAreaService,
    viewAreaService,
    updateArea,
    deleteAreaService
}