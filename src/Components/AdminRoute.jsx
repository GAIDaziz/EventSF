import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
    const { isLoggedIn } = useContext(AuthContext);
    
    // Vérifier si l'utilisateur est admin en regardant le token
    const token = localStorage.getItem("token");
    const isAdmin = token && JSON.parse(atob(token.split(".")[1])).role === "admin";
    console.log('is not admin');
    return isLoggedIn && isAdmin ? <Outlet /> : <Navigate to="/" replace />
    
};

export default AdminRoute;
