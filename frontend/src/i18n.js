import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "app": {
                "title": "🌱 HopeStack",
                "subtitle": "Your Mental Wellness Journal"
            },
            "login": {
                "email_placeholder": "Email Address",
                "password_placeholder": "Password",
                "button": "Login →",
                "new_here": "New here?",
                "create_account": "Create account",
                "error_invalid": "Invalid email or password"
            },
            "register": {
                "subtitle": "Create Your Safe Space",
                "name_placeholder": "Your Name",
                "email_placeholder": "Email Address",
                "password_placeholder": "Create Password",
                "button": "Get Started →",
                "already_have": "Already have an account?",
                "login_here": "Login here"
            },
            "dashboard": {
                "hello": "Hello,",
                "how_are_you": "How are you feeling today?",
                "logout": "Logout",
                "new_entry": "✍️ Write Today's Journal Entry",
                "chart_title": "Your 7-Day Mood Timeline",
                "chart_y_axis": "Mood Score (-1 to +1)",
                "empty_chart": "📊 Your mood chart will appear here after your first journal entry!",
                "recent_entries": "Recent Entries",
                "no_entries": "No entries yet. Write your first one!"
            },
            "journal": {
                "back": "← Dashboard",
                "title": "Today's Journal",
                "prompt": "💭 How are you feeling today? Write freely — this is your safe space.",
                "textarea": "Start writing... or press the microphone button to speak",
                "listen_btn": "🛑 Stop",
                "speak_btn": "🎤 Speak",
                "save_btn": "Save & Analyze ✨",
                "saving_btn": "Analyzing...",
                "result_title": "Your Mood Analysis",
                "score_label": "Score:",
                "alert_title": "💙 We noticed something",
                "errors": {
                    "no_support": "Your browser does not support voice input. Please use Chrome.",
                    "empty": "Please write or speak something first!",
                    "failed": "Failed to save entry. Please try again."
                },
                "moods": {
                    "positive": "Positive",
                    "slightly_positive": "Slightly Positive",
                    "neutral": "Neutral",
                    "slightly_negative": "Slightly Negative",
                    "negative": "Negative"
                }
            }
        }
    },
    hi: {
        translation: {
            "app": {
                "title": "🌱 होप-स्टैक",
                "subtitle": "आपकी मानसिक भलाई की पत्रिका"
            },
            "login": {
                "email_placeholder": "ईमेल पता",
                "password_placeholder": "पासवर्ड",
                "button": "लॉगिन →",
                "new_here": "यहाँ नए हैं?",
                "create_account": "खाता बनाएँ",
                "error_invalid": "अमान्य ईमेल या पासवर्ड"
            },
            "register": {
                "subtitle": "अपना सुरक्षित स्थान बनाएं",
                "name_placeholder": "आपका नाम",
                "email_placeholder": "ईमेल पता",
                "password_placeholder": "पासवर्ड बनाएं",
                "button": "शुरू करें →",
                "already_have": "क्या आपके पास पहले से खाता है?",
                "login_here": "यहाँ लॉगिन करें"
            },
            "dashboard": {
                "hello": "नमस्ते,",
                "how_are_you": "आज आप कैसा महसूस कर रहे हैं?",
                "logout": "लॉगआउट",
                "new_entry": "✍️ आज की पत्रिका दर्ज करें",
                "chart_title": "आपकी 7-दिन की मनोदशा समयरेखा",
                "chart_y_axis": "मनोदशा स्कोर (-1 से +1)",
                "empty_chart": "📊 आपकी मनोदशा का चार्ट आपकी पहली पत्रिका दर्ज करने के बाद यहाँ दिखाई देगा!",
                "recent_entries": "हाल की प्रविष्टियाँ",
                "no_entries": "अभी तक कोई प्रविष्टि नहीं। अपनी पहली प्रविष्टि लिखें!"
            },
            "journal": {
                "back": "← डैशबोर्ड",
                "title": "आज की पत्रिका",
                "prompt": "💭 आज आप कैसा महसूस कर रहे हैं? स्वतंत्र रूप से लिखें - यह आपका सुरक्षित स्थान है।",
                "textarea": "लिखना शुरू करें... या बोलने के लिए माइक्रोफ़ोन बटन दबाएं",
                "listen_btn": "🛑 रुकें",
                "speak_btn": "🎤 बोलें",
                "save_btn": "सहेजें और विश्लेषण करें ✨",
                "saving_btn": "विश्लेषण कर रहा है...",
                "result_title": "आपकी मनोदशा का विश्लेषण",
                "score_label": "स्कोर:",
                "alert_title": "💙 हमने कुछ देखा",
                "errors": {
                    "no_support": "आपका ब्राउज़र वॉयस इनपुट का समर्थन नहीं करता है। कृपया क्रोम का उपयोग करें।",
                    "empty": "कृपया पहले कुछ लिखें या बोलें!",
                    "failed": "प्रविष्टि सहेजने में विफल। कृपया पुन: प्रयास करें।"
                },
                "moods": {
                    "positive": "सकारात्मक",
                    "slightly_positive": "थोड़ा सकारात्मक",
                    "neutral": "तटस्थ",
                    "slightly_negative": "थोड़ा नकारात्मक",
                    "negative": "नकारात्मक"
                }
            }
        }
    },
    bn: {
        translation: {
            "app": {
                "title": "🌱 হোপ-স্ট্যাক (HopeStack)",
                "subtitle": "আপনার মানসিক সুস্থতার ডায়েরি"
            },
            "login": {
                "email_placeholder": "ইমেইল ঠিকানা",
                "password_placeholder": "পাসওয়ার্ড",
                "button": "লগইন →",
                "new_here": "এখানে নতুন?",
                "create_account": "অ্যাকাউন্ট তৈরি করুন",
                "error_invalid": "অকার্যকর ইমেল অথবা পাসওয়ার্ড"
            },
            "register": {
                "subtitle": "আপনার নিরাপদ স্থান তৈরি করুন",
                "name_placeholder": "আপনার নাম",
                "email_placeholder": "ইমেইল ঠিকানা",
                "password_placeholder": "পাসওয়ার্ড তৈরি করুন",
                "button": "শুরু করুন →",
                "already_have": "ইতিমধ্যে একটি অ্যাকাউন্ট আছে?",
                "login_here": "এখানে লগইন করুন"
            },
            "dashboard": {
                "hello": "নমস্কার,",
                "how_are_you": "আপনি আজ কেমন বোধ করছেন?",
                "logout": "লগআউট",
                "new_entry": "✍️ আজকের ডায়েরি লিখুন",
                "chart_title": "আপনার ৭-দিনের মেজাজ টাইমলাইন",
                "chart_y_axis": "মেজাজ স্কোর (-১ থেকে +১)",
                "empty_chart": "📊 আপনার মেজাজ চার্ট আপনার প্রথম ডায়েরি লেখার পরে এখানে প্রদর্শিত হবে!",
                "recent_entries": "সাম্প্রতিক লেখাগুলি",
                "no_entries": "এখনও কোন এন্ট্রি নেই। আপনার প্রথম লিখুন!"
            },
            "journal": {
                "back": "← ড্যাশবোর্ড",
                "title": "আজকের ডায়েরি",
                "prompt": "💭 আপনি আজ কেমন বোধ করছেন? স্বাধীনভাবে লিখুন - এটি আপনার নিরাপদ স্থান।",
                "textarea": "লেখা শুরু করুন... অথবা কথা বলতে মাইক্রোফোন বোতাম টিপুন",
                "listen_btn": "🛑 থামুন",
                "speak_btn": "🎤 কথা বলুন",
                "save_btn": "সংরক্ষণ ও বিশ্লেষণ করুন ✨",
                "saving_btn": "বিশ্লেষণ করা হচ্ছে...",
                "result_title": "আপনার মেজাজ বিশ্লেষণ",
                "score_label": "স্কোর:",
                "alert_title": "💙 আমরা কিছু লক্ষ্য করেছি",
                "errors": {
                    "no_support": "আপনার ব্রাউজার ভয়েস ইনপুট সমর্থন করে না। অনুগ্রহ করে ক্রোম ব্যবহার করুন।",
                    "empty": "দয়া করে প্রথমে কিছু লিখুন বা বলুন!",
                    "failed": "এন্ট্রি সংরক্ষণ করতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"
                },
                "moods": {
                    "positive": "ইতিবাচক",
                    "slightly_positive": "সামান্য ইতিবাচক",
                    "neutral": "নিরপেক্ষ",
                    "slightly_negative": "সামান্য নেতিবাচক",
                    "negative": "নেতিবাচক"
                }
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: true,

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    });

export default i18n;