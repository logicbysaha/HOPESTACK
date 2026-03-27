const vader = require('vader-sentiment');

// Initialize VADER for English sentiment bounds (-1 to 1 compound score)
const analyzerEn = vader.SentimentIntensityAnalyzer;

// ==========================================
// Hindi Sentiment Word Dictionary
// ==========================================
const hindiPositiveWords = {
  // Joy & Happiness
  'खुश': 3, 'खुशी': 3, 'प्रसन्न': 3, 'आनंद': 4, 'मस्त': 3,
  'बढ़िया': 3, 'शानदार': 4, 'अच्छा': 2, 'अच्छी': 2, 'अच्छे': 2,
  'सुंदर': 3, 'प्यार': 3, 'प्यारा': 3, 'प्यारी': 3,
  'धन्यवाद': 2, 'शुक्रिया': 2, 'कमाल': 3,
  // Hope & Positivity
  'उम्मीद': 2, 'आशा': 2, 'विश्वास': 2, 'भरोसा': 2,
  'सफल': 3, 'सफलता': 3, 'जीत': 3, 'कामयाबी': 3,
  'ताकत': 2, 'हिम्मत': 2, 'हौसला': 2, 'साहस': 2,
  // Love & Care
  'दोस्त': 2, 'दोस्ती': 2, 'परिवार': 2, 'माँ': 2, 'पापा': 2,
  'स्वस्थ': 2, 'सेहत': 2, 'ठीक': 1, 'बेहतर': 2, 'सबसे': 1,
  // Peace
  'शांति': 2, 'शांत': 2, 'सुकून': 3, 'आराम': 2, 'चैन': 2,
  // Achievement
  'गर्व': 3, 'उपलब्धि': 3, 'तरक्की': 2, 'प्रगति': 2,
  'मेहनत': 2, 'लगन': 2, 'समर्पण': 2,
  // Gratitude & Kindness
  'कृपा': 2, 'दया': 2, 'करुणा': 2, 'सेवा': 2, 'मदद': 2,
  'स्नेह': 3, 'ममता': 3, 'वात्सल्य': 3,
  // Excitement
  'रोमांच': 3, 'उत्साह': 3, 'जोश': 3, 'ऊर्जा': 2,
  'मजा': 2, 'मज़ा': 2, 'मजेदार': 2, 'रोमांचक': 3,
  'हँसी': 2, 'हंसी': 2, 'मुस्कान': 2
};

const hindiNegativeWords = {
  // Sadness
  'दुखी': -3, 'दुख': -3, 'उदास': -3, 'रोना': -2, 'रोया': -2,
  'रोई': -2, 'आंसू': -2, 'आँसू': -2, 'टूटा': -2, 'टूटी': -2,
  'अकेला': -2, 'अकेली': -2, 'अकेलापन': -3, 'तन्हाई': -3,
  // Anger
  'गुस्सा': -3, 'क्रोध': -3, 'नाराज': -2, 'चिढ़': -2,
  'गलत': -2, 'बुरा': -2, 'बुरी': -2, 'बुरे': -2,
  'नफरत': -4, 'घृणा': -4, 'झगड़ा': -3,
  // Fear & Anxiety
  'डर': -3, 'डरा': -3, 'डरी': -3, 'भय': -3, 'चिंता': -3,
  'चिंतित': -3, 'परेशान': -3, 'परेशानी': -3, 'तनाव': -3,
  'घबराहट': -3, 'बेचैन': -2, 'बेचैनी': -2,
  // Hopelessness
  'निराश': -3, 'निराशा': -4, 'हताश': -4, 'थका': -2, 'थकान': -2,
  'थकी': -2, 'कमजोर': -2, 'कमजोरी': -2, 'असफल': -3,
  'हार': -3, 'नाकामी': -3, 'बेकार': -2,
  // Pain
  'दर्द': -3, 'पीड़ा': -3, 'तकलीफ': -3, 'कष्ट': -3,
  'बीमार': -2, 'बीमारी': -3, 'रोग': -2,
  // Loneliness & Rejection
  'उपेक्षा': -3, 'तिरस्कार': -4, 'अपमान': -4,
  'शर्म': -2, 'शर्मिंदा': -3, 'पछतावा': -3,
  // Death-related (important for mental health app)
  'मरना': -5, 'मौत': -5, 'आत्महत्या': -5, 'जिंदगी_खत्म': -5,
  'हताशा': -4, 'बेबस': -3, 'लाचार': -3, 'मजबूर': -2,
  'मरा': -4, 'मरे': -4, 'खत्म': -2, 'बर्बाद': -4
};

