import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const usaFatorR = new Set(['psicologo','arquiteto','medico','dentista']);
export default function Simulador() {
 const navigate=useNavigate();
 const [form,setForm]=useState({tipoProfissao:'psicologo',faturamento:'',custos:'0',folhaMensal:''});
 const [erro,setErro]=useState(''),[busy,setBusy]=useState(false);
 const precisaFolha=usaFatorR.has(form.tipoProfissao);
 function change(e){setForm({...form,[e.target.name]:e.target.value});}
 async function submit(e){
  e.preventDefault();setErro('');setBusy(true);
  try{
   const {data}=await api.post('/calculos/simular',{...form,faturamento:Number(form.faturamento),custos:Number(form.custos||0),folhaMensal:precisaFolha?Number(form.folhaMensal):0});
   sessionStorage.setItem('naf-resultado',JSON.stringify(data.resultado));
   navigate('/comparativo',{state:{resultado:data.resultado}});
  }catch(err){setErro(err.response?.data?.error||'Não foi possível calcular.');}
  finally{setBusy(false);}
 }
 const cls='w-full rounded-lg border border-slate-400 p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800';
 return <div className="min-h-screen flex flex-col bg-naf-light"><Navbar/><main id="conteudo" className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
  <h1 className="text-3xl font-bold text-naf-blue">Calculadora tributária PF × PJ</h1>
  <p className="my-3">Informe sua renda mensal, custos dedutíveis e, para profissões sujeitas, a folha/pró-labore.</p>
  <form onSubmit={submit} className="space-y-5 rounded-2xl bg-white p-5 shadow sm:p-8">
   <div><label htmlFor="tipoProfissao" className="mb-1 block font-semibold">Profissão</label><select className={cls} id="tipoProfissao" name="tipoProfissao" value={form.tipoProfissao} onChange={change}><option value="psicologo">Psicólogo(a)</option><option value="arquiteto">Arquiteto(a)</option><option value="advogado">Advogado(a)</option><option value="medico">Médico(a)</option><option value="dentista">Dentista</option></select></div>
   <div><label htmlFor="faturamento" className="mb-1 block font-semibold">Renda mensal (R$)</label><input className={cls} id="faturamento" name="faturamento" type="number" min="0.01" max="15000" step="0.01" required value={form.faturamento} onChange={change}/></div>
   <div><label htmlFor="custos" className="mb-1 block font-semibold">Custos dedutíveis / Livro Caixa (R$)</label><input className={cls} id="custos" name="custos" type="number" min="0" step="0.01" required value={form.custos} onChange={change}/></div>
   {precisaFolha&&<div><label htmlFor="folhaMensal" className="mb-1 block font-semibold">Folha/pró-labore mensal (R$)</label><input className={cls} id="folhaMensal" name="folhaMensal" type="number" min="0.01" step="0.01" required value={form.folhaMensal} onChange={change}/><p className="mt-1 text-sm">A simulação anualiza folha e receita por 12 meses.</p></div>}
   {erro&&<p role="alert" aria-live="assertive" className="rounded bg-red-50 p-3 font-semibold text-red-900">{erro}</p>}
   <button disabled={busy} className="w-full rounded-lg bg-naf-blue p-3 font-bold text-white focus-visible:outline focus-visible:outline-2">{busy?'Calculando…':'Comparar PF e PJ'}</button>
  </form><p className="mt-4 text-sm">Estimativa acadêmica; não substitui orientação contábil.</p></main><Footer/></div>;
}
