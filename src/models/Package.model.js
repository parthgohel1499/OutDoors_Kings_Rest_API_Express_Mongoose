import mongoose from 'mongoose';
mongoose.set('useCreateIndex', true);

const Packages = mongoose.Schema({

    isDeleted: { type: Boolean, default: false, required: true },
    Packagename: { type: String, required: true },
    Price: { type: String, required: true },
    Duration: { type: String, required: true },
    createdBy: { type: String, required: false }
}, { timestamps: true, versionKey: false });

Packages.statics.FindPackageById = async function (query) {
    try {
        return await PackageModel.findById(query);
    } catch (error) {
        return { error: error };
    }
};

const PackageModel = mongoose.model('Packages', Packages);
// export default PackageModel;
export { PackageModel }