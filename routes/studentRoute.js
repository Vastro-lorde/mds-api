const { signup,
    login,
    update,
    getActiveStudents,
    getInactiveStudents,
    getStudent,
    deleteStudent } = require("../controllers/studentController")
const { getresult } = require("../controllers/resultController")
const { studentAuth, staffAuth, idcheck, admincheck } = require('../middlewares/auth');


const router = require("express").Router()

router.post("/login", login)
router.post("/signup", signup)
router.get("students/active", getActiveStudents)
router.get("/students/inactive", getInactiveStudents)
router.get("/student/:student", getStudent)
router.get("/getresults", studentAuth, getresult)
router.delete("/deleteStudent", staffAuth, idcheck, deleteStudent)

module.exports = router