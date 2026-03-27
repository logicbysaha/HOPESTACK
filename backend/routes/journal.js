// routes/journal.js — Journal entry creation and mood trend analysis
const express = require('express');
const router = express.Router();
const { analyzeMultilingual } = require('../sentimentMultilingual');  // Multilingual sentiment (EN, HI, BN)
const Journal = require('../models/Journal');
const authMiddleware = require('../middleware/auth');

// POST /api/journal — Save a new journal entry
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { text, lang, toneData } = req.body;

    // Analyze the sentiment of the text and voice tone in the correct language
    // lang can be 'en', 'hi', or 'bn'
    const result = analyzeMultilingual(text, lang || 'en', toneData);
    
    // Normalize score to -1 to +1 range
    // The raw score can be large, so we cap it at -5 to +5 then normalize
    const rawScore = result.comparative;
    const normalizedScore = Math.max(-1, Math.min(1, rawScore));

    // Determine label based on score
    let label = 'neutral';
    if (normalizedScore > 0.1) label = 'positive';
    if (normalizedScore < -0.1) label = 'negative';

    // Save to database
    const entry = new Journal({
      userId: req.userId,
      text,
      sentimentScore: normalizedScore,
      sentimentLabel: label,
      lang: lang ? lang.split('-')[0].toLowerCase() : 'en'  // Storing base lang (en, hi, bn)
    });
    await entry.save();

    // After saving, check if we need to send an alert
    const alertNeeded = await checkMoodTrend(req.userId);

    res.status(201).json({
      entry,
      alert: alertNeeded ? {
        message: "We noticed you've been feeling down lately. Would you like to talk to someone?",
        resource: "Campus Counseling: +91-XXXX-XXXXXX"
      } : null
    });

  } catch (error) {
    res.status(500).json({ message: 'Error saving entry', error: error.message });
  }
});

// Helper function: Check if mood has been consistently negative for 3+ days
async function checkMoodTrend(userId) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Get last 7 days of entries
  const recentEntries = await Journal.find({
    userId,
    date: { $gte: sevenDaysAgo }
  }).sort({ date: -1 });

  if (recentEntries.length < 3) return false;  // Not enough data yet

  // Check if last 3 entries are all negative
  const lastThree = recentEntries.slice(0, 3);
  const allNegative = lastThree.every(entry => entry.sentimentScore < -0.1);

  return allNegative;
}

// GET /api/journal — Get all entries for the logged-in user (for the dashboard)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const entries = await Journal.find({ userId: req.userId })
      .sort({ date: -1 })  // Newest first
      .limit(30);           // Last 30 entries

    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching entries' });
  }
});

// GET /api/journal/stats — Get mood statistics for the chart
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const entries = await Journal.find({
      userId: req.userId,
      date: { $gte: sevenDaysAgo }
    }).sort({ date: 1 });

    // Format data for Chart.js
    const chartData = entries.map(entry => ({
      date: entry.date.toLocaleDateString(),
      score: entry.sentimentScore,
      label: entry.sentimentLabel
    }));

    res.json(chartData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
});

module.exports = router;