import mongoose from 'mongoose';

const UserShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    rule: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true
});

const UserModel = mongoose.model('users', UserShema);
export default UserModel;