//AuthContext.jsx

import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem("token");
            console.log("🔄 Vérification du token dans useEffect :", token);
            setIsLoggedIn(!!token); // Met à jour l'état
        };
    
        checkLoginStatus(); // Vérifie au montage
        window.addEventListener("storage", checkLoginStatus); // Écoute les changements de localStorage
    
        return () => {
            window.removeEventListener("storage", checkLoginStatus);
        };
    }, [isLoggedIn]);

    const login = (token) => {
        console.log("🔑 Login() - Token reçu :", token);
    localStorage.setItem("token", token);
    setIsLoggedIn(true);

    setTimeout(() => {
        console.log("📌 isLoggedIn après set :", isLoggedIn);
    }, 100); 

    console.log("📌 isLoggedIn après set :", isLoggedIn);
    window.dispatchEvent(new Event("storage")); // 🔄 Force l’update
    };

    const logout = () => {
        console.log("Déconnexion");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        window.dispatchEvent(new Event("storage")); // 🔄 Force l’update
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
