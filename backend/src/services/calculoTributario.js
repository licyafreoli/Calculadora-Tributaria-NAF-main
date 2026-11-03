const sujeitasFatorR = new Set(['psicologo','arquiteto','medico','dentista']);
const tabelas = {
 III: [[180000,.06,0],[360000,.112,9360],[720000,.135,17640],[1800000,.16,35640],[3600000,.21,125640],[4800000,.33,648000]],
 IV: [[180000,.045,0],[360000,.09,8100],[720000,.102,12420],[1800000,.14,39780],[3600000,.22,183780],[4800000,.33,828000]],
 V: [[180000,.155,0],[360000,.18,4500],[720000,.195,9900],[1800000,.205,17100],[3600000,.23,62100],[4800000,.305,540000]],
};
function calcularPF(renda,custos) {
 const base=Math.max(0,renda-custos);
 const faixas=[[2428.80,0,0,'Isento'],[2826.65,.075,182.16,'7,5%'],[3751.05,.15,394.16,'15%'],[4664.68,.225,675.49,'22,5%'],[Infinity,.275,908.73,'27,5%']];
 const [_,aliquota,deducao,nome]=faixas.find(f=>base<=f[0]);
 const antes=Math.max(0,base*aliquota-deducao);
 let reducao=base<=5000?antes:base<=7350?Math.max(0,978.62-.133145*base):0;
 return {base,aliquota,deducao,faixa:nome,antes,reducao2026:reducao,imposto:Math.max(0,antes-reducao)};
}
function faixaAnexo(anexo,receita12) {
 const tabela=tabelas[anexo], faixa=tabela.find(f=>receita12<=f[0])||tabela.at(-1);
 const efetiva=(receita12*faixa[1]-faixa[2])/receita12;
 return {nominal:faixa[1],deducao:faixa[2],efetiva};
}
function calcularComparativo({tipoProfissao,faturamento,custos=0,folhaMensal=0}) {
 const profissao=String(tipoProfissao||'').toLowerCase();
 const renda=Number(faturamento), despesas=Number(custos||0), folha=Number(folhaMensal||0);
 if(!['psicologo','arquiteto','advogado','medico','dentista'].includes(profissao)) throw Error('Selecione uma profissão válida.');
 if(![renda,despesas,folha].every(Number.isFinite)||renda<=0||renda>15000||despesas<0||despesas>renda||folha<0) throw Error('Renda deve ser até R$ 15.000; custos e folha não podem ser negativos.');
 if(sujeitasFatorR.has(profissao)&&folha<=0) throw Error('Informe a folha/pró-labore para calcular o Fator R.');
 const pf=calcularPF(renda,despesas), receita12=renda*12, folha12=folha*12;
 const fatorR=sujeitasFatorR.has(profissao)?folha12/receita12:null;
 const anexo=profissao==='advogado'?'IV':fatorR===null||fatorR>=.28?'III':'V';
 const faixa=faixaAnexo(anexo,receita12), simples=renda*faixa.efetiva;
 const salarioBase=Math.max(renda*.28,1621), inss=salarioBase*.11, totalPJ=simples+inss;
 return {profissao,faturamento:renda,custos:despesas,folhaMensal:folha,receita12,folha12,fatorR,anexo,
   pf,pj:{baseSimples:renda,aliquotaEfetiva:faixa.efetiva,aliquotaNominal:faixa.nominal,deducaoAnexo:faixa.deducao,simples,salarioBase,inss,total:totalPJ},
   impostoPF:pf.imposto,impostoPJ:totalPJ,melhorOpcao:totalPJ<pf.imposto?'Pessoa Jurídica (PJ)':'Pessoa Física (PF)',economiaMensal:Math.abs(totalPJ-pf.imposto)};
}
function gerarPontosEquilibrio({ tipoProfissao, custos = 0, folhaMensal = 0 }) {
 const pontos=[];
 for(let faturamento=500;faturamento<=15000;faturamento+=250){
  const resultado=calcularComparativo({tipoProfissao,faturamento,custos:Math.min(Number(custos||0),faturamento),folhaMensal:Number(folhaMensal||0)});
  pontos.push({faturamento,impostoPF:resultado.impostoPF,impostoPJ:resultado.impostoPJ,melhorOpcao:resultado.melhorOpcao});
 }
 return pontos;
}
module.exports={calcularComparativo,gerarPontosEquilibrio};
