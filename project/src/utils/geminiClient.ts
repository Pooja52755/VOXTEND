const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

export async function generateResponse(prompt: string, languageCode: string): Promise<string> {
  if (!API_KEY || API_KEY === 'YourActualGeminiApiKeyHere') {
    throw new Error('Gemini API key is missing. Please add it to your .env file.');
  }

  const payload = {
    contents: [{
      parts: [{
        text: `${prompt}. The user's preferred language is ${languageCode}.`
      }]
    }],
    generationConfig: {
      temperature: 0.7,
      topK: 1,
      topP: 1,
      maxOutputTokens: 8192,
    },
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Gemini API error: ${response.status} ${response.statusText} - ${errorBody}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Invalid response structure from Gemini API.');
    }

  } catch (error) {
    console.error('Error generating response with Gemini LLM:', error);
    throw error;
  }
}
