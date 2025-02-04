import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Explorer.css'; 
import { Buffer } from 'buffer'; 


const Explorer = () => {
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
    const getImageUrl = (imageData, contentType) => {
        console.log(imageData+";"+contentType);
       // if (!imageData || !contentType) return null;

        const base64 = Buffer.from(imageData, 'binary').toString('base64'); // Utilisation de Buffer
        return `data:${contentType};base64,${base64}`;
    };
    return (
        <div className="explorer-container"> {/* Utilisez une classe CSS spécifique */}
            {events.map((event) => (
                <div key={event._id} className="event-item">
                    <h3>{event.title}</h3>
                    <p>{event.date}</p>
                    {event.img && ( // Vérifier si l'image existe
                        <img src={getImageUrl(event.img.data,null)} alt={event.title} />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Explorer;