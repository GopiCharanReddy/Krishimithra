import { useContext, useEffect, useRef, useState } from 'react';
import ReactMarkdown from "react-markdown";
import { useTranslation } from 'react-i18next';
import { generateAnswer } from '../utils/APIcalls/generateAnswer.js';
import { ProportionsContext } from '../utils/Contexts/ProportionsContext.jsx';
import { Send, Bot, User, Loader2, Sparkles, Mic, Volume2 } from 'lucide-react';

function ChatBot() {
    const { t, i18n } = useTranslation();
    const chatContainerRef = useRef(null);
    const [chatHistory, setChatHistory] = useState([]);
    const [question, setQuestion] = useState("");

    const [generatingAnswer, setGeneratingAnswer] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [canUseSTT, setCanUseSTT] = useState(false);
    const recognitionRef = useRef(null);
    const speakingRef = useRef(false);
    const voicesRef = useRef([]);
    const lastSpeakAtRef = useRef(0);

    const langTagMap = {
        en: 'en-US',
        hi: 'hi-IN',
        ml: 'ml-IN',
        te: 'te-IN',
        ta: 'ta-IN',
        kn: 'kn-IN',
    };

    const { recommendedCrop, nitrogen, phosphorus } = useContext(ProportionsContext);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory, generatingAnswer]);

    useEffect(() => {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        setCanUseSTT(!!SR);
        return () => {
            if (recognitionRef.current) recognitionRef.current.stop();
            window.speechSynthesis && window.speechSynthesis.cancel();
        };
    }, []);

    useEffect(() => {
        const loadVoices = () => {
            voicesRef.current = window.speechSynthesis?.getVoices?.() || [];
        };
        loadVoices();
        window.speechSynthesis?.addEventListener?.('voiceschanged', loadVoices);
        return () => window.speechSynthesis?.removeEventListener?.('voiceschanged', loadVoices);
    }, []);

    const selectVoice = (lang) => {
        const voices = voicesRef.current || [];
        const exact = voices.find(v => v.lang?.toLowerCase() === (lang || '').toLowerCase());
        if (exact) return exact;
        const base = (lang || '').slice(0, 2);
        return voices.find(v => v.lang?.slice(0, 2) === base) || null;
    };

    const cleanText = (text) =>
        (text || '')
            .replace(/```[\s\S]*?```/g, '')
            .replace(/[`*_>#-]/g, '')
            .replace(/\s+/g, ' ')
            .trim();

    const splitIntoChunks = (text, size = 180) => {
        const parts = text.split(/([.!?]+)\s+/);
        const chunks = [];
        let buf = '';
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (!part) continue;
            const add = buf ? buf + ' ' + part : part;
            if (add.length > size) {
                if (buf) chunks.push(buf);
                buf = part;
            } else {
                buf = add;
            }
        }
        if (buf) chunks.push(buf);
        return chunks;
    };

    const startListening = () => {
        if (isListening) return;
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SR) return;
        const rec = new SR();
        rec.continuous = true;
        rec.interimResults = true;
        rec.maxAlternatives = 1;
        rec.lang = langTagMap[i18n.language] || 'en-US';
        rec.onresult = (e) => {
            let final = '';
            let interim = '';
            for (let i = e.resultIndex; i < e.results.length; ++i) {
                const txt = e.results[i][0].transcript;
                if (e.results[i].isFinal) final += txt;
                else interim += txt;
            }
            setQuestion((prev) => (final ? (prev ? prev + ' ' : '') + final : interim || prev));
        };
        rec.onnomatch = () => setIsListening(false);
        rec.onstart = () => setIsListening(true);
        rec.onend = () => setIsListening(false);
        rec.onerror = (e) => {
            console.warn('Speech error:', e.error);
            if (e.error === 'network') {
                alert('Speech recognition is blocked by the browser. In Brave, enable Google speech services, allow microphone, or lower Shields for this site.');
            }
            setIsListening(false);
        };
        recognitionRef.current = rec;
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        rec.start();
    };

    const stopListening = () => {
        if (recognitionRef.current) recognitionRef.current.stop();
    };

    const speak = (text) => {
        if (!window.speechSynthesis || !text) return;
        const now = Date.now();
        if (now - lastSpeakAtRef.current < 300) return; // debounce rapid clicks
        lastSpeakAtRef.current = now;

        // Stop STT and any ongoing TTS
        if (recognitionRef.current) recognitionRef.current.stop();
        window.speechSynthesis.cancel();

        const lang = langTagMap[i18n.language] || 'en-US';
        const cleaned = cleanText(text);
        const chunks = splitIntoChunks(cleaned);

        const play = (idx) => {
            if (idx >= chunks.length) { speakingRef.current = false; return; }
            const u = new SpeechSynthesisUtterance(chunks[idx]);
            u.lang = lang;
            u.rate = 0.6;
            u.pitch = 1;
            u.volume = 1.1;
            const voice = selectVoice(lang);
            if (voice) u.voice = voice;
            u.onend = () => play(idx + 1);
            window.speechSynthesis.speak(u);
        };

        speakingRef.current = true;
        play(0);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question.trim()) return;

        const currentQuestion = question;
        setChatHistory(prev => [...prev, { type: 'question', content: currentQuestion }]);
        setGeneratingAnswer(true);
        setQuestion('');

        try {
            const aiResponse = await generateAnswer(currentQuestion, recommendedCrop, nitrogen, phosphorus, i18n.language);
            setChatHistory(prev => [...prev, { type: 'answer', content: aiResponse }]);
        } catch (error) {
            console.error(error);
            setChatHistory(prev => [...prev, { type: 'answer', content: "Sorry - Something went wrong. Please try again!" }]);
        } finally {
            setGeneratingAnswer(false);
        }
    };

    return (
        <div className="h-[calc(100vh-64px)] bg-gradient-to-br from-green-50 via-white to-green-50 flex flex-col">
            {/* Header */}
            <div className="bg-white border-b-2 border-green-100 p-5 shadow-md flex-shrink-0">
                <div className="max-w-4xl mx-auto flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl shadow-lg">
                        <Bot className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">{t('chatbot.title')}</h1>
                        <p className="text-sm text-green-600 font-medium">🤖 {t('chatbot.subtitle')}</p>
                    </div>
                </div>
            </div>

            {/* Chat Container */}
            <div className="flex-1 overflow-hidden relative">
                <div
                    ref={chatContainerRef}
                    className="h-full overflow-y-auto p-6 md:p-10 space-y-8 max-w-4xl mx-auto"
                >
                    {chatHistory.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-10">
                            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl flex items-center justify-center shadow-2xl mb-8 animate-pulse">
                                <Sparkles className="w-12 h-12 text-white" />
                            </div>
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{t('chatbot.welcomeTitle')}</h2>
                            <p className="text-gray-600 text-lg max-w-md leading-relaxed">
                                {t('chatbot.welcomeDesc')}
                            </p>
                            <div className="mt-8 flex flex-wrap gap-3 justify-center">
                                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                                    🌾 Crop Advice
                                </span>
                                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                                    💧 Irrigation Tips
                                </span>
                                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                                    🐛 Pest Control
                                </span>
                            </div>
                        </div>
                    ) : (
                        chatHistory.map((chat, index) => (
                            <div
                                key={index}
                                className={`flex gap-4 ${chat.type === 'question' ? 'justify-end' : 'justify-start'}`}
                            >
                                {chat.type === 'answer' && (
                                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0 mt-1">
                                        <Bot className="w-6 h-6 text-white" />
                                    </div>
                                )}

                                <div
                                    className={`max-w-[80%] md:max-w-[70%] p-5 rounded-3xl shadow-lg ${chat.type === 'question'
                                        ? 'bg-gradient-to-br from-green-500 to-green-600 text-white rounded-br-md'
                                        : 'bg-white text-gray-800 border-2 border-green-100 rounded-bl-md'
                                        }`}
                                >
                                    <ReactMarkdown className="prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-gray-800 prose-pre:text-white">
                                        {chat.content}
                                    </ReactMarkdown>
                                    {chat.type === 'answer' && (
                                        <div className="mt-3 flex justify-end">
                                            <button
                                                type="button"
                                                onClick={() => speak(chat.content)}
                                                className="p-2 rounded-xl border-2 border-green-200 text-green-700 hover:bg-green-50 transition-all duration-200"
                                                disabled={generatingAnswer}
                                                title="Listen to response"
                                            >
                                                <Volume2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {chat.type === 'question' && (
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1 border-2 border-green-200">
                                        <User className="w-6 h-6 text-green-700" />
                                    </div>
                                )}
                            </div>
                        ))
                    )}

                    {generatingAnswer && (
                        <div className="flex gap-4 justify-start">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                                <Bot className="w-6 h-6 text-white" />
                            </div>
                            <div className="bg-white border-2 border-green-100 px-5 py-4 rounded-3xl rounded-bl-md shadow-lg flex items-center gap-3">
                                <Loader2 className="w-5 h-5 text-green-600 animate-spin" />
                                <span className="text-sm text-gray-600 font-medium">{t('chatbot.sending')}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Input Area */}
            <div className="bg-white border-t-2 border-green-100 p-5 flex-shrink-0 shadow-lg">
                <div className="max-w-4xl mx-auto">
                    <form onSubmit={handleSubmit} className="relative flex items-center gap-3">
                        <input
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder={t('chatbot.inputPlaceholder')}
                            className="w-full pl-6 pr-32 py-5 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-400 focus:border-green-500 focus:bg-white transition-all duration-200 placeholder:text-gray-400 text-gray-800"
                            disabled={generatingAnswer}
                        />
                        <button
                            type="button"
                            onClick={isListening ? stopListening : startListening}
                            disabled={!canUseSTT || generatingAnswer}
                            className={`absolute right-16 p-3 rounded-xl border-2 transition-all duration-200 ${isListening ? 'bg-green-100 border-green-400 text-green-700' : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'} disabled:opacity-50 disabled:cursor-not-allowed`}
                            aria-label="voice input"
                            title={canUseSTT ? (isListening ? 'Stop listening' : 'Speak') : 'Voice input not supported'}
                        >
                            <Mic className="w-5 h-5" />
                        </button>
                        <button
                            type="submit"
                            disabled={generatingAnswer || !question.trim()}
                            className="absolute right-2 p-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChatBot;