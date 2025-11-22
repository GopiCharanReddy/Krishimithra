import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProportionsContext } from '../../utils/Contexts/ProportionsContext.jsx';
import { getDataFromModel } from '../../utils/APIcalls/getDataFromModel.js';
import { TestTube, Thermometer, Droplets, Wind, Activity } from 'lucide-react';

function Form() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const {
        recommendedCrop, setRecommendedCrop,
        nitrogen, setNitrogen,
        phosphorus, setPhosphorus,
        potassium, setPotassium,
        temperature, setTemperature,
        humidity, setHumidity,
        pH, setpH,
        rainfall, setRainfall
    } = useContext(ProportionsContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const proportions = {
            Nitrogen: Number(nitrogen),
            Phosporus: Number(phosphorus),
            Potassium: Number(potassium),
            Temperature: Number(temperature),
            Humidity: Number(humidity),
            pH: Number(pH),
            Rainfall: Number(rainfall),
        };

        try {
            const data = await getDataFromModel(proportions);
            setRecommendedCrop(data?.prediction?.top3 || "Unknown");

            // Navigate immediately without updating state to prevent re-render
            navigate('/result');
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const InputField = ({ label, value, setValue, icon: Icon, placeholderValue }) => (
        <div className="flex flex-col space-y-2.5">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                {Icon && <Icon className="w-4 h-4 text-green-600" />}
                {label}
            </label>
            <input
                type="number"
                step="0.1"
                placeholder={t('form.placeholder', { value: placeholderValue })}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-800 focus:ring-2 focus:ring-green-400 focus:border-green-500 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-green-300"
            />
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl border-2 border-green-100 p-8 md:p-10 w-full hover:shadow-green-200/50 transition-all duration-300">
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl shadow-lg">
                        <Activity className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            {t('form.title')}
                        </h2>
                    </div>
                </div>
                <p className="text-green-600 font-medium ml-16">🌱 Precision farming starts with accurate data</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <InputField
                    label={t('form.nitrogen')}
                    value={nitrogen}
                    setValue={setNitrogen}
                    icon={TestTube}
                    placeholderValue="90"
                />
                <InputField
                    label={t('form.phosphorus')}
                    value={phosphorus}
                    setValue={setPhosphorus}
                    icon={TestTube}
                    placeholderValue="42"
                />
                <InputField
                    label={t('form.potassium')}
                    value={potassium}
                    setValue={setPotassium}
                    icon={TestTube}
                    placeholderValue="43"
                />
                <InputField
                    label={t('form.ph')}
                    value={pH}
                    setValue={setpH}
                    icon={Activity}
                    placeholderValue="6.5"
                />
                <InputField
                    label={t('form.temperature')}
                    value={temperature}
                    setValue={setTemperature}
                    icon={Thermometer}
                    placeholderValue="20"
                />
                <InputField
                    label={t('form.humidity')}
                    value={humidity}
                    setValue={setHumidity}
                    icon={Wind}
                    placeholderValue="82"
                />
                <InputField
                    label={t('form.rainfall')}
                    value={rainfall}
                    setValue={setRainfall}
                    icon={Droplets}
                    placeholderValue="200"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-5 rounded-2xl transition-all duration-300 shadow-xl shadow-green-300/50 hover:shadow-2xl hover:shadow-green-400/50 transform hover:-translate-y-1 text-lg"
            >
                ✨ {t('form.submit')}
            </button>
        </form>
    );
}

export default Form;