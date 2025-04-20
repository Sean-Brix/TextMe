import schema from './Account_schema.js';
import addStatics from './Account_statics.js';
import addMethods from './Account_methods.js';
import mongoose from 'mongoose';

// Add All Functions
addStatics(schema);
addMethods(schema);

// Model
const Account_Model = mongoose.model('Accounts', schema, 'Accounts');

export default Account_Model;
