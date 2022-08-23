// importing the necessary modules
const router = require('express').Router();
const staffController = require('../controllers/staffController');
const { studentAuth, staffAuth } = require('../middlewares/auth');
const upload = require('../middlewares/multer');


router.post('/signup', staffController.signup);
router.post('/login', staffController.login);
router.post('/edit/:id', staffAuth, upload.single('profilePic'), staffController.update);
router.get('/:id', staffAuth, staffController.getStaff);

// exporting the router
module.exports = router;