

const Staff = require('../models/staffModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// controller for signing up  a Staff
exports.signup = async (req, res, next) => {

    try {
        // check exists
        let checkEmail = await Staff.findOne({ email: req.body.email})
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
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        stateOfOrigin: req.body.stateOfOrigin,
        position: req.body.position,

        }

        // creates the staff in database
        const staff = await Staff.create(theStaff)

        // nodemailer function goes here.
        console.log(req.body.name, req.body.email);
        signUpMailer( String(req.body.name), String(req.body.email));

        res.status(201).json({
            status: 'success',
            message: 'An email has been sent to your given email address',
            data: hospital
        })}
        
    } catch(err) {
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        })
    }

    next()
}

// controller for login in and this generates to jwt token.
exports.login = async (req, res, next) => {

    try {
        let checkEmail = await Staff.findOne({ email: req.body.email})
        if (!checkEmail){
            console.log(checkEmail)
            res.status(401).json({
                status: 'fail',
                message: 'No Staff with that email found',
                data: null
            })

        }
        if (await bcrypt.compare(req.body.password , checkEmail.password)){
            console.log(req.body.password + " " + checkEmail.password);

            // creating the token from the email and secret
            token = jwt.sign( checkEmail.email, process.env.SECRET_KEY)
            res.status(201).json({
                status: 'success',
                message: 'Your token has been created successfully',
                token,
                data: checkEmail
            });
        }
        else {
            console.log(req.body.password + " " + checkEmail.password);
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
    const staff = await Staff.findById({ _id: req.params.id})
    if (!staff) {
        res.status(401).json({
            status: 'failed',
            message: 'No Staff found',
            data: null
        })
    } else {
        res.status(200).json({
            status: 'successful',
            message: 'Your details',
            data: staff
        });
    }
}