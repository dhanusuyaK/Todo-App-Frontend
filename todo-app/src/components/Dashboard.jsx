// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../context/AuthContext';
// import Navbar from './Navbar';
// import TaskItem from './TaskItem';
// import TaskForm from './TaskForm';

// const API_URL = 'http://localhost:5000/api/tasks';

// const Dashboard = () => {
//   const { token, setToken } = useContext(AuthContext);
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [taskToEdit, setTaskToEdit] = useState(null);
//   const [error, setError] = useState(null);

//   // Fetch tasks on mount
//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(API_URL, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setTasks(res.data);
//     } catch (err) {
//       setError('Failed to load tasks');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addTask = async (taskData) => {
//     try {
//       const res = await axios.post(API_URL, taskData, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setTasks(prev => [res.data, ...prev]);
//     } catch {
//       alert('Failed to add task');
//     }
//   };

//   const updateTask = async (id, updatedData) => {
//     try {
//       const res = await axios.put(`${API_URL}/${id}`, updatedData, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setTasks(prev => prev.map(t => (t._id === id ? res.data : t)));
//       setTaskToEdit(null);
//     } catch {
//       alert('Failed to update task');
//     }
//   };

//   const completeTask = async (id) => {
//     await updateTask(id, { status: 'Complete' });
//   };

//   const deleteTask = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setTasks(prev => prev.filter(t => t._id !== id));
//     } catch {
//       alert('Failed to delete task');
//     }
//   };

//   const handleSubmit = (taskData) => {
//     if (taskToEdit) {
//       updateTask(taskToEdit._id, taskData);
//     } else {
//       addTask(taskData);
//     }
//   };

//   const handleLogout = () => {
//     setToken(null);
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="dashboard-container">
//         <div className="header">
//           <h2>Your Tasks</h2>
//           <button onClick={handleLogout} className="btn-logout">Logout</button>
//         </div>
//         <TaskForm
//           onSubmit={handleSubmit}
//           taskToEdit={taskToEdit}
//           onCancel={() => setTaskToEdit(null)}
//         />
//         {loading ? (
//           <p>Loading tasks...</p>
//         ) : error ? (
//           <p>{error}</p>
//         ) : (
//           <>
//             {tasks.length === 0 ? (
//               <p>No tasks found. Add one!</p>
//             ) : (
//               <div className="task-list">
//                 {tasks.map(task => (
//                   <TaskItem
//                     key={task._id}
//                     task={task}
//                     onComplete={completeTask}
//                     onDelete={deleteTask}
//                     onEdit={setTaskToEdit}
//                   />
//                 ))}
//                 {/* Plus button after last task */}
//                 <button
//                   className="btn-add-task"
//                   onClick={() => setTaskToEdit(null)}
//                   title="Add New Task"
//                 >
//                   +
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from './Navbar';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { useLocation, useNavigate } from 'react-router-dom';

// const API_URL = 'http://localhost:5000/api/tasks';
const API_URL = 'https://todo-app-backend-xmxj.onrender.com/api/tasks';

const styles = {
  dashboardContainer: {
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  btnLogout: {
    padding: '8px 15px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  welcomeSection: {
    textAlign: 'center',
    marginTop: '3rem',
    padding: '0 10px',
  },
  welcomeImg: {
    maxWidth: '300px',
    marginBottom: '1rem',
  },
  btnPrimary: {
    padding: '10px 20px',
    backgroundColor: '#0077ff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  taskListSection: {
    position: 'relative',
    marginTop: '2rem',
    paddingBottom: '80px',
  },
  taskList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  btnFloatingAdd: {
    position: 'absolute',   // changed from fixed
    bottom: '0',           // pinned to bottom of the container
    right: '0',            // pinned to right side of the container
    marginTop: '10px',     // small gap above the button
    backgroundColor: '#28a745',
    color: 'white',
    fontSize: '2rem',
    border: 'none',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
    cursor: 'pointer',
    lineHeight: '0',
  }  
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '500px',
    margin: '0 10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
    boxSizing: 'border-box',
    
  },
};



const Dashboard = () => {
  const { token, setToken } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get('token');

    if (tokenFromUrl && !token) {
      setToken(tokenFromUrl);
      navigate('/dashboard', { replace: true });
    } else if (!token) {
      navigate('/login', { replace: true });
    }
  }, [location.search, token, setToken, navigate]);

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
      setError(null);
    } catch {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const res = await axios.post(API_URL, taskData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(prev => [res.data, ...prev]);
      setShowForm(false);
    } catch {
      alert('Failed to add task');
    }
  };

  const updateTask = async (id, updatedData) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(prev => prev.map(t => (t._id === id ? res.data : t)));
      setTaskToEdit(null);
      setShowForm(false);
    } catch {
      alert('Failed to update task');
    }
  };

  const completeTask = async (id) => {
    await updateTask(id, { status: 'Complete' });
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(prev => prev.filter(t => t._id !== id));
    } catch {
      alert('Failed to delete task');
    }
  };

  const handleSubmit = (taskData) => {
    if (taskToEdit) {
      updateTask(taskToEdit._id, taskData);
    } else {
      addTask(taskData);
    }
  };

  const handleLogout = () => {
    setToken(null);
    navigate('/login', { replace: true });
  };

  return (
    <div>
      <Navbar />
      <div style={styles.dashboardContainer}>
        <div style={styles.header}>
          {/* <button onClick={handleLogout} style={styles.btnLogout}>Logout</button> */}
        </div>

        {showForm && (
  <div style={modalStyles.overlay}>
    <div style={modalStyles.modal}>
      <TaskForm
        onSubmit={handleSubmit}
        taskToEdit={taskToEdit}
        onCancel={() => {
          setTaskToEdit(null);
          setShowForm(false);
        }}
      />
    </div>
  </div>
)}


        {loading ? (
          <p>Loading tasks...</p>
        ) : error ? (
          <p>{error}</p>
        ) : tasks.length === 0 ? (
          <div style={styles.welcomeSection}>
  <img 
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5iY5uAwETCI12G1XiK2ZYNf3K6ztlVmhlSg&s" 
    alt="Welcome" 
    style={styles.welcomeImg} 
  />
  <h3>Welcome to Your Productivity Hub!</h3>
  <p>Stay organized and on top of your schedule. Start by creating your first task now!</p>
  <button onClick={() => setShowForm(true)} style={styles.btnPrimary}>
    Create Your First Task
  </button>
</div>
        ) : (
          <div style={styles.taskListSection}>
            <h3>Your Tasks</h3>
            <div style={styles.taskList}>
              {tasks.map(task => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onComplete={completeTask}
                  onDelete={deleteTask}
                  onEdit={(task) => {
                    setTaskToEdit(task);
                    setShowForm(true);
                  }}
                />
              ))}
            </div>

            <button
              style={styles.btnFloatingAdd}
              title="Add Task"
              onClick={() => {
                setTaskToEdit(null);
                setShowForm(true);
              }}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;