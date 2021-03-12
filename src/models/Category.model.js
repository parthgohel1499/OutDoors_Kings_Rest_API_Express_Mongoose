import mongoose from 'mongoose';
mongoose.set('useCreateIndex', true);

const category = mongoose.Schema({

    isDeleted: { type: Boolean, default: false, required: true },
    categoryname: { type: String, required: true },
    categorystatus: { type: Boolean, required: true, default: false },
    description: { type: String, required: true },
    hordingsize: { type: String, required: true },
    image: { type: String, required: true, default: null }
}, { timestamps: true, versionKey: false });


category.statics.FindCategoryById = async function (query) {
    try {
        return await hordingsCategory.findById(query);
    } catch (error) {
        return { error: error };
    }
};


const hordingsCategory = mongoose.model('hordingsCategory', category);
/* module.exports = hordingsCategory; */
export { hordingsCategory };