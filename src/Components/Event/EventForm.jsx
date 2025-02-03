import React, { useState } from 'react';
import axios from 'axios';
import './EventForme.css'

const EventForm = ({ onClose }) => { // <-- Déstructuration de la prop onClose
  const [eventData, setEventData] = useState({
      title: '',
      description: '',
      date: '',
      location: '',
      image: null,
  });
  
  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setEventData({ ...eventData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in eventData) {
      formData.append(key, eventData[key]);
    }

    try {
      const response = await axios.post('/api/events', formData);

      if (response.status === 201) {
        // Réinitialiser le formulaire ou afficher un message de succès
        setEventData({
          title: '',
          description: '',
          date: '',
          location: '',
          image: null,
        });
        alert('Événement créé avec succès !');
      } else {
        // Gérer les erreurs
        console.error('Erreur lors de la création de l\'événement :', response.status);
        const errorData = await response.data;
        alert(`Erreur: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
      alert('Une erreur s\'est produite.');
    }
  };

  return (
    <div className="modal">
            <div className="modal-content">
                <span className="modal-close" onClick={onClose}>&times;</span> {/* <-- Utilisation de onClose */}
                <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Titre" value={eventData.title} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={eventData.description} onChange={handleChange} required />
                <input type="date" name="date" value={eventData.date} onChange={handleChange} required />
                <input type="text" name="location" placeholder="Lieu" value={eventData.location} onChange={handleChange} required />
                <input type="file" name="image" onChange={handleImageChange} />
                <button type="submit">Créer l'événement</button>
                </form>
        </div>
    </div>         
  );
};

export default EventForm;