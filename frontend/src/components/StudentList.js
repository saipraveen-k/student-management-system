import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentList = ({ students, loading, onDelete, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // ------------------------------------------------------------
  // 1. USE STUDENT DATA AS-IS (no normalization needed)
  // ------------------------------------------------------------
  const normalizedStudents = useMemo(() => {
    if (!students || students.length === 0) return [];
    
    // Return students as-is since the backend sends correctly aligned data
    return students;
  }, [students]);

  // Memoize and sort normalized students
  const memoizedStudents = useMemo(() => {
    if (!normalizedStudents || normalizedStudents.length === 0) return [];
    
    const sortedStudents = [...normalizedStudents];
    
    switch (sortBy) {
      case 'department':
        return sortedStudents.sort((a, b) => {
          const deptA = a.department || '';
          const deptB = b.department || '';
          return sortOrder === 'asc' 
            ? deptA.localeCompare(deptB)
            : deptB.localeCompare(deptA);
        });
        
      case 'date':
        return sortedStudents.sort((a, b) => {
          // Safely extract timestamps, falling back to 0 to prevent NaN sorting errors
          const getTimestamp = (student) => {
            if (student.createdAt) return new Date(student.createdAt).getTime();
            // Optional: Extract timestamp from MongoDB ObjectId if applicable
            if (student._id && typeof student._id === 'string' && student._id.length === 24) {
              return parseInt(student._id.substring(0, 8), 16) * 1000;
            }
            return 0; // Safe fallback
          };
          
          const timeA = getTimestamp(a);
          const timeB = getTimestamp(b);
          
          return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
        });
        
      case 'name':
      default:
        return sortedStudents.sort((a, b) => {
          const nameA = a.name || '';
          const nameB = b.name || '';
          return sortOrder === 'asc' 
            ? nameA.localeCompare(nameB)
            : nameB.localeCompare(nameA);
        });
    }
  }, [normalizedStudents, sortBy, sortOrder]);

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (studentToDelete) {
      const success = await onDelete(studentToDelete._id);
      if (success) {
        setShowDeleteModal(false);
        setStudentToDelete(null);
      }
    }
  };

  const getDepartmentColor = (department) => {
    const colors = {
      'Computer Science': 'primary',
      'Information Technology': 'info',
      'Electronics': 'warning',
      'Mechanical': 'success',
      'Civil': 'secondary',
      'Electrical': 'danger',
      'Chemical': 'dark',
      'Biotechnology': 'info',
      'COMPUTER SC': 'primary',
      'INFORMATION': 'info',
      'COMPUTER': 'primary'
    };
    return colors[department] || 'primary';
  };

  const formatDepartment = (dept) => {
    const deptMap = {
      'COMPUTER': 'Computer Science',
      'COMPUTER SC': 'Computer Science',
      'INFORMATION': 'Information Technology'
    };
    return deptMap[dept] || dept;
  };

  const getYearVariant = (year) => {
    const variants = {
      '1st Year': 'success',
      '2nd Year': 'primary',
      '3rd Year': 'warning',
      '4th Year': 'danger',
      '2ND YEAR': 'primary',
      '1ST YEAR': 'success',
      '3RD YEAR': 'warning',
      '4TH YEAR': 'danger'
    };
    return variants[year] || 'primary';
  };

  const formatYear = (year) => {
    const yearMap = {
      '2ND YEAR': '2nd Year',
      '1ST YEAR': '1st Year',
      '3RD YEAR': '3rd Year',
      '4TH YEAR': '4th Year'
    };
    return yearMap[year] || year;
  };

  return (
    <div className="student-list fade-in-up">
      {/* Header */}
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
        <Link to="/add" className="btn btn-primary d-flex align-items-center">
          <span className="btn-icon">➕</span>
          Add New Student
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div>
              <div className="stat-number">{memoizedStudents.length}</div>
              <div className="stat-label">Total Students</div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="stat-card">
            <div className="stat-icon">🔍</div>
            <div>
              <div className="stat-number">{searchQuery ? 'Filtered' : 'All'}</div>
              <div className="stat-label">Search Status</div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex justify-content-end gap-2">
            <div className="btn-group">
              <button 
                className={`btn btn-outline-primary ${sortBy === 'name' ? 'active' : ''}`}
                onClick={() => {
                  if (sortBy === 'name') {
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortBy('name');
                    setSortOrder('asc');
                  }
                }}
              >
                Sort by Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              <button 
                className={`btn btn-outline-primary ${sortBy === 'department' ? 'active' : ''}`}
                onClick={() => {
                  if (sortBy === 'department') {
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortBy('department');
                    setSortOrder('asc');
                  }
                }}
              >
                Sort by Dept {sortBy === 'department' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="search-container">
          <div className="input-group">
            <span className="input-group-text">
              <span>🔍</span>
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
                Searching for: <strong>"{searchQuery}"</strong> • {memoizedStudents.length} results found
              </small>
            </div>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="mt-3">
            <h5>Loading Students...</h5>
          </div>
        </div>
      )}

      {/* Students Table */}
      {!loading && (
        <div className="table-responsive">
          {memoizedStudents.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📚</div>
              <h5>No Students Found</h5>
              <p className="text-muted">
                {searchQuery ? 
                  `No students matching "${searchQuery}"` : 
                  'Start by adding your first student'
                }
              </p>
              {!searchQuery && (
                <Link to="/add" className="btn btn-primary">
                  Add First Student
                </Link>
              )}
            </div>
          ) : (
            <table className="table table-hover student-table">
              <colgroup>
                <col style={{ width: '12%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '20%' }} />
                <col style={{ width: '12%' }} />
                <col style={{ width: '12%' }} />
                <col style={{ width: '8%' }} />
                <col style={{ width: '16%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th>STUDENT ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>PHONE</th>
                  <th>DEPARTMENT</th>
                  <th>YEAR</th>
                  <th className="text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {memoizedStudents.map((student, index) => (
                  <tr key={student._id || index}>
                    <td>
                      <strong className="student-id">{student.studentId || ''}</strong>
                    </td>
                    <td>
                      <span className="student-name" title={student.name}>{student.name || ''}</span>
                    </td>
                    <td>
                      <span className="student-email" title={student.email}>{student.email || ''}</span>
                    </td>
                    <td>
                      <span className="student-phone" title={student.phone}>{student.phone || ''}</span>
                    </td>
                    <td>
                      <span className={`badge bg-${getDepartmentColor(student.department)}`}>
                        {formatDepartment(student.department)}
                      </span>
                    </td>
                    <td>
                      <span className={`badge bg-${getYearVariant(student.year)}`}>
                        {formatYear(student.year)}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="action-buttons">
                        <Link 
                          to={`/edit/${student._id}`} 
                          className="btn btn-sm btn-outline-primary"
                          title="Edit Student"
                        >
                          ✏️
                        </Link>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteClick(student)}
                          title="Delete Student"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && studentToDelete && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    <span className="me-2">⚠️</span>
                    Confirm Delete
                  </h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setShowDeleteModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete <strong>{studentToDelete.name}</strong>?</p>
                  <p className="text-danger mb-0">This action cannot be undone.</p>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-danger" 
                    onClick={confirmDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      <style jsx>{`
        .header-icon {
          font-size: 2rem;
          margin-right: 0.75rem;
        }

        .btn-icon {
          margin-right: 0.5rem;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .stat-icon {
          font-size: 2.5rem;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          color: #667eea;
          line-height: 1.2;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #6c757d;
        }

        .search-input {
          border: 2px solid #e2e8f0;
          padding: 0.75rem 1rem;
        }

        .search-input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .student-table {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          table-layout: fixed; /* Ensures column widths are respected */
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          border: 2px solid #e9ecef;
        }

        .student-table thead th {
          background: #f8f9fa;
          font-weight: 600;
          font-size: 0.85rem;
          letter-spacing: 0.5px;
          color: #6c757d;
          padding: 1rem;
          border-bottom: 2px solid #e9ecef;
          white-space: nowrap;
          text-align: left;
          border-right: 1px solid #e9ecef;
          position: relative;
        }

        .student-table thead th:last-child {
          border-right: none;
        }

        .student-table tbody td {
          padding: 1rem;
          vertical-align: middle;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          border-bottom: 1px solid #e9ecef;
          border-right: 1px solid #e9ecef;
          transition: background-color 0.2s ease;
        }

        .student-table tbody td:last-child {
          border-right: none;
        }

        .student-table tbody tr:hover {
          background: rgba(102, 126, 234, 0.05);
        }

        .student-table tbody tr:hover td {
          border-bottom-color: #667eea;
          border-right-color: #667eea;
        }

        .student-table tbody tr:last-child td {
          border-bottom: none;
        }

        /* Ensure proper alignment for action buttons */
        .student-table tbody td.text-center {
          text-align: center !important;
        }

        .student-id {
          color: #667eea;
          font-weight: 600;
        }

        .student-name {
          font-weight: 500;
          color: #2d3748;
        }

        .student-email, .student-phone {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #4a5568;
        }

        .badge {
          padding: 0.5rem 0.75rem;
          font-weight: 600;
          border-radius: 8px;
          font-size: 0.75rem;
          white-space: nowrap;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          flex-wrap: nowrap;
        }

        .action-buttons .btn {
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          transition: all 0.3s ease;
        }

        .action-buttons .btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
      `}</style>
    </div>
  );
};

export default StudentList;
