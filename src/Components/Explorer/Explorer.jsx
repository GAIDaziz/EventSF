import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import './Explorer.css'; 
import { Buffer } from 'buffer'; 
import EventReviews from '../EventReviews/EventReviews';
import { AuthContext } from "../../context/AuthContext";



const Explorer = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const { id  } = useContext(AuthContext);
 
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/events');
                
                // Sort the events before updating the state
                const sortedEvents = response.data.sort((a, b) => {
                    const dateA = new Date(a.date.split("T")[0]); // Extract YYYY-MM-DD and convert to Date
                    const dateB = new Date(b.date.split("T")[0]);
                  
                    return dateB -dateA ; // Sort from furthest to closest
                });
    
                setEvents(sortedEvents); // Update state with sorted events
    
            } catch (error) {
                console.error("Erreur lors de la récupération des événements:", error);
            }
        };
    
        fetchEvents();
    }, []);
    const getImageUrl = (imageData, contentType) => {
       // if (!imageData || !contentType) return null;

        const base64 = Buffer.from(imageData, 'binary').toString('base64'); // Utilisation de Buffer
        return `data:${contentType};base64,${base64}`;
    };

    
    return (
        <div className="explorer-container"> {/* Utilisez une classe CSS spécifique */}
            {events.map((event) => (
                <div key={event._id} className="event-item">
                    {event.img && ( // Vérifier si l'image existe
                        <img src={getImageUrl(event.img.data,null)} alt={event.title} />
                    )}
                    <h3>{event.title}</h3>
                    <p  style={{marginTop:"10px",marginBottom:"10px"}}>date de l'événement: {event.date.slice(0, 10)}</p>
                    <button onClick={() => setSelectedEvent(event)} style={{marginTop:"60px"}}>Détails</button> {/* Bouton pour ouvrir la modale */}
                </div>
            ))}
            {selectedEvent && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setSelectedEvent(null)}>&times;</span> {/* Bouton pour fermer la modale */}
                        <h2>{selectedEvent.title}</h2>
                        {selectedEvent.img && (
                            <img src={getImageUrl(selectedEvent.img.data, selectedEvent.img.contentType)} alt={selectedEvent.title} />
                        )}
                        <p>Date: {selectedEvent.date.slice(0, 10)}</p>
                        <p>localtion: {selectedEvent.location}</p>
                        <p>Description: {selectedEvent.description}</p> {/* Ajout d'une description si disponible */}
                        <EventReviews eventId={selectedEvent.id} userId={id} /> {/* Intégration de EventReviews */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Explorer;