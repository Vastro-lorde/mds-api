const { signup,
    login,
    update,
    getActiveStudents,
    getInactiveStudents,
    getStudent,
    deleteStudent } = require("../controllers/studentController")
const { studentAuth, staffAuth, idcheck } = require('../middlewares/auth');


const router = require("express").Router()

router.post("/login", login)
router.post("/signup", signup)
router.put("/update", staffAuth, idcheck, update)
router.get("getactivestudents", getActiveStudents)
router.get("/getinactivestudents", getInactiveStudents)
router.get("/getstudent", getStudent)
router.delete("/deleteStudent", staffAuth, idcheck, deleteStudent)

module.exports = router