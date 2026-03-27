# 🌈 HopeStack — Your Multilingual Haven

HopeStack is an AI-powered meditation and mental health journaling platform. It offers a secure and private sanctuary for users to express their thoughts using **English, Hindi, and Bengali**, with an intelligent system that understands emotion through both **words and voice tone**.

## ✨ Key Features

- **🗣️ Voice & Text Sentiment**: Advanced analysis for multilingual text and audio energy (tone) tracking.
- **🇮🇳 Multi-Language Support**: Seamlessly journal in English, Hindi, and Bengali.
- **📈 Mood Trends**: Interactive visualization of your emotional journey over time.
- **🛡️ Secure & Private**: JWT-based authentication and secure database storage.
- **🚨 Smart Alerts**: Proactive notifications when the system detects a negative mood trend.
- **🎨 Premium UX**: Dark/Light mode support with a sleek, responsive design.

---

## 🚀 One-Click Deployment to Render

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

1.  Connect your GitHub repository to Render.
2.  Choose the **Web Service** type.
3.  Set the **Environment Variables** (see `.env.example`).
4.  Deploy!

---

## 🛠️ Tech Stack

**Frontend:** React, Chart.js, i18next, Vanilla CSS
**Backend:** Node.js, Express, MongoDB (Mongoose)
**Sentiment Engine:** VADER (English) + Custom Multilingual Dictionary (HI, BN)

---

## 📦 Getting Started Locally

1.  Clone the repository.
2.  Install all dependencies: `npm run build`
3.  Create a `.env` in the root:
    ```
    MONGO_URI=your_mongodb_atlas_uri
    JWT_SECRET=your_jwt_secret
    ```
4.  Run in development mode: `npm run dev`

---

## 🤝 Contribution

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📄 License

MIT License
