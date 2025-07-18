import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/index';
import ScanSessionsPage from './pages/inventory';
import { Home } from './pages/Home';
import './App.css'
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginForm from './components/auth/LoginForm';
import { Register } from './components/auth/Register';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "sonner"
import About from '@/pages/About';
import Features from '@/pages/Features';
import Contact from '@/pages/Contact';
import SettingsPage from '@/pages/settings';
import UserManagementPage from './pages/user';
import Profile from './pages/dashboard/Profile';
import { ForgotPassword } from './components/auth/ForgotPassword';


// import { AddMedicineDialog } from './components/pages/inventory/components/AddMedicine';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/inventory" element={<ScanSessionsPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>

              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/inventory" element={<ScanSessionsPage />} />
              <Route path="/dashboard/settings" element={<SettingsPage />} />

            </Route>

            {/* Admin-only routes */}
            <Route element={<ProtectedRoute adminOnly={true} />}>
              <Route path="/dashboard/users" element={<UserManagementPage />} />
            </Route>
          </Routes>
          <Toaster richColors position="top-right" />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
