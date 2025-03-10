import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Swal from 'sweetalert2'; // Import SweetAlert2 qui est une librairir etuliser pour des  alerte et eviter des action pare accident  
import './adminDashboard.css';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const { isAdmin } = useContext(AuthContext);
    const [editingUser, setEditingUser] = useState(null); // Utilisateur en cours de modification
    const [editedUserData, setEditedUserData] = useState({}); // Données modifiées de l'utilisateur


    if (!isAdmin()) {
        console.log("Accès refusé: l'utilisateur n'est pas administrateur.");
        return <p>Accès refusé</p>;
    }

    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState({ totalUsers: 0, totalEvents: 0 });
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");
    const authHeader = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3005/api/admin/getUser", authHeader);
                setUsers(response.data.users);
            } catch (error) {
                console.error("Erreur lors du chargement des utilisateurs", error);
            }
        };

        const fetchStats = async () => {
            try {
                const response = await axios.get("http://localhost:3005/api/admin/dashboard", authHeader);
                setStats(response.data.stats);
            } catch (error) {
                console.error("Erreur lors du chargement des statistiques", error);
            }
        };

        fetchUsers();
        fetchStats();
        setLoading(false);
    }, []);

    const deleteUser = async (userId) => {
        Swal.fire({
            title: 'Êtes-vous sûr de vouloir supprimer cet utilisateur ?',
            text: "Cette action est irréversible.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, supprimer!',
            cancelButtonText: 'Non, annuler'
        }).then(async (result) => {
            if (result.isConfirmed) {
        try {
            await axios.delete(`http://localhost:3005/api/admin/deleteUser/${userId}`, authHeader);
            setUsers(users.filter(user => user.id !== userId));
            toast.success("Utilisateur supprimé avec succès");
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur", error);
        }
    }
});
};

const updateUser = async (user) => {
    setEditingUser(user); // Définir l'utilisateur en cours de modification
    setEditedUserData({ ...user }); // Pré-remplir le formulaire avec les données actuelles
};

const handleInputChange = (e) => {
    setEditedUserData({ ...editedUserData, [e.target.name]: e.target.value });
};

const saveUser = async (userId) => {
    Swal.fire({
        title: 'Êtes-vous sûr de vouloir modifier cet utilisateur ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Oui, modifier!',
        cancelButtonText: 'Non, annuler'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
            
                const response = await axios.put(`http://localhost:3005/api/admin/updateUser/${userId}`, editedUserData, authHeader);
                    console.log("envoie a l'api");
                setUsers(users.map(user => user.id === userId ? response.data.user : user));
                toast.success("Utilisateur mis à jour avec succès");
                setEditingUser(null); // Fermer le formulaire de modification
            } catch (error) {
                console.error("Erreur lors de la mise à jour de l'utilisateur", error);
                toast.error("Erreur lors de la mise à jour");
            }
        }
    });
};

    return (
        <div className="admin-dashboard-container">
            <div className="admin-dashboard-content">
                <h1 className="h1-dashbord">Tableau de bord Admin</h1>
                <p className="p-dashbord">Bienvenue, administrateur !</p>
                {loading ? (
                    <p>Chargement...</p>
                ) : (
                    <>
                        <h2 className="h2-dashbord">Statistiques</h2>
                        <p className="p-dashbord">Total Utilisateurs: {stats.totalUsers}</p>
                        <p className="-dashbord">Total Événements: {stats.totalEvents}</p>

                        <h2 className="h2-dashbord">Liste des utilisateurs</h2>
                        <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.email} ({user.role})
                        <div style={{marginTop:'10px',marginBottom:'10px'}}></div>

                        <button style={{marginLeft:'20px'}} onClick={() => deleteUser(user.id)}>Supprimer</button>
                        <button  style={{marginLeft:'20px'}} onClick={() => updateUser(user)}>Modifier</button>
                        {editingUser === user && ( // Afficher le formulaire si l'utilisateur est en cours de modification
                            <form>
                                <input type="text" name="name" value={editedUserData.name} onChange={handleInputChange} placeholder="Nom" />
                                <input type="email" name="email" value={editedUserData.email} onChange={handleInputChange} placeholder="Email" />
                                <select name="role" value={editedUserData.role} onChange={handleInputChange}>
                                    <option value="user">Utilisateur</option>
                                    <option value="admin">Administrateur</option>
                                </select>
                                <button type="button" className="buttonad" onClick={() => saveUser(user.id)}>Enregistrer</button>
                                <button type="button" className="buttonad" onClick={() => setEditingUser(null)}>Annuler</button>
                            </form>
                        )}
                    </li>
                ))}
            </ul>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
