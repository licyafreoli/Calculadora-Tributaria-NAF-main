# Integração com arquivos que já existem no repositório

Este pacote **não substitui nem inclui cópias** dos arquivos abaixo. As instruções servem para você mesclar as mudanças depois de abrir o fork original no VS Code. Preserve o que já existe, principalmente autenticação, histórico, mensagens de e-mail/contato e estilos.

## Arquivos que exigem alteração manual

### `backend/src/controllers/calculoController.js`
- Importe `calcularComparativo` e `gerarPontosEquilibrio` de `../services/calculoTributario`.
- Acrescente um método público de simulação que devolva `{ resultado }` sem salvar no histórico.
- Acrescente o método do gráfico que devolva `{ pontos }`.
- Preserve `create` e `history`; adapte o salvamento para persistir folha/pró-labore, Fator R e anexo quando o schema estiver atualizado.
- Não substitua o controlador inteiro sem comparar com a versão do fork.

### `backend/src/routes/calculoRoutes.js`
- Preserve as rotas existentes.
- Cadastre `POST /simular` e `POST /equilibrio` antes de `router.use(auth)`, para permitir simulação sem login conforme o fluxo do kit.
- Mantenha as rotas de histórico e gravação depois da autenticação.

### `backend/src/server.js`
- Registre a rota nova do chatbot: `app.use('/chat', require('./routes/chatRoutes'))`.
- Mantenha middlewares, CORS e demais rotas existentes.

### `backend/prisma/schema.prisma`
- Dentro do modelo `Calculo`, acrescente os campos opcionais `folhaMensal Float?`, `fatorR Float?` e `anexoPJ String?`.
- Gere uma migração no ambiente do projeto e valide-a antes de publicar.

### `frontend/src/App.jsx`
- Acrescente os imports e rotas para `Simulador`, `FAQ`, `Sobre` e `NotFound`.
- Preserve login/cadastro/recuperação e outras rotas já existentes.
- Faça `/comparativo` voltar ao formulário quando não houver simulação salva.
- Coloque a barra de navegação de modo consistente em todas as páginas.

### `frontend/src/Pages/Comparativo.jsx`
- É arquivo existente: **não está neste pacote**.
- Mescle os requisitos do relatório PDF do kit: identificação NAF/Universidade Christus; data/hora; aviso de estimativa; gráfico PF × PJ; memória de cálculo; percentual do Fator R e anexo quando aplicável.
- Importe e encaixe `PontoEquilibrio`, `Chatbot` e `VideosResultado` se a equipe optar por esses extras. O gráfico de ponto de equilíbrio é opcional e separado do gráfico PF × PJ obrigatório no PDF.
- Preserve o fluxo existente de e-mail/contato e confirme que ele realmente funciona antes de afirmar que uma mensagem foi enviada.

### `frontend/src/Pages/Historico.jsx`
- Mescle o botão e a função de exportação CSV do kit dentro da página atual; não crie uma segunda página de histórico.
- Preserve consultas, autenticação e apresentação existentes.

### `frontend/src/components/Navbar.jsx` e `frontend/src/index.css`
- Acrescente links para formulário, histórico, FAQ e Sobre nos menus desktop e mobile.
- O tema claro/escuro precisa de botão persistente e estilos de contraste. Não substitua a folha de estilos; mescle as regras.
- Mantenha navegação por teclado, foco visível e rótulos acessíveis.

### `frontend/vite.config.js`
- O PWA altera uma configuração existente: instale `vite-plugin-pwa` e mescle o plugin na lista atual.
- Use os ícones `frontend/public/pwa-192.svg` e `frontend/public/pwa-512.svg` deste pacote.
- O formulário pode abrir sem rede depois de configurado; o cálculo ainda depende do backend e da internet.

## Configurações locais que não devem ir ao GitHub

Para usar o chatbot, configure `OPENAI_API_KEY` e `OPENAI_MODEL` no arquivo local de ambiente do backend. Nunca coloque chave real no código React ou em arquivo commitado. A chamada ao serviço pode gerar custo.

## Conteúdo que depende da equipe/NAF

- Substitua `EMAIL_NAF_CONFIRMADO` em `frontend/src/Pages/Sobre.jsx` pelo e-mail validado pelo NAF.
- Coloque vídeos autorizados em `frontend/public/videos/` com os nomes descritos em `INSTRUCOES.md`.
- Complete a tabela do relatório com responsáveis, tarefas reais e links/evidências do GitHub.
- Registre a nota real da auditoria de acessibilidade; não invente nota ou teste.
