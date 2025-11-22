import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Sprout, BarChart3, MessageSquare, Languages } from 'lucide-react';

function Hero() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const features = [
        {
            icon: <Sprout className="w-8 h-8 text-white" />,
            title: t('features.step1'),
            desc: t('features.step1Desc'),
            color: 'bg-gradient-to-br from-green-500 to-green-600'
        },
        {
            icon: <BarChart3 className="w-8 h-8 text-white" />,
            title: t('features.step2'),
            desc: t('features.step2Desc'),
            color: 'bg-gradient-to-br from-green-400 to-green-500'
        },
        {
            icon: <MessageSquare className="w-8 h-8 text-white" />,
            title: t('features.step3'),
            desc: t('features.step3Desc'),
            color: 'bg-gradient-to-br from-green-600 to-green-700'
        },
        {
            icon: <Languages className="w-8 h-8 text-white" />,
            title: t('features.step4'),
            desc: t('features.step4Desc'),
            color: 'bg-gradient-to-br from-green-500 to-emerald-600'
        }
    ];

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-white via-green-50 to-white py-24 lg:py-36 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-green-300 to-transparent rounded-l-full transform translate-x-1/3" />
                    <div className="absolute left-0 bottom-0 w-1/3 h-2/3 bg-gradient-to-tr from-green-200 to-transparent rounded-tr-full transform -translate-x-1/4 translate-y-1/4" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8 text-center lg:text-left">
                            <div className="inline-block">
                                <span className="px-5 py-2.5 bg-green-100 text-green-700 rounded-full text-sm font-bold shadow-sm">
                                    🌱 Smart Agriculture Platform
                                </span>
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
                                {t('hero.title')}
                            </h1>
                            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                {t('hero.description')}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button
                                    onClick={() => navigate('/home')}
                                    className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 shadow-xl shadow-green-300/50 hover:shadow-2xl hover:shadow-green-400/50 transform hover:-translate-y-1"
                                >
                                    {t('hero.cta')}
                                    <ArrowRight className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="flex items-center gap-8 justify-center lg:justify-start text-sm text-gray-600 pt-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="font-medium">AI-Powered</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="font-medium">Multi-Language</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="font-medium">Free Forever</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative lg:h-[650px] flex items-center justify-center">
                            <div className="relative w-full max-w-lg">
                                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl opacity-20 animate-pulse blur-2xl" />
                                <img
                                    src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                                    alt="Sustainable farming"
                                    className="relative rounded-3xl shadow-2xl object-cover w-full aspect-square transform hover:scale-105 transition-transform duration-500 border-4 border-white"
                                />
                                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border-2 border-green-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                            <Sprout className="w-7 h-7 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">10K+</p>
                                            <p className="text-sm text-gray-600">Happy Farmers</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4 inline-block">
                            ✨ Features
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5">
                            {t('features.title')}
                        </h2>
                        <div className="w-32 h-2 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full" />
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-gradient-to-br from-white to-green-50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-green-100 hover:border-green-300 transform hover:-translate-y-2">
                                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Hero;