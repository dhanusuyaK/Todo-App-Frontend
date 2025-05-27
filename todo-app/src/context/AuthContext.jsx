// import React, { createContext, useState, useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode'; 

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setTokenState] = useState(() => localStorage.getItem('token') || '');
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         if (decoded.exp * 1000 < Date.now()) {
//           console.warn("Token expired");
//           handleLogout();
//         } else {
//           setUser(decoded);
//           localStorage.setItem('token', token);
//         }
//       } catch (e) {
//         console.error("Invalid token", e);
//         handleLogout();
//       }
//     }
//     // No need to logout if no token
//   }, [token]);

//   const setToken = (newToken) => {
//     localStorage.setItem('token', newToken);
//     setTokenState(newToken);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setTokenState('');
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, setToken, user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
// context/AuthContext.jsx

import React, { createContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setTokenState] = useState(null);
  const [user, setUser] = useState(null);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setTokenState(null);
    setUser(null);
  }, []);
  const setToken = useCallback((newToken) => {
    // If called with null/empty string, treat it as logout — do nothing
    if (!newToken || typeof newToken !== 'string' || newToken.trim() === '') {
      console.warn("Empty or null token received, skipping setToken.");
      return;
    }
  
    if (newToken.split('.').length !== 3) {
      console.warn("Invalid token format");
      handleLogout();
      return;
    }
  
    try {
      const decoded = jwtDecode(newToken);
  
      if (decoded.exp * 1000 < Date.now()) {
        console.warn("Token expired");
        handleLogout();
        return;
      }
  
      localStorage.setItem('token', newToken);
      setTokenState(newToken);
      setUser(decoded);
  
    } catch (error) {
      console.error("Failed to decode new token", error);
      handleLogout();
    }
  }, [handleLogout]);
  

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (
      storedToken &&
      typeof storedToken === 'string' &&
      storedToken.trim() !== '' &&
      storedToken.split('.').length === 3
    ) {
      try {
        const decoded = jwtDecode(storedToken);

        if (decoded.exp * 1000 < Date.now()) {
          console.warn("Token expired");
          handleLogout();
        } else {
          setTokenState(storedToken);
          setUser(decoded);
        }

      } catch (err) {
        console.error("Failed to decode token", err);
        handleLogout();
      }
    } else {
      handleLogout();
    }
  }, [handleLogout]);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
