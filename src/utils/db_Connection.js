import mongoose from 'mongoose';
import db from '../config/dbUrl';

exports.ConnectMongo = async () => {
    const Connection = await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })

    if (!Connection) {
        console.log("unable to connect database !");
    } else {
        console.log("Connected to MongoDB Cloud Successfully !");
    }
}

