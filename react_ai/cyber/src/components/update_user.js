import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';


const UpdateProfile = () => {
  const [form, setForm] = useState({
    name: '',
    contact: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get('http://localhost:8000/check-session/', {
          withCredentials: true,
        });
        if (!res.data.valid) {
          navigate('/');
        }
      } catch (err) {
        navigate('/log');
      }
    };
    checkSession();
  }, []);


  useEffect(() => {
    axios.get('http://localhost:8000/get_user/', { withCredentials: true })
      .then(res => {
        console.log("Fetched data:", res.data); // ✅ See this in browser console
        setForm({
          name: res.data.name,
          contact: res.data.contact,
        });
      })
      .catch(err => {
        console.error('Failed to load profile:', err);
        setMessage('Failed to load profile.');
      });
  }, []);
  

  // const handleChange = (e) => {
  //   setForm(prev => ({
  //     ...prev,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  const handleChange = (e) => {
  const { name, value } = e.target;

  // Only allow digits in 'contact' field
  if (name === 'contact') {
    if (!/^\d*$/.test(value)) {
      return; // Block non-numeric input
    }
  }

  setForm(prev => ({
    ...prev,
    [name]: value,
  }));
};


  // const handleUpdate = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post(
  //       'http://localhost:8000/get_user/update_user/',
  //       form,
  //       { withCredentials: true }
  //     );
      
  //     setMessage(res.data.message || 'Profile updated!');
  //   } catch (err) {
  //     console.error('Update failed:', err);
  //     setMessage('Update failed');
  //   }
  // };

  const handleUpdate = async (e) => {
  e.preventDefault();

  // Contact validation: must be 10 digits
  const contactPattern = /^\d{10}$/;
  if (!contactPattern.test(form.contact)) {
    setMessage('Contact number must be exactly 10 digits.');
    return;
  }

  try {
    const res = await axios.post(
      'http://localhost:8000/get_user/update_user/',
      form,
      { withCredentials: true }
    );

    setMessage(res.data.message || 'Profile updated!');
  } catch (err) {
    console.error('Update failed:', err);
    setMessage('Update failed');
  }
};


  return (
    <Layout>
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>user Profile</h2>

        <form onSubmit={handleUpdate} style={styles.form}>
          {renderInput('name', form.name, handleChange)}
          {renderInput('contact', form.contact, handleChange)}

          <div style={styles.buttonContainer}>
            <button type="submit" style={styles.button}>Update Profile</button>
          </div>
        </form>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
    </Layout>
  );
};

// const renderInput = (label, value, onChange) => (
//   <div style={styles.inputGroup}>
//     <label style={styles.label}>{label}:</label>
//     <input
//       name={label}
//       value={value}
//       onChange={onChange}
//       style={styles.input}
//       placeholder={label}
//     />
//   </div>
// );

const renderInput = (label, value, onChange) => (
  <div style={styles.inputGroup}>
    <label style={styles.label}>{label}:</label>
    {/* <input
      name={label}
      value={value}
      onChange={onChange}
      style={styles.input}
      placeholder={label}
      maxLength={label === 'contact' ? 10 : undefined}
    /> */}
    <input
  name={label}
  value={value}
  onChange={onChange}
  style={styles.input}
  placeholder={label}
  maxLength={label === 'contact' ? 10 : undefined}
/>
  </div>
);


const styles = {
  page: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to right, #fce4ec, #f3e5f5)',
    minHeight: '100vh',
    padding: '30px',
  },
  card: {
    background: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '700px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '28px',
    color: '#6a1b9a',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    flex: 1,
    fontSize: '16px',
    fontWeight: '600',
    color: '#555',
    paddingRight: '15px',
    textAlign: 'right',
  },
  input: {
    flex: 2,
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '15px',
    background: '#fafafa',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
  button: {
    padding: '12px 25px',
    backgroundColor: '#8e24aa',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    transition: '0.3s',
  },
  message: {
    marginTop: '20px',
    textAlign: 'center',
    color: '#388e3c',
    fontWeight: 'bold',
  },
};

export default UpdateProfile;
