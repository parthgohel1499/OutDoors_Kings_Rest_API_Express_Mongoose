import mongoose from 'mongoose';
mongoose.set('useCreateIndex', true);

const payments = mongoose.Schema({

    amount: { type: Number, required: false, default: null },
    email: { type: String, required: true },
    OrderId: { type: mongoose.Schema.Types.ObjectId, required: true }
},
    { timestamps: true, versionKey: false });

const paymentModel = mongoose.model('payment', payments);

export { paymentModel }