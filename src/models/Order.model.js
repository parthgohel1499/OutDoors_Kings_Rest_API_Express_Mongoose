import mongoose from 'mongoose';
mongoose.set('useCreateIndex', true);

const Orders = mongoose.Schema({

    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Address: { type: String, required: true },
    StartDate: { type: Date, required: true },
    Discription: { type: String, required: true },
    User: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'RegSchema' },
    Image: { type: String, default: null, required: true },
    Category: { type: mongoose.Schema.Types.ObjectId, default: null, required: true, ref: 'hordingsCategory' },
    OrderStatus: { type: String, default: "pending", enum: ['accept', 'reject', 'pending'] },
    Area: { type: mongoose.Schema.Types.ObjectId, default: null, required: false, ref: 'areaModel' },
    Package: { type: mongoose.Schema.Types.ObjectId, default: null, required: true, ref: 'Packages' },

}, { timestamps: true, versionKey: false });

Orders.statics.findOrderAndUpdate = async function (filter, update) {
    try {
        return await OrderModel.findOneAndUpdate(filter, update)
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

    } catch (error) {
        return { error: error };
    }
};

Orders.statics.FindOrders = async function (query) {
    try {
        return await OrderModel.find(query)
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

    } catch (error) {
        return { error: error };
    }
};


const OrderModel = mongoose.model('Orders', Orders);

export { OrderModel }