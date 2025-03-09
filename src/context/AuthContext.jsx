//AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { jwtDecode as jwt_decode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const [userRole, setUserRole] = useState(null);
    const [username, setUser] = useState();

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
        <AuthContext.Provider value={{ isLoggedIn, userRole, login, logout, isAdmin,mounted,username }}>
            {children}
        </AuthContext.Provider>
    );
};










/*import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const decoded = jwtDecode(token); // 📌 Décodage du token
                    setUserRole(decoded.role || "user"); // 📌 Récupère le rôle
                    setIsLoggedIn(true);
                } catch (error) {
                    console.error("Erreur lors du décodage du token:", error);
                    setIsLoggedIn(false);
                    setUserRole(null);
                }
            } else {
                setIsLoggedIn(false);
                setUserRole(null);
            }
        };

        checkLoginStatus();
        window.addEventListener("storage", checkLoginStatus);

        return () => {
            window.removeEventListener("storage", checkLoginStatus);
        };
    }, []);

    const login = (token) => {
        localStorage.setItem("token", token);
        setIsLoggedIn(true);
        try {
            const decoded = jwtDecode(token);
            setUserRole(decoded.role || "user");
        } catch (error) {
            console.error("Erreur lors du décodage du token:", error);
            setUserRole(null);
        }
        window.dispatchEvent(new Event("storage"));
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setUserRole(null);
        window.dispatchEvent(new Event("storage"));
    };

    const isAdmin = () => userRole === "admin"; // 📌 Vérifie si l'utilisateur est admin

    return (
        <AuthContext.Provider value={{ isLoggedIn, userRole, login, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

/*🔹 Explications

    On décode le token avec jwtDecode() pour récupérer le rôle.
    On met à jour userRole dans le contexte pour l'utiliser dans toute l'application.
    Ajout d’une fonction isAdmin() pour vérifier si l'utilisateur est admin.  */


/*export const AuthContext = createContext();

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
};*/
