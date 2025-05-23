import schema from './Conversation_schema.js';
import addStatics from './Conversation_statics.js';
import addMethods from './Conversation_methods.js';
import mongoose from 'mongoose';

// Add All Functions
addStatics(schema);
addMethods(schema);

// Model
const Conversation_Model = mongoose.model('Conversation', schema, 'Conversation');

export default Conversation_Model;
