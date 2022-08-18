const Staff = require('../models/staffModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('../middlewares/cloudinary');


// controller for signing up  a Staff
exports.signup = async (req, res, next) => {

    try {
        // check exists
        let checkEmail = await Staff.findOne({ email: req.body.email});
        // input validation product
        if (req.body.password !== req.body.confirmPassword) {
            return res.send(`password and confirm password doesn't match`);
        }
        
        else if(checkEmail){
            return res.status(401).json({
                status: 'failed',
                message: 'email already exists',
                data: null
            })
        }else{
        // hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let theStaff = {
        fullname: req.body.fullname,
        email: req.body.email,
        password: hashedPassword,
        sex: req.body.sex,
        phoneNumber: req.body.phoneNumber,
        stateOfOrigin: req.body.stateOfOrigin,
        position: req.body.position
        }
        if(req.url.toString().includes("admin")) staff.isAdmin = true;
        // creates the staff in database
        const staff = await Staff.create(theStaff);

        // nodemailer function goes here.
        console.log(req.body.fullname, req.body.email);
        // signUpMailer( String(req.body.name), String(req.body.email));

        res.status(201).json({
            status: 'success',
            message: 'Welcome to Mater Dei Online',
            data: staff
        });
    }
        
    } catch(err) {
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }

    next();
}

// controller for login in and this generates to jwt token.
exports.login = async (req, res, next) => {

    try {
        let checkEmail = await Staff.findOne({ email: req.body.email});
        if (!checkEmail){
            console.log(checkEmail);
            res.status(401).json({
                status: 'fail',
                message: 'No Staff with that email found',
                data: null
            });

        }
        if (await bcrypt.compare(req.body.password , checkEmail.password)){
            // console.log(req.body.password + " " + checkEmail.password);

            // creating the token from the email and secret
            token = jwt.sign( checkEmail.email, process.env.SECRET_KEY);
            res.status(201).json({
                status: 'success',
                message: 'Your token has been created successfully',
                token,
                data: checkEmail
            });
        }
        else {
            console.log(req.body.password , checkEmail.password);
            res.status(400).json({
                status: 'fail',
                message: 'Wrong password',
                data: null
            });
         } 
        }
    catch(err) {
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }

    next();
}

// This is the controller for getting a particular staff's detail.
exports.getStaff = async (req, res, next)=>{
    const staff = await Staff.findById({ _id: req.params.id});
    if (!staff) {
        res.status(401).json({
            status: 'failed',
            message: 'No Staff found',
            data: null
        });
    } else {
        res.status(200).json({
            status: 'successful',
            message: 'Your details',
            data: staff
        });
    }
}


// This is the controller for getting list of active Staff
exports.getActiveStaffs = async (req, res, next)=>{
    const staffs = await Staff.find({ active: true });
    if (!staffs) {
        res.status(401).json({
            status: 'failed',
            message: 'No active Staff found',
            data: null
        });
    } else {
        res.status(200).json({
            status: 'successful',
            message: 'List of Active Staffs',
            data: staffs
        });
    }
}


// This is the controller for getting list of inactive Staffs.
exports.getInactiveStaffs = async (req, res, next)=>{
    const staffs = await Staff.find({ active: false });
    if (!staffs) {
        res.status(401).json({
            status: 'failed',
            message: 'No inactive Staff found',
            data: null
        });
    } else {
        res.status(200).json({
            status: 'successful',
            message: 'List of inactive Staffs',
            data: staffs
        });
    }
}



// controller for updating a staff's detail including uploading of profile pic.
exports.update = async (req, res, next) => {
    
   
    try {
        // checking the cloudiinary upload from multer
        const cloudFile = await cloudinary.uploader.upload(req.file.path)
        // console.log(cloudFile);
        // Retrieving profile pic cloudinary public id if it exists.
        const checkPic = await Staff.findOne({ _id: req.params.id });
        if (checkPic.profilePic_cloudId) {
           await cloudinary.uploader.destroy(checkPic.profilePic_cloudId)
        }
        // Creating the new variables for the profile updates
        const {fullname, dateOfBirth, phoneNumber, address, stateOfOrigin, position, specialization} = req.body;
        const profilePic = cloudFile.secure_url;
        const profilePic_cloudId = cloudFile.public_id;
        // Updating the profile with the variables
        const staff = await Staff.findByIdAndUpdate({ _id: req.params.id}, {
            fullname,
            dateOfBirth,
            phoneNumber,
            address,
            stateOfOrigin,
            position,
            specialization,
            profilePic,
            profilePic_cloudId
        },
        {
            new: true
        });
        
        res.status(200).json({
            status: 'success',
            message: 'Successfully updated details',
            data: staff
        });
        
    } catch(err) {
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }

    next();
}

// controller for deleting a staff
exports.deleteStaff = async(req, res, next) => {
    const {id} = req.body;
    try {
        const staff = await Staff.findByIdAndUpdate({ _id: id}, {active : false }, { new: true });
        res.status(200).json({
            status: 'success',
            message: 'Successfully removed'
        });
        
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }
}