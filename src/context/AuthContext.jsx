//AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { jwtDecode as jwt_decode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const [userRole, setUserRole] = useState(null);
    const [username, setUser] = useState();
    const [id, setId] = useState();

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const decoded = jwt_decode(token);  // Utilisation correcte de jwt_decode
                    console.log(decoded.username);
                    setUserRole(decoded.role || "user");
                    setUser(decoded.username);
                    setIsLoggedIn(true);
                    setId(decoded.id);
                } catch (error) {
                    console.error("Erreur lors du décodage du token:", error);
                    setIsLoggedIn(false);
                    setUserRole(null);
                }
            } else {
                setIsLoggedIn(false);
                setUserRole(null);
                setUser(null);

            }
        };

        checkLoginStatus();
        window.addEventListener("storage", checkLoginStatus);
        setMounted(true);

        return () => {
            window.removeEventListener("storage", checkLoginStatus);
        };
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        try {
            const decoded = jwt_decode(token);  // Utilisation correcte de jwt_decode
            setUserRole(decoded.role || "user");
            setUser(decoded.username);
            setId(decoded.id);

        } catch (error) {
            console.error("Erreur lors du décodage du token:", error);
            setUserRole(null);
            setUser(null);

        }
        setMounted(true);
        window.dispatchEvent(new Event("storage"));
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUserRole(null);
        window.dispatchEvent(new Event("storage"));
    };

    const isAdmin = () => userRole === "admin";  // Vérifie si l'utilisateur est admin

    return (
        <AuthContext.Provider value={{ isLoggedIn, userRole, login, logout, isAdmin,mounted,username, id }}>
            {children}
        </AuthContext.Provider>
    );
};









