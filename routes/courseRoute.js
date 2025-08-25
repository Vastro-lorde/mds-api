const router = require('express').Router();
const ctrl = require('../controllers/courseController');
const { authenticate, authorize } = require('../middlewares/auth');
const { Roles } = require('../utils/enums/auth');

router.post('/', authenticate, authorize(Roles.ADMIN, Roles.STAFF), ctrl.create);
router.get('/', authenticate, ctrl.list);
router.get('/:id', authenticate, ctrl.get);
router.put('/:id', authenticate, authorize(Roles.ADMIN, Roles.STAFF), ctrl.update);
router.delete('/:id', authenticate, authorize(Roles.ADMIN), ctrl.remove);
router.post('/:id/assign-teacher', authenticate, authorize(Roles.ADMIN, Roles.STAFF), ctrl.assignTeacher);
router.post('/:id/remove-teacher', authenticate, authorize(Roles.ADMIN), ctrl.removeTeacher);

module.exports = router;


