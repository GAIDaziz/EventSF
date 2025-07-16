// Tutorial.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Tutorial.css';

const steps = [
  {
    title: '1. Connectez-vous',
    description: 'Commencez par vous connecter ou créer un compte pour accéder à la création d’événements.',
    icon: '👤'
  },
  {
    title: '2. Créez votre événement',
    description: 'Remplissez le formulaire : titre, date, lieu, description et image. Simple et rapide !',
    icon: '📝'
  },
  {
    title: '3. Publiez et visualisez',
    description: 'Une fois publié, votre événement est visible dans la section Explorer.',
    icon: '🚀'
  }
];

const Tutorial = () => {
  return (
    <section className="tutorial">
      <h2 className="tutorial-title">Comment créer un événement ?</h2>
      <div className="tutorial-steps">
        {steps.map((step, index) => (
          <div className="tutorial-step" key={index}>
            <div className="step-icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
      <Link to="/create" className="start-button">
        Commencer la création →
      </Link>
    </section>
  );
};

export default Tutorial;
