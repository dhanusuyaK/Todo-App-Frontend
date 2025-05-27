import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const styles = {
  btnLogout: {
    padding: '8px 15px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  }
};

const Navbar = () => {
  const { handleLogout } = useContext(AuthContext); // get logout from context
  const navigate = useNavigate();

  const onLogout = () => {
    handleLogout(); // this clears token and user
    navigate('/login', { replace: true }); // redirect to login
  };

  return (
    <nav className="navbar">
      <div className="nav-left">Todo App</div>
      <div className="nav-right">
        <button onClick={onLogout} style={styles.btnLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
