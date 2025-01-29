import './Navbar.css';

const Navbar = () => {
    const handleCreateEventClick = () => {
        // Logique pour la création d'événement (par exemple, ouvrir un formulaire)
        console.log("Créer un événement cliqué !");
    };

    return (
        <div className='nav'>
            <div className='nav-logo'>EventS</div>
            <ul className='nav-menu'>
                <li><a href="/">Accueil</a></li> {/* Lien vers la page d'accueil */}
                <li><a href="/explore">Explorer</a></li> {/* Lien vers la page d'exploration */}
                <li onClick={handleCreateEventClick} className='nav-create-event'>Créer un événement</li> {/* Gestionnaire d'événement */}
                <li><a href="/about">À propos</a></li> {/* Lien vers la page à propos */}
                <li className='nav-contact'><a href="/contact">Contact</a></li> {/* Lien vers la page de contact */}
            </ul>
        </div>
    );
};

export default Navbar;