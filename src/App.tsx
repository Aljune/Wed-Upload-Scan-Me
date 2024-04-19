import React, { useEffect } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Front/Header';
import Home from './Pages/Home/page';
import './App.css';


const App: React.FC = () => {

  const loadPage = () => {
    document.title = "Wedding"; 
  }
  useEffect(loadPage, []);
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  
  );
}
export default App;
