const express = require("express");
const router = express.Router();

const {validateStudent, getStudentsNames, getStudentById, editStudent} = require('../middleware/student');
const {auth} = require ('../middleware/auth');

// @route         Get api/students/:student_age1/:student_age2
// @description   Get profiles by range 
// @access        Private
router.get('/:student_age1/:student_age2', auth, getStudentsNames);

// @route          POST api/post
// @description    Register student
// @access         Public
router.post('/', validateStudent);

// @route          GET api/post
// @description    Get student by id
// @access         Private
router.get('/:student_id', auth,getStudentById);

// @route          POST api/student/edit/:student_id
// @description    Edit student 
// @access         Private 
router.post('/edit/:student_id', auth, editStudent);

module.exports = router;