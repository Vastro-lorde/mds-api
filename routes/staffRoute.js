// importing the necessary modules
const router = require('express').Router();
const staffController = require('../controllers/staffController');
const {auth, idcheck} = require('../middlewares/auth');
const upload = require('../middlewares/multer');


router.post('/signup', staffController.signup);
router.post('/login', staffController.login);
router.post('/edit', auth, upload.single('profilePic'), staffController.update);
router.get('/', auth,  staffController.getStaff);

// exporting the router
module.exports = router; 