import React, { useState } from 'react';
import './Register.css';

const Register = () => {
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      }); 

      const data = await response.json();

      if (response.ok) {
        setSuccess('Inscription réussie !');
        setError('');
        // Réinitialiser le formulaire ou rediriger l'utilisateur
      } else {
        setError(data.message || 'Une erreur est survenue lors de l\'inscription.');
        setSuccess('');
      }
    } catch (err) {
      setError('Erreur de connexion au serveur.');
      setSuccess('');
    }
  };

  return (
    <div className='register'>
      <h2>Inscription</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nom d'utilisateur :</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Adresse e-mail :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Register;