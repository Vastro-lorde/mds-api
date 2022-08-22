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
router.get('/activeStaff', staffAuth, admincheck, staffController.getActiveStaffs);
router.get('/inactiveStaff', staffAuth, admincheck, staffController.getInactiveStaffs);

// students controller
router.get('/students/inactive', staffAuth, admincheck, studentController.getInactiveStudents);
router.get('/students/active', staffAuth, admincheck, studentController.getActiveStudents);
router.get("/student/result", staffAuth, admincheck, staffAuth, admincheck, getresult)
router.put("/student/update", admincheck, idcheck, studentController.update)

// exporting the router
module.exports = router;