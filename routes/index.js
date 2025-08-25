const router = require('express').Router();

const staffRoute = require('./staffRoute');
const adminRoute = require('./adminRoute');
const authRoute = require('./authRoute');
const studentRoute = require('./studentRoute');
const newsRoute = require('./newsRoute');
const courseRoute = require('./courseRoute');
const courseScoreRoute = require('./courseScoreRoute');
const departmentRoute = require('./departmentRoute');
const { authenticate, authorize } = require('../middlewares/auth');
const { Roles } = require('../utils/enums/auth');

router.use('/auth', authRoute);
router.use('/admin', authenticate, authorize(Roles.ADMIN), adminRoute);
router.use('/staff', authenticate, authorize(Roles.STAFF), staffRoute);
router.use('/student', authenticate, studentRoute);
router.use('/news', newsRoute);
router.use('/courses', courseRoute);
router.use('/course-scores', courseScoreRoute);
router.use('/departments', departmentRoute);

module.exports = router;


