import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Buffer } from 'buffer';
import { ArrowLeft, Calendar, MapPin, User } from 'lucide-react';
import EventReviews from '../Components/EventReviews/EventReviews';
import { AuthContext } from "../context/AuthContext";
import './EventDetails.css';

const EventDetails = () => {
    const { eventId } = useParams();
    console.log("ID de l’événement depuis l’URL :", eventId);
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useContext(AuthContext);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/events/${eventId}`);
                setEvent(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'événement:", error);
                setError("Événement non trouvé");
            } finally {
                setLoading(false);
            }
        };

        if (eventId) {
            fetchEvent();
        }
    }, [eventId]);

    const getImageUrl = (imageData, contentType) => {
        if (!imageData) return null;
        
        const base64 = Buffer.from(imageData, 'binary').toString('base64');
        return `data:${contentType || 'image/jpeg'};base64,${base64}`;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="event-details-container">
                <div className="loading">Chargement...</div>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="event-details-container">
                <div className="error">
                    <h2>Erreur</h2>
                    <p>{error || "Événement non trouvé"}</p>
                    <button onClick={() => navigate('/explore')} className="back-button">
                        <ArrowLeft size={20} />
                        Retour à l'explorer
                    </button>
                </div>
            </div>
        );
    }

 
       return (
  <main className="event-details-container">
  <header className="event-header">
    <button 
      onClick={() => navigate('/explore')} 
      className="back-button"
      aria-label="Retour à la liste des événements"
    >
      <ArrowLeft size={20} />
      Retour
    </button>
  </header>

  <section className="event-main-block">
    {event.img && (
      <div className="event-image-container">
        <img 
          src={getImageUrl(event.img.data, event.img.contentType)} 
          alt={`Image de l’événement : ${event.title}`} 
          className="event-main-image"
        />
      </div>
    )}

    <h1 className="event-title">{event.title}</h1>

    <div className="event-meta">
      <div className="meta-item">
        <Calendar size={20} />
        <span>{formatDate(event.date)}</span>
      </div>
    {event.location && (
        <div className="meta-item">
         <MapPin size={20} />
        <span>{event.location}</span>
         </div>
)}

    </div>

    <section className="event-description">
      <h2>À propos</h2>
      <p>{event.description}</p>
    </section>

  </section>

  <section className="event-reviews-section">
    <h2>Avis et commentaires</h2>
    <EventReviews eventId={event.id} userId={id} />
  </section>
</main>

);

};

export default EventDetails;