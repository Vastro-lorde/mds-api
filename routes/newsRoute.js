const newsController = require('../controllers/newsController');
const { admincheck, staffAuth, idcheck } = require('../middlewares/auth');
const router = require('express').Router();

// news controller
router.get('/news', newsController.getNews);
router.post('/news/create', staffAuth, admincheck, newsController.createNews);
router.delete('/news/delete/', staffAuth, admincheck, newsController.deleteNews);

// exporting the router
module.exports = router;