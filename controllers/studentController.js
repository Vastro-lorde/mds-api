const Student = require('../models/studentModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// controller for signing up  a Student
exports.signup = async(req, res, next) => {

    try {
        // check exists
        let checkEmail = await Student.findOne({ email: req.body.email });
        // input validation product
        if (req.body.password !== req.body.confirmPassword) {
            return res.send(`password and confirm password doesn't match`);
        } else if (checkEmail) {
            return res.status(401).json({
                status: 'failed',
                message: 'email already exists',
                data: null
            })
        } else {
            // hash password
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            let theStudent = {
                fullname: req.body.fullname,
                email: req.body.email,
                password: hashedPassword,
                sex: req.body.sex,
                phoneNumber: req.body.phoneNumber,
                stateOfOrigin: req.body.stateOfOrigin,
                position: req.body.position
            }

            // creates the Student in database
            const student = await Student.create(theStudent);

            // nodemailer function goes here.
            console.log(req.body.name, req.body.email);
            // signUpMailer( String(req.body.name), String(req.body.email));

            res.status(201).json({
                status: 'success',
                message: 'An email has been sent to your given email address',
                data: student
            });
        }

    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }

    next();
}

// controller for login in and this generates to jwt token.
exports.login = async(req, res, next) => {

    try {
        let checkEmail = await Student.findOne({ email: req.body.email });
        if (!checkEmail) {
            console.log(checkEmail);
            res.status(401).json({
                status: 'fail',
                message: 'No Student with that email found',
                data: null
            });

        }
        if (await bcrypt.compare(req.body.password, checkEmail.password)) {
            console.log(req.body.password + " " + checkEmail.password);

            // creating the token from the email and secret
            token = jwt.sign(checkEmail.email, process.env.SECRET_KEY);
            res.status(201).json({
                status: 'success',
                message: 'Your token has been created successfully',
                token,
                data: checkEmail
            });
        } else {
            console.log(req.body.password + " " + checkEmail.password);
            res.status(400).json({
                status: 'fail',
                message: 'Wrong password',
                data: null
            });
        }
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }

    next();
}

// This is the controller for getting a particular Student's detail.
exports.getStudent = async(req, res, next) => {
    const student = await Student.findById({ _id: req.params.id });
    if (!student) {
        res.status(401).json({
            status: 'failed',
            message: 'No Student found',
            data: null
        });
    } else {
        res.status(200).json({
            status: 'successful',
            message: 'Your details',
            data: student
        });
    }
}


// This is the controller for getting list of active Students.
exports.getActiveStudents = async(req, res, next) => {
    const students = await Student.find({ active: true });
    if (!students) {
        res.status(401).json({
            status: 'failed',
            message: 'No active Student found',
            data: null
        });
    } else {
        res.status(200).json({
            status: 'successful',
            message: 'List of Active Students',
            data: students
        });
    }
}


// This is the controller for getting list of inactive Students.
exports.getInactiveStudents = async(req, res, next) => {
    const students = await Student.find({ active: false });
    if (!students) {
        res.status(401).json({
            status: 'failed',
            message: 'No inactive Student found',
            data: null
        });
    } else {
        res.status(200).json({
            status: 'successful',
            message: 'List of inactive Students',
            data: students
        });
    }
}



// controller for updating a Student's detail including uploading of profile pic.
exports.update = async(req, res, next) => {
    const { fullname, dateOfBirth, phoneNumber, address, stateOfOrigin, position, specialization } = req.body;

    try {
        const cloudFile = await cloudinary.uploader.upload(req.file.path)

        const profilePic = cloudFile.secure_url;
        const profilePic_cloudId = cloudFile.public_id;
        const student = await Student.findByIdAndUpdate({ _id: req.params.id }, {
            fullname,
            dateOfBirth,
            phoneNumber,
            address,
            stateOfOrigin,
            position,
            specialization,
            profilePic,
            profilePic_cloudId
        }, {
            new: true
        });

        res.status(200).json({
            status: 'success',
            message: 'Successfully updated details',
            data: student
        });

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            error: err
        });
    }

    next();
}

exports.deleteStudent = async(req, res, next) => {
    const {active, id} = req.body;
    try {
        const student = await Student.findByIdAndUpdate({ _id: id}, { active : false }, { new: true });
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