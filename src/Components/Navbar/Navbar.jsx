import './Navbar.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 

const Navbar = ({ onOpenForm }) => {
    const [showModal, setShowModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false); // Vérifie si un token est déjà stocké
    const [errorMessage, setErrorMessage] = useState(null);

    

    const handleLoginClick = () => {
        setShowModal(true);
        setErrorMessage(null); // Réinitialise le message d'erreur à l'ouverture de la modale
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setErrorMessage(null); // Réinitialise le message d'erreur à la fermeture de la modale
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(null);
    
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: e.target.email.value, password: e.target.password.value })
            });
    
            if (!response.ok) {
                const errorData = await response.text();
                try {
                    const jsonError = JSON.parse(errorData);
                    setErrorMessage(jsonError.message || "Erreur lors de la connexion.");
                } catch (parseError) {
                    console.error("Erreur lors du parsing de l'erreur:", parseError);
                    setErrorMessage(errorData || "Erreur lors de la connexion. Veuillez réessayer.");
                }
                return;
            }
    
            const data = await response.json();
    
            if (data.success) {
                localStorage.setItem('token', data.data.token);
                setIsLoggedIn(true);
                setShowModal(false);
                alert("Connexion réussie !");
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            setErrorMessage("Erreur lors de la connexion. Veuillez réessayer.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        alert("Déconnexion réussie !");
    };

    return (
        <div className='nav'>
            <div className='nav-logo'>EventS</div>
            <ul className='nav-menu'>
                <li><a href="/">Accueil</a></li>
                <li><a href="/explore">Explorer</a></li>
                <li >
                    
                <button onClick={onOpenForm}>Créer un événement</button>

                </li>
                <li><a href="/about">À propos</a></li>
                <li className='nav-register'>
                    <Link to="/register">Register</Link> 
                </li>
                {!isLoggedIn ? (
                    <li className='nav-login' onClick={handleLoginClick}>Se connecter</li>
                ) : (
                    <>
                        <li>Bonjour !</li> {/* Ou afficher le nom d'utilisateur, etc. */}
                        <li className='nav-logout' onClick={handleLogout}>Se déconnecter</li>
                    </>
                )}
            </ul>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="modal-close" onClick={handleCloseModal}>&times;</span>
                        <h2>Connexion</h2>
                        {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Afficher l'erreur */}
                        <form onSubmit={handleFormSubmit}>
                            <input type="email" name="email" placeholder="Email" required />
                            <input type="password" name="password" placeholder="Mot de passe" required />
                            <button type="submit">Se connecter</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;

//<li onClick={handleCreateEventClick} className='nav-create-event'>
//<a>Créer un événement</a>
//</li>