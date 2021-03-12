import { PackageModel, RegModel } from '../models/models';
import { verifyObjectId } from '../services/verifyId'

const PackageAdd = async (Packagename, Price, Duration, id) => {
    const Package = new PackageModel({
        Packagename: Packagename,
        Price: Price,
        Duration: Duration,
        createdBy: id
    })

    const isExist = await PackageModel.findOne({ Packagename: Packagename });

    if (!isExist) {
        const AddPackage = await Package.save();
        if (!AddPackage) {
            throw {
                status: process.env.FAILED,
                message: "unable to add package !",
                data: null
            }
        }
        return AddPackage;
    } else {
        throw new Error("This Package Is Already Exist !")
    }
}

const PackageView = async (packageId) => {
    if (packageId) {
        if (verifyObjectId(packageId)) {
            const getPackage = await PackageModel.findById({ _id: packageId })
            if (!getPackage) {
                throw {
                    status: process.env.FAILED,
                    message: "Not Exist ! !",
                    data: null
                }
            }
            return getPackage;
        }
        throw {
            status: process.env.FAILED,
            message: "Incorrect UserId !",
            data: null
        }
    }
    const getAllPackages = await PackageModel.find()

    return getAllPackages;
}

const PackageEdit = async (packageId, Packagename, Price, Duration) => {
    if (packageId) {
        if (verifyObjectId(packageId)) {


            const filter = { _id: packageId };
            const update = { Packagename: Packagename, Price: Price, Duration: Duration }

            const FindPackage = await PackageModel.findByIdAndUpdate(filter, update, { new: true })

            if (!FindPackage) {
                throw {
                    status: process.env.NOTFOUND,
                    message: "Package Not Found !",
                    data: null
                }
            }
            return "Update Successfull !"
        }
        throw new Error("Incorrect UserId !")
    }
    throw new Error("Invalid Id !")

}

const PackageDelete = async (packageId) => {
    if (verifyObjectId(packageId)) {
        {
            const findRecord = await PackageModel.findById({ _id: packageId })

            if (!findRecord) {
                throw {
                    status: process.env.NOTFOUND,
                    message: "Package Not Found !",
                    data: null
                }
            }
            const deleteRecord = await PackageModel.deleteOne({ _id: packageId })
            if (!deleteRecord) {
                throw {
                    status: process.env.NOTFOUND,
                    message: "Record Not Found !",
                    data: null
                }
            }
            return "Record Deleted Successfully !";
        }
    }
    throw new Error("Incorrect Id !")

}

export {
    PackageAdd,
    PackageView,
    PackageEdit,
    PackageDelete
}