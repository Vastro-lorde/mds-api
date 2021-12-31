// importing the necessary modules
const router = require('express').Router();
const staffController = require('../controllers/staffController');
const studentController = require('../controllers/studentController');
const { auth, idcheck } = require('../middlewares/auth');
const upload = require('../middlewares/multer');

// staffs controllers
router.post('/signup', staffController.signup);
router.post('/login', staffController.login);
router.post('/edit', auth, upload.single('profilePic'), staffController.update);
router.get('/:id', auth, staffController.getStaff);
router.get('/activeStaff', staffController.getActiveStaffs),
router.get('/inactiveStaff', staffController.getInactiveStaffs)

// students controller
router.get('/inactiveStudents', studentController.getInactiveStudents)
router.get('/activeStudents', studentController.getActiveStudents)


// exporting the router
module.exports = router;