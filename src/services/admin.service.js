import { RegModel, OrderModel, FeedbackModel, contactUsModel } from '../models/models'
import { verifyObjectId } from '../services/verifyId'
import { sMail } from '../services/sendMail'
require('dotenv').config();

const viewUserService = async (userId, query) => {
    if (userId) {
        if (verifyObjectId(userId)) {
            const viewData = await RegModel.CheckById(query)
            if (!viewData) {
                throw {
                    status: 404,
                    message: "Data not found"
                }
            }
            return viewData;
        }
        throw new Error("Incorrect User Id !")
    }
    const viewData = await RegModel.findData()

    if (!viewData) {
        throw new Error("Unable to show data !")
    }
    return viewData;
}

const DeleteUserById = async (query) => {

    if (verifyObjectId(query)) {
        const isDeleted = await RegModel.CheckById(query);
        console.log(isDeleted);

        const delUser = await RegModel.findAndDelete(query);

        if (!delUser) {
            throw new Error("Id Not Found !")
        }
        return delUser;
    }
    throw new Error("Incorrect Id !")
}

const UpdateUserData = async (userId, username, dob, mobile, gender, filter) => {
    if (userId) {
        if (verifyObjectId(userId)) {

            var update = {
                dob: dob,
                mobile: mobile,
                username: username,
                gender: gender
            }
            const FindUser = await RegModel.modifyOne(filter, update);
            if (!FindUser) {
                throw new Error("User Not Found !")
            }
            return FindUser;
        }
        throw new Error("Incorrect UserID !")
    }
    throw new Error("Enter User Id !")
}

const viewContactUsService = async (userId, query) => {
    if (userId) {
        if (verifyObjectId(userId)) {
            const findUser = await contactUsModel.verifyOne(query);

            if (!findUser) {
                throw new Error("User Not Found !")
            }
            return findUser;
        }
        res.status(400).send({ message: error.message, status: 400 })

    } else {
        const listAllUser = await contactUsModel.verify()

        if (!listAllUser) {
            throw new Error("Data Not Found !")
        } else {
            return listAllUser;
        }
    }
}

const deleteContactUsService = async (userId, query) => {
    if (verifyObjectId(userId)) {
        const removeData = await contactUsModel.verifyIdAndDelete(query)

        if (!removeData) {
            throw new Error("unable to remove your data ! please check your Id !")
        }
        return "Record Delete Successfull !"
    }
    throw new Error("Incorrect Id !")
}

const updateOrderStatusByAdmin = async (OrderId, Status) => {

    if (OrderId) {
        if (verifyObjectId(OrderId)) {
            const FindOrderById = await OrderModel.findOneAndUpdate({ _id: OrderId }, { OrderStatus: Status })
                .populate({
                    path: 'User',
                    model: 'RegSchema',
                    select: 'username email gender'
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
            console.log("service");

            if (FindOrderById.OrderStatus == "accept") {
                const email = FindOrderById.User.email;
                const subject = process.env.SUBJECT
                const html = "Your Order is Accepted !"
                sMail(email, subject, html);
            }
            if (FindOrderById.OrderStatus == "reject") {
                const email = FindOrderById.User.email;
                const subject = process.env.SUBJECT
                const html = "Your Order is Rejected !"
                sMail(email, subject, html);
            }
            return FindOrderById
        }
        throw new Error("Incorrect Id !")
    }
    const OrderStatus = await OrderModel.find({ OrderStatus: "pending" })
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

    console.log("OrderStatus : ", OrderStatus);
    return OrderStatus;
}

const allUsersOrder = async () => {
    const viewAllOrdersByAdmin = await OrderModel.find({ OrderStatus: { $in: ["accept", "reject"] } })
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
    if (viewAllOrdersByAdmin) {
        return viewAllOrdersByAdmin
    }
    throw new Error("Not Found !")
}

const feedbackService = async (FDB_ID) => {

    if (FDB_ID) {
        if (verifyObjectId(FDB_ID)) {
            const FindFeedbackAndDelete = await FeedbackModel.findByIdAndDelete({ _id: FDB_ID })
            if (!FindFeedbackAndDelete) {
                throw new Error("Not Found !")
            }
            return "Feedback Delete Successfull !";
        }
        throw new Error("Invalid Id !")
    }
    const feedback = await FeedbackModel.find()
        .populate({
            path: 'User',
            model: 'RegSchema',
            select: 'username'
        })

    if (!feedback) {
        throw new Error("Not Found Feedback's Messages !")
    }
    return feedback;
}



export {
    viewUserService,
    DeleteUserById,
    UpdateUserData,
    updateOrderStatusByAdmin,
    allUsersOrder,
    feedbackService,
    viewContactUsService,
    deleteContactUsService
}


