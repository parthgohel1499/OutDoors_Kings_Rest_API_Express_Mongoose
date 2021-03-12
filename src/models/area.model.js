import mongoose from 'mongoose';
mongoose.set('useCreateIndex', true);

const areaSchema = mongoose.Schema({

    isDeleted: { type: Boolean, default: false, required: true },
    areaname: { type: String, required: true },
    pincode: { type: Number, required: true },
},
    { timestamps: true, versionKey: false });

areaSchema.statics.FindAreaById = async function (query) {
    try {
        return await areaModel.findById(query);
    } catch (error) {
        return { error: error };
    }
};

const areaModel = mongoose.model('areaModel', areaSchema);
//module.exports = areaModel;

export { areaModel }