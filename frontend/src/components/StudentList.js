import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentList = ({ students, loading, onDelete, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [animatedStudents, setAnimatedStudents] = useState([]);

  useEffect(() => {
    // Trigger animation when students change
    setAnimatedStudents([]);
    const timer = setTimeout(() => {
      setAnimatedStudents(students);
    }, 100);
    return () => clearTimeout(timer);
  }, [students]);

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  // Handle delete confirmation
  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (studentToDelete) {
      const success = await onDelete(studentToDelete._id);
      if (success) {
        setShowDeleteModal(false);
        setStudentToDelete(null);
      }
    }
  };

  // Get department color
  const getDepartmentColor = (department) => {
    const colors = {
      'Computer Science': 'primary',
      'Information Technology': 'info',
      'Electronics': 'warning',
      'Mechanical': 'success',
      'Civil': 'secondary',
      'Electrical': 'danger',
      'Chemical': 'dark',
      'Biotechnology': 'info'
    };
    return colors[department] || 'primary';
  };

  // Get year badge variant
  const getYearVariant = (year) => {
    const variants = {
      '1st Year': 'success',
      '2nd Year': 'primary',
      '3rd Year': 'warning',
      '4th Year': 'danger'
    };
    return variants[year] || 'primary';
  };

  return (
    <div className="student-list fade-in-up">
      {/* Header with Stats */}
      <div className="row mb-4">
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-2 d-flex align-items-center">
                <span className="header-icon">👥</span>
                Student Records
              </h2>
              <p className="text-muted mb-0">
                Manage and track all student information in one place
              </p>
            </div>
            <Link to="/add" className="btn btn-primary btn-lg d-flex align-items-center">
              <span className="btn-icon">➕</span>
              Add New Student
            </Link>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="stats-cards">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <div className="stat-number">{students.length}</div>
                <div className="stat-label">Total Students</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔍</div>
              <div className="stat-content">
                <div className="stat-number">{searchQuery ? 'Filtered' : 'All'}</div>
                <div className="stat-label">Search Status</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Search Bar */}
      <div className="row mb-4">
        <div className="col-md-8">
          <div className="search-container">
            <div className="input-group input-group-lg">
              <span className="input-group-text">
                <span className="search-icon">🔍</span>
              </span>
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search by name, ID, or department..."
                value={searchQuery}
                onChange={handleSearch}
              />
              {searchQuery && (
                <button 
                  className="btn btn-outline-secondary" 
                  onClick={() => setSearchQuery('')}
                  type="button"
                >
                  ✖
                </button>
              )}
            </div>
            {searchQuery && (
              <div className="search-info mt-2">
                <small className="text-muted">
                  Searching for: <strong>"{searchQuery}"</strong> • {students.length} results found
                </small>
              </div>
            )}
          </div>
        </div>
        <div className="col-md-4">
          <div className="filter-buttons d-flex gap-2">
            <button className="btn btn-outline-primary btn-sm">
              📅 Sort by Date
            </button>
            <button className="btn btn-outline-primary btn-sm">
              📚 Sort by Department
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-5">
          <div className="loading-spinner">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <div className="mt-3">
              <h5>Loading Students...</h5>
              <p className="text-muted">Please wait while we fetch the data</p>
            </div>
          </div>
        </div>
      )}

      {/* Students Table */}
      {!loading && (
        <div className="table-container">
          {students.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📚</div>
              <h5 className="empty-title">No Students Found</h5>
              <p className="empty-description">
                {searchQuery ? 
                  `No students matching "${searchQuery}". Try a different search term.` : 
                  'Start by adding your first student to the system.'
                }
              </p>
              {!searchQuery && (
                <Link to="/add" className="btn btn-primary btn-lg">
                  <span className="btn-icon">➕</span>
                  Add First Student
                </Link>
              )}
            </div>
          ) : (
            <div className="card table-card">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th scope="col">
                          <div className="d-flex align-items-center">
                            <span>🆔</span>
                            <span className="ms-2">Student ID</span>
                          </div>
                        </th>
                        <th scope="col">
                          <div className="d-flex align-items-center">
                            <span>👤</span>
                            <span className="ms-2">Name</span>
                          </div>
                        </th>
                        <th scope="col">
                          <div className="d-flex align-items-center">
                            <span>📧</span>
                            <span className="ms-2">Email</span>
                          </div>
                        </th>
                        <th scope="col">
                          <div className="d-flex align-items-center">
                            <span>📱</span>
                            <span className="ms-2">Phone</span>
                          </div>
                        </th>
                        <th scope="col">
                          <div className="d-flex align-items-center">
                            <span>🏢</span>
                            <span className="ms-2">Department</span>
                          </div>
                        </th>
                        <th scope="col">
                          <div className="d-flex align-items-center">
                            <span>📅</span>
                            <span className="ms-2">Year</span>
                          </div>
                        </th>
                        <th scope="col" className="text-center">
                          <div className="d-flex align-items-center justify-content-center">
                            <span>⚙️</span>
                            <span className="ms-2">Actions</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {animatedStudents.map((student, index) => (
                        <tr 
                          key={student._id} 
                          className={`student-row ${animatedStudents.includes(student) ? 'fade-in-up' : ''}`}
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <td>
                            <div className="student-id">
                              <strong>{student.studentId}</strong>
                            </div>
                          </td>
                          <td>
                            <div className="student-info">
                              <div className="student-name">{student.name}</div>
                              <div className="student-email-small text-muted small">
                                {student.email}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="contact-info">
                              <span className="email-text">{student.email}</span>
                            </div>
                          </td>
                          <td>
                            <div className="phone-info">
                              <span className="phone-text">📞 {student.phone}</span>
                            </div>
                          </td>
                          <td>
                            <span className={`badge bg-${getDepartmentColor(student.department)} department-badge`}>
                              {student.department}
                            </span>
                          </td>
                          <td>
                            <span className={`badge bg-${getYearVariant(student.year)} year-badge`}>
                              {student.year}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <Link 
                                to={`/edit/${student._id}`} 
                                className="btn btn-sm btn-outline-primary action-btn edit-btn"
                                title="Edit Student"
                              >
                                <span>✏️</span>
                              </Link>
                              <button 
                                className="btn btn-sm btn-outline-danger action-btn delete-btn"
                                onClick={() => handleDeleteClick(student)}
                                title="Delete Student"
                              >
                                <span>🗑️</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Enhanced Delete Confirmation Modal */}
      {showDeleteModal && studentToDelete && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title d-flex align-items-center">
                  <span className="modal-icon">⚠️</span>
                  Confirm Delete
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="delete-warning">
                  <p className="warning-text">
                    Are you sure you want to delete this student record?
                  </p>
                  <div className="student-preview">
                    <div className="preview-card">
                      <div className="preview-header">
                        <strong>{studentToDelete.name}</strong>
                        <span className="preview-id">({studentToDelete.studentId})</span>
                      </div>
                      <div className="preview-details">
                        <div className="detail-item">
                          <span className="detail-label">📧 Email:</span>
                          <span className="detail-value">{studentToDelete.email}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">🏢 Department:</span>
                          <span className="detail-value">{studentToDelete.department}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">📅 Year:</span>
                          <span className="detail-value">{studentToDelete.year}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="alert alert-danger mt-3">
                    <strong>⚠️ Warning:</strong> This action cannot be undone. All student data will be permanently deleted.
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowDeleteModal(false)}
                >
                  <span>❌</span> Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={confirmDelete}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <span>🗑️</span> Delete Student
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Backdrop */}
      {showDeleteModal && (
        <div className="modal-backdrop fade show"></div>
      )}

      <style jsx>{`
        .header-icon {
          font-size: 2rem;
          margin-right: 0.75rem;
        }

        .btn-icon {
          margin-right: 0.5rem;
        }

        .stats-cards {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .stat-card {
          flex: 1;
          background: white;
          border-radius: 12px;
          padding: 1rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
        }

        .stat-icon {
          font-size: 2rem;
          margin-right: 0.75rem;
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          color: #667eea;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #6c757d;
        }

        .search-container {
          position: relative;
        }

        .search-icon {
          font-size: 1.2rem;
        }

        .search-input {
          border-radius: 12px;
          border: 2px solid #e2e8f0;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .search-info {
          padding: 0.5rem 1rem;
          background: rgba(102, 126, 234, 0.1);
          border-radius: 8px;
          border-left: 4px solid #667eea;
        }

        .filter-buttons {
          align-items: flex-end;
        }

        .loading-spinner {
          padding: 3rem 0;
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .empty-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #2d3748;
        }

        .empty-description {
          font-size: 1rem;
          color: #6c757d;
          margin-bottom: 2rem;
        }

        .table-card {
          border-radius: 12px;
          overflow: hidden;
        }

        .student-row {
          transition: all 0.3s ease;
        }

        .student-row:hover {
          background: rgba(102, 126, 234, 0.05);
          transform: scale(1.01);
        }

        .student-id {
          font-weight: 600;
          color: #667eea;
        }

        .student-info {
          display: flex;
          flex-direction: column;
        }

        .student-name {
          font-weight: 600;
          color: #2d3748;
        }

        .student-email-small {
          font-size: 0.875rem;
        }

        .department-badge, .year-badge {
          padding: 0.5rem 0.75rem;
          font-weight: 500;
          border-radius: 6px;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
        }

        .action-btn {
          padding: 0.375rem 0.75rem;
          border-radius: 6px;
          transition: all 0.3s ease;
          border: 2px solid;
        }

        .action-btn:hover {
          transform: translateY(-2px) scale(1.05);
        }

        .edit-btn {
          border-color: #667eea;
          color: #667eea;
        }

        .edit-btn:hover {
          background: #667eea;
          color: white;
        }

        .delete-btn {
          border-color: #f56565;
          color: #f56565;
        }

        .delete-btn:hover {
          background: #f56565;
          color: white;
        }

        .modal-icon {
          font-size: 1.5rem;
          margin-right: 0.5rem;
        }

        .delete-warning {
          text-align: center;
        }

        .warning-text {
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          color: #2d3748;
        }

        .student-preview {
          margin: 1.5rem 0;
        }

        .preview-card {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 1rem;
          border-left: 4px solid #f56565;
        }

        .preview-header {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .preview-id {
          color: #6c757d;
          margin-left: 0.5rem;
        }

        .preview-details {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .detail-label {
          font-weight: 500;
          color: #6c757d;
        }

        .detail-value {
          font-weight: 600;
          color: #2d3748;
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
          .stats-cards {
            flex-direction: column;
          }
          
          .filter-buttons {
            margin-top: 1rem;
            justify-content: center;
          }
          
          .action-buttons {
            flex-direction: column;
          }
          
          .table {
            font-size: 0.875rem;
          }
          
          .student-email-small {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default StudentList;
