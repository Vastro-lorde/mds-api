const router = require('express').Router();
const ctrl = require('../controllers/courseScoreController');
const { authenticate, authorize } = require('../middlewares/auth');
const { Roles } = require('../utils/enums/auth');

router.post('/', authenticate, authorize(Roles.ADMIN, Roles.STAFF), ctrl.create);
router.get('/student/:studentId', authenticate, authorize(Roles.ADMIN, Roles.STAFF, Roles.STUDENT), ctrl.listByStudent);
router.get('/course/:courseId', authenticate, authorize(Roles.ADMIN, Roles.STAFF), ctrl.listByCourse);
router.put('/:id', authenticate, authorize(Roles.ADMIN, Roles.STAFF), ctrl.update);
router.delete('/:id', authenticate, authorize(Roles.ADMIN), ctrl.remove);

module.exports = router;


