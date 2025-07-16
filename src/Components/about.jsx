import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';

const About = () => {
  const navigate = useNavigate();

  return (
    <section className="about-section" aria-labelledby="about-heading">
      <div className="about-container">
        <h2 id="about-heading" className="about-title">Qui sommes-nous ?</h2>
        <p className="about-text">
          Eventura est votre plateforme dédiée à la découverte et à la publication
de vos événements locaux. Que vous soyez organisateur ou simple amateur,
notre objectif est de faciliter la rencontre et l’échange autour
d’événements uniques.
        </p>
        <button
          className="about-button"
          onClick={() => navigate('/about')}
        >
          En savoir plus
        </button>
      </div>
    </section>
  );
};

export default About;
