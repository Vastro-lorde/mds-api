// This is a middleware for the Json Web Token authorization
const jwt = require('jsonwebtoken');
const Staff = require('../models/hospitalModel');



const auth = async (req, res, next) => {
    let token = req.headers.authorization;
    try {
        const email = jwt.verify(token, process.env.SECRET_KEY);
        const staff = await Staff.findOne({email: email})
        req.staff = staff;
        next()
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
module.exports = { auth, idcheck };