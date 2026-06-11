// const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

// export async function callOpenRouter(messages, model = 'anthropic/claude-3.5-sonnet', maxTokens = 2048) {
//   const res = await fetch(OPENROUTER_URL, {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
//       'Content-Type': 'application/json',
//       'HTTP-Referer': 'http://localhost:5173',
//       'X-Title': 'STEMAI Tutor'
//     },
//     body: JSON.stringify({ model, messages, max_tokens: maxTokens, temperature: 0.7 })
//   });
//   if (!res.ok) throw new Error(`OpenRouter error: ${await res.text()}`);
//   const data = await res.json();
//   return data.choices[0].message.content;
// }

// export async function callVisionAPI(imageBase64, prompt, model = 'google/gemini-flash-1.5') {
//   const res = await fetch(OPENROUTER_URL, {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
//       'Content-Type': 'application/json',
//       'HTTP-Referer': 'http://localhost:5173',
//       'X-Title': 'STEMAI Tutor'
//     },
//     body: JSON.stringify({
//       model,
//       messages: [{ role: 'user', content: [
//         { type: 'text', text: prompt },
//         { type: 'image_url', image_url: { url: imageBase64.startsWith('data:') ? imageBase64 : `data:image/jpeg;base64,${imageBase64}` } }
//       ]}],
//       max_tokens: 2048
//     })
//   });
//   if (!res.ok) throw new Error(`Vision error: ${await res.text()}`);
//   const data = await res.json();
//   return data.choices[0].message.content;
// }


const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function callOpenRouter(messages, model = 'openrouter/free', maxTokens = 2048) {
  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:5173',
      'X-Title': 'STEMAI Tutor'
    },
    body: JSON.stringify({ 
      model, 
      messages, 
      max_tokens: maxTokens, 
      temperature: 0.7 
    })
  });
  
  if (!res.ok) throw new Error(`OpenRouter error: ${await res.text()}`);
  
  const data = await res.json();
  return data.choices[0].message.content;
}

export async function callVisionAPI(imageBase64, prompt, model = 'openrouter/free') {
  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'http://localhost:5173',
      'X-Title': 'STEMAI Tutor'
    },
    body: JSON.stringify({
      model,
      messages: [{ 
        role: 'user', 
        content: [
          { type: 'text', text: prompt },
          { 
            type: 'image_url', 
            image_url: { 
              url: imageBase64.startsWith('data:') 
                ? imageBase64 
                : `data:image/jpeg;base64,${imageBase64}` 
            } 
          }
        ] 
      }],
      max_tokens: 2048
    })
  });
  
  if (!res.ok) throw new Error(`Vision error: ${await res.text()}`);
  
  const data = await res.json();
  return data.choices[0].message.content;
}