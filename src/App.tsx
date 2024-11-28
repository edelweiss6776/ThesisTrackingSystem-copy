import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import UserHome from './pages/UserHome/UserHome';
import Shelf from './pages/UserHome/Shelf';
import LibrarianHome from './pages/LibrarianHome/LibrarianHome';
import ThesisMngmt from "./pages/LibrarianHome/ThesisMngmt";
import AdminHome from './pages/AdminHome/AdminHome';
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/UserHome" element={<UserHome />} />
          <Route path="/Shelf" element={<Shelf />} />

        <Route path="/LibrarianHome" element={<LibrarianHome />} />
          <Route path="/ThesisMngmt" element={<ThesisMngmt />} />
        <Route path="/AdminHome" element={<AdminHome />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;