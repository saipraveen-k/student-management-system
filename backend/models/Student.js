const mongoose = require('mongoose');

// Student Schema Definition
const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  year: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Ensure consistent field order in JSON output
studentSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    // Return fields in the correct order to prevent shifting
    return {
      _id: ret._id,
      studentId: ret.studentId,
      name: ret.name,
      email: ret.email,
      phone: ret.phone,
      department: ret.department,
      year: ret.year,
      address: ret.address,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt
    };
  }
});

// Create and export the Student model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
