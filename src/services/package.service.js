import { PackageModel } from '../models/models';
import { verifyObjectId } from '../utils/verifyId'

const PackageAdd = async (Packagename, Price, Duration, id) => {
    const Package = new PackageModel({
        Packagename: Packagename,
        Price: Price,
        Duration: Duration,
        createdBy: id
    })

    const isExist = await PackageModel.FindPackageByName({ Packagename: Packagename });

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
            const getPackage = await PackageModel.FindPackageById({ _id: packageId })
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
    const getAllPackages = await PackageModel.FindAllPackage()

    return getAllPackages;
}

const PackageEdit = async (packageId, Packagename, Price, Duration) => {
    if (packageId) {
        if (verifyObjectId(packageId)) {


            const isExist = await PackageModel.FindPackageByName({ Packagename: Packagename })
            if (!isExist) {
                const filter = { _id: packageId };
                const update = { Packagename: Packagename, Price: Price, Duration: Duration }

                const FindPackage = await PackageModel.FindPackageAndUpdate(filter, update, { new: true })
                if (!FindPackage) {
                    throw {
                        status: process.env.NOTFOUND,
                        message: "Package Not Found !",
                        data: null
                    }
                }
                return "Update Successfull !"
            }
            throw new Error("This Package Is Already Exist !")

        }
        throw new Error("Incorrect UserId !")
    }
    throw new Error("Invalid Id !")

}

const PackageDelete = async (packageId) => {
    if (verifyObjectId(packageId)) {
        {
            const findRecord = await PackageModel.FindPackageById({ _id: packageId })

            if (!findRecord) {
                throw {
                    status: process.env.NOTFOUND,
                    message: "Package Not Found !",
                    data: null
                }
            }
            const deleteRecord = await PackageModel.DeletePackage({ _id: packageId })
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