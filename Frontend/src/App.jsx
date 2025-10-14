import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import CodeReview from './pages/CodeReview';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Header from './components/Header';
import './App.css';


function App() {
  return (
    <Router>
       <div className="app-container">
      <Header />
      <main className="main-content">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/review" element={<CodeReview />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
    </Router>
  );
}

export default App;