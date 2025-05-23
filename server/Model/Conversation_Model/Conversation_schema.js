import mongoose from 'mongoose';

const convo_schema = new mongoose.Schema({

    metadata:{
        
        theme: { type: String, trim: true, lowercase: true, default: "default" },
        pinned_message: { type: String, trim: true, default: null },
        blocked: { type: mongoose.Schema.Types.ObjectId, ref: 'Accounts', default: null },
        group: { type: Boolean, default: false }

    },

    messages: [{

        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Accounts', required: true },
        date_sent: { type: Date, default: ()=> new Date() },
        text: { type: String, trim: true, default: null },
        image: { type: String, default: null },
        unread: { type: Boolean, default: true }

    }],

    participants: [{

        user: { type: mongoose.Schema.Types.ObjectId, ref: 'Accounts', required: true },
        mute_on: { type: Boolean, default: false },
        archive: { type: Boolean, default: false },
        active: { type: Boolean, default: false },
        nickname: { type: String, trim: true, default: null },

    }],

    createdAt: {
        type: Date,
        default: ()=> new Date(),
    },

});

export default convo_schema;
