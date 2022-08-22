// importing the necessary modules
const router = require('express').Router();
const staffController = require('../controllers/staffController');
const studentController = require('../controllers/studentController');
const newsController = require('../controllers/newsController');
const { admincheck, staffAuth, idcheck } = require('../middlewares/auth');
const upload = require('../middlewares/multer');
const { createResult, getresult } = require("../controllers/resultController")

// staffs controllers
router.post('/signup', staffController.signup);
router.post('/login', staffController.login);
router.post('/result/create', staffAuth, admincheck, createResult);
router.post('/edit', staffAuth, admincheck, upload.single('profilePic'), staffController.update);
router.get('/:id', staffAuth, admincheck, staffController.getStaff);
router.get('/activeStaff', staffController.getActiveStaffs);
router.get('/inactiveStaff', staffController.getInactiveStaffs);

// students controller
router.get('/students/inactive', studentController.getInactiveStudents);
router.get('/students/active', studentController.getActiveStudents);
router.get("/student/result", staffAuth, admincheck, getresult)
router.put("/student/update", admincheck, idcheck, studentController.update)

// news controller
router.get('/news', newsController.getNews);
router.post('/news/create', staffAuth, admincheck, newsController.createNews);
router.delete('/news/delete/', staffAuth, admincheck, newsController.deleteNews);


// exporting the router
module.exports = router;