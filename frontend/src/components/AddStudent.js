import React, { useState, useEffect } from 'react';
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
  const [touched, setTouched] = useState({});
  const [submitCount, setSubmitCount] = useState(0);

  useEffect(() => {
    // Auto-generate student ID if empty
    if (!formData.studentId && !touched.studentId) {
      const currentYear = new Date().getFullYear() % 100; // Get last 2 digits of current year
      const yearSemCode = Math.floor(Math.random() * 99).toString().padStart(2, '0'); // Year-Sem code
      const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      const generatedId = `${currentYear}B${yearSemCode}AI${randomNum}`;
      setFormData(prev => ({ ...prev, studentId: generatedId }));
    }
  }, [formData.studentId, touched.studentId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle field blur
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validateField(name, formData[name]);
  };

  // Validate individual field
  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'studentId':
        if (!value.trim()) {
          newErrors.studentId = 'Student ID is required';
        } else if (!/^[0-9]{2}[B][0-9]{2}[A][I][0-9]{3}$/.test(value)) {
          newErrors.studentId = 'Student ID must be in format: 25B21AI024 (Year-Batch-YearSemCode-Course-RollNo)';
        } else {
          delete newErrors.studentId;
        }
        break;
        
      case 'name':
        if (!value.trim()) {
          newErrors.name = 'Name is required';
        } else if (value.trim().length < 2) {
          newErrors.name = 'Name must be at least 2 characters';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          newErrors.name = 'Name can only contain letters and spaces';
        } else {
          delete newErrors.name;
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = 'Email format is invalid';
        } else {
          delete newErrors.email;
        }
        break;
        
      case 'phone':
        if (!value.trim()) {
          newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(value.replace(/\s/g, ''))) {
          newErrors.phone = 'Phone must be exactly 10 digits';
        } else {
          delete newErrors.phone;
        }
        break;
        
      case 'department':
        if (!value) {
          newErrors.department = 'Department is required';
        } else {
          delete newErrors.department;
        }
        break;
        
      case 'year':
        if (!value) {
          newErrors.year = 'Year is required';
        } else {
          delete newErrors.year;
        }
        break;
        
      case 'address':
        if (!value.trim()) {
          newErrors.address = 'Address is required';
        } else if (value.trim().length < 10) {
          newErrors.address = 'Address must be at least 10 characters';
        } else {
          delete newErrors.address;
        }
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate all fields
    Object.keys(formData).forEach(key => {
      validateField(key, formData[key]);
      if (errors[key]) {
        isValid = false;
      }
    });

    // Check if there are any errors
    if (Object.keys(errors).length > 0) {
      isValid = false;
    }

    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitCount(prev => prev + 1);
    
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);
    
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
        setTouched({});
        setErrors({});
        setSubmitCount(0);
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
    setTouched({});
    setErrors({});
    setSubmitCount(0);
  };

  // Get field validation state
  const getFieldState = (fieldName) => {
    const hasError = errors[fieldName];
    const isTouched = touched[fieldName];
    const value = formData[fieldName];
    
    return {
      hasError,
      isTouched,
      isValid: isTouched && !hasError && value,
      showFeedback: isTouched || submitCount > 0
    };
  };

  // Calculate form progress
  const calculateProgress = () => {
    const fields = Object.keys(formData);
    const filledFields = fields.filter(key => formData[key].trim() !== '');
    return Math.round((filledFields.length / fields.length) * 100);
  };

  return (
    <div className="add-student fade-in-up">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-2 d-flex align-items-center">
            <span className="header-icon">➕</span>
            Add New Student
          </h2>
          <p className="text-muted mb-0">
            Create a new student record with complete information
          </p>
        </div>
        <Link to="/" className="btn btn-outline-secondary d-flex align-items-center">
          <span className="btn-icon">🔙</span>
          Back to List
        </Link>
      </div>

      {/* Progress Bar */}
      <div className="progress-container mb-4">
        <div className="d-flex justify-content-between mb-2">
          <span className="progress-label">Form Progress</span>
          <span className="progress-percentage">{calculateProgress()}%</span>
        </div>
        <div className="progress">
          <div 
            className="progress-bar progress-bar-striped progress-bar-animated" 
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
      </div>

      {/* Form */}
      <div className="card form-card">
        <div className="card-header">
          <h5 className="mb-0 d-flex align-items-center">
            <span className="form-icon">📝</span>
            Student Information
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} noValidate>
            <div className="row">
              {/* Student ID */}
              <div className="col-md-6 mb-4">
                <label htmlFor="studentId" className="form-label d-flex align-items-center">
                  <span className="field-icon">🆔</span>
                  Student ID <span className="required-asterisk ms-1">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <span>🏫</span>
                  </span>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${getFieldState('studentId').showFeedback && getFieldState('studentId').hasError ? 'is-invalid' : ''} ${getFieldState('studentId').isValid ? 'is-valid' : ''}`}
                    id="studentId"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g., 25B21AI024"
                  />
                </div>
                {getFieldState('studentId').showFeedback && getFieldState('studentId').hasError && (
                  <div className="invalid-feedback d-block">
                    <span className="error-icon">⚠️</span>
                    {errors.studentId}
                  </div>
                )}
                {getFieldState('studentId').isValid && (
                  <div className="valid-feedback d-block">
                    <span className="success-icon">✅</span>
                    Student ID looks good!
                  </div>
                )}
              </div>

              {/* Name */}
              <div className="col-md-6 mb-4">
                <label htmlFor="name" className="form-label d-flex align-items-center">
                  <span className="field-icon">👤</span>
                  Full Name <span className="required-asterisk ms-1">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <span>📛</span>
                  </span>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${getFieldState('name').showFeedback && getFieldState('name').hasError ? 'is-invalid' : ''} ${getFieldState('name').isValid ? 'is-valid' : ''}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter student's full name"
                  />
                </div>
                {getFieldState('name').showFeedback && getFieldState('name').hasError && (
                  <div className="invalid-feedback d-block">
                    <span className="error-icon">⚠️</span>
                    {errors.name}
                  </div>
                )}
                {getFieldState('name').isValid && (
                  <div className="valid-feedback d-block">
                    <span className="success-icon">✅</span>
                    Name looks good!
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="col-md-6 mb-4">
                <label htmlFor="email" className="form-label d-flex align-items-center">
                  <span className="field-icon">📧</span>
                  Email Address <span className="required-asterisk ms-1">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <span>📮</span>
                  </span>
                  <input
                    type="email"
                    className={`form-control form-control-lg ${getFieldState('email').showFeedback && getFieldState('email').hasError ? 'is-invalid' : ''} ${getFieldState('email').isValid ? 'is-valid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="student@example.com"
                  />
                </div>
                {getFieldState('email').showFeedback && getFieldState('email').hasError && (
                  <div className="invalid-feedback d-block">
                    <span className="error-icon">⚠️</span>
                    {errors.email}
                  </div>
                )}
                {getFieldState('email').isValid && (
                  <div className="valid-feedback d-block">
                    <span className="success-icon">✅</span>
                    Email format is valid!
                  </div>
                )}
              </div>

              {/* Phone */}
              <div className="col-md-6 mb-4">
                <label htmlFor="phone" className="form-label d-flex align-items-center">
                  <span className="field-icon">📱</span>
                  Phone Number <span className="required-asterisk ms-1">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <span>☎️</span>
                  </span>
                  <input
                    type="tel"
                    className={`form-control form-control-lg ${getFieldState('phone').showFeedback && getFieldState('phone').hasError ? 'is-invalid' : ''} ${getFieldState('phone').isValid ? 'is-valid' : ''}`}
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="9876543210"
                    maxLength="10"
                  />
                </div>
                {getFieldState('phone').showFeedback && getFieldState('phone').hasError && (
                  <div className="invalid-feedback d-block">
                    <span className="error-icon">⚠️</span>
                    {errors.phone}
                  </div>
                )}
                {getFieldState('phone').isValid && (
                  <div className="valid-feedback d-block">
                    <span className="success-icon">✅</span>
                    Phone number is valid!
                  </div>
                )}
              </div>

              {/* Department */}
              <div className="col-md-6 mb-4">
                <label htmlFor="department" className="form-label d-flex align-items-center">
                  <span className="field-icon">🏢</span>
                  Department <span className="required-asterisk ms-1">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <span>📚</span>
                  </span>
                  <select
                    className={`form-select form-select-lg ${getFieldState('department').showFeedback && getFieldState('department').hasError ? 'is-invalid' : ''} ${getFieldState('department').isValid ? 'is-valid' : ''}`}
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select Department</option>
                    <option value="Computer Science">💻 Computer Science</option>
                    <option value="Information Technology">🖥️ Information Technology</option>
                    <option value="Electronics">⚡ Electronics</option>
                    <option value="Mechanical">⚙️ Mechanical</option>
                    <option value="Civil">🏗️ Civil</option>
                    <option value="Electrical">🔌 Electrical</option>
                    <option value="Chemical">🧪 Chemical</option>
                    <option value="Biotechnology">🧬 Biotechnology</option>
                  </select>
                </div>
                {getFieldState('department').showFeedback && getFieldState('department').hasError && (
                  <div className="invalid-feedback d-block">
                    <span className="error-icon">⚠️</span>
                    {errors.department}
                  </div>
                )}
                {getFieldState('department').isValid && (
                  <div className="valid-feedback d-block">
                    <span className="success-icon">✅</span>
                    Department selected!
                  </div>
                )}
              </div>

              {/* Year */}
              <div className="col-md-6 mb-4">
                <label htmlFor="year" className="form-label d-flex align-items-center">
                  <span className="field-icon">📅</span>
                  Year <span className="required-asterisk ms-1">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <span>🎓</span>
                  </span>
                  <select
                    className={`form-select form-select-lg ${getFieldState('year').showFeedback && getFieldState('year').hasError ? 'is-invalid' : ''} ${getFieldState('year').isValid ? 'is-valid' : ''}`}
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select Year</option>
                    <option value="1st Year">🌱 1st Year</option>
                    <option value="2nd Year">🌿 2nd Year</option>
                    <option value="3rd Year">🌳 3rd Year</option>
                    <option value="4th Year">🌲 4th Year</option>
                  </select>
                </div>
                {getFieldState('year').showFeedback && getFieldState('year').hasError && (
                  <div className="invalid-feedback d-block">
                    <span className="error-icon">⚠️</span>
                    {errors.year}
                  </div>
                )}
                {getFieldState('year').isValid && (
                  <div className="valid-feedback d-block">
                    <span className="success-icon">✅</span>
                    Year selected!
                  </div>
                )}
              </div>

              {/* Address */}
              <div className="col-12 mb-4">
                <label htmlFor="address" className="form-label d-flex align-items-center">
                  <span className="field-icon">📍</span>
                  Address <span className="required-asterisk ms-1">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text">
                    <span>🏠</span>
                  </span>
                  <textarea
                    className={`form-control form-control-lg ${getFieldState('address').showFeedback && getFieldState('address').hasError ? 'is-invalid' : ''} ${getFieldState('address').isValid ? 'is-valid' : ''}`}
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows="3"
                    placeholder="Enter complete address with city, state, and pincode"
                  ></textarea>
                </div>
                {getFieldState('address').showFeedback && getFieldState('address').hasError && (
                  <div className="invalid-feedback d-block">
                    <span className="error-icon">⚠️</span>
                    {errors.address}
                  </div>
                )}
                {getFieldState('address').isValid && (
                  <div className="valid-feedback d-block">
                    <span className="success-icon">✅</span>
                    Address looks good!
                  </div>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="d-flex justify-content-between align-items-center">
              <button 
                type="button" 
                className="btn btn-outline-secondary btn-lg d-flex align-items-center" 
                onClick={handleReset}
                disabled={loading}
              >
                <span className="btn-icon">🔄</span>
                Reset Form
              </button>
              <button 
                type="submit" 
                className="btn btn-primary btn-lg d-flex align-items-center" 
                disabled={loading || Object.keys(errors).length > 0}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Adding Student...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">✅</span>
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
        <h6 className="alert-heading d-flex align-items-center">
          <span className="alert-icon">ℹ️</span>
          Instructions & Guidelines
        </h6>
        <div className="row">
          <div className="col-md-6">
            <ul className="mb-0">
              <li><strong>Student ID:</strong> Format: 25B21AI024 (Year-Batch-YearSemCode-Course-RollNo)</li>
              <li><strong>Name:</strong> Only letters and spaces allowed</li>
              <li><strong>Email:</strong> Must be a valid email address</li>
              <li><strong>Phone:</strong> Exactly 10 digits, no spaces</li>
            </ul>
          </div>
          <div className="col-md-6">
            <ul className="mb-0">
              <li><strong>Department:</strong> Select from available options</li>
              <li><strong>Year:</strong> Current academic year</li>
              <li><strong>Address:</strong> Minimum 10 characters</li>
              <li><strong>All fields marked with</strong> <span className="required-asterisk">*</span> <strong>are required</strong></li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .header-icon, .form-icon, .field-icon, .btn-icon, .alert-icon {
          margin-right: 0.5rem;
        }

        .progress-container {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .progress-label {
          font-weight: 600;
          color: #2d3748;
        }

        .progress-percentage {
          font-weight: 700;
          color: #667eea;
        }

        .progress {
          height: 8px;
          border-radius: 4px;
          background-color: #e2e8f0;
        }

        .progress-bar {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 4px;
        }

        .form-card {
          border-radius: 12px;
          overflow: hidden;
        }

        /* Fix for glassmorphism form text visibility */
        .form-control, .form-select {
          color: #131515 !important;
          background: rgba(255, 255, 255, 0.9) !important;
        }

        .form-control::placeholder {
          color: #6b7280 !important;
        }

        .form-label {
          color: #ffffff !important;
          font-weight: 700;
          font-size: 1.05em;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
        }

        .input-group-text {
          color: #131515 !important;
          background: rgba(255, 255, 255, 0.15) !important;
        }

        .required-asterisk {
          color: #f56565 !important;
          font-weight: 700;
          font-size: 1.1em;
          margin-left: 0.25rem;
        }

        .input-group {
          border-radius: 8px;
          overflow: hidden;
        }

        .input-group-text {
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          border: 2px solid #e2e8f0;
          border-right: none;
          font-size: 1.2rem;
        }

        .form-control-lg, .form-select-lg {
          border: 2px solid #e2e8f0;
          border-left: none;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-control-lg:focus, .form-select-lg:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          transform: translateY(-1px);
        }

        .form-control-lg.is-valid, .form-select-lg.is-valid {
          border-color: #48bb78;
          background-image: none;
        }

        .form-control-lg.is-invalid, .form-select-lg.is-invalid {
          border-color: #f56565;
          background-image: none;
        }

        .invalid-feedback, .valid-feedback {
          display: flex;
          align-items: center;
          font-weight: 500;
          margin-top: 0.5rem;
        }

        .error-icon, .success-icon {
          margin-right: 0.5rem;
        }

        .btn-lg {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .btn-lg:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .btn-lg:disabled {
          transform: none;
          opacity: 0.6;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }

        @media (max-width: 768px) {
          .btn-lg {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
          }
          
          .d-flex.justify-content-between {
            flex-direction: column;
            gap: 1rem;
          }
          
          .btn-lg {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default AddStudent;
