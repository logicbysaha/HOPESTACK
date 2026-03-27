import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import API_BASE from '../config'; 

function Register() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/api/auth/register`, { name, email, password });
      alert('Registration successful! Please login.');
      navigate('/');
    } catch (err) {
      if (err.response && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert('Failed to connect to the server. Is the backend running?');
      }
    }
    setLoading(false);
  };

  return (
    <div style={styles.outer}>
      <div className="glass-card" style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>{t('app.title')}</h1>
          <p style={styles.subtitle}>{t('register.subtitle')}</p>
        </div>

        <form onSubmit={handleRegister} style={styles.form}>
          <div style={styles.inputGroup}>
            <input
              className="glass-input"
              type="text"
              placeholder={t('register.name_placeholder')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </div>
          <div style={styles.inputGroup}>
            <input
              className="glass-input"
              type="email"
              placeholder={t('register.email_placeholder')}
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
              placeholder={t('register.password_placeholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </div>

          <button className="btn-primary" type="submit" disabled={loading} style={styles.button}>
            {loading ? '...' : t('register.button')}
          </button>
        </form>

        <div style={styles.footer}>
          <span>{t('register.already_have')} </span>
          <Link to="/" style={styles.link}>{t('register.login_here')}</Link>
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
  footer: { marginTop: '24px', fontSize: '14px', color: 'var(--text-muted)' },
  link: { color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }
};

export default Register;