import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import API_BASE from '../config'; 
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  PointElement, LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

function Dashboard() {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState(null);
  const [entries, setEntries] = useState([]);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setUserName(localStorage.getItem('userName') || 'Friend');
    fetchStats();
    fetchEntries();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE}/api/journal/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setChartData({
        labels: res.data.map(d => d.date),
        datasets: [{
          label: 'Mood Score',
          data: res.data.map(d => d.score),
          borderColor: '#4338ca',
          backgroundColor: 'rgba(67, 56, 202, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: res.data.map(d =>
            d.score > 0.1 ? '#10b981' : d.score < -0.1 ? '#ef4444' : '#f59e0b'
          ),
          pointBorderColor: 'white',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8
        }]
      });
    } catch (err) {
      console.log('Error fetching stats');
    }
  };

  const fetchEntries = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE}/api/journal`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEntries(res.data.slice(0, 5));
    } catch (err) {
      console.log('Error fetching entries');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: -1,
        max: 1,
        grid: { color: 'rgba(255,255,255,0.05)' },
        ticks: { color: 'var(--text-muted)' }
      },
      x: {
        grid: { display: false },
        ticks: { color: 'var(--text-muted)' }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 12,
        titleFont: { size: 14, family: 'Outfit' },
        bodyFont: { size: 13, family: 'Inter' }
      }
    }
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.header}>
        <div>
          <h1 className="brand-font" style={styles.greeting}>
            {t('dashboard.hello')} {userName} 👋
          </h1>
          <p style={styles.subtext}>{t('dashboard.how_are_you')}</p>
        </div>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          {t('dashboard.logout')}
        </button>
      </div>

      {/* Primary Action Card */}
      <div className="glass-card" style={styles.actionCard} onClick={() => navigate('/journal')}>
        <div style={styles.actionContent}>
          <div style={styles.actionIcon}>✍️</div>
          <div>
            <h3 style={styles.actionTitle}>{t('dashboard.new_entry')}</h3>
            <p style={styles.actionSub}>{t('journal.prompt')}</p>
          </div>
        </div>
      </div>

      {/* Mood Visualization Section */}
      <div className="glass-card" style={styles.chartWrapper}>
        <h3 className="brand-font" style={styles.sectionTitle}>{t('dashboard.chart_title')}</h3>
        <div style={styles.chartArea}>
          {chartData && chartData.labels.length > 0 ? (
            <Line data={chartData} options={chartOptions} />
          ) : (
            <div style={styles.emptyState}>
              <p>{t('dashboard.empty_chart')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div style={styles.recentSection}>
        <h3 className="brand-font" style={styles.sectionTitle}>{t('dashboard.recent_entries')}</h3>
        <div style={styles.entryList}>
          {entries.length === 0 ? (
            <p style={styles.noEntries}>{t('dashboard.no_entries')}</p>
          ) : (
            entries.map(entry => (
              <div key={entry._id} className="glass-card" style={styles.entryCard}>
                <div style={styles.entryHeader}>
                  <div style={{
                    ...styles.indicator,
                    backgroundColor: entry.sentimentScore > 0.1 ? '#10b981' :
                                   entry.sentimentScore < -0.1 ? '#ef4444' : '#f59e0b'
                  }}></div>
                  <span style={styles.entryDate}>
                    {new Date(entry.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <p style={styles.entryText}>
                  {entry.text.length > 120 ? entry.text.substring(0, 120) + '...' : entry.text}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '40px 20px',
    minHeight: '100vh',
    animation: 'fadeIn 0.8s ease-out'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px'
  },
  greeting: { fontSize: '28px', margin: 0, color: 'var(--text-main)' },
  subtext: { color: 'var(--text-muted)', marginTop: '4px', fontSize: '16px' },
  logoutBtn: {
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid var(--border)',
    backdropFilter: 'blur(10px)',
    color: 'var(--text-main)',
    padding: '8px 18px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  },
  actionCard: {
    padding: '24px',
    marginBottom: '32px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, background 0.3s ease',
    background: 'linear-gradient(135deg, rgba(67, 56, 202, 0.15), rgba(16, 185, 129, 0.15))',
    border: '1px solid var(--primary-hover)'
  },
  actionContent: { display: 'flex', alignItems: 'center', gap: '20px' },
  actionIcon: { fontSize: '40px' },
  actionTitle: { margin: 0, fontSize: '20px', color: 'var(--primary)' },
  actionSub: { margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '14px' },
  chartWrapper: { padding: '24px', marginBottom: '40px' },
  sectionTitle: { fontSize: '18px', marginBottom: '20px', color: 'var(--text-main)' },
  chartArea: { height: '300px', position: 'relative' },
  emptyState: { 
    height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', 
    color: 'var(--text-muted)', fontSize: '14px' 
  },
  recentSection: { marginBottom: '40px' },
  entryList: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
  entryCard: { padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', cursor: 'default' },
  entryHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  indicator: { width: '12px', height: '12px', borderRadius: '50%' },
  entryDate: { fontSize: '12px', color: 'var(--text-muted)', fontWeight: '500' },
  entryText: { fontSize: '14px', color: 'var(--text-main)', lineHeight: '1.6', margin: 0 },
  noEntries: { color: 'var(--text-muted)', textAlign: 'center', gridColumn: '1/-1', padding: '40px' }
};

export default Dashboard;