// ==========================================
// Bengali Sentiment Word Dictionary
// ==========================================
const bengaliPositiveWords = {
  // Joy & Happiness
  'খুশি': 3, 'খুশী': 3, 'আনন্দ': 4, 'সুখ': 3, 'সুখী': 3,
  'ভালো': 2, 'ভাল': 2, 'দারুণ': 3, 'চমৎকার': 4, 'অসাধারণ': 4,
  'সুন্দর': 3, 'মনোরম': 3, 'চমত্কার': 4,
  // Love & Affection
  'ভালোবাসা': 4, 'ভালবাসা': 4, 'প্রেম': 3, 'স্নেহ': 3,
  'মায়া': 2, 'মমতা': 3, 'আদর': 3,
  // Hope & Positivity
  'আশা': 2, 'আশাবাদী': 3, 'বিশ্বাস': 2, 'ভরসা': 2,
  'সফল': 3, 'সাফল্য': 3, 'জয়': 3, 'জিত': 3,
  // Strength
  'শক্তি': 2, 'সাহস': 2, 'হিম্মত': 2, 'উৎসাহ': 3,
  'উদ্যম': 2, 'অনুপ্রেরণা': 3,
  // Peace
  'শান্তি': 2, 'শান্ত': 2, 'আরাম': 2, 'স্বস্তি': 2,
  // Family & Friends
  'পরিবার': 2, 'বন্ধু': 2, 'বন্ধুত্ব': 2, 'মা': 2, 'বাবা': 2,
  'সুস্থ': 2, 'সুস্বাস্থ্য': 2, 'ঠিক': 1,
  // Gratitude
  'ধন্যবাদ': 2, 'কৃতজ্ঞ': 2, 'কৃতজ্ঞতা': 3,
  'দয়া': 2, 'করুণা': 2, 'সেবা': 2, 'সাহায্য': 2,
  // Achievement
  'গর্ব': 3, 'গর্বিত': 3, 'উন্নতি': 2, 'প্রগতি': 2, 'মেহনত': 2,
  // Excitement
  'রোমাঞ্চ': 3, 'উত্তেজনা': 2, 'মজা': 2, 'মজার': 2,
  'হাসি': 2, 'হাসা': 2
};

const bengaliNegativeWords = {
  // Sadness
  'দুঃখ': -3, 'দুখ': -3, 'দুঃখী': -3, 'কষ্ট': -3,
  'বিষণ্ণ': -3, 'বিষন্ন': -3, 'মন_খারাপ': -3, 'খারাপ': -2,
  'বিমর্ষ': -3, 'অসুস্থ': -2, 'বেদনা': -3,
  'কান্না': -2, 'কাঁদা': -2, 'কেঁদেছি': -2,
  'একা': -2, 'একাকী': -3, 'একাকীত্ব': -3,
  // Anger
  'রাগ': -3, 'ক্রোধ': -3, 'রাগী': -2, 'বিরক্ত': -2,
  'মন্দ': -2, 'খারাপ': -2, 'ঘৃণা': -4, 'ঝগড়া': -3,
  // Fear & Anxiety
  'ভয়': -3, 'ভীত': -3, 'আতঙ্ক': -4, 'চিন্তা': -3,
  'চিন্তিত': -3, 'উদ্বেগ': -3, 'উদ্বিগ্ন': -3,
  'টেনশন': -3, 'অশান্তি': -2, 'অস্থির': -2,
  // Hopelessness
  'নিরাশ': -3, 'নিরাশা': -4, 'হতাশ': -4, 'হতাশা': -4,
  'ক্লান্ত': -2, 'ক্লান্তি': -2, 'দুর্বল': -2, 'ব্যর্থ': -3,
  'হার': -3, 'অসফল': -3, 'বিকার': -2,
  // Pain
  'ব্যথা': -3, 'যন্ত্রণা': -3, 'পীড়া': -3,
  'অসুস্থ': -2, 'রোগ': -2, 'অসুখ': -2,
  // Rejection & Shame
  'অপমান': -4, 'তিরস্কার': -4, 'উপেক্ষা': -3,
  'লজ্জা': -2, 'লজ্জিত': -3, 'অনুশোচনা': -3,
  // Death-related (important for mental health app)
  'মৃত্যু': -5, 'মরে_যাওয়া': -5, 'আত্মহত্যা': -5,
  'মরে': -4, 'মরণ': -5, 'শেষ': -1,
  'অসহায়': -3, 'অসহায়ত্ব': -4, 'অসহ্য': -3, 'বাধ্য': -2
};

