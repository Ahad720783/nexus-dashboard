import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';

// Pages
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import AddAlgorithm from '../pages/AddAlgorithm';
import EquationRepresentation from '../pages/EquationRepresentation';
import StructuralFeatures from '../pages/StructuralFeatures';
import Comparison from '../pages/Comparison';
import Result from '../pages/Result';
import NoveltyEvaluation from '../pages/NoveltyEvaluation';
import DetailedReport from '../pages/DetailedReport';
import History from '../pages/History';
import ReferenceAlgorithms from '../pages/ReferenceAlgorithms';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Screen 01: Landing & Sign In */}
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/" element={<Navigate to="/sign-in" replace />} />

      {/* Main App Workspace (Screens 02 - 10 & Reference Algorithms) */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/algorithms/new" element={<AddAlgorithm />} />
        <Route path="/analysis/equations" element={<EquationRepresentation />} />
        <Route path="/analysis/structure" element={<StructuralFeatures />} />
        <Route path="/compare" element={<Comparison />} />
        <Route path="/results/:id" element={<Result />} />
        <Route path="/results/:id/novelty" element={<NoveltyEvaluation />} />
        <Route path="/reports/:id" element={<DetailedReport />} />
        <Route path="/history" element={<History />} />
        <Route path="/reference-algorithms" element={<ReferenceAlgorithms />} />
      </Route>

      {/* Fallback to dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
