import React, { useState, useEffect, useContext } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Background from "./Components/Background/Background";
import Navbar from "./header/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import Register from "./header/Register/Register";
import EventForm from "./Components/Event/EventForm";
import axios from "axios";
import Explorer from "./Components/Explorer/Explorer";
import { AuthProvider, AuthContext } from "./context/AuthContext";  // 📌 Import AuthContext
import AdminDashboard from "./pages/adminDashboard";  

const ProtectedAdminRoute = ({ children }) => {
    const { isAdmin, mounted } = useContext(AuthContext);  // Access mounted state from context

    // Ensure the component has mounted and check if the user is an admin
    if (!mounted) {
        return null;  // Optionally render a loading state if needed while mounted is false
    }

    // If the user is not an admin, navigate to '/'
    return isAdmin() ? children : <Navigate to="/" />;
};

const App = () => {
    let heroData = [
        { text1: "Dive into", text2: "a new adventure" },
        { text1: "Indulge", text2: "your passion" },
        { text1: "Look", text2: "for new events" },
    ];

    const [heroCount, setHeroCount] = useState(0);
    const [playStatus, setPlayStatus] = useState(false);
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

    const handleNextHero = () => {
        setHeroCount((prevCount) => (prevCount + 1) % heroData.length);
    };

    const handleCloseEventForm = () => {
        setShowEventForm(false);
    };

    const handleOpenEventForm = () => {
        setShowEventForm(true);
    };

   /* const handleNewEvent = (newEvent) => {
        setEvents([...events, newEvent]);
        setShowEventForm(false);
    };*/

    return (
        <AuthProvider>
            
            <Router>
                               
               
                <div className="app-container">
                    <Background playStatus={playStatus} heroCount={heroCount} />
                    <ToastContainer position="top-right" autoClose={3000} />
                    
                    <Navbar onOpenForm={handleOpenEventForm} />

                    <Routes>
                   {/* < Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />*/}
                        <Route 
                            path="/" 
                            element={
                                <Hero
                                    setPlayStatus={setPlayStatus}
                                    heroData={heroData[heroCount % heroData.length]}
                                    heroCount={heroCount}
                                    setHeroCount={setHeroCount}
                                    playStatus={playStatus}
                                    onNextHero={handleNextHero}
                                />
                            } 
                        />
                        
                        <Route path="/register" element={<Register />} />
                        <Route path="/explore" element={<Explorer />} />

                        {/* 🔥 Route protégée pour admin */}
                        
                        <Route path="/admin" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
                
                       
                    </Routes>

                    {showEventForm && <EventForm onClose={handleCloseEventForm} />}
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
