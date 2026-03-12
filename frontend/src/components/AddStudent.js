import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddStudent = ({ onAdd, loading }) => {
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
      const success = await onAdd(formData);
      if (success) {
        // Reset form on successful submission
        setFormData({
          studentId: '',
          name: '',
          email: '',
          phone: '',
          department: '',
          year: '',
          address: ''
        });
      }
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      studentId: '',
      name: '',
      email: '',
      phone: '',
      department: '',
      year: '',
      address: ''
    });
    setErrors({});
  };

  return (
    <div className="add-student">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <i className="bi bi-person-plus-fill"></i> Add New Student
        </h2>
        <Link to="/" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left"></i> Back to List
        </Link>
      </div>

      {/* Form */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Student Information</h5>
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
              <button 
                type="button" 
                className="btn btn-outline-secondary" 
                onClick={handleReset}
                disabled={loading}
              >
                <i className="bi bi-arrow-clockwise"></i> Reset
              </button>
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Adding...
                  </>
                ) : (
                  <>
                    <i className="bi bi-plus-circle me-2"></i>
                    Add Student
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Instructions */}
      <div className="alert alert-info mt-4">
        <h6 className="alert-heading">
          <i className="bi bi-info-circle"></i> Instructions
        </h6>
        <ul className="mb-0">
          <li>All fields marked with <span className="text-danger">*</span> are required</li>
          <li>Student ID must be unique</li>
          <li>Enter a valid email address</li>
          <li>Phone number should be 10 digits</li>
        </ul>
      </div>
    </div>
  );
};

export default AddStudent;
