import mongoose from 'mongoose';
mongoose.set('useCreateIndex', true);

const contactUs = mongoose.Schema({

    isAdmin: { type: Boolean, default: false, required: true },
    isDeleted: { type: Boolean, default: false, required: true },
    Fullname: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true }

}, { timestamps: true, versionKey: false });

contactUs.statics.verifyOne = async function (query) {
    try {
        return await contactUsModel.findOne(query);
    } catch (error) {
        return { error: error };
    }
};

contactUs.statics.verify = async function () {
    try {
        return await contactUsModel.find();
    } catch (error) {
        return { error: error };
    }
};

contactUs.statics.verifyIdAndDelete = async function (query) {
    try {
        return await contactUsModel.findByIdAndRemove(query);
    } catch (error) {
        return { error: error };
    }
};

const contactUsModel = mongoose.model('contactUs', contactUs);

export { contactUsModel };