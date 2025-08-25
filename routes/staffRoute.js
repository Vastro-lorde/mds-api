// importing the necessary modules
const router = require('express').Router();
const staffController = require('../controllers/staffController');
const upload = require('../middlewares/multer');


// legacy staff auth endpoints removed in favor of /api/auth
router.post('/edit/:id', upload.single('profilePic'), staffController.update);
router.get('/:id', staffController.getStaff);

// exporting the router
module.exports = router;