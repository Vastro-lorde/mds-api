// importing the necessary modules
const router = require('express').Router();
const staffController = require('../controllers/staffController');
const { auth, idcheck } = require('../middlewares/auth');
const upload = require('../middlewares/multer');


router.post('/signup', staffController.signup);
router.post('/login', staffController.login);
router.post('/edit', auth, upload.single('profilePic'), staffController.update);
router.get('/:id', auth, staffController.getStaff);
router.get('/activeStaff', staffController.getActiveStaffs),
    router.get('/inactiveStudents', staffController.getInactiveStudents)
router.get('/activeStaff', staffController.getActiveStudents),
    router.get('/inactiveStaff', staffController.getInactiveStudents)

// exporting the router
module.exports = router;