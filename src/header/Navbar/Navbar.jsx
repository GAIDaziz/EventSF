//Navebar.jsx
import './Navbar.css';
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import { toast } from 'react-toastify';



const Navbar = ({ onOpenForm }) => {
    const [showModal, setShowModal] = useState(false);
    const { isLoggedIn, login, logout ,user  } = useContext(AuthContext);
    if (isLoggedIn === undefined) {
        console.error("AuthContext non chargé !");
    }
    console.log("Valeur de isLoggedIn dans Navbar:", isLoggedIn);
    const [errorMessage, setErrorMessage] = useState(null);
    console.log("Valeur de AuthContext dans Navbar:", useContext(AuthContext));
    const handleLoginClick = () => {
        setShowModal(true);
        setErrorMessage(null);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setErrorMessage(null);
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
    
            const data = await response.json();
            console.log("Réponse API Login :", data); // 👈 Vérifie si API envoie bien un token
    
            if (!response.ok) {
                setErrorMessage(data.message || "Erreur lors de la connexion.");
                return;
            }
    
            if (data.token) {
                console.log("Token reçu :", data.token);
                login(data.token); // 👈 Enregistre le token
                setShowModal(false);
                toast.success("Connexion réussie !");
            } else {
                setErrorMessage("Erreur lors de la connexion.");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            setErrorMessage("Erreur lors de la connexion. Veuillez réessayer.");
        }
    }
    
    const handleLogout = () => {
        logout();
        toast.info("Déconnexion réussie !");
    };
    
    

    return (
        
        <div className='nav'>
            <div className='nav-logo'>EventS</div>
            
            <ul className='nav-menu'>
                <li className='Naveitem'><Link to="/">Accueil</Link></li>
                <li className='Naveitem'><Link to="/explore">Explorer</Link></li>
                <li><button onClick={onOpenForm}>Créer un événement</button></li>
                
                <li className='nav-register'><Link to="/register">Register</Link></li>

                {!isLoggedIn ? (
                    <li className='nav-login' onClick={handleLoginClick}>Se connecter</li>
                ) : (
                    <>
                        <li>Bonjour {user ? user.name : "Utilisateur"}</li>
                        <li className='nav-logout' onClick={handleLogout}>Se déconnecter</li>
                    </>
                )}
            </ul>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="modal-close" onClick={handleCloseModal}>&times;</span>
                        <h2>Connexion</h2>
                        {errorMessage && <div className="error-message">{errorMessage}</div>}
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
