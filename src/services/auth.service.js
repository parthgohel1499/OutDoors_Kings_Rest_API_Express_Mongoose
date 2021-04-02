import { RegModel } from '../models/models';
import { sMail } from '../../src/services/sendMail';

const loginUserWithEmailVerification = async (email) => {
    const query = { email: email };
    const user = await RegModel.checkEmail(query);
    if (!user) {
        throw new Error("User Not Found !")
    }
    return user;
}

const ForgotPassword = async (filter, update) => {
    const updateToken = await RegModel.verifyAndModify(filter, update);

    if (!updateToken) {
        throw {
            status: 400,
            message: "Enter valid email !"
        }
    }
    const email = filter.email;
    const RandomString = update.resetToken;
    const subject = "From Outdoor Kings , for update password !"
    const html = `link to create new password : http://localhost:3030/forgot verification code : ${RandomString}`

    const TokenMail = await sMail(email, RandomString, subject, html);
    return TokenMail;
}

const Token = async (filter, update) => {

    console.log("filter from Token update : ", update.password);

    const updatePassword = await RegModel.verifyAndModify(filter, update);

    if (!updatePassword) {
        throw new Error("Token is invalid ! ");
    }

    return updatePassword;
}

export { loginUserWithEmailVerification, ForgotPassword, Token }
