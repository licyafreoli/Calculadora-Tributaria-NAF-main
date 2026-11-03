# Relatório Técnico — Calculadora Tributária NAF (NP2 2026.2)

**Curso:** [curso]  
**Disciplina:** Desenvolvimento de Aplicações com Frameworks Web  
**Professor:** Maurício Moreira Neto  
**Equipe:** [nomes dos integrantes]  
**Repositório:** [link do fork]  
**Data:** [data]

## 1. Contextualização
A aplicação apoia o atendimento educativo do NAF da Universidade Christus. Seu objetivo é estimar e comparar cenários mensais de tributação PF e PJ para psicólogos, arquitetos, advogados, médicos e dentistas.

## 2. Problema e requisitos
A versão NP2 deve adicionar médicos e dentistas, apurar e exibir Fator R e anexo, disponibilizar as rotas /, /comparativo, /historico, /faq e /sobre, incluir menu global, página 404, redirecionamento sem resultado, responsividade a partir de 320 px, requisitos de acessibilidade e evolução do PDF. Também preserva os fluxos anteriores de comparação, indicação de regime, e-mail, contato NAF e PDF.

## 3. Atividades da equipe
| Integrante | Atividade planejada | Realizada? | Evidência (commit/PR/arquivo) |
|---|---|---|---|
| [nome] | [atividade] | [sim/não] | [URL ou caminho] |

## 4. Solução e implementação
[Descrever formulário, validação, chamada à API, cálculo, comparação, histórico e geração do PDF.]

### Estrutura do sistema
[Inserir diagrama de fluxo ou camadas e explicar React, API Express, Prisma e PostgreSQL.]

### Premissas tributárias
[Registrar tabela e fonte conferidas com o professor. Explicar hipótese de mensalidade constante para anualização do Fator R e a estimativa simplificada de INSS.]

## 5. Tecnologias
[Versões reais do React, React Router, Vite, Tailwind, Express, Prisma, PostgreSQL, html2pdf e Docker.]

## 6. Acessibilidade e responsividade
**Lighthouse Accessibility:** [nota]/100. **Data/build:** [informação].  
[Anexar evidência. Registrar verificação de 320 px, teclado, foco, rótulos, anúncios de erro e contraste.]

## 7. Dificuldades e limitações
[Problemas e soluções; pontos não implementados; necessidade de confirmar atividade/CNAE, receita de 12 meses, folha e demais particularidades.]

## 8. Conclusão
[Resumir a entrega e indicar, requisito por requisito, o que foi cumprido.]

## Referências
- Receita Federal, Tributação de 2026: https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2026
- Simples Nacional, Fator R: https://www8.receita.fazenda.gov.br/simplesnacional/noticias/NoticiaCompleta.aspx?id=415ad600-7d43-4e55-971b-55df99e95ef3
- [Outras referências consultadas e data de acesso]
