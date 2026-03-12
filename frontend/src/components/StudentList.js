import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentList = ({ students, loading, onDelete, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
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

  return (
    <div className="student-list">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <i className="bi bi-people-fill"></i> Student Records
        </h2>
        <Link to="/add" className="btn btn-primary">
          <i className="bi bi-plus-circle"></i> Add New Student
        </Link>
      </div>

      {/* Search Bar */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, ID, or department..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading students...</p>
        </div>
      )}

      {/* Students Table */}
      {!loading && (
        <div className="card">
          <div className="card-body p-0">
            {students.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-inbox display-1 text-muted"></i>
                <h5 className="text-muted mt-3">No Students Found</h5>
                <p className="text-muted">
                  {searchQuery ? 'Try a different search term' : 'Start by adding a new student'}
                </p>
                {!searchQuery && (
                  <Link to="/add" className="btn btn-primary">
                    <i className="bi bi-plus-circle"></i> Add First Student
                  </Link>
                )}
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Student ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Department</th>
                      <th>Year</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student._id}>
                        <td>
                          <strong>{student.studentId}</strong>
                        </td>
                        <td>{student.name}</td>
                        <td>{student.email}</td>
                        <td>{student.phone}</td>
                        <td>
                          <span className="badge bg-info text-dark">
                            {student.department}
                          </span>
                        </td>
                        <td>{student.year}</td>
                        <td>
                          <div className="action-buttons">
                            <Link 
                              to={`/edit/${student._id}`} 
                              className="btn btn-sm btn-outline-primary"
                              title="Edit Student"
                            >
                              <i className="bi bi-pencil"></i>
                            </Link>
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDeleteClick(student)}
                              title="Delete Student"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && studentToDelete && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete the student record for:
                </p>
                <div className="alert alert-warning">
                  <strong>{studentToDelete.name}</strong> ({studentToDelete.studentId})
                </div>
                <p className="text-danger">
                  <small>This action cannot be undone.</small>
                </p>
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
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-trash me-2"></i>
                      Delete
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
    </div>
  );
};

export default StudentList;
