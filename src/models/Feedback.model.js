import mongoose from 'mongoose';
mongoose.set('useCreateIndex', true);

const feedback = mongoose.Schema({
    Message: { type: String, default: null, },
    User: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'RegSchema' },

}, { timestamps: true, versionKey: false });

feedback.statics.deleteFeedBack = async function (query) {
    try {
        return await FeedbackModel.findByIdAndDelete(query);
    } catch (error) {
        return { error: error };
    }
};

feedback.statics.FindAllFeedBack = async function () {
    try {
        return await FeedbackModel.find()
            .populate({
                path: 'User',
                model: 'RegSchema',
                select: 'username'
            });
    } catch (error) {
        return { error: error };
    }
};


const FeedbackModel = mongoose.model('feedback', feedback);
export { FeedbackModel }