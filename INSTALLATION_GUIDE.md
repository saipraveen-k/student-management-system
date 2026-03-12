# Installation and Setup Guide

## 🚀 Quick Start

This guide will help you set up the Student Management System on your local machine for development and testing.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **MongoDB** (v4.4 or higher)
   - **Option 1**: Install locally from https://www.mongodb.com/try/download/community
   - **Option 2**: Use MongoDB Atlas (Cloud)
   - **Option 3**: Use Docker: `docker run --name mongodb -p 27017:27017 -d mongo`

3. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

4. **Git** (for version control)
   - Download from: https://git-scm.com/
   - Verify installation: `git --version`

### Optional Tools
- **VS Code** (Recommended IDE)
- **MongoDB Compass** (GUI for MongoDB)
- **Postman** (for API testing)

## 🗂 Project Setup

### Step 1: Clone or Download the Project

If you have the project files:
```bash
# Navigate to your projects directory
cd c:\tempp\projects

# The project is already available at:
cd student-management-system
```

If cloning from a repository:
```bash
git clone <repository-url>
cd student-management-system
```

### Step 2: Verify Project Structure

Ensure you have the following structure:
```
student-management-system/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   └── package.json
├── README.md
└── INSTALLATION_GUIDE.md
```

## 🔧 Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install:
- express - Web framework
- mongoose - MongoDB ODM
- cors - Cross-origin resource sharing
- dotenv - Environment variables
- body-parser - Request parsing
- nodemon - Development server (dev dependency)

### Step 3: Set Up Environment Variables
```bash
# Copy the environment template
copy .env.example .env
```

Edit the `.env` file with your configuration:
```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/student_management

# Server Configuration
PORT=5000

# Environment
NODE_ENV=development
```

### Step 4: Start MongoDB Service

**For Windows:**
```bash
# If MongoDB is installed locally
net start MongoDB

# Or if using MongoDB as a service
mongod
```

**For MongoDB Atlas (Cloud):**
1. Create a free account at https://www.mongodb.com/atlas
2. Create a new cluster
3. Get your connection string
4. Update `.env` file:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student_management
```

### Step 5: Start Backend Server
```bash
# For development (with auto-restart)
npm run dev

# For production
npm start
```

You should see:
```
Server is running on port 5000
MongoDB Connected: localhost
```

### Step 6: Test Backend API
Open your browser or Postman and test:
- Health Check: http://localhost:5000/health
- Should return: `{"message": "Server is running"}`

## 🎨 Frontend Setup

### Step 1: Open New Terminal
Keep the backend running and open a new terminal window.

### Step 2: Navigate to Frontend Directory
```bash
cd frontend
```

### Step 3: Install Dependencies
```bash
npm install
```

This will install:
- react - React library
- react-dom - React DOM renderer
- react-router-dom - Client-side routing
- axios - HTTP client
- bootstrap - CSS framework
- react-scripts - Build tool

### Step 4: Start Frontend Development Server
```bash
npm start
```

This will automatically open your browser to: http://localhost:3000

## 🌐 Access the Application

Once both servers are running:

- **Frontend Application**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/health

## 🧪 Testing the Setup

### Test 1: Add a Student
1. Open http://localhost:3000 in your browser
2. Click "Add New Student"
3. Fill in the form with sample data:
   - Student ID: STU001
   - Name: John Doe
   - Email: john@example.com
   - Phone: 9876543210
   - Department: Computer Science
   - Year: 1st Year
   - Address: 123 Main St, City
4. Click "Add Student"
5. You should see a success message and be redirected to the student list

### Test 2: View and Edit Students
1. On the student list, click the edit button next to a student
2. Modify some information
3. Click "Update Student"
4. Verify the changes appear in the list

### Test 3: Delete a Student
1. Click the delete button next to a student
2. Confirm the deletion in the modal
3. Verify the student is removed from the list

### Test 4: Search Functionality
1. Type in the search box
2. Verify the list filters based on your search

## 🔍 Troubleshooting

### Common Issues and Solutions

#### Issue 1: MongoDB Connection Failed
**Error**: `MongoNetworkError: failed to connect to server`

**Solutions**:
1. Ensure MongoDB is running:
   ```bash
   # Windows
   net start MongoDB
   
   # Mac/Linux
   brew services start mongodb-community
   ```

2. Check MongoDB URI in `.env` file
3. Verify MongoDB is on port 27017
4. If using MongoDB Atlas, check network access settings

#### Issue 2: Port Already in Use
**Error**: `Error: listen EADDRINUSE :::3000` or `:::5000`

**Solutions**:
1. Kill the process using the port:
   ```bash
   # Find process using port 3000
   netstat -ano | findstr :3000
   
   # Kill the process (replace PID)
   taskkill /PID <PID> /F
   ```

2. Or change the port in `.env` file:
   ```env
   PORT=5001
   ```

#### Issue 3: npm Install Failed
**Error**: `npm ERR!` during installation

**Solutions**:
1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

2. Delete node_modules and reinstall:
   ```bash
   rmdir /s node_modules
   npm install
   ```

3. Use different npm registry:
   ```bash
   npm install --registry https://registry.npmjs.org/
   ```

#### Issue 4: CORS Error
**Error**: `Access to XMLHttpRequest has been blocked by CORS policy`

**Solutions**:
1. Ensure backend CORS is configured correctly
2. Check API URLs in frontend (`src/api.js`)
3. Verify both servers are running

#### Issue 5: Frontend Not Loading
**Error**: Blank page or "Cannot GET /"

**Solutions**:
1. Check if React development server is running
2. Verify you're in the correct directory
3. Check for JavaScript errors in browser console

### Getting Help

If you encounter issues:
1. Check the terminal logs for error messages
2. Verify all prerequisites are installed
3. Ensure both backend and frontend are running
4. Check the browser console for JavaScript errors

## 📱 Development Tips

### Backend Development
- Use `npm run dev` for auto-restart during development
- Check MongoDB Compass to verify data
- Use Postman for API testing
- Add console.log statements for debugging

### Frontend Development
- Use React Developer Tools browser extension
- Check browser console for errors
- Use Network tab to verify API calls
- Test responsive design with browser dev tools

### Code Quality
- Follow the existing code style
- Add comments for complex logic
- Test all CRUD operations
- Verify form validation works

## 🚀 Production Deployment

### Backend Deployment
1. Set environment variables:
   ```env
   NODE_ENV=production
   MONGODB_URI=your-production-mongodb-uri
   ```

2. Install production dependencies:
   ```bash
   npm install --production
   ```

3. Start production server:
   ```bash
   npm start
   ```

### Frontend Deployment
1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy the `build` folder to your hosting service

## 📚 Additional Resources

### Documentation
- [React Documentation](https://reactjs.org/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)

### Tools
- [VS Code](https://code.visualstudio.com/)
- [MongoDB Compass](https://www.mongodb.com/try/download/compass)
- [Postman](https://www.postman.com/)
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/)

---

## ✅ Installation Complete!

If you've followed all the steps successfully, you should now have:
- Backend server running on http://localhost:5000
- Frontend application running on http://localhost:3000
- MongoDB database connected
- Full CRUD functionality working

You can now start using the Student Management System for your college project!
