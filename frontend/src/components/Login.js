import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import API_BASE from '../config'; 

function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
      
      // The backend returns { token, userId, name }. Save them to local storage.
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userName', res.data.name); 
      
      navigate('/dashboard');
    } catch (err) {
      if (err.response) {
        // The server responded with a status code (e.g. 400 for invalid credentials)
        setError(t('login.error_invalid'));
      } else {
        // Something else happened (server down, CORS error, etc.)
        setError("Unable to connect to the server. Please check your connection.");
      }
    }
    setLoading(false);
  };

  return (
    <div style={styles.outer}>
      <div className="glass-card" style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>{t('app.title')}</h1>
          <p style={styles.subtitle}>{t('app.subtitle')}</p>
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <input
              className="glass-input"
              type="email"
              placeholder={t('login.email_placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </div>
          <div style={styles.inputGroup}>
            <input
              className="glass-input"
              type="password"
              placeholder={t('login.password_placeholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </div>
          
          {error && <p style={styles.error}>{error}</p>}

          <button className="btn-primary" type="submit" disabled={loading} style={styles.button}>
            {loading ? '...' : t('login.button')}
          </button>
        </form>

        <div style={styles.footer}>
          <span>{t('login.new_here')} </span>
          <Link to="/register" style={styles.link}>{t('login.create_account')}</Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  outer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    padding: '40px',
    textAlign: 'center',
    animation: 'fadeInUp 0.6s ease-out'
  },
  header: { marginBottom: '32px' },
  title: { fontSize: '32px', margin: '0 0 8px', color: 'var(--primary)' },
  subtitle: { fontSize: '14px', color: 'var(--text-muted)', margin: 0 },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { width: '100%' },
  button: { width: '100%', marginTop: '10px' },
  error: { color: '#ef4444', fontSize: '14px', margin: '0' },
  footer: { marginTop: '24px', fontSize: '14px', color: 'var(--text-muted)' },
  link: { color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }
};

export default Login;