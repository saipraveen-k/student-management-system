import axios from 'axios';

// Base URL for API calls
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions for student operations
export const studentAPI = {
  // Get all students
  getAllStudents: () => api.get('/students'),
  
  // Get student by ID
  getStudentById: (id) => api.get(`/students/${id}`),
  
  // Create new student
  createStudent: (studentData) => api.post('/students', studentData),
  
  // Update student
  updateStudent: (id, studentData) => api.put(`/students/${id}`, studentData),
  
  // Delete student
  deleteStudent: (id) => api.delete(`/students/${id}`),
  
  // Search students
  searchStudents: (query) => api.get(`/students/search/${query}`),
};

export default api;
