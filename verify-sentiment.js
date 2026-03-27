const { analyzeMultilingual } = require('./backend/sentimentMultilingual');

const testCases = [
  { text: "I am happy", lang: "en" },
  { text: "मैं आज बहुत खुश हूँ", lang: "hi" }, // Happy
  { text: "यह गलत है", lang: "hi" }, // Wrong/Bad (Testing typo fix)
  { text: "আমি খুব খুশি", lang: "bn" }, // Happy
  { text: "আমার মন খারাপ", lang: "bn" }, // Sad (Testing multi-word fix)
  { text: "আমি মরে যাব", lang: "bn" }, // Extreme negative
];

console.log("--- MULTILINGUAL SENTIMENT VERIFICATION ---");
testCases.forEach(t => {
  const result = analyzeMultilingual(t.text, t.lang);
  console.log(`Lang: ${t.lang} | Text: "${t.text}"`);
  console.log(`Score: ${result.score.toFixed(4)} | Final: ${result.comparative.toFixed(4)}`);
  console.log('---');
});
