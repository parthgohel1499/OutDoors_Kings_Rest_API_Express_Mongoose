import { Orders, getOrderOfLoggedinUser, viewOrderByIdService } from '../../services/OrderServices';

async function addOrder(req, res) {

    try {
        const Image = req.file.path;
        const UserId = req.userId;
        const { CatId, AreaId, FindPackageId, FirstName, LastName, Address, Discription, StartDate } = req.body;

        const order = await Orders(CatId, AreaId, FindPackageId, UserId, FirstName, LastName, Address, Discription, Image, StartDate)
        res.status(process.env.SUCCESS).send({ message: "Order Success !", status: process.env.SUCCESS, data: order });

    } catch (error) {
        res.status(process.env.FAILED).send({ message: error.message, status: process.env.FAILED, data: null });
    }
}


async function getOrders(req, res) {

    try {
        const UserId = req.userId

        console.log("id from view controller : ", UserId);

        const viewOrderLoggedinUser = await getOrderOfLoggedinUser(UserId)

        if (viewOrderLoggedinUser.length == 0) {
            throw new Error("No Orders Yet From Your Account !")
        }
        res.status(200).send({ message: "View Loggedin User Order ! ", status: 200, data: viewOrderLoggedinUser })

    } catch (error) {
        res.status(process.env.FAILED).send({ message: error.message, status: process.env.FAILED, data: null })
    }
}

const viewOrderById = async (req, res) => {

    try {
        const { OrderId } = req.params;

        const Order = await viewOrderByIdService(OrderId)

        res.status(200).send({ message: "View Order By OrderId !", data: Order, status: 200 })

    } catch (error) {
        res.status(400).send({ message: error.message, status: 400, data: null })
    }
}


export { addOrder, getOrders, viewOrderById }

