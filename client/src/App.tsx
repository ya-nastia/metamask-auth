import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import './App.scss';

function App() {
  return (
    <div className="container">
      <h1>Metamask Login</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />}/>
          <Route path='/dashboard' element={<DashboardPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
