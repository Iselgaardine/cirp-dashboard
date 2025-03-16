// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import ActiveIncidents from './pages/ActiveIncidents';
import IncidentResponse from './pages/IncidentResponse';
import TeamContacts from './pages/TeamContacts';
import Settings from './pages/Settings';
import TestComponent from './TestComponent';
import Documentation from './pages/Documentation';
import Dashboard from './pages/Dashboard';
import IncidentDetailPage from './pages/IncidentDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="incidents" element={<ActiveIncidents />} />
          <Route path="active-incidents" element={<ActiveIncidents />} />
          <Route path="incidents/:id" element={<IncidentDetailPage />} />
          <Route path="response" element={<IncidentResponse />} />
          <Route path="documentation" element={<Documentation />} />
          <Route path="team" element={<TeamContacts />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/test" element={<TestComponent />} />
      </Routes>
    </Router>
  );
}

export default App;