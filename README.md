# 🌾 KrishiMitra

**KrishiMitra** (कृषि मित्र) - Your Trusted Farming Companion

An AI-powered agricultural assistant designed specifically for Indian farmers, providing intelligent crop recommendations, farming guidance, and multilingual support to empower farmers with modern technology.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Language Support](#language-support)
- [Voice Features](#voice-features)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

KrishiMitra is a comprehensive agricultural platform that combines AI technology with local farming knowledge to help Indian farmers make informed decisions. The platform offers crop recommendations, farming advice, and an intelligent chatbot assistant - all available in multiple Indian languages.

### Key Objectives

- 🎯 Provide personalized crop recommendations based on local conditions
- 🗣️ Break language barriers with support for 6 Indian languages
- 🤖 Offer 24/7 AI-powered farming assistance
- 📱 Deliver a user-friendly, accessible interface for farmers
- 🌱 Promote sustainable and informed farming practices

---

## ✨ Features

### 🌾 Crop Recommendation System
- Intelligent crop suggestions based on:
  - Soil type and quality
  - Climate conditions
  - Regional farming patterns
  - Seasonal variations
  - Water availability

### 💬 AI Chatbot Assistant
- Powered by Google's Generative AI
- Real-time farming advice and guidance
- Context-aware responses
- Voice input and output support
- Multilingual conversation support

### 🌐 Multilingual Support
Support for 6 languages:
- 🇬🇧 English
- 🇮🇳 हिंदी (Hindi)
- 🇮🇳 മലയാളം (Malayalam)
- 🇮🇳 తెలుగు (Telugu)
- 🇮🇳 தமிழ் (Tamil)
- 🇮🇳 ಕನ್ನಡ (Kannada)

### 🎤 Voice Features
- **Speech-to-Text**: Speak your questions naturally
- **Text-to-Speech**: Listen to responses in your preferred language
- Browser-based Web Speech API (no external dependencies)
- Automatic language detection and voice selection

### 🎨 Modern UI/UX
- Clean, intuitive interface designed for farmers
- Responsive design for mobile and desktop
- Accessibility-focused components
- Smooth animations and transitions
- Dark mode support

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.2
- **Build Tool**: Vite 5.1
- **Styling**: TailwindCSS 3.4
- **Routing**: React Router DOM 7.9
- **Internationalization**: i18next, react-i18next
- **Icons**: Lucide React
- **Markdown Rendering**: React Markdown

### AI & APIs
- **AI Model**: Google Generative AI (Gemini)
- **HTTP Client**: Axios
- **Voice**: Web Speech API (built-in browser support)

### Development Tools
- **Linting**: ESLint
- **PostCSS**: Autoprefixer
- **Version Control**: Git

---

## 📁 Project Structure

```
krishimitra/
├── crop-model/              # Crop recommendation model
│   └── README.md
│
├── krishimitra/             # Main application
│   ├── frontend/            # React frontend application
│   │   ├── src/
│   │   │   ├── components/  # Reusable UI components
│   │   │   ├── pages/       # Page components (Home, ChatBot, etc.)
│   │   │   ├── locales/     # Translation files for all languages
│   │   │   ├── utils/       # Utility functions and API calls
│   │   │   ├── App.jsx      # Main app component
│   │   │   ├── i18n.js      # i18next configuration
│   │   │   ├── index.css    # Global styles
│   │   │   └── main.jsx     # Entry point
│   │   │
│   │   ├── public/          # Static assets
│   │   ├── index.html       # HTML template
│   │   ├── package.json     # Dependencies
│   │   ├── vite.config.js   # Vite configuration
│   │   └── tailwind.config.js # Tailwind configuration
│   │
│   └── localsupport.md      # Voice features documentation
│
└── README.md                # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- Modern web browser (Chrome, Edge, or Firefox recommended)
- **Google Generative AI API Key** (for chatbot functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/GopiCharanReddy/Krishimithra.git
   cd Krishimithra
   ```

2. **Navigate to the frontend directory**
   ```bash
   cd krishimitra/frontend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_GEMINI_API_KEY=your_google_generative_ai_api_key_here
   ```

   To get your API key:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Create a new API key
   - Copy and paste it into your `.env` file

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Building for Production

```bash
npm run build
```

The optimized production build will be created in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 🌐 Language Support

KrishiMitra uses **i18next** for internationalization. All UI text, labels, and messages are translated into 6 languages.

### How It Works

1. **Language Detection**: Automatically detects browser language on first visit
2. **Language Selector**: Easy-to-use dropdown in the navigation bar
3. **Persistent Selection**: Your language choice is saved in browser storage
4. **Complete Coverage**: All pages, components, and messages are translated

### Translation Files

Located in `frontend/src/locales/`:
- `en/translation.json` - English
- `hi/translation.json` - Hindi
- `ml/translation.json` - Malayalam
- `te/translation.json` - Telugu
- `ta/translation.json` - Tamil
- `kn/translation.json` - Kannada

### Adding New Translations

1. Open the appropriate language file in `src/locales/`
2. Add your key-value pairs following the existing structure
3. Use the translation in your component:
   ```jsx
   import { useTranslation } from 'react-i18next';
   
   function MyComponent() {
     const { t } = useTranslation();
     return <h1>{t('your.translation.key')}</h1>;
   }
   ```

---

## 🎤 Voice Features

KrishiMitra includes built-in voice capabilities using the browser's Web Speech API.

### Speech-to-Text (Voice Input)

- Click the **microphone icon** in the chat input
- Speak your question in your preferred language
- The text will appear in the input box
- Edit if needed, then send

**Requirements**:
- Chromium-based browser (Chrome, Edge, Brave)
- HTTPS connection (or localhost for development)
- Microphone permission granted

### Text-to-Speech (Voice Output)

- Click the **speaker icon** on any bot response
- The message will be read aloud in the selected language
- Automatic voice selection based on current language
- Smooth playback with text chunking for long messages

### Supported Languages for Voice

All 6 supported languages work with voice features:
- English (en-US)
- Hindi (hi-IN)
- Malayalam (ml-IN)
- Telugu (te-IN)
- Tamil (ta-IN)
- Kannada (kn-IN)

### Troubleshooting Voice Features

If voice input doesn't work:
1. Ensure you're using a Chromium-based browser
2. Check microphone permissions
3. Use HTTPS (or localhost for development)
4. Some browsers (like Brave) may block cloud speech services - adjust privacy settings

For more details, see [`localsupport.md`](krishimitra/localsupport.md)

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

1. **Report Bugs**: Open an issue describing the bug
2. **Suggest Features**: Share your ideas for new features
3. **Improve Translations**: Help us improve language accuracy
4. **Code Contributions**: Submit pull requests with improvements
5. **Documentation**: Help improve our docs

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style

- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure ESLint passes (`npm run lint`)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👥 Team

Developed with ❤️ for Indian farmers

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/GopiCharanReddy/Krishimithra/issues) page
2. Open a new issue if your problem isn't already listed
3. Provide as much detail as possible (browser, OS, steps to reproduce)

---

## 🙏 Acknowledgments

- Google Generative AI for powering our chatbot
- The React and Vite communities
- All contributors who help improve KrishiMitra
- Indian farmers who inspire this project

---

## 🌱 Future Roadmap

- [ ] Weather integration and forecasting
- [ ] Market price information
- [ ] Pest and disease identification
- [ ] Farming calendar and reminders
- [ ] Community forum for farmers
- [ ] Offline mode support
- [ ] Mobile app (iOS and Android)
- [ ] Integration with government schemes

---

<div align="center">

**Made with 🌾 for the farmers of India**

[Report Bug](https://github.com/GopiCharanReddy/Krishimithra/issues) · [Request Feature](https://github.com/GopiCharanReddy/Krishimithra/issues) · [Documentation](https://github.com/GopiCharanReddy/Krishimithra/wiki)

</div>