import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Dashboard from './pages/Dashboard/Dashboard';
import Income from './pages/Income/Income';
import Expenses from './pages/Expenses/Expenses';
import FixedCosts from './pages/FixedCosts/FixedCosts';
import Goals from './pages/Goals/Goals';
import Health from './pages/Health/Health';
import Overview from './pages/Overview/Overview';
import Layout from './components/layout/Layout';
import { FinancialProvider } from './context/FinancialContext';
import { FinancialManagement } from './pages/FinancialManagement';
import { FinancialSummary } from './components/dashboard/FinancialSummary';
import { FinancialAlerts } from './components/dashboard/FinancialAlerts';

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FinancialProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <nav className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                      <Link to="/" className="text-xl font-bold text-gray-900">
                        Financial Dashboard
                      </Link>
                      <div className="hidden md:flex space-x-4">
                        <Link
                          to="/"
                          className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/financial-management"
                          className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md"
                        >
                          Financial Management
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>

              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/" element={
                    <ProtectedRoute>
                      <Layout>
                        <div className="space-y-8">
                          <h1 className="text-3xl font-bold">Financial Dashboard</h1>
                          <FinancialAlerts />
                          <FinancialSummary />
                        </div>
                      </Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/income" element={
                    <ProtectedRoute>
                      <Layout>
                        <Income />
                      </Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/expenses" element={
                    <ProtectedRoute>
                      <Layout>
                        <Expenses />
                      </Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/fixed-costs" element={
                    <ProtectedRoute>
                      <Layout>
                        <FixedCosts />
                      </Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/goals" element={
                    <ProtectedRoute>
                      <Layout>
                        <Goals />
                      </Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/health" element={
                    <ProtectedRoute>
                      <Layout>
                        <Health />
                      </Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/overview" element={
                    <ProtectedRoute>
                      <Layout>
                        <Overview />
                      </Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/financial-management" element={<FinancialManagement />} />
                </Routes>
              </main>
            </div>
          </Router>
        </FinancialProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;