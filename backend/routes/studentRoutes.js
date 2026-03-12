const express = require('express');
const router = express.Router();
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  searchStudents
} = require('../controllers/studentController');

// Route to create a new student
router.post('/', createStudent);

// Route to get all students
router.get('/', getAllStudents);

// Route to search students
router.get('/search/:query', searchStudents);

// Route to get single student by ID
router.get('/:id', getStudentById);

// Route to update student
router.put('/:id', updateStudent);

// Route to delete student
router.delete('/:id', deleteStudent);

module.exports = router;
