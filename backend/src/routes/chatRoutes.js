const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const pergunta = String(req.body.pergunta || '').trim();
  if (!pergunta || pergunta.length > 1000) {
    return res.status(400).json({ error: 'Escreva uma pergunta de até 1000 caracteres.' });
  }
  if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_MODEL) {
    return res.status(503).json({ error: 'Chatbot ainda não configurado.' });
  }
  try {
    const resposta = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + process.env.OPENAI_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL,
        instructions: 'Responda em português, de forma simples, somente sobre conceitos gerais do comparativo PF/PJ e do resultado informado pelo usuário. Não invente alíquotas nem faça recomendação tributária profissional. Explique que a calculadora é uma estimativa acadêmica e que a pessoa deve consultar um contador.',
        input: pergunta,
        max_output_tokens: 300,
      }),
    });
    const data = await resposta.json();
    if (!resposta.ok) {
      return res.status(502).json({ error: 'O serviço de IA não respondeu. Tente novamente.' });
    }
    const texto = (data.output || [])
      .flatMap(item => item.content || [])
      .filter(item => item.type === 'output_text')
      .map(item => item.text)
      .join('\n');
    return res.json({ resposta: texto || 'Não consegui formular uma resposta. Tente perguntar de outro jeito.' });
  } catch {
    return res.status(502).json({ error: 'Não foi possível acessar o chatbot.' });
  }
});

module.exports = router;
