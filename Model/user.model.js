const moongose = require ('mongoose');
const Schema = moongose.Schema;

//Creating schema for users
// This schema is for backend validation
  //My Network Schema


  //User Schema
const userSchema = new Schema({
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
    social_networks: {
        type: Array,
    },
    profile_pic: {
        type: String,
    },

    nick_name: {
        type: String,
    },
    class_year: {
      type: String,
    },
    degree: {
      type: String,
    },
    institute: {
      type: String,
    },
    section: {
        type: String,
      },
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      home_address: {
        type: String,
      },
      office_address: {
          type: String,
      },
      work_year: {
        type: String,
      },
      designation: {
        type: String,
      },
      company: {
        type: String,
      },
      industry: {
        type: String,
      },
    
    mynetwork:{
      type: Array,
      default: []
    },
    
},   {timesstamps: true});

const User = moongose.model('User', userSchema);
module.exports = User;