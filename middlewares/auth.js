// This is a middleware for the Json Web Token authorization
const jwt = require('jsonwebtoken');
const Staff = require('../models/staffModel');
const Student = require('../models/studentModel');



const staffAuth = async (req, res, next) => {
    let token = req.headers.authorization;
    try {
        const email = jwt.verify(token, process.env.SECRET_KEY);
        const staff = await Staff.findOne({email: email})
        req.staff = staff;
        next()
        return
    } catch (error) {
        console.error(error);
        res.json({
            Status: 'Failed!',
            message:"Please Login!"
        })
    }
}

const studentAuth = async (req, res, next) => {
    let token = req.headers.authorization;
    try {
        const email = jwt.verify(token, process.env.SECRET_KEY);
        const student = await Student.findOne({email: email})
        req.student = student;
        next()
        return
    } catch (error) {
        console.error(error);
        res.json({
            Status: 'Failed!',
            message:"Please Login!"
        })
    }
}

const idcheck = async (req, res, next) =>{
    try {
        const idStaff = req.staff._id
        if(req.params.id !== String(idStaff)) {
            return res.status(401).json({
                status: 'failed',
                message: 'This user is not authorized'
            });
        }
        next()
    } catch (error) {
        console.error(error);
        res.status(401).json({
            Status: 'Failed!'
        })
    }
}

const admincheck = async (req, res, next) =>{
    let token = req.headers.authorization;
    try {
        const email = jwt.verify(token, process.env.SECRET_KEY);
        const admin = await Staff.findOne({email: email})
        if(admin.isAdmin === true)
        req.staff = admin;
        next()
        return
    } catch (error) {
        console.error(error);
        res.status(401).json({
            Status: 'Failed!',
            message:"Not authorized"
        })
    }
}
module.exports = { staffAuth, studentAuth, idcheck, admincheck };