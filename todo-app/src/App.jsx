// import React, { useContext, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
// import { AuthContext } from './context/AuthContext';
// import Dashboard from './components/Dashboard';
// import Login from './components/Login';
// import Signup from './components/Signup';



// const OAuthRedirectHandler = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { setToken } = useContext(AuthContext);

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const tokenFromUrl = params.get('token');
//     console.log('Token from OAuth redirect:', tokenFromUrl);

//     if (tokenFromUrl) {
//       setToken(tokenFromUrl);                 // Save token in context/localStorage
//       navigate('/dashboard', { replace: true }); // Redirect to dashboard
//     } else {
//       navigate('/login', { replace: true }); // If no token, redirect to login
//     }
//   }, [location.search, setToken, navigate]);

//   return <div>Logging you in...</div>;
// };

// const App = () => {
//   const { token } = useContext(AuthContext);
  
//   console.log('Current token in App:', token);

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/oauth2/redirect" element={<OAuthRedirectHandler />} />
//         <Route
//           path="/dashboard"
//           element={token ? <Dashboard /> : <Navigate to="/login" replace />}
//         />
//         <Route
//           path="/"
//           element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext'; // adjust the path
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import OAuthRedirectHandler from './components/OAuthRedirectHandler'; // handles ?token=...


const ProtectedRoute = ({ children }) => {
  const { token } = React.useContext(AuthContext);
  return token ? children : <Navigate to="/signup" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/oauth2/redirect" element={<OAuthRedirectHandler />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;