const newsService = require('../services/newsService');
const { ok, created, serverError } = require('../utils/helpers/http');

// Controller for getting list of all news document.
exports.getNews = async(req, res, next) => {
    try {
        const news = await newsService.listAll();
        return ok(res, news);
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}



// controller for creating a news document.
exports.createNews = async(req, res, next) => {
    try {
        const news = await newsService.createWithUpload(req.body, req.file);
        return created(res, news, 'successfully created');
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}

// Controller for deleting a news document.
exports.deleteNews = async(req, res, next) => {
    try {
        const news = await newsService.removeByTitleAndDate(req.body.title, req.body.date);
        return ok(res, news);
    } catch (err) {
        return serverError(res, err);
    } finally {
        next();
    }
}