// ==========================================
// Analyze Function
// ==========================================
function analyzeMultilingual(text, lang = 'en', toneData = null) {
  // Normalize language code to just 2 letters (e.g. 'en-US' -> 'en', 'hi-IN' -> 'hi')
  const baseLang = lang ? lang.split('-')[0].toLowerCase() : 'en';

  let textScore = 0; // Final score from -1 to 1

  // For English, use the advanced VADER sentiment model
  if (baseLang === 'en') {
    const results = analyzerEn.polarity_scores(text);
    // VADER 'compound' score is already normalized between -1 to 1
    textScore = results.compound;
  } else {
    // For Hindi and Bengali, use our custom dictionaries
    let positiveWords, negativeWords;

    if (baseLang === 'hi') {
      positiveWords = hindiPositiveWords;
      negativeWords = hindiNegativeWords;
    } else { // bn fallback
      positiveWords = bengaliPositiveWords;
      negativeWords = bengaliNegativeWords;
    }

    // Tokenize text: replace punctuation with space, but keep underscores for our multi-word phrases
    // First, we proactively handle common multi-word phrases in the text before splitting
    let processedText = text.toLowerCase();
    
    // Multi-word phrase replacements for Bengali
    processedText = processedText.replace(/মন খারাপ/g, 'মন_খারাপ');
    processedText = processedText.replace(/মরে যাওয়া/g, 'মরে_যাওয়া');
    processedText = processedText.replace(/মরে যাব/g, 'মরে_যাওয়া');
    processedText = processedText.replace(/মরে গেছি/g, 'মরে_যাওয়া');
    
    const tokens = processedText
      .replace(/[।,!?\-()]/g, ' ')  
      .split(/\s+/)
      .filter(word => word.length > 0);

    let totalRawScore = 0;
    for (const token of tokens) {
      if (positiveWords[token] !== undefined) {
        totalRawScore += positiveWords[token];
      } else if (negativeWords[token] !== undefined) {
        totalRawScore += negativeWords[token];
      }
    }

    // --- VADER-STYLE NORMALIZATION ---
    // Instead of totalRawScore / tokens.length, we use: x / sqrt(x^2 + alpha)
    // where alpha is around 15. This makes a raw score of 15 ~= 0.95 and 1 ~= 0.25.
    const alpha = 15;
    textScore = totalRawScore / Math.sqrt(totalRawScore * totalRawScore + alpha);
  }

  // --- AUDIO TONE INTEGRATION ---
  let finalScore = textScore;

  if (toneData && typeof toneData.energy === 'number') {
    const { energy } = toneData; // average microphone volume (0 to 1)

    // Example logic:
    // If text is neutral (-0.1 to 0.1) but energy is extremely low (quiet whispering), shift score negative.
    if (textScore > -0.1 && textScore < 0.1) {
      if (energy < 0.05) {
        finalScore -= 0.3; // Flat/quiet tone indicates low mood/sadness
      } else if (energy > 0.4) {
        finalScore += 0.2; // Loud/energetic tone might indicate excitement even if words are neutral
      }
    } else if (textScore < -0.1) {
      // If words are negative, very high energy might mean anger (-1). Very low energy means depression (-1).
      if (energy > 0.4) finalScore -= 0.2; // intense anger
      if (energy < 0.05) finalScore -= 0.3; // deep sadness
    } else if (textScore > 0.1) {
      // If words are positive, high energy amplifies joy (+1).
      if (energy > 0.3) finalScore += 0.3;
      if (energy < 0.05) finalScore -= 0.2; // positive words but very quiet
    }
  }

  // Ensure within VADER bounds
  finalScore = Math.max(-1, Math.min(1, finalScore));

  return {
    score: textScore,       // Output raw text score
    comparative: finalScore // Reusing comparative as the new final combined score
  };
}



module.exports = { analyzeMultilingual };
