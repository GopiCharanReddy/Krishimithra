import { GoogleGenerativeAI } from "@google/generative-ai";

const languageNames = {
    'en': 'English',
    'hi': 'Hindi (हिन्दी)',
    'ml': 'Malayalam (മലയാളം)',
    'te': 'Telugu (తెలుగు)',
    'ta': 'Tamil (தமிழ்)',
    'kn': 'Kannada (ಕನ್ನಡ)'
};

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateAnswer(currentQuestion, recommendedCrop, nitrogen, phosphorus, language = 'en') {
    const languageName = languageNames[language] || 'English';

    const fullPrompt = `You are an AI-powered agricultural assistant for farmers. Your primary function is to provide crop recommendations and agricultural advice. When given data about soil composition, analyze it and recommend suitable crops. Maintain a helpful, informative, and professional tone. Answer any general agricultural questions the user may have, but prioritize the data-driven recommendations.

IMPORTANT: You MUST respond in ${languageName}. The user has selected this language, so provide your entire response in ${languageName} only.

Here is the soil data:
- Nitrogen: ${nitrogen}
- Phosphorus: ${phosphorus}
The recommended crop is: ${recommendedCrop}.

Now, please answer the user's question in ${languageName}:
${currentQuestion}`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(fullPrompt);
    const aiResponse = result.response.text();

    return aiResponse;
}