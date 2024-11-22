import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '只允许POST请求' });
  }

  try {
    const { scores, analysisType } = req.body;

    const prompt = `基于以下DISC行为风格评估分数进行深度分析：
D型(支配型): ${scores.D}%
I型(影响型): ${scores.I}%
S型(稳定型): ${scores.S}%
C型(谨慎型): ${scores.C}%

请提供以下方面的详细分析：
1. 主要行为特征概述
2. 沟通风格分析
3. 决策方式特点
4. 在团队中的优势
5. 潜在发展建议

请用中文回答，并保持专业、客观的语气。`;

    const response = await fetch(process.env.OPENAI_API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_API_MODEL,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || '分析生成失败');
    }

    return res.status(200).json({
      analysis: data.choices[0].message.content
    });

  } catch (error) {
    console.error('API错误:', error);
    return res.status(500).json({
      message: '分析生成失败',
      error: error instanceof Error ? error.message : '未知错误'
    });
  }
} 