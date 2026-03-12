import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { studentAPI } from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditStudent = ({ onUpdate, loading }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    email: '',
    phone: '',
    department: '',
    year: '',
    address: ''
  });
  const [errors, setErrors] = useState({});
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  // Fetch student data on component mount
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await studentAPI.getStudentById(id);
        setFormData(response.data);
        setFetchError('');
      } catch (err) {
        setFetchError('Failed to fetch student data');
        console.error('Error fetching student:', err);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    }
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required';
    }
    
    if (!formData.year.trim()) {
      newErrors.year = 'Year is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const success = await onUpdate(id, formData);
      if (success) {
        // Navigate back to student list after successful update
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    }
  };

  // Loading state for fetching student data
  if (fetchLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading student data...</p>
      </div>
    );
  }

  // Error state for fetching student data
  if (fetchError) {
    return (
      <div className="text-center py-5">
        <div className="alert alert-danger">
          <h5 className="alert-heading">
            <i className="bi bi-exclamation-triangle"></i> Error
          </h5>
          <p>{fetchError}</p>
          <Link to="/" className="btn btn-primary">
            <i className="bi bi-arrow-left"></i> Back to Student List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-student">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <i className="bi bi-pencil-square"></i> Edit Student
        </h2>
        <Link to="/" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left"></i> Back to List
        </Link>
      </div>

      {/* Student Info Card */}
      <div className="alert alert-info mb-4">
        <h6 className="alert-heading mb-1">
          <i className="bi bi-person-info"></i> Currently Editing
        </h6>
        <p className="mb-0">
          <strong>{formData.name}</strong> ({formData.studentId})
        </p>
      </div>

      {/* Form */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Update Student Information</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Student ID */}
              <div className="col-md-6 mb-3">
                <label htmlFor="studentId" className="form-label">
                  Student ID <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.studentId ? 'is-invalid' : ''}`}
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="e.g., STU001"
                />
                {errors.studentId && (
                  <div className="invalid-feedback">
                    {errors.studentId}
                  </div>
                )}
              </div>

              {/* Name */}
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter student's full name"
                />
                {errors.name && (
                  <div className="invalid-feedback">
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@example.com"
                />
                {errors.email && (
                  <div className="invalid-feedback">
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div className="col-md-6 mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone Number <span className="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g., 9876543210"
                />
                {errors.phone && (
                  <div className="invalid-feedback">
                    {errors.phone}
                  </div>
                )}
              </div>

              {/* Department */}
              <div className="col-md-6 mb-3">
                <label htmlFor="department" className="form-label">
                  Department <span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select ${errors.department ? 'is-invalid' : ''}`}
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Chemical">Chemical</option>
                  <option value="Biotechnology">Biotechnology</option>
                </select>
                {errors.department && (
                  <div className="invalid-feedback">
                    {errors.department}
                  </div>
                )}
              </div>

              {/* Year */}
              <div className="col-md-6 mb-3">
                <label htmlFor="year" className="form-label">
                  Year <span className="text-danger">*</span>
                </label>
                <select
                  className={`form-select ${errors.year ? 'is-invalid' : ''}`}
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
                {errors.year && (
                  <div className="invalid-feedback">
                    {errors.year}
                  </div>
                )}
              </div>

              {/* Address */}
              <div className="col-12 mb-3">
                <label htmlFor="address" className="form-label">
                  Address <span className="text-danger">*</span>
                </label>
                <textarea
                  className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter complete address"
                ></textarea>
                {errors.address && (
                  <div className="invalid-feedback">
                    {errors.address}
                  </div>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="d-flex justify-content-end gap-2">
              <Link to="/" className="btn btn-outline-secondary">
                <i className="bi bi-x-circle"></i> Cancel
              </Link>
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Updating...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    Update Student
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Instructions */}
      <div className="alert alert-warning mt-4">
        <h6 className="alert-heading">
          <i className="bi bi-exclamation-triangle"></i> Important
        </h6>
        <ul className="mb-0">
          <li>Make sure all information is accurate before updating</li>
          <li>Student ID changes will affect the unique identification</li>
          <li>All fields marked with <span className="text-danger">*</span> are required</li>
        </ul>
      </div>
    </div>
  );
};

export default EditStudent;
