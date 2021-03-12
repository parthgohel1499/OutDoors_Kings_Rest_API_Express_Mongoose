import { RegModel } from '../../models/models';
import { validationResult } from 'express-validator';
import { MakeToken } from '../../services/jwtTokenServices';
import cryptoRandomString from 'crypto-random-string';
import { createUser } from '../../services/User.service';
import bcrypt from 'bcryptjs';
import { loginUserWithEmailVerification, ForgotPassword, Token } from '../../services/auth.service';
import { contactUsService, FeedbackService, updateUser } from '../../services/User.service';
require('dotenv').config();

async function RegUser(req, res) {

    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation Error.');
            error.statusCode = process.env.FAILED;
            error.data = errors.array();
            throw error;
        }
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = process.env.FAILED;
        }
        return res.send(error)
    }

    try {
        const userData = await createUser(req.body);

        res.status(process.env.SUCCESS).send({ message: "User Created !", status: process.env.SUCCESS, data: userData })

    } catch (error) {
        res.status(process.env.FAILED).send({ message: error.message, status: process.env.FAILED });
    }
}

async function login(req, res) {

    try {
        const { password, email } = req.body;

        const user = await loginUserWithEmailVerification(email);
        const matchPassword = bcrypt.compareSync(password, user.password)
        console.log("password match or not :", matchPassword);
        if (!matchPassword) {
            throw {
                status: process.env.FAILED,
                message: "Incorrect Password !"
            }
        }
        const token = await MakeToken(user);
        console.log(token);
        res.status(process.env.SUCCESS).send({ auth: true, DATA: token, status: process.env.SUCCESS });

    } catch (error) {
        res.status(error.status || process.env.FAILED).send({ message: error.message, status: process.env.FAILED });
    }
}

async function forgotPassword(req, res) {

    try {
        const RandomString = cryptoRandomString({ length: 7, type: 'url-safe' });

        const { email } = req.body;

        let filter = { email: email }
        let update = { resetToken: RandomString };

        await ForgotPassword(filter, update)

        res.status(process.env.SUCCESS).send({ message: "Mail Sent Successfully !", status: process.env.SUCCESS });

    } catch (error) {
        res.status(error.status || process.env.FAILED).send({ message: error.message, status: process.env.FAILED, data: null });
    }
}

async function verifyToken(req, res) {

    try {
        const { token, password } = req.body;
        const hash = await bcrypt.hash(password, 5)

        let filter = { resetToken: token }
        let update = {
            password: hash, $unset: { resetToken: null }
        }
        await Token(filter, update);
        res.status(process.env.SUCCESS).send({ message: "Password Update Successfull ..!", status: process.env.SUCCESS })

    } catch (error) {
        res.status(process.env.FAILED).send({ message: error.message, status: process.env.FAILED });
    }
}

async function deleteAccount(req, res) {

    try {
        const { userId } = req.params;

        let filter = { _id: userId }
        let update = { isDeleted: true }

        const fetchId = await RegModel.verifyIdAndModify(filter, update)

        if (!fetchId) {
            throw {
                status: process.env.FAILED,
                message: "Invalid Id !"
            }
        }
        res.status(process.env.SUCCESS).send({ message: "Account is deleted !", status: process.env.SUCCESS });

    } catch (error) {
        res.status(process.env.FAILED).send({ message: error.message, status: process.env.FAILED });
    }
}

async function contactUs(req, res, next) {

    try {
        const { Fullname, email, message } = req.body;

        const data = await contactUsService(Fullname, email, message)

        res.status(process.env.SUCCESS).send({ message: "Data Send Successfully !", status: process.env.SUCCESS, data: data })

    } catch (error) {
        res.status(process.env.FAILED).send({ message: error.message, status: process.env.FAILED });
    }
}

const Feedback = async (req, res) => {

    try {

        const UserName = req.userId;
        const { Message } = req.body;

        const FeedBackMsg = await FeedbackService(Message, UserName)
        res.status(200).send({ message: "Feedback Send Successfully  !", status: 200, data: FeedBackMsg })

    } catch (error) {
        res.status(400).send({ message: error.message, status: 400, data: null })
    }
}

const UpdateProfile = async (req, res) => {

    try {

        const { userId } = req.params;
        const { username, mobile, dob, email } = req.body;
        const query = { email: email }

        const filter = { _id: userId }
        const update = { username: username, mobile: mobile, dob: dob, email: email }

        const editUser = await updateUser(query, filter, update)
        res.status(200).send({ message: "Update Successfull !", status: 200, data: editUser })

    } catch (error) {
        res.status(400).send({ meesage: error.message, status: 400, data: null })
    }
}

export {
    contactUs,
    RegUser,
    login,
    forgotPassword,
    verifyToken,
    deleteAccount,
    Feedback,
    UpdateProfile
}

