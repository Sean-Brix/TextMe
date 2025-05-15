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
        ref: 'Accounts',
        unique: true
    }],

    friend_request: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Accounts',
        unique: true
    }],

    pending_request: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Accounts',
        unique: true
    }],

    conversation: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation'
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
