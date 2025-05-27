import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const { setToken } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://todo-app-backend-xmxj.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        setToken(data.token);
        navigate('/');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error(error);
      alert('Signup error. Please try again.');
    }
  };

  const handleGoogleSignup = () => {
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
      textAlign: 'center',
    },
    heading: {
      marginBottom: '20px',
      fontSize: '24px',
      fontWeight: '600',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'left',
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
    btnSignup: {
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
      margin: '0 auto 15px',
      width: '100%',
      maxWidth: '280px',
      gap: '10px',
    },
    googleIcon: {
      width: '20px',
      height: '20px',
    },
    bottomText: {
      fontSize: '14px',
      color: '#555',
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
        <h2 style={styles.heading}>Create an Account</h2>

        <form onSubmit={handleSignup} style={styles.form}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            placeholder="Enter a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" style={styles.btnSignup}>Sign Up</button>
        </form>

        <div style={styles.divider}>OR</div>

        <button onClick={handleGoogleSignup} style={styles.btnGoogle}>
          Sign Up with Google
        </button>

        <p style={styles.bottomText}>
          Already have an account?
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
