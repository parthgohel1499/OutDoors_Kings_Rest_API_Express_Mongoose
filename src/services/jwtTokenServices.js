import jwt from 'jsonwebtoken';
import { RegModel } from '../models/models';
require('dotenv').config();


async function MakeToken(id, name, isAdmin, email) {

    var token = jwt.sign({ id, name, isAdmin, email }, process.env.SECRET, {
        expiresIn: 3600000 // expires in 1 hours
    });
    return token
};

async function adminAuthentication(req, res, next) {
    try {
        var token = req.headers['x-access-token'];

        let decoded1
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        decoded1 = jwt.verify(token, process.env.SECRET)

        const userData = await RegModel.findOne({ _id: decoded1.id, isAdmin: true })

        if (!userData) {
            var error = {
                statusCode: 401,
                message: `UnAuthorize user`
            }
            throw error
        } else {
            req.query.id = userData.id
            next();
        }

    } catch (error) {
        if (error.statusCode == 401) {
            const response = { statusCode: error.statusCode, message: error.message, data: null };
            res.status(401).send(response);
        }
        else {
            const response = { statusCode: error.statusCode, message: error.message, data: null };
            res.status(400).send(response);
        }
    }
}

async function userAuthentication(req, res, next) {
    try {
        var token = req.headers['access-token-user'];

        let decoded1
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        decoded1 = jwt.verify(token, process.env.SECRET)

        const userData = await RegModel.findOne({ _id: decoded1.id, isAdmin: false })
        console.log("id from user authentication : ", userData);

        if (!userData) {
            var error = {
                statusCode: 401,
                message: `Only Access For Registered Users !`
            }
            throw error
        } else {
            //req.query.id = userData.id
            req.userId = userData.id
            next();
        }

    } catch (error) {
        if (error.statusCode == 401) {
            const response = { statusCode: error.statusCode, message: error.message, data: null };
            res.status(401).send(response);
        }
        else {
            const response = { statusCode: error.statusCode, message: error.message, data: null };
            res.status(400).send(response);
        }
    }
}
export { adminAuthentication, MakeToken, userAuthentication }