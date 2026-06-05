import axios from 'axios';

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function callOpenRouter(messages, options = {}) {
  const {
    model = 'anthropic/claude-3.5-sonnet',
    maxTokens = 2048,
    temperature = 0.7,
  } = options;

  const response = await axios.post(
    OPENROUTER_URL,
    {
      model,
      messages,
      max_tokens: maxTokens,
      temperature,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.APP_URL || 'http://localhost:5173',
        'X-Title': 'STEMAI Tutor',
      },
    }
  );

  return response.data.choices[0].message.content;
}

export async function callOpenRouterVision(messages, options = {}) {
  return callOpenRouter(messages, {
    model: options.model || 'google/gemini-flash-1.5',
    maxTokens: options.maxTokens || 2048,
    temperature: options.temperature || 0.5,
  });
}
