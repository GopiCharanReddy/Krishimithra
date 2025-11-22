import React, { createContext, useState } from 'react'

export const ProportionsContext = createContext(null);

function ProportionsProvider({ children }) {

    const [recommendedCrop, setRecommendedCrop] = useState([]);
    const [nitrogen, setNitrogen] = useState('');
    const [phosphorus, setPhosphorus] = useState('');
    const [potassium, setPotassium] = useState('');
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [pH, setpH] = useState('');
    const [rainfall, setRainfall] = useState('');

    return (
        <ProportionsContext.Provider value={{ recommendedCrop, setRecommendedCrop, nitrogen, setNitrogen, phosphorus, setPhosphorus, potassium, setPotassium, temperature, setTemperature, humidity, setHumidity, pH, setpH, rainfall, setRainfall }}>
            {children}
        </ProportionsContext.Provider>
    )
}

export default ProportionsProvider