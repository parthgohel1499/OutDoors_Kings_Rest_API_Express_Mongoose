import mongoose from 'mongoose';
mongoose.set('useCreateIndex', true);

const feedback = mongoose.Schema({
    Message: { type: String, default: null, },
    User: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'RegSchema' },

}, { timestamps: true, versionKey: false });

const FeedbackModel = mongoose.model('feedback', feedback);
export { FeedbackModel }