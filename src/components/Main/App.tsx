import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import ProtectedRoute from '../../ProtectedRoute';
import Game from '../Game/Game';
import Header from '../Header/Header';
import Footer from '../Footer';
import './App.css'

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Game />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
