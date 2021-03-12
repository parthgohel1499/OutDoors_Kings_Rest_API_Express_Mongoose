import { areaModel } from '../models/models';
import { verifyObjectId } from '../services/verifyId'

const addAreaService = async (areaname, pincode) => {
    const addArea = new areaModel({
        areaname: areaname,
        pincode: pincode
    })

    const isExist = await areaModel.findOne({ areaname: areaname })

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
            const findId = await areaModel.findById({ _id: areaId })
            console.log("findId from service : ", findId);
            if (!findId) {
                throw new Error("Not Exist !")
            }
            return findId;
        }
        throw new Error("Incorrect User Id !")
    }
    const getAllData = await areaModel.find();
    console.log("all area : ", getAllData);
    return getAllData;
}

const updateArea = async (areaId, areaname, pincode) => {
    if (verifyObjectId(areaId)) {

        const findArea = await areaModel.findOne({ _id: areaId })
        if (!findArea) {
            throw new Error("Area Not Found !")
        }
        const checkArea = await areaModel.findOne({ areaname: areaname });

        if (!checkArea) {
            const filter = { _id: areaId }
            const update = {
                areaname: areaname, pincode: pincode
            }
            await areaModel.updateOne(filter, update)

            return "Area is updated successfully !"
        }
        return `area is already exist ! ${checkArea.areaname}`
    }
    throw new Error("Incorrect ID !")
}

const deleteAreaService = async (areaId) => {
    if (verifyObjectId(areaId)) {
        const isExist = await areaModel.findById({ _id: areaId });

        if (!isExist) {
            throw new Error("This Area Is Not Exist !")
        }
        await areaModel.deleteOne({ _id: areaId })
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