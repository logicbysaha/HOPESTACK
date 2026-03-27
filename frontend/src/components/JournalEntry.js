import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import API_BASE from '../config'; 

const speechLangMap = {
  en: 'en-US',
  hi: 'hi-IN',
  bn: 'bn-IN'
};

function JournalEntry() {
  const { t, i18n } = useTranslation();
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const animationFrameRef = useRef(null);
  const sumEnergyRef = useRef(0);
  const countEnergyRef = useRef(0);

  const navigate = useNavigate();

  const stopAllAudio = () => {
    isListeningRef.current = false;
    setIsListening(false);
    
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch(e) {}
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopAllAudio();
  }, []);

  const measureAudioTone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      mediaStreamRef.current = stream;
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);
      sumEnergyRef.current = 0;
      countEnergyRef.current = 0;
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateVolume = () => {
        if (!isListeningRef.current) return;
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
        const avg = sum / dataArray.length;
        const normalized = avg / 255;
        sumEnergyRef.current += normalized;
        countEnergyRef.current += 1;
        animationFrameRef.current = requestAnimationFrame(updateVolume);
      };
      updateVolume();
    } catch (err) {
      console.warn("Audio Context setup failed", err);
    }
  };

  const startListening = () => {
    if (isListeningRef.current) {
      stopAllAudio();
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(t('journal.errors.no_support'));
      return;
    }

    measureAudioTone();

    const recog = new SpeechRecognition();
    recog.lang = speechLangMap[i18n.language] || 'en-US';
    recog.continuous = true;
    recog.interimResults = false;

    recog.onstart = () => {
      isListeningRef.current = true;
      setIsListening(true);
    };

    recog.onend = () => {
      if (isListeningRef.current) {
        setTimeout(() => {
          if (isListeningRef.current && recognitionRef.current) {
            try { recognitionRef.current.start(); } catch(e){}
          }
        }, 250);
      }
    };

    recog.onresult = (event) => {
      const lastResult = event.results[event.results.length - 1];
      if (lastResult.isFinal) {
        const transcript = lastResult[0].transcript;
        setText(prev => prev + (prev.length > 0 ? ' ' : '') + transcript);
      }
    };

    recog.onerror = (event) => {
      console.log('Speech error:', event.error);
      if (event.error !== 'no-speech') stopAllAudio();
    };

    try {
      recog.start();
      recognitionRef.current = recog;
    } catch(e) {
      stopAllAudio();
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert(t('journal.errors.empty'));
      return;
    }
    stopAllAudio();
    setLoading(true);

    let avgEnergy = 0.5;
    if (countEnergyRef.current > 0) {
      avgEnergy = sumEnergyRef.current / countEnergyRef.current;
      avgEnergy = Math.min(1.0, avgEnergy * 1.5); 
    }

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${API_BASE}/api/journal`,
        { text, lang: i18n.language, toneData: { energy: avgEnergy } },  
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(res.data);
      setText('');
      sumEnergyRef.current = 0;
      countEnergyRef.current = 0;
    } catch (err) {
      alert(t('journal.errors.failed'));
    }
    setLoading(false);
  };

  const getMoodDisplay = (score) => {
    if (score > 0.3) return { emoji: '😊', text: t('journal.moods.positive'), color: '#10b981' };
    if (score > 0.1) return { emoji: '🙂', text: t('journal.moods.slightly_positive'), color: '#34d399' };
    if (score > -0.1) return { emoji: '😐', text: t('journal.moods.neutral'), color: '#f59e0b' };
    if (score > -0.3) return { emoji: '😔', text: t('journal.moods.slightly_negative'), color: '#f97316' };
    return { emoji: '😢', text: t('journal.moods.negative'), color: '#ef4444' };
  };

  return (
    <div style={styles.container}>
      {/* Centered Navigation */}
      <div style={styles.nav}>
        <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>
          ← {t('journal.back')}
        </button>
      </div>

      <div style={styles.main}>
        <h1 className="brand-font" style={styles.title}>{t('journal.title')}</h1>
        <p style={styles.prompt}>{t('journal.prompt')}</p>

        <div className="glass-card" style={styles.writingCard}>
          <textarea
            className="glass-input"
            style={styles.textarea}
            placeholder={t('journal.textarea')}
            value={text}
            onChange={e => setText(e.target.value)}
            rows={10}
          />

          <div style={styles.buttonRow}>
            <button
              onClick={startListening}
              className="btn-primary"
              style={{
                ...styles.voiceBtn,
                background: isListening ? '#f44336' : 'var(--primary)'
              }}
            >
              {isListening ? t('journal.listen_btn') : `🎤 ${t('journal.speak_btn')}`}
            </button>

            <button
              onClick={handleSubmit}
              className="btn-primary"
              disabled={loading}
              style={styles.saveBtn}
            >
              {loading ? '...' : t('journal.save_btn')}
            </button>
          </div>
        </div>

        {result && (
          <div className="glass-card" style={styles.resultCard}>
            <h3 className="brand-font">{t('journal.result_title')}</h3>
            {(() => {
              const mood = getMoodDisplay(result.entry.sentimentScore);
              return (
                <div style={styles.moodBox}>
                  <div style={styles.emoji}>{mood.emoji}</div>
                  <div style={{ color: mood.color, ...styles.moodText }}>
                    {mood.text}
                  </div>
                  <div style={styles.scoreText}>
                    {t('journal.score_label')} {result.entry.sentimentScore.toFixed(2)}
                  </div>
                </div>
              );
            })()}

            {result.alert && (
              <div style={styles.alertBox}>
                <h4 style={styles.alertTitle}>{t('journal.alert_title')}</h4>
                <p style={styles.alertMsg}>{result.alert.message}</p>
                <div style={styles.alertRes}>{result.alert.resource}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '800px', margin: '0 auto', padding: '20px 20px 80px', minHeight: '100vh' },
  nav: { marginBottom: '32px' },
  backBtn: {
    background: 'none', border: 'none', color: 'var(--primary)', 
    cursor: 'pointer', fontSize: '16px', fontWeight: '500', padding: 0,
    fontFamily: 'Outfit'
  },
  main: { animation: 'fadeInUp 0.6s ease-out' },
  title: { fontSize: '32px', marginBottom: '8px', color: 'var(--text-main)', textAlign: 'center' },
  prompt: { textAlign: 'center', color: 'var(--text-muted)', marginBottom: '32px', fontSize: '16px' },
  writingCard: { padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' },
  textarea: { 
    width: '100%', border: 'none', padding: '20px', fontSize: '18px', 
    lineHeight: '1.6', minHeight: '300px', background: 'rgba(255,255,255,0.05)',
    resize: 'none'
  },
  buttonRow: { display: 'flex', gap: '16px' },
  voiceBtn: { flex: 1, height: '56px', fontSize: '18px' },
  saveBtn: { flex: 1.5, height: '56px', fontSize: '18px' },
  resultCard: { marginTop: '40px', padding: '32px', textAlign: 'center', background: 'linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.1))' },
  moodBox: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' },
  emoji: { fontSize: '72px', margin: '16px 0' },
  moodText: { fontSize: '24px', fontWeight: '700', fontFamily: 'Outfit' },
  scoreText: { fontSize: '14px', color: 'var(--text-muted)', marginTop: '4px' },
  alertBox: { marginTop: '32px', padding: '20px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '16px', borderLeft: '4px solid #3b82f6', textAlign: 'left' },
  alertTitle: { margin: '0 0 8px', color: '#3b82f6', fontSize: '16px' },
  alertMsg: { margin: '0 0 12px', fontSize: '15px', color: 'var(--text-main)', lineHeight: '1.4' },
  alertRes: { fontSize: '14px', fontWeight: 'bold', color: 'var(--text-main)' }
};

export default JournalEntry;