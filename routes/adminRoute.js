// importing the necessary modules
const router = require('express').Router();
const staffController = require('../controllers/staffController');
const studentController = require('../controllers/studentController');
const newsController = require('../controllers/newsController');
const { admincheck, idcheck } = require('../middlewares/auth');
const upload = require('../middlewares/multer');

// staffs controllers
router.post('/signup', staffController.signup);
router.post('/login', staffController.login);
router.post('/edit', admincheck, upload.single('profilePic'), staffController.update);
router.get('/:id', admincheck, staffController.getStaff);
router.get('/activeStaff', staffController.getActiveStaffs);
router.get('/inactiveStaff', staffController.getInactiveStaffs);

// students controller
router.get('/inactiveStudents', studentController.getInactiveStudents);
router.get('/activeStudents', studentController.getActiveStudents);

// news controller
router.get('/news', newsController.getNews);
router.post('/news/create', admincheck, newsController.createNews);
router.delete('/news/delete/', admincheck, newsController.deleteNews);


// exporting the router
module.exports = router;