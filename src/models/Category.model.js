import mongoose from 'mongoose';
mongoose.set('useCreateIndex', true);

const category = mongoose.Schema({

    isDeleted: { type: Boolean, default: false, required: true },
    categoryname: { type: String, required: true },
    categorystatus: { type: Boolean, required: true, default: false },
    description: { type: String, required: true },
    hordingsize: { type: String, required: true },
    image: { type: String, required: true }
}, { timestamps: true, versionKey: false });


category.statics.FindCategoryById = async function (query) {
    try {
        return await hordingsCategory.findById(query);
    } catch (error) {
        return { error: error };
    }
};

category.statics.FindCategoryByName = async function (query) {
    try {
        return await hordingsCategory.findOne(query);
    } catch (error) {
        return { error: error };
    }
};

category.statics.FindAllCategory = async function (query) {
    try {
        return await hordingsCategory.find(query);
    } catch (error) {
        return { error: error };
    }
};

category.statics.UpdateCategory = async function (filter, update) {
    try {
        return await hordingsCategory.findByIdAndUpdate(filter, update);
    } catch (error) {
        return { error: error };
    }
};

category.statics.DeleteCategory = async function (query) {
    try {
        return await hordingsCategory.deleteOne(query);
    } catch (error) {
        return { error: error };
    }
};


const hordingsCategory = mongoose.model('hordingsCategory', category);
/* module.exports = hordingsCategory; */
export { hordingsCategory };