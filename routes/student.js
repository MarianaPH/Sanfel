// const express = require("express");
// const router = express.Router();

// const {validateStudent, getStudentsNames, getStudentById, editStudent} = require('../middleware/student');
// const {auth} = require ('../middleware/auth');
// const { getAveragesByArea } = require ('../middleware/averages');

// // @route         Get api/students/:student_age1/:student_age2
// // @description   Get students by range 
// // @access        Private
// router.get('/:student_age1/:student_age2', auth, getStudentsNames);

// // @route          POST api/post
// // @description    Register student
// // @access         Public
// router.post('/', validateStudent);

// // @route          GET api/get
// // @description    Get student by id
// // @access         Private
// router.get('/:student_id', auth,getStudentById);

// // @route          POST api/student/edit/:student_id
// // @description    Edit student 
// // @access         Private 
// router.post('/edit/:student_id', auth, editStudent);

// // @route          POST api/student/
// // @description    Get averages by range
// // @access         Private 
// router.get('/averages/:age_1/:age_2', auth, async (req, res) => {
//   graphData = await getAveragesByArea(req);
//   res.send(graphData);
// });



// module.exports = router;