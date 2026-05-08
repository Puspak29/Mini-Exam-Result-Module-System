import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/Layout/AdminLayout';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import StudentList from './pages/Students/StudentList';
import StudentForm from './pages/Students/StudentForm';
import SubjectList from './pages/Subjects/SubjectList';
import SubjectForm from './pages/Subjects/SubjectForm';
import ResultList from './pages/Results/ResultList';
import ResultForm from './pages/Results/ResultForm';
import ResultDetail from './pages/Results/ResultDetail';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              
              <Route path="/students" element={<StudentList />} />
              <Route path="/students/add" element={<StudentForm />} />
              <Route path="/students/edit/:id" element={<StudentForm />} />
              
              <Route path="/subjects" element={<SubjectList />} />
              <Route path="/subjects/add" element={<SubjectForm />} />
              <Route path="/subjects/edit/:id" element={<SubjectForm />} />
              
              <Route path="/results" element={<ResultList />} />
              <Route path="/results/add" element={<ResultForm />} />
              <Route path="/results/:id" element={<ResultDetail />} />
            </Route>
          </Route>
          
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App
