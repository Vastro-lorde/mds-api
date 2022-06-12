const News = require('../models/newsModel.js');
const cloudinary = require('../middlewares/cloudinary');

// Controller for getting list of all news document.
exports.getNews = async(req, res, next) => {
    try {

        const news = await News.find();

        res.status(201).json({
            status: 'success',
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



// controller for creating a news document.
exports.createNews = async(req, res, next) => {
    console.log(req.news)
    try {
        const cloudFile = await cloudinary.uploader.upload(req.file.path)
        const newNews= {
            title: req.body.title,
            picture : cloudFile.secure_url,
            picture_cloudId : cloudFile.public_id,
            text: req.body.text,
            date: Date.now()
        }
    
        
        const news = await News.create(newNews)

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

// Controller for deleting a news document.
exports.deleteNews = async(req, res, next) => {
    try {

        const news = await News.findOneAndRemove({title: req.body.title, date: req.body.date});

        res.status(201).json({
            status: 'success',
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