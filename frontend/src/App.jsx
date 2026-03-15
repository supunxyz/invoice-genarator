import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InvoiceApp from './pages/InvoiceApp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/app" element={<InvoiceApp />} />
      </Routes>
    </Router>
  );
}

export default App;
