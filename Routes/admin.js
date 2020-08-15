const router = require('express').Router();
const Admin = require('../Model/admin.model');
const jwt = require('jsonwebtoken');
const joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const verify = require('../Middleware/adminVerifyToken');
const User = require('../Model/user.model');

//Validaqtion 
// Again we require validation for front-end before we go to the backend 
// This Schema is for Admin Registration
const registerSchema = joi.object({
    name: joi.string().required(),
    mobile: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required().min(8),  
});

//This Schema is for Admin Login
const loginSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required()

});
//_____________________ Register API _______________
router.route('/register').post( async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const password = req.body.past_events;
    const salt = await bcrypt.genSalt(16);
    const hashpassword = bcrypt.hashSync (password,salt);
    const emailExist = await Admin.findOne({email});
    if(emailExist){
        return res.status(400).json("Email is already exist");

    }
    //Save admin data

    const adminData = new Admin ({
        name,
        email,
        mobile,
        password: hashpassword
    });

    const adminSaved = adminData.save();
    if(adminSaved){
        //assign token
        const token = jwt.sign({
                id: adminSaved._id,
                name: adminSaved.name,
                email: adminSaved.email,
                mobile: adminSaved.mobile
        },
        process.env.USER_TOKEN_KEY,{
            expiresIn: '2 days'
        }
        );

        res.json({
            admin:{
                id:adminSaved._id,
                name:adminSaved.name,
                email: adminSaved.email,
                mobile: adminSaved.mobile,
            },
            token
        })
    }
});

//_____________________ Login API _______________
router.route('/login').post( async (req, res) => {
    try{
        const err = loginSchema.validateAsync(req.body)
    }catch(err){
        return res.status(400).send(err.details[0].message);
    }

    const email = req.body.email;
    const password = req.body.password;

    const admins = await Admin.findOne({email});
    if(!admins){
        return res.status(400).send("Invalid Email");
    }

    // const verifypassword = await bcrypt.compare(password, admins.password);
    // if(!verifypassword)
    // {
    //     return res.status(400).send("Invalid Password");
    // }

    const token = jwt.sign({
        id: admins._id,
        name: admins.name,
        email: admins.email,
        mobile: admins.mobile,
    },
    process.env.USER_TOKEN_KEY,
    {expiresIn: '2 days'}
    );

    res.header('auth', token).send({
        admins:{
            id:admins._id,
            name:admins.name,
            email: admins.email,
            mobile: admins.mobile,
        },
        token  

    });
});

//_____________________________ All Users 
router.route('/users').get( async (req, res) => {
    try{
        const users = await User.find();
        return res.send(users);
    }
    catch(err){
        res.status(400).send(err);
    }
})

module.exports = router;
