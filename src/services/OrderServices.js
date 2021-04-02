import { hordingsCategory, OrderModel, areaModel, PackageModel } from '../models/models'
import { verifyObjectId } from '../utils/verifyId';


const Orders = async (CatId, AreaId, FindPackageId, UserId, FirstName, LastName, Address, Discription, Image, StartDate) => {
    if (CatId) {
        if (!verifyObjectId(CatId)) {
            throw new Error("Category Id Is Incorrect !")
        }
        let query = { _id: CatId };
        const FindCategory = await hordingsCategory.FindCategoryById(query)
        if (!FindCategory) {
            throw new Error("This Category Is Not Exist !")
        }
        if (!verifyObjectId(AreaId)) {
            throw new Error("Area Id Is Incorrect !")
        }
        let Areaquery = { _id: AreaId };
        const FindArea = await areaModel.FindAreaById(Areaquery)
        if (!FindArea) {
            throw new Error("This Area Is Not Exist !")
        }
        if (!verifyObjectId(FindPackageId)) {
            throw new Error("Package Id Is Incorrect !")
        }
        let PackageQuery = { _id: FindPackageId }
        const FindPackage = await PackageModel.FindPackageById(PackageQuery)

        if (!FindPackage) {
            throw new Error("This Package Is Not Exist !")
        }

        const StoreOrder = OrderModel({
            FirstName: FirstName,
            LastName: LastName,
            Address: Address,
            Discription: Discription,
            StartDate: StartDate,
            Image: Image,
            User: UserId,
            Category: FindCategory._id,
            Area: FindArea._id,
            Package: FindPackage._id
        })

        const saveOrder = await StoreOrder.save();

        if (!saveOrder) {
            throw new Error("unable to save order !")
        }
        return saveOrder;
    }
    throw new Error("Category Is required !")
}

const getOrderOfLoggedinUser = async (UserId) => {
    if (verifyObjectId(UserId)) {
        const getOrder = await OrderModel.find({
            User: UserId
        })
            .populate({
                path: 'User',
                model: 'RegSchema',
                select: 'username'
            }).
            populate({
                path: 'Category',
                model: 'hordingsCategory',
                select: 'categoryname description hordingsize image'
            })
            .populate({
                path: 'Area',
                model: 'areaModel',
                select: 'areaname pincode'
            })
            .populate({
                path: 'Package',
                model: 'Packages',
                select: 'Packagename Price Duration'
            })

        if (!getOrder) {
            throw new Error("No Orders !")
        }
        return getOrder;

    }
    throw new Error("not Found !")
}

const viewOrderByIdService = async (OrderId) => {
    const viewOrder = await OrderModel.find({ _id: OrderId })
        .populate({
            path: 'User',
            model: 'RegSchema',
            select: 'username'
        }).
        populate({
            path: 'Category',
            model: 'hordingsCategory',
            select: 'categoryname description hordingsize image'
        })
        .populate({
            path: 'Area',
            model: 'areaModel',
            select: 'areaname pincode'
        })
        .populate({
            path: 'Package',
            model: 'Packages',
            select: 'Packagename Price Duration'
        })
    if (!viewOrder) {
        throw new Error("Not Found !")
    }
    return viewOrder;
}


export { Orders, getOrderOfLoggedinUser, viewOrderByIdService }