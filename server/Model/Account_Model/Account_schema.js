import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
    },

    friend_list: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    }],

    createdAt: {
        type: Date,
        default: ()=> new Date(),
    },

    profilePicture: {
        type: String,
        default: '',
    },

});

export default accountSchema;
