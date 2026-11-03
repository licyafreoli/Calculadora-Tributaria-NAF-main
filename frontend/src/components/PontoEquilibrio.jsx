import { useEffect, useState } from 'react';
import api from '../services/api';

export default function PontoEquilibrio({ resultado }) {
  const [pontos, setPontos] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    let ativo = true;
    api.post('/calculos/equilibrio', {
      tipoProfissao: resultado.profissao,
      custos: resultado.custos,
      folhaMensal: resultado.folhaMensal || 0,
    }).then(({ data }) => {
      if (ativo) setPontos(data.pontos);
    }).catch(() => {
      if (ativo) setErro('Não foi possível gerar o gráfico.');
    });
    return () => { ativo = false; };
  }, [resultado]);

  if (erro) return <p role="alert">{erro}</p>;
  if (!pontos.length) return <p>Calculando faixa de equilíbrio…</p>;

  const max = Math.max(...pontos.flatMap(p => [p.impostoPF, p.impostoPJ]), 1);
  const w = 720, h = 260, pad = 38;
  const xy = (valor, indice) => [
    pad + indice * (w - 2 * pad) / (pontos.length - 1),
    h - pad - (valor / max) * (h - 2 * pad),
  ];
  const path = (campo) => pontos.map((p, i) => {
    const [x, y] = xy(p[campo], i);
    return (i ? 'L' : 'M') + x + ' ' + y;
  }).join(' ');

  return <section className="my-6 rounded-xl border bg-white p-4">
    <h2 className="mb-2 text-lg font-bold">Ponto de equilíbrio estimado</h2>
    <svg viewBox={'0 0 ' + w + ' ' + h} role="img"
      aria-label="Gráfico de impostos PF e PJ por faturamento mensal">
      <path d={path('impostoPF')} fill="none" stroke="#2563eb" strokeWidth="3" />
      <path d={path('impostoPJ')} fill="none" stroke="#c2410c" strokeWidth="3" />
      <text x={pad} y={h - 8}>R$ 500/mês</text>
      <text x={w - 130} y={h - 8}>R$ 15.000/mês</text>
    </svg>
    <p className="text-sm">Azul: PF. Laranja: PJ. Valores são estimativas mensais.</p>
  </section>;
}
