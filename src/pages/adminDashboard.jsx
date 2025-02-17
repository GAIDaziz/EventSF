import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import './adminDashboard.css';
const AdminDashboard = () => {
    const { userRole, isLoggedIn, isAdmin } = useContext(AuthContext);

    console.log("userRole:", userRole);  // Should log "admin" if correctly set
    console.log("isLoggedIn:", isLoggedIn);
    console.log("isAdmin:", isAdmin());  // Should be true if userRole is "admin"
    if (!isAdmin()) {
        console.log("loading");
       
    }

    return (
        <div className="div">
            <h1>Tableau de bord Admin</h1>
            <p>Bienvenue, administrateur !</p>
            {/* Ajoute ici tes fonctionnalités admin */}
        </div>
    );
};

export default AdminDashboard;
