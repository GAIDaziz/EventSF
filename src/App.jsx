import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importez les composants de routage
import Background from "./Components/Background/Background";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import Register from './Components/Register/Register'; // Importez le composant Register

const App = () => {
    let heroData = [
        { text1: "Dive into", text2: "a new adventure" },
        { text1: "indulge", text2: "your passion" },
        { text1: "Look ", text2: "for new events" },
    ];
    const [heroCount, setHeroCount] = useState(0);
    const [playStatus, setPlayStatus] = useState(false);

    const handleNextHero = () => {
        setHeroCount((prevCount) => (prevCount + 1) % heroData.length);
    };

    return (
        <Router> {/* Enveloppez l'application dans un Router */}
            <div className="app-container">
                <Background playStatus={playStatus} heroCount={heroCount} />
                <Navbar />
                <Routes> {/* Utilisez Routes pour définir les routes */}
                    <Route path="/" element={<Hero 
                        setPlayStatus={setPlayStatus}
                        heroData={heroData[heroCount % heroData.length]}
                        heroCount={heroCount}
                        setHeroCount={setHeroCount}
                        playStatus={playStatus}
                        onNextHero={handleNextHero}
                    />} /> {/* Route pour la page d'accueil (Hero) */}
                    <Route path="/register" element={<Register />} /> {/* Route pour Register */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;