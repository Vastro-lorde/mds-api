const { signup,
    login,
    update,
    getActiveStudents,
    getInactiveStudents,
    getStudent,
    deleteStudent } = require("../controllers/studentController")
const { getresult } = require("../controllers/resultController")
const router = require("express").Router()

// Student routes (legacy auth endpoints removed; use /api/auth)
router.get("students/active", getActiveStudents)
router.get("/students/inactive", getInactiveStudents)
router.get("/student/:student", getStudent)

// Result routes
router.get("/getresults", getresult)
router.delete("/deleteStudent", deleteStudent)

module.exports = router