import { RegModel, FeedbackModel, contactUsModel } from '../models/models';

const createUser = async (query) => {

    const email = { email: query.email }

    if (await RegModel.checkEmail(email)) {
        throw new Error("User Is Already Exist ! ")
    }
    const user = await RegModel.create(query);
    return user;
}

const contactUsService = async (Fullname, email, message) => {

    const ContactUsData = new contactUsModel({
        Fullname: Fullname,
        email: email,
        message: message
    })
    const insertData = await ContactUsData.save()

    if (!insertData) {
        throw new Error("unable to send data !")
    }
    return insertData
}

const FeedbackService = async (Message, UserName) => {

    const FeedbackMsg = await FeedbackModel.create({
        Message: Message,
        User: UserName
    })

    const saveFeedback = await FeedbackMsg.save()

    if (!saveFeedback) {
        throw new Error("Failed To Send Feedback !")
    }
    return saveFeedback;
}

const updateUser = async (filter, update) => {
    const updateUser = await RegModel.verifyIdAndModify(filter, update)
    if (!updateUser) {
        throw new Error("Check Your Details ! !")
    }
    return updateUser;
}

const viewUserProfile = async (query) => {
    const profile = await RegModel.CheckById(query)

    if (!profile) {
        throw new Error("User Not Found !")
    }
    return profile;
}
export {
    createUser,
    contactUsService,
    FeedbackService,
    updateUser,
    viewUserProfile
}
