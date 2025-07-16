import React, { useState, useEffect, useContext } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Route,
    Routes,
    Navigate,
    useLocation
} from "react-router-dom";
import axios from "axios";

// Layout & UI
import Navbar from "./Components/header/Navbar/Navbar";
import Footer from "./Components/footer/Footer";
import EventForm from "./Components/Event/EventForm";
import "./App.css";

// Pages
import Register from "./Page/Register/Register";
import Explorer from "./Page/Explorer";
import EventDetails from "./Page/EventDetails";
import AboutUs from "./Page/AboutUs";
import AdminDashboard from "./admin/adminDashboard";
import Home from "./Page/Home"; //  Nouvelle page home avec Hero, About, Tutorial

// Auth
import { AuthContext } from "./context/AuthContext";

const ProtectedAdminRoute = ({ children }) => {
    const { isAdmin, mounted } = useContext(AuthContext);

    if (!mounted) return null;
    return isAdmin() ? children : <Navigate to="/" />;
};

const App = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const [showEventForm, setShowEventForm] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("/api/events");
                setEvents(response.data);
                console.log("Réponse reçue :", response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des événements:", error);
            }
        };

        fetchEvents();
    }, []);

    const handleCloseEventForm = () => setShowEventForm(false);
    const handleOpenEventForm = () => setShowEventForm(true);

    return (
        <div className="app-container">
            <div className="animated-event-background"></div>
            <ToastContainer position="top-right" autoClose={3000} />
            <Navbar onOpenForm={handleOpenEventForm} />

            <Routes>
                {/*  HOME avec Hero + About + Tutorial */}
                <Route path="/" element={<Home />} />

                <Route path="/register" element={<Register />} />
                <Route path="/explore" element={<Explorer />} />
                <Route path="/event/:eventId" element={<EventDetails />} />
                <Route path="/about" element={<AboutUs />} />

                <Route
                    path="/admin"
                    element={
                        <ProtectedAdminRoute>
                            <AdminDashboard />
                        </ProtectedAdminRoute>
                    }
                />
            </Routes>

            {showEventForm && <EventForm onClose={handleCloseEventForm} />}
            <Footer />
        </div>
    );
};

export default App;
