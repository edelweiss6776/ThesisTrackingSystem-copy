import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import UserHome from './pages/UserHome/UserHome';
import Shelf from './pages/UserHome/Shelf';
import About from './pages/UserHome/About';
import EditProfile from './pages/UserHome/EditProfile';
import LibrarianHome from './pages/LibrarianHome/LibrarianHome';
import ThesisMngmt from "./pages/LibrarianHome/ThesisMngmt";
import ThesisCategories from "./pages/LibrarianHome/ThesisCategories";
import FeedbackHistory from "./pages/LibrarianHome/FeedbackHistory";
import AdminHome from './pages/AdminHome/AdminHome';
import UserMngmt from "./pages/AdminHome/UserMngmt";
import ActivityLogs from "./pages/AdminHome/ActivityLogs";
import LibrarianRequests from "./pages/AdminHome/LibrarianRequests";
import GuestShelf from './pages/GuestMode/GuestShelf';
import { AuthContextProvider } from "./context/AuthContext";


function App() {
    return (
        <AuthContextProvider>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/UserHome" element={<UserHome />} />
                <Route path="/Shelf" element={<Shelf />} />
                <Route path="/About" element={<About />} />
                <Route path="/EditProfile" element={<EditProfile />} />


                <Route path="/LibrarianHome" element={<LibrarianHome />} />
                <Route path="/ThesisMngmt" element={<ThesisMngmt />} />
                <Route path="/ThesisCategories" element={<ThesisCategories />} />
                <Route path="/FeedbackHistory" element={<FeedbackHistory />} />


                <Route path="/AdminHome" element={<AdminHome />} />
                <Route path="/UserMngmt" element={<UserMngmt />} />
                <Route path="/ActivityLogs" element={<ActivityLogs />} />
                <Route path="/LibrarianRequests" element={<LibrarianRequests />} />


                <Route path="/GuestShelf" element={<GuestShelf />} />
            </Routes>
        </AuthContextProvider>
    );
}


export default App;

