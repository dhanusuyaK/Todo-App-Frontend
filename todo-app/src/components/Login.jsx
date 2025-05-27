// import React from 'react';

// const Login = () => {
//   const handleGoogleLogin = () => {
//     // window.location.href = 'http://localhost:5000/api/auth/google';
//     window.location.href = 'https://todo-app-backend-xmxj.onrender.com/api/auth/google';
//   };

//   return (
//     <div className="login-container">
//       <h1>Todo App Login</h1>
//       <button onClick={handleGoogleLogin} className="google-btn">Login with Google</button>
//     </div>
//   );
// };

// export default Login;


import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const { setToken } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleManualLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://todo-app-backend-xmxj.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        setToken(data.token);
        navigate('/');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      alert('Login error. Please try again.');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'https://todo-app-backend-xmxj.onrender.com/api/auth/google';
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f3f4f6',
      padding: '20px',
    },
    box: {
      background: '#fff',
      padding: '30px 25px',
      borderRadius: '10px',
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
      boxSizing: 'border-box',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '24px',
      fontWeight: '600',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      marginBottom: '5px',
      fontSize: '14px',
      fontWeight: '500',
    },
    input: {
      padding: '10px',
      marginBottom: '15px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '14px',
    },
    btnLogin: {
      padding: '10px',
      backgroundColor: '#28a745',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      cursor: 'pointer',
      marginBottom: '15px',
      width: '100%',
    },
    divider: {
      textAlign: 'center',
      margin: '10px 0',
      color: '#888',
      fontSize: '14px',
    },
    btnGoogle: {
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      border: '1px solid #ccc',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '15px',
      margin: '0 auto', // ← This centers the button
      width: '100%',     // optional: full width inside box
      maxWidth: '280px',
    },
    googleIcon: {
      width: '20px',
      height: '20px',
      marginRight: '10px',
    },
    link: {
      color: '#007bff',
      textDecoration: 'none',
      fontWeight: '500',
      marginLeft: '5px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.heading}>Login to Todo App</h2>

        <form onSubmit={handleManualLogin} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" style={styles.btnLogin}>Login</button>
        </form>

        <div style={styles.divider}>OR</div>

        <button onClick={handleGoogleLogin} style={styles.btnGoogle}>
          Login with Google
        </button>
        
        <p style={styles.bottomText}>
          Don't have an account?
          <Link to="/signup" style={styles.link}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
