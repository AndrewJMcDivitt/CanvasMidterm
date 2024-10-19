
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import ProfilePage from '../../pages/ProfilePage';
import AnnouncementsPage from '../../pages/AnnouncementsPage';
import PagesPage from '../../pages/Pagespage';
import ModulesPage from '../../pages/ModulesPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/announcements" element={<ProtectedRoute><AnnouncementsPage /></ProtectedRoute>} />
        <Route path="/pages" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <PagesPage />
          </ProtectedRoute>
        } />
        <Route path="/modules" element={<ProtectedRoute><ModulesPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;