import { useState } from 'react';
import api from '../services/api';

export default function Chatbot() {
  const [pergunta, setPergunta] = useState('');
  const [mensagens, setMensagens] = useState([]);
  const [carregando, setCarregando] = useState(false);

  async function enviar(e) {
    e.preventDefault();
    const texto = pergunta.trim();
    if (!texto || carregando) return;
    setMensagens(atual => [...atual, { autor: 'Você', texto }]);
    setPergunta('');
    setCarregando(true);
    try {
      const { data } = await api.post('/chat', { pergunta: texto });
      setMensagens(atual => [...atual, { autor: 'Assistente', texto: data.resposta }]);
    } catch (error) {
      setMensagens(atual => [...atual, {
        autor: 'Aviso',
        texto: error.response?.data?.error || 'Não foi possível responder agora.',
      }]);
    } finally {
      setCarregando(false);
    }
  }

  return <section className="my-6 rounded-xl border bg-white p-4">
    <h2 className="text-lg font-bold">Tire dúvidas sobre o resultado</h2>
    <div aria-live="polite" className="my-3 max-h-64 space-y-2 overflow-y-auto">
      {mensagens.map((m, i) => <p key={i}><strong>{m.autor}:</strong> {m.texto}</p>)}
      {carregando && <p>Preparando resposta…</p>}
    </div>
    <form onSubmit={enviar} className="flex flex-col gap-2 sm:flex-row">
      <label className="sr-only" htmlFor="pergunta-chat">Sua pergunta</label>
      <input id="pergunta-chat" maxLength="1000" value={pergunta}
        onChange={e => setPergunta(e.target.value)} className="min-w-0 flex-1 rounded border p-3"
        placeholder="Ex.: por que o Fator R muda o anexo?" />
      <button disabled={carregando} className="rounded bg-naf-blue px-4 py-3 font-bold text-white">
        Enviar pergunta
      </button>
    </form>
    <p className="mt-2 text-xs">Respostas automáticas para fins educativos; confirme regras tributárias com contador.</p>
  </section>;
}
