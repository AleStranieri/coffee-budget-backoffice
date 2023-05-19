import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Transactions from './pages/Transactions';
import TransactionForm from './pages/TransactionForm.js'; 

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/transactions" element={<Transactions />} />
        <Route exact path="/transactions/create" element={<TransactionForm />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
