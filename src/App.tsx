import React, { useEffect } from 'react';
// import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Front/Header';
import Home from './Pages/Home/page';
import HomeForm from './Pages/Home/Form/FormPage';
import Gallery from './Pages/Gallery/page';
import Success from './Pages/Success/page';
import QRcode from './Pages/QRcode/page';
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
        <Route path="/wed-scan-me-form" element={<HomeForm/>} />
        <Route path="/my-qr-code" element={<QRcode/>} />
        <Route path="/admin-gallery" element={<Gallery/>} />
        <Route path="/user-gallery" element={<Gallery/>} />
        <Route path="/succesfuly-sent" element={<Success/>} />
      </Routes>
    </Router>
  
  );
}
export default App;
