import React, { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Adjust path as necessary
import queryString from 'query-string';

const OAuthRedirectHandler = () => {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { token } = queryString.parse(location.search);
    console.log("Token received from OAuth redirect:", token);
  
    if (token) {
      setToken(token);
      navigate('/dashboard');
    } else {
      console.warn("No token found in query string.");
      navigate('/login?error=invalid_token');
    }
  }, [location.search, navigate, setToken]);
  

  return <p>Logging you in...</p>;
};

export default OAuthRedirectHandler;
