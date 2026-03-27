import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'HI' },
    { code: 'bn', label: 'BN' }
  ];

  return (
    <div className="glass-card" style={styles.container}>
      {languages.map((lang, index) => (
        <React.Fragment key={lang.code}>
          <button
            onClick={() => changeLanguage(lang.code)}
            style={{
              ...styles.btn,
              color: i18n.language.startsWith(lang.code) ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: i18n.language.startsWith(lang.code) ? '700' : '400'
            }}
          >
            {lang.label}
          </button>
          {index < languages.length - 1 && <span style={styles.divider}>|</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

const styles = {
  container: {
    position: 'absolute',
    top: '20px',
    right: '24px',
    display: 'flex',
    alignItems: 'center',
    padding: '6px 12px',
    borderRadius: '12px',
    zIndex: 1000,
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255,255,255,0.15)'
  },
  btn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '13px',
    padding: '4px 8px',
    fontFamily: 'Outfit',
    transition: 'color 0.2s ease'
  },
  divider: {
    fontSize: '12px',
    color: 'var(--text-muted)',
    opacity: 0.3,
    margin: '0 2px'
  }
};

export default LanguageSwitcher;
