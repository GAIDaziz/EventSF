//ap.jsx
import React, { useState, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Background from "./Components/Background/Background";
import Navbar from "./header/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import Register from "./header/Register/Register";
import EventForm from "./Components/Event/EventForm";
import axios from "axios";
import Explorer from "./Components/Explorer/Explorer";
import { AuthProvider } from "./context/AuthContext";  // 📌 Assure-toi que c'est bien importé

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

    const handleNewEvent = (newEvent) => {
        setEvents([...events, newEvent]);
        setShowEventForm(false);
    };

    return (
        
            <Router>
                <div className="app-container">
                    <Background playStatus={playStatus} heroCount={heroCount} />
                    <ToastContainer position="top-right" autoClose={3000} />
                    
                    <Navbar onOpenForm={handleOpenEventForm} />

                    <Routes>
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
                    </Routes>

                    {showEventForm && <EventForm onClose={handleCloseEventForm} />}
                </div>
            </Router>
        
    );
};

export default App;
