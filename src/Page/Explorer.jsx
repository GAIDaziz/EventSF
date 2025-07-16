import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../Components/EventCard/EventCard';
import './Explorer.css';

const Explorer = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/events');
                
                // Sort the events before updating the state
                const sortedEvents = response.data.sort((a, b) => {
                    console.log("Réponse reçue :", response.data);
                    const dateA = new Date(a.date);
                    const dateB = new Date(b.date);
                    return dateB - dateA; // Sort from furthest to closest
                });

                setEvents(sortedEvents);
            } catch (error) {
                console.error("Erreur lors de la récupération des événements:", error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="explorer-container">
            <h1>Découvrez nos événements</h1>
            <div className="events-grid">
                {events.map((event) => (
                    <EventCard
                        key={event.id}
                        event={event}
                    />
                ))}
            </div>
        </div>
    );
};

export default Explorer;