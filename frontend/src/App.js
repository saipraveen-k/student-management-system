import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import { studentAPI } from './api';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch all students
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await studentAPI.getAllStudents();
      setStudents(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch students');
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add new student
  const addStudent = async (studentData) => {
    setLoading(true);
    try {
      await studentAPI.createStudent(studentData);
      setSuccess('Student added successfully!');
      setError('');
      fetchStudents(); // Refresh the list
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add student');
      setSuccess('');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update student
  const updateStudent = async (id, studentData) => {
    setLoading(true);
    try {
      await studentAPI.updateStudent(id, studentData);
      setSuccess('Student updated successfully!');
      setError('');
      fetchStudents(); // Refresh the list
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update student');
      setSuccess('');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Delete student
  const deleteStudent = async (id) => {
    setLoading(true);
    try {
      await studentAPI.deleteStudent(id);
      setSuccess('Student deleted successfully!');
      setError('');
      fetchStudents(); // Refresh the list
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete student');
      setSuccess('');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Search students
  const searchStudents = async (query) => {
    if (!query.trim()) {
      fetchStudents();
      return;
    }
    
    setLoading(true);
    try {
      const response = await studentAPI.searchStudents(query);
      setStudents(response.data);
      setError('');
    } catch (err) {
      setError('Failed to search students');
      console.error('Error searching students:', err);
    } finally {
      setLoading(false);
    }
  };

  // Clear messages
  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container-fluid main-container">
          <div className="row">
            <div className="col-12">
              {/* Alert Messages */}
              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {error}
                  <button type="button" className="btn-close" onClick={clearMessages}></button>
                </div>
              )}
              {success && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  {success}
                  <button type="button" className="btn-close" onClick={clearMessages}></button>
                </div>
              )}

              {/* Routes */}
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <StudentList 
                      students={students}
                      loading={loading}
                      onDelete={deleteStudent}
                      onSearch={searchStudents}
                    />
                  } 
                />
                <Route 
                  path="/add" 
                  element={
                    <AddStudent 
                      onAdd={addStudent}
                      loading={loading}
                    />
                  } 
                />
                <Route 
                  path="/edit/:id" 
                  element={
                    <EditStudent 
                      onUpdate={updateStudent}
                      loading={loading}
                    />
                  } 
                />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
