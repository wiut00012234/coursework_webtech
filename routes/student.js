const express = require('express');
const controller_student = require('../controllers/student');
const router = express.Router();

router.get('/',  controller_student.getStudents);
router.get('/student/:studentId',  controller_student.getSingleStudent);
router.post('/delete-student',  controller_student.deleteSingleStudent);

router.get('/add-student',  controller_student.getAddStudent);
router.post('/add-student',  controller_student.postNewStudent);

router.get('/edit-student/:studentId', controller_student.getEditStudent);
router.post('/edit-student/:studentId', controller_student.postEditStudent);

module.exports = router;
