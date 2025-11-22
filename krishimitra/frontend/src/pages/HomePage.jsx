import React from 'react';
import { useTranslation } from 'react-i18next';
import Form from '../components/HomePage/Form';
import { MapPin, CheckCircle2, Sprout } from 'lucide-react';

function HomePage() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-block mb-4">
                        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                            🌾 AI-Powered Agriculture
                        </span>
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                        {t('app.subtitle')}
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        {t('hero.description')}
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                    {/* Left Column: Form */}
                    <div className="lg:col-span-7">
                        <Form />
                    </div>

                    {/* Right Column: Info & Features */}
                    <div className="lg:col-span-5 space-y-8">
                        {/* Auto-detect Section */}
                        <div className="bg-white rounded-3xl shadow-xl border-2 border-green-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
                            <div className="relative h-52">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                                <img
                                    src="https://images.unsplash.com/photo-1581578731117-104f8a746956?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                    alt="Soil analysis"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-5 left-5 z-20">
                                    <div className="flex items-center gap-2 text-white mb-1">
                                        <MapPin className="w-6 h-6" />
                                        <span className="font-bold text-xl">{t('home.autoDetect')}</span>
                                    </div>
                                    <span className="text-green-300 text-sm font-medium">🚀 Coming Soon</span>
                                </div>
                            </div>
                            <div className="p-7">
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {t('home.autoDetectDesc')}
                                </p>
                                <button disabled className="w-full py-4 px-4 bg-gray-100 text-gray-400 rounded-xl font-semibold cursor-not-allowed flex items-center justify-center gap-2 border-2 border-gray-200">
                                    <MapPin className="w-5 h-5" />
                                    Detect Location
                                </button>
                            </div>
                        </div>

                        {/* Benefits Section */}
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl border-2 border-green-200 p-8 shadow-lg">
                            <h3 className="text-2xl font-bold text-green-900 mb-7 flex items-center gap-3">
                                <div className="p-2 bg-white rounded-xl shadow-md">
                                    <Sprout className="w-6 h-6 text-green-600" />
                                </div>
                                {t('home.whyChoose')}
                            </h3>
                            <ul className="space-y-5">
                                {[
                                    { text: t('features.step2Desc'), emoji: '🤖' },
                                    { text: t('features.step4Desc'), emoji: '🌍' },
                                    { text: t('features.step3Desc'), emoji: '💬' }
                                ].map((benefit, index) => (
                                    <li key={index} className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-sm">
                                        <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                                        </div>
                                        <span className="text-gray-700 leading-relaxed font-medium">
                                            <span className="mr-2">{benefit.emoji}</span>
                                            {benefit.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;