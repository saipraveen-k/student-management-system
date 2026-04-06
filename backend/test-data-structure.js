const mongoose = require('mongoose');
const Student = require('./models/Student');

// Connect to database
mongoose.connect('mongodb://localhost:27017/student_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Test data structure
const testStudent = new Student({
  studentId: 'TEST123',
  name: 'Test Student',
  email: 'test@example.com',
  phone: '1234567890',
  department: 'Computer Science',
  year: '2nd Year',
  address: 'Test Address'
});

console.log('Test Student Data Structure:');
console.log('================================');
console.log('Raw Object:', JSON.stringify(testStudent.toObject(), null, 2));
console.log('================================');
console.log('Schema Fields:', Object.keys(Student.schema.paths));
console.log('================================');

// Test saving and retrieving
testStudent.save()
  .then(saved => {
    console.log('Saved Student:', JSON.stringify(saved.toObject(), null, 2));
    return Student.findById(saved._id);
  })
  .then(found => {
    console.log('Retrieved Student:', JSON.stringify(found.toObject(), null, 2));
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error:', err);
    mongoose.connection.close();
  });