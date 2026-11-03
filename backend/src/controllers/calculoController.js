const prisma = require('../config/prisma');
const { calcularComparativo, gerarPontosEquilibrio } = require('../services/calculoTributario');

const calculoController = {
  simular: async (req, res) => {
    try {
      const { tipoProfissao, faturamento, custos = 0, folhaMensal = 0 } = req.body;

      if (!tipoProfissao || faturamento === undefined) {
        return res.status(400).json({ error: 'Profissão e faturamento são obrigatórios.' });
      }

      const resultado = calcularComparativo({
        tipoProfissao,
        faturamento: Number(faturamento),
        custos: Number(custos || 0),
        folhaMensal: Number(folhaMensal || 0),
      });

      return res.status(200).json({ resultado });
    } catch (error) {
      console.error('Erro ao simular cálculo:', error);
      return res.status(400).json({ error: error.message || 'Não foi possível simular o cálculo.' });
    }
  },

  equilibrio: async (req, res) => {
    try {
      const { tipoProfissao, custos = 0, folhaMensal = 0 } = req.body;

      if (!tipoProfissao) {
        return res.status(400).json({ error: 'Profissão obrigatória para gerar o ponto de equilíbrio.' });
      }

      const pontos = gerarPontosEquilibrio({
        tipoProfissao,
        custos: Number(custos || 0),
        folhaMensal: Number(folhaMensal || 0),
      });

      return res.status(200).json({ pontos });
    } catch (error) {
      console.error('Erro ao gerar ponto de equilíbrio:', error);
      return res.status(400).json({ error: error.message || 'Não foi possível gerar o ponto de equilíbrio.' });
    }
  },

  create: async (req, res) => {
    try {
      const { tipoProfissao, faturamento, custos = 0, folhaMensal = 0 } = req.body;
      const userId = req.userId;

      if (!tipoProfissao || faturamento === undefined) {
        return res.status(400).json({ error: 'Profissão e faturamento são obrigatórios.' });
      }

      const resultado = calcularComparativo({
        tipoProfissao,
        faturamento: Number(faturamento),
        custos: Number(custos || 0),
        folhaMensal: Number(folhaMensal || 0),
      });

      const novoCalculo = await prisma.calculo.create({
        data: {
          userId,
          tipoProfissao,
          faturamento: resultado.faturamento,
          custos: resultado.custos,
          folhaMensal: resultado.folhaMensal ?? null,
          fatorR: resultado.fatorR ?? null,
          anexoPJ: resultado.anexo ?? null,
          impostoPF: resultado.impostoPF,
          impostoPJ: resultado.impostoPJ,
          melhorOpcao: resultado.melhorOpcao,
          economiaMensal: resultado.economiaMensal,
        }
      });

      return res.status(201).json({
        message: 'Cálculo simulado e salvo com sucesso!',
        calculo: novoCalculo,
      });
    } catch (error) {
      console.error('Erro ao processar cálculo:', error);
      return res.status(400).json({ error: error.message || 'Erro interno do servidor ao processar o cálculo tributário.' });
    }
  },

  history: async (req, res) => {
    try {
      const userId = req.userId;

      const historico = await prisma.calculo.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
      });

      return res.status(200).json(historico);
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
      return res.status(500).json({ error: 'Erro interno ao buscar o histórico de cálculos.' });
    }
  },
};

module.exports = calculoController;
