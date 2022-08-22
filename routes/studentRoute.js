const { signup,
    login,
    update,
    getActiveStudents,
    getInactiveStudents,
    getStudent,
    deleteStudent } = require("../controllers/studentController") 

    const router = require("express").Router()

    router.post("/login", login)
    router.post("/signup", signup)
    router.put("/update", update)
    router.get("getactivestudents", getActiveStudents)
    router.get("/getinactivestudents", getInactiveStudents)
    router.get("/getstudent", getStudent)
    router.delete("/deleteStudent", deleteStudent)

    module.exports = router