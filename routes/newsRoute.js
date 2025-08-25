const newsController = require('../controllers/newsController');
const { admincheck, staffAuth } = require('../middlewares/auth');
const upload = require('../middlewares/multer');
const router = require('express').Router();

// news controller
router.get('/news', newsController.getNews);
router.post('/news/create', staffAuth, admincheck, upload.single('picture'), newsController.createNews);
router.delete('/news/delete/', staffAuth, admincheck, newsController.deleteNews);

// exporting the router
module.exports = router;