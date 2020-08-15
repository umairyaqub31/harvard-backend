const router = require('express').Router();
const User = require('../Model/user.model');
const jwt = require('jsonwebtoken');
const joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const verify = require('../Middleware/userVerifyToken');



//Validaqtion 
// Again we require validation for front-end before we go to the backend 
// This Schema is for Alumni Registration
const registerSchema = joi.object({
    name: joi.string().required(),
    mobile: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required().min(8),
    country: joi.string().optional(),
    city: joi.string().optional(),
    home_address: joi.string().optional(),
    office_address: joi.string().optional(),
    class_year: joi.string().optional(),
    degree: joi.string().optional(),
    institute: joi.string().optional(),
    section: joi.string().optional(),
    work_year: joi.string().optional(),
    designation: joi.string().optional(),
    company: joi.string().optional(),
    industry: joi.string().optional(),
    mynetwork: joi.array().optional()
});

//This Schema is for Alumni Login
const loginSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required()

});


//                 REGISTER API
router.route('/register').post( async (req, res) => {
 
    try{
        const err = registerSchema.validateAsync(req.body);
    }catch(err){
        return res.status(400).send(err.details[0].message);
    }
    const name = req.body.name;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const class_year = req.body.class_year;
    const degree = req.body.degree;
    const institute = req.body.institute;
    const section = req.body.section;
    const country = req.body.country;
    const city = req.body.city;
    const home_address = req.body.home_address;
    const office_address = req.body.office_address;
    const work_year = req.body.work_year;
    const designation = req.body.designation;
    const company = req.body.company;
    const industry = req.body.industry;
    const mynetwork = req.body.mynetwork;
    const password = req.body.password;
    const salt = await bcrypt.genSalt(16);
    const hashpassword = bcrypt.hashSync (password,salt);
    const emailExist = await User.findOne({email});
    if(emailExist){
        return res.status(400).json("Email is already exist");

    }
    //Save user data

    const userData = new User ({
        name,
        email,
        mobile,
        class_year,
        degree,
        institute,
        section,
        country,
        city,
        home_address,
        office_address,
        work_year,
        designation,
        company,
        industry,
        mynetwork,
        password: hashpassword
    });

    const userSaved = userData.save();
    if(userSaved){
        //assign token
        const token = jwt.sign({
                id: userSaved._id,
                name: userSaved.name,
                email: userSaved.email,
                mobile: userSaved.mobile,
                class_year: userSaved.class_year,
                degree: userSaved.degree,
                institute: userSaved.institute,
                section: userSaved.section,
                country: userSaved.country,
                city: userSaved.city,
                home_address: userSaved.home_address,
                office_address: userSaved.office_address,
                work_year: userSaved.work_year,
                designation: userSaved.designation,
                company: userSaved.company,
                industry: userSaved.industry,
                mynetwork: userSaved.mynetwork

        },
        process.env.USER_TOKEN_KEY,{
            expiresIn: '2 days'
        }
        );

        res.json({
            user:{
                id:userSaved._id,
                name:userSaved.name,
                email: userSaved.email,
                mobile: userSaved.mobile,
                class_year: userSaved.class_year,
                degree: userSaved.degree,
                institute: userSaved.institute,
                section: userSaved.section,
                country: userSaved.country,
                city: userSaved.city,
                home_address: userSaved.home_address,
                office_address: userSaved.office_address,
                work_year: userSaved.work_year,
                designation: userSaved.designation,
                company: userSaved.company,
                industry: userSaved.industry,
                mynetwork: userSaved.mynetwork
            },
            token
        })
    }
});


//                       LOGIN API
router.route('/login').post( async (req, res) => {
    try{
        const err = loginSchema.validateAsync(req.body)
    }catch(err){
        return res.status(400).send(err.details[0].message);
    }

    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({email});
    if(!user){
        res.status(400).send("Invalid Email");
    }

    const verifypassword = await bcrypt.compare(password, user.password);
    if(!verifypassword)
    {
        res.status(400).send("Invalid Password");
    }

    const token = jwt.sign({
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        class_year: user.class_year,
        degree: user.degree,
        institute: user.institute,
        section: user.section,
        country: user.country,
        city: user.city,
        home_address: user.home_address,
        office_address: user.office_address,
        work_year: user.work_year,
        designation: user.designation,
        company: user.company,
        industry: user.industry,
        mynetwork: user.mynetwork
    },
    process.env.USER_TOKEN_KEY,
    {expiresIn: '2 days'}
    );

    res.header('auth', token).send({
        user:{
            id:user._id,
            name:user.name,
            email: user.email,
            mobile: user.mobile,
            class_year: user.class_year,
            degree: user.degree,
            institute: user.institute,
            section: user.section,
            country: user.country,
            city: user.city,
            home_address: user.home_address,
            office_address: user.office_address,
            work_year: user.work_year,
            designation: user.designation,
            company: user.company,
            industry: user.industry,
            mynetwork: user.mynetwork
        },
        token  

    });
});

//            USER PROFILE INFORMATION
router.route('/profile').get( async (req, res) => {
 const data = await User.find({id: req.body._id});
 res.json(data);

});

//               UPDATE USER PROFILE
router.route('/update/:_id').post( async (req, res) => {
        const name = req.body.name;
        const email = req.body.email;
        const mobile = req.body.mobile;
        const class_year = req.body.class_year;
        const degree = req.body.degree;
        const institute = req.body.institute;
        const section = req.body.section;
        const country = req.body.country;
        const city = req.body.city;
        const home_address = req.body.home_address;
        const office_address = req.body.office_address;
        const work_year = req.body.work_year;
        const designation = req.body.designation;
        const company = req.body.company;
        const industry = req.body.industry;
        const mynetwork = req.body.mynetwork;
    try{
        const user = await User.findById(req.params._id);
        user.name = name;
        user.email = email;
        user.mobile = mobile;
        user.class_year = class_year;
        user.degree = degree;
        user.institute = institute;
        user.section = section;
        user.country = country;
        user.city = city;
        user.home_address = home_address;
        user.office_address = office_address;
        user.work_year = work_year;
        user.designation = designation;
        user.company = company;
        user.industry = industry;
        user.mynetwork = mynetwork;
        const userSaved = await user.save();
    

    res.json({message: 'Profile has been updated'})
        } 
        catch(err){
            res.status(400).json('User is not updated');
        }  
});

//                     SEARCH API
router.route('/search/:type').post( async (req, res) =>{

    const value = req.body.value;
    
    if(req.params.type === 'name'){
        const users = await User.find({name: new RegExp (value)});
        return res.json(users);
    }
    else if(req.params.type === 'country'){
        const users = await User.find({country: new RegExp (value)});
        return res.json(users);        
    } 
    else if(req.params.type === 'degree'){
        const users = await User.find({degree: new RegExp (value)});
        return res.json(users);
    }
    else if(req.params.type === 'class_year'){
        const users = await User.find({class_year: new RegExp (value)});
        return res.json(users);
    }
    else if(req.params.type === 'section'){
        const users = await User.find({section: new RegExp (value)});
        return res.json(users);
    }
    else if(req.params.type === 'industry'){
        const users = await User.find({industry: new RegExp (value)});
        return res.json(users);
    }
});

//                         MY NETWORK API
router.route('/mynetwork').post( async (req, res) => {
    const _id = req.body._id
    const user_ids = req.body.user_ids;
    const user = await User.findById(_id);
    user.mynetwork.push(user_ids);
    const userSaved = await user.save();
    res.json(userSaved);
});

module.exports = router;