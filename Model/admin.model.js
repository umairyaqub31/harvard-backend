const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

// Creating schema for admin
const adminSchema  = new Schema({
    name: {
        type: String,
        required: [true,'Username is required'],
        minlength:3,
        maxlength: 225,
        trim: true,
        match: [/^[a-zA-Z0-9]+/, 'is invalid'],
        index: true
    },

    email: {
        type: String,
        unique:true,
        required: [true,'An email address is required'],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    mobile: {
        type: String,
        unique:true,
        required:true,
        index: true
    },
    password: {
        type: String,
        required: [true,'A password is required'],
        minlength: 8,
        maxlength: 225,
        trim: true 
    },
});
const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin;