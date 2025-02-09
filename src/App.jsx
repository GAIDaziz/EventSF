import React, { useState , useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importez les composants de routage
import Background from "./Components/Background/Background";
import Navbar from "./header/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import Register from './header/Register/Register'; // Importez le composant Register
import EventForm from './Components/Event/EventForm'
// useState et useEffect
import axios from 'axios'; // Pour les requêtes HTTP
import Explorer from "./Components/Explorer/Explorer";


const App = () => {
    let heroData = [
        { text1: "Dive into", text2: "a new adventure" },
        { text1: "indulge", text2: "your passion" },
        { text1: "Look ", text2: "for new events" },
    ];
    const [heroCount, setHeroCount] = useState(0);
    const [playStatus, setPlayStatus] = useState(false);
    const [showEventForm, setShowEventForm] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/events');
                setEvents(response.data);
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
        setShowEventForm(true); // <-- Ouvre le formulaire
    };

    const handleNewEvent = (newEvent) => {
        setEvents([...events, newEvent]);
        setShowEventForm(false); // Fermer le formulaire après la création
    };

    return (
        <Router>
            <div className="app-container">
                <Background playStatus={playStatus} heroCount={heroCount} />
                <Navbar onOpenForm={handleOpenEventForm} /> 
                
                <Routes>
                    <Route path="/" element={<Hero
                        setPlayStatus={setPlayStatus}
                        heroData={heroData[heroCount % heroData.length]}
                        heroCount={heroCount}
                        setHeroCount={setHeroCount}
                        playStatus={playStatus}
                        onNextHero={handleNextHero}
                    />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/explore" element={<Explorer />} />
                   
                </Routes>

                

                {showEventForm && <EventForm onClose={handleCloseEventForm} />} {/* <-- Passage de la fonction onClose */}

                
            </div>
        </Router>
    );
};

export default App;