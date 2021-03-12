import mongoose from 'mongoose';
const { Types: { ObjectId } } = mongoose;

function verifyObjectId(id) {

    if (ObjectId.isValid(id)) {
        return id;
    }
}

export { verifyObjectId }