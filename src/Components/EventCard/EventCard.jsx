import React from 'react';
import { Buffer } from 'buffer';
import { useNavigate } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({ event }) => {
    const navigate = useNavigate();
    const getImageUrl = (imageData, contentType) => {
        if (!imageData) return null;
        
        const base64 = Buffer.from(imageData, 'binary').toString('base64');
        return `data:${contentType || 'image/jpeg'};base64,${base64}`;
    };

    return (
        <div className="event-card">
            {event.img && (
                <img 
                    src={getImageUrl(event.img.data, event.img.contentType)} 
                    alt={event.title}
                    className="event-card-image"
                />
            )}
            <div className="event-card-content">
                <h3 className="event-card-title">{event.title}</h3>
                <p className="event-card-date">
                    Date de l'événement: {event.date.slice(0, 10)}
                </p>
                <button 
                    className="event-card-button"
                    onClick={() => navigate(`/event/${event.id}`)}
                >
                    Détails
                </button>
            </div>
        </div>
    );
};

export default EventCard;