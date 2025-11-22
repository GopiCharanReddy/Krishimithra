import React, { useContext } from 'react';
import { ProportionsContext } from '../utils/Contexts/ProportionsContext.jsx';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sprout, FileText, Droplets, Thermometer, Wind, ArrowRight, MessageSquare } from 'lucide-react';

function Result() {
    const { t } = useTranslation();
    const { recommendedCrop, nitrogen, phosphorus } = useContext(ProportionsContext);

    const NutrientBadge = ({ label, value, icon: Icon, color }) => (
        <div className={`flex items-center gap-4 p-5 rounded-2xl border-2 ${color} bg-white shadow-lg hover:shadow-xl transition-all duration-200`}>
            <div className="p-3 rounded-xl bg-green-100">
                <Icon className="w-6 h-6 text-green-600" />
            </div>
            <div>
                <p className="text-sm text-gray-600 font-semibold">{label}</p>
                <p className="text-2xl font-bold text-gray-900">{value ?? '—'}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-block mb-4">
                        <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                            ✅ Analysis Complete
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5">
                        {t('result.title')}
                    </h1>
                    <p className="text-xl text-gray-600">
                        {t('result.subtitle')}
                    </p>
                </div>

                <div className="grid gap-10">
                    {/* Report Card */}
                    <section className="bg-white rounded-3xl shadow-2xl border-2 border-green-100 overflow-hidden">
                        <div className="p-10">
                            <div className="flex items-start gap-6 mb-10">
                                <div className="p-4 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl shadow-lg">
                                    <FileText className="w-9 h-9 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                                        {t('result.reportTitle')}
                                    </h2>
                                    <p className="text-gray-600 text-lg">
                                        {t('result.reportDesc')}
                                    </p>
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* Recommended Crops */}
                                <div className="lg:col-span-2 bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 border-2 border-green-200 shadow-lg">
                                    <h3 className="text-2xl font-bold text-green-900 mb-7 flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-xl shadow-md">
                                            <Sprout className="w-6 h-6 text-green-600" />
                                        </div>
                                        {t('result.recommendedCrops')}
                                    </h3>
                                    <div className="flex flex-wrap gap-4">
                                        {recommendedCrop && recommendedCrop.length > 0 ? (
                                            recommendedCrop.map((crop, index) => (
                                                <span key={index} className="inline-flex items-center px-7 py-4 rounded-2xl bg-white text-green-700 font-bold text-xl shadow-md border-2 border-green-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                                                    🌾 {crop}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-gray-500 italic">No recommendations available</span>
                                        )}
                                    </div>
                                </div>

                                {/* Nutrient Profile */}
                                <div className="space-y-5">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                        <div className="p-2 bg-green-100 rounded-xl">
                                            <Thermometer className="w-6 h-6 text-green-600" />
                                        </div>
                                        {t('result.nutrientProfile')}
                                    </h3>
                                    <NutrientBadge
                                        label="Nitrogen (N)"
                                        value={nitrogen}
                                        icon={Sprout}
                                        color="border-green-300"
                                    />
                                    <NutrientBadge
                                        label="Phosphorus (P)"
                                        value={phosphorus}
                                        icon={Sprout}
                                        color="border-green-300"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl shadow-2xl p-10 md:p-14 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full transform -translate-x-1/3 translate-y-1/3" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                            <div>
                                <h3 className="text-3xl md:text-4xl font-extrabold mb-5 flex items-center gap-4">
                                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                                        <MessageSquare className="w-9 h-9 text-white" />
                                    </div>
                                    {t('result.chatCtaTitle')}
                                </h3>
                                <p className="text-green-100 text-xl max-w-xl leading-relaxed">
                                    💬 {t('result.chatCtaDesc')}
                                </p>
                            </div>
                            <Link
                                to="/chatbot"
                                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-green-700 hover:bg-green-50 font-bold text-xl rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 whitespace-nowrap"
                            >
                                {t('result.chatCtaButton')}
                                <ArrowRight className="w-6 h-6" />
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Result;