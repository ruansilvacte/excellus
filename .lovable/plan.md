## Goal
Replicar fielmente o layout da imagem de referência (versão branco premium / champagne) para a homepage da Excellus Remodeling, com cada seção espelhando posicionamento, hierarquia tipográfica e detalhes visuais.

## O que já está alinhado com a referência
Header transparente com blur ao scroll, Hero cinematográfico com card glassmorphism flutuante + 3 stats + scroll indicator, seção Diferenciais (3 colunas com ícones dourados), Sobre (imagem com play + 4 stats + botão outline), Serviços (3 cards escuros com botão dourado circular).

## O que falta finalizar para bater 100% com a imagem

### 1. Imagens premium geradas
Gerar 3 imagens-chave em alta fidelidade no estilo editorial luxuoso (mansão moderna ao pôr do sol para hero, interior de luxo para Sobre, fundo de mármore branco para a seção de contato). Substituir os placeholders Unsplash atuais.

### 2. Galeria "Projetos que Inspiram"
Reescrever como showcase horizontal estilo revista de arquitetura: 4 imagens grandes lado a lado com proporções editoriais, setas circulares de navegação nas laterais (esquerda/direita), indicador de progresso dourado embaixo, hover com reveal sutil e zoom suave.

### 3. Seção de Contato "Pronto para Transformar Seu Imóvel?"
Reescrever em layout split (50/50) sobre fundo de mármore branco:
- Esquerda: eyebrow "Orçamento Premium", headline serif grande, parágrafo, e 3 mini-features com ícones dourados (Atendimento Personalizado, Orçamento Sem Compromisso, Resposta Rápida).
- Direita: card glassmorphism branco com inputs flutuantes (Nome, E-mail + Telefone em grid 2 colunas, Textarea), glow dourado no focus, CTA dourado full-width.

### 4. Footer editorial premium
Reescrever em fundo branco com 4 colunas (Logo+descrição, Navegação, Contato com ícones dourados, Áreas Atendidas em coluna única), divisórias sutis, tipografia refinada, copyright + Razão Social embaixo.

### 5. Refinamentos finais
Ajustar Index.tsx para incluir id `#galeria`, garantir que o `SeoHead` continue funcional, validar que o tema branco está aplicado em todos os pontos de contato e fazer QA visual responsivo (mobile 375px, tablet, desktop).

## Detalhes técnicos
- Tokens HSL semânticos já configurados em `index.css` (champagne `36 30% 97%`, dourado refinado `38 45% 52%`, fontes Cormorant Garamond + Inter).
- Componentes em `src/components/excellus/` continuam isolados; `Index.tsx` apenas orquestra.
- Validação Zod no formulário mantida; submit continua via `mailto:` para `remodeling@excellusgroup.com` (sem mudanças de back-end).
- Imagens geradas vão para `src/assets/` e importadas via ES6.
- Sem novas dependências; animações usando keyframes já adicionados (`animate-reveal`, `animate-float-slow`) + transições Tailwind.
