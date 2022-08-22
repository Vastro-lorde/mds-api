const Result = require('../models/resultModel.js');
const Subject = require('../models/subjectModel.js');


// controller for creating a result document.
exports.createResult = async (req, res, next) => {
    try {
        let result = await Result.findOne({ student: req.body.student, schoolSession: req.body.schoolSession });
        if (result) {
            res.status(400).json({
                status: 'fail',
                message: 'Result already exists',
                data: null
            })
        }
        const subjects = await Subject.find({ schoolSession: req.body.schoolSession });
        const newResult = {
            student: req.body.studentId,
            class: req.body.class,
            subjects: subjects,
            session: req.body.schoolSession,
            total: subjects.reduce((total, subTotal) => total + subTotal.total, 0),
            teacher: req.params.id,
        }
        result = await Result.create(newResult);
        res.status(201).json({
            status: "success",
            message: 'successfully created',
            data: result
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            error: err
        })
    }

    next()
}

exports.getresult = async (req, res) => {
    try {
        let result = await Result.findOne({ student: req.body.student, schoolSession: req.body.schoolSession });
        if (!result) {
            res.status(400).json({
                message: "Does not exist.",
                data: null
            })
        } else {
            res.status(200).json({
                message: "Success.",
                data: result
            })
        }
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            error: err
        })
    }

}