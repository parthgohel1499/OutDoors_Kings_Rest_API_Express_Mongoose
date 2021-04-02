import {
    viewUserService,
    DeleteUserById,
    UpdateUserData,
    allUsersOrder,
    feedbackService,
    viewContactUsService,
    deleteContactUsService
} from '../../services/admin.service';
import { updateOrderStatusByAdmin } from '../../services/admin.service'
require('dotenv').config();


async function viewUser(req, res) {

    try {
        const { userId } = req.query;
        const query = { _id: userId };

        const viewAllUser = await viewUserService(userId, query)
        res.status(200).send({ message: "Success !", status: 200, data: viewAllUser })

    } catch (error) {
        res.status(error.status || 500).send({ message: error.message, status: 500 })
    }
}

async function deleteUser(req, res) {
    try {
        const query = req.params.userId

        await DeleteUserById(query)
        res.status(200).send({ message: "User Deleted Successfully !", status: 200, data: null })

    } catch (error) {
        res.status(500).send({ message: error.message, status: 500 });
    }
}

async function EditUser(req, res, next) {

    try {
        const filter = ({ _id: userId });
        const { username, dob, mobile, gender } = req.body;
        const userId = req.params.userId;

        const UserData = await UpdateUserData(userId, username, dob, mobile, gender, filter);
        res.status(200).send({ message: "Data Updated Successfully !", status: 200, data: UserData })

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

async function viewContactUs(req, res) {

    try {
        const { userId } = req.query;
        let query = { _id: userId }

        const viewContactUSMsg = await viewContactUsService(userId, query)
        res.status(200).send({ message: "success !", status: 200, data: viewContactUSMsg })

    } catch (error) {
        res.status(400).send({ message: error.message, status: 400 });
    }
}

async function deleteContactUs(req, res) {

    try {
        const { userId } = req.params;
        let query = { _id: userId }

        const delContactUs = await deleteContactUsService(userId, query)
        res.status(200).send({ status: 200, data: delContactUs })

    } catch (error) {
        res.status(400).send({ message: error.message, status: 400 })
    }
}

async function OrderStatus(req, res) {

    try {
        const { OrderId } = req.query;
        const { Status } = req.body;
        const data = await updateOrderStatusByAdmin(OrderId, Status)
        console.log("data : ", data);

        if (data.length == 0) {
            throw new Error("No Pending Orders !")
        }
        res.send({ message: "OrderData !", status: 200, data: data })
    } catch (error) {
        res.status(400).send({ message: error.message, status: 400, data: null })
        console.log(error);
    }
}

const allOrders = async (req, res) => {

    try {
        const Order = await allUsersOrder();
        res.status(200).send({ message: "All Orders !", status: 200, Order })

    } catch (error) {
        res.status(400).send({ message: error.message, status: 400, data: null })
    }
}

const viewFeedback = async (req, res) => {

    try {
        const { FDB_ID } = req.query;
        const FDB = await feedbackService(FDB_ID);

        res.status(200).send({ status: 200, data: FDB })
    } catch (error) {
        res.status(400).send({ message: error.message, status: 400, data: null })
    }
}

export {
    EditUser,
    viewUser,
    deleteUser,
    viewContactUs,
    deleteContactUs,
    OrderStatus,
    allOrders,
    viewFeedback
}