const fetch = require('node-fetch');

const timeout = 30000; // 30 seconds timeout

exports.handler = async function(event, context) {
  console.log('Function started');
  console.log('API Base:', process.env.OPENAI_API_BASE);
  console.log('API Model:', process.env.OPENAI_API_MODEL);
  
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { messages } = JSON.parse(event.body);
    
    console.log('Sending request to API');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(`${process.env.OPENAI_API_BASE}/v1/chat/completions`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_API_MODEL,
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    clearTimeout(timeoutId);

    console.log('API response status:', response.status);

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API error: ${error}`);
    }

    const data = await response.json();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    if (error.name === 'AbortError') {
      return {
        statusCode: 504,
        body: JSON.stringify({ 
          error: '请求超时，请稍后重试'
        })
      };
    }
    console.error('Detailed error:', {
      message: error.message,
      stack: error.stack,
      apiBase: process.env.OPENAI_API_BASE,
      model: process.env.OPENAI_API_MODEL
    });
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: error.message,
        details: '请检查API配置是否正确'
      })
    };
  }
}; 