import { useState } from "react";
import Background from "./Components/Background/Background";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";

const App = () => {
    let heroData = [
        { text1: "Dive into", text2: "a new adventure" },
        { text1: "indulge", text2: "your passion" },
        { text1: "Look ", text2: "for new events" },
    ];
    const [heroCount, setHeroCount] = useState(0); // Initialisation à 0 (première image)
    const [playStatus, setPlayStatus] = useState(false);

    // Fonction pour gérer l'incrémentation de heroCount (exemple)
    const handleNextHero = () => {
        setHeroCount((prevCount) => (prevCount + 1) % heroData.length); // Boucle pour revenir au début
    };


    return (
        <div>
            <Background playStatus={playStatus} heroCount={heroCount} />
            <Navbar />
            <Hero
                setPlayStatus={setPlayStatus}
                heroData={heroData[heroCount % heroData.length]} // Accès sécurisé au tableau
                heroCount={heroCount}
                setHeroCount={setHeroCount} // Correction du nom de la prop
                playStatus={playStatus}
                onNextHero={handleNextHero} // Passer la fonction pour changer de héros
            />
        </div>
    );
};

export default App;