
const RegModel = require('../../src/models/Users/RegModel')

const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')

require('dotenv').config({ path: '../../.env' });

try {
    const Connection = mongoose.connect(process.env.DB_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })

    if (!Connection) {
        console.log("unable to connect database !");
    } else {
        console.log("Connected to MongoDB Cloud Successfully !");
    }

    admin = async () => {
        const hash = await bcrypt.hash("Mitul@123", 5);;
        data = new RegModel({
            isAdmin: true,
            username: "Mitul",
            email: "mitulpatel1812@gmail.com",
            dob: "1998-09-18",
            mobile: 7016946821,
            gender: "male",
            password: "Mitul@123"
        });

        const checkEmail = await RegModel.findOne({ email: data.email })

        if (!checkEmail) {
            const saveData = await data.save()
            console.log("admin created successfully !", saveData);

        } else {
            console.log("user is already exist !");
        }
    }
} catch (error) {
    console.log("unable to run");
}
admin();


// admin : $2a$05$HKOk2AIycVQ7AXIV95.Dau3WGeWCvaI4SuiPeoZLRwqH3D3S0SPpa
//user : $2a$05$XtCGWUJjV0GyGChvsvdUWO03dPasElwmRIOckcAI/rVLLVEQ6I2pu