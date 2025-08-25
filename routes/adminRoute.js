// importing the necessary modules
const router = require('express').Router();
const staffController = require('../controllers/staffController');
const studentController = require('../controllers/studentController');
const newsController = require('../controllers/newsController');
const upload = require('../middlewares/multer');
const { createResult, getresult } = require("../controllers/resultController")

// staffs controllers
// legacy staff auth endpoints removed in favor of /api/auth
router.post('/result/create', createResult);
router.post('/edit', upload.single('profilePic'), staffController.update);
router.get('/:id', staffController.getStaff);
router.get('/activeStaff', staffController.getActiveStaffs);
router.get('/inactiveStaff', staffController.getInactiveStaffs);

// students controller
router.get('/students/inactive', studentController.getInactiveStudents);
router.get('/students/active', studentController.getActiveStudents);
router.get("/student/result", getresult)
router.put("/student/update", studentController.update)

// exporting the router
module.exports = router;