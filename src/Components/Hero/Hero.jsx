import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Hero.css"; // 🎨 CSS mis à jour

const Hero = () => {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("/api/events");
        const sorted = res.data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 3);
        setEvents(sorted);
      } catch (error) {
        console.error("Erreur lors de la récupération des événements :", error);
      }
    };
    fetchEvents();
  }, []);

  if (events.length === 0) {
    return <p role="status">Chargement...</p>;
  }

  const currentEvent = events[currentIndex];
  const imageUrl = `/api/events/getImage/${currentEvent.id}`;

  return (
    <section
      className="hero-section"
      style={{ backgroundImage: `url(${imageUrl})` }}
      aria-label="Présentation des événements récents"
    >
      <div className="hero-overlay" />

      <article className="hero-content">
        <header>
          <h1>{currentEvent.title}</h1>
        </header>

        <nav className="hero-buttons" aria-label="Navigation rapide">
          <button onClick={() => navigate("/tutoriel")}>Voir le tutoriel</button>
          <button onClick={() => navigate("/explore")}>Explorer</button>
        </nav>

        {/* ✅ Flèches placées en dessous des boutons */}
        <div className="hero-arrows">
          <button
            className="hero-arrow left"
            onClick={() =>
              setCurrentIndex(currentIndex === 0 ? events.length - 1 : currentIndex - 1)
            }
            aria-label="Événement précédent"
          >
            &#8592;
          </button>

          <button
            className="hero-arrow right"
            onClick={() =>
              setCurrentIndex(currentIndex === events.length - 1 ? 0 : currentIndex + 1)
            }
            aria-label="Événement suivant"
          >
            &#8594;
          </button>
        </div>
      </article>
    </section>
  );
};

export default Hero;
