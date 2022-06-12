const Result = require('../models/resultModel.js');
const {Subject} = require('../models/resultModel.js');


// controller for creating a news document.
exports.createResult = async(req, res, next) => {
    try {
        subjects = await Subject.find({schoolSession: req.body.schoolSession});
        const newResult= {
            student: req.body.studentId,
            class: req.body.class,
            subjects: subjects,
            session: req.body.schoolSession,
            total: subjects.reduce((total, subTotal) => total + subTotal.total, 0 ),
            teacher: req.params.id,
        }
        res.status(201).json({
            status: "success",
            message: 'successfully created',
            data: news
        })

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            error: err
        })
    }

    next()
}