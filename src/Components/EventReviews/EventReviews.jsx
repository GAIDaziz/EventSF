import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventReviews.css';

function EventReviews({ eventId, userId }) { // Ajout de userId en props
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  console.log(eventId);
  useEffect(() => {
    // Récupérer les avis pour cet événement
    axios.get('/api/reviews')
      .then(response => {
        const eventReviews = response.data.filter(review => review.event_id === eventId);
        setReviews(eventReviews);
      })
      .catch(error => console.error('Erreur lors de la récupération des avis:', error));
  }, [eventId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/reviews', {
      event_id: eventId,
      user_id: userId,
      rating: newRating,
      comment: newComment,
    })
      .then(response => {
        setReviews([...reviews, response.data]);
        setNewRating(5);
        setNewComment('');
      })
      .catch(error => console.error('Erreur lors de la création de l\'avis:', error));
  };

  return (
    <div className="event-reviews">
      <h3>Avis</h3>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
          <div className="stars">
        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
      </div>
      <div>
        {review.comment}
        <span className="emoji">🎉😊</span>
      </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label>Note:</label>
        <select value={newRating} onChange={(e) => setNewRating(parseInt(e.target.value))}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
        <label>Commentaire:</label>
        <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
        <button type="submit">Ajouter un avis</button>
      </form>
    </div>
  );
}

export default EventReviews;