import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { Children, Contents, Dashboard, DetectionRules, MapData, Reports, TrainingTemplates, Users } from './pages/Pages';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/children" element={<Children />} />
          <Route path="/contents" element={<Contents />} />
          <Route path="/map-data" element={<MapData />} />
          <Route path="/detection-rules" element={<DetectionRules />} />
          <Route path="/training-templates" element={<TrainingTemplates />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
