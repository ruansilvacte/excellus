# Redesign Home — Estilo Piva Luxury / New Creation Home Solutions

Vou recriar a Home inteira espelhando o layout da imagem enviada (Piva Móveis), adaptando para o nicho de pisos da New Creation Home Solutions. Mantendo PT-BR e a paleta Navy `#07213D` + Dourado `#F9E68F`, com tipografia premium.

## Estrutura (espelhando a referência, de cima para baixo)

1. **Top bar fina vermelha/escura** com 3 selos:
   - "ORÇAMENTO SEM COMPROMISSO" · "ATENDIMENTO EM NJ · NY · PA" · "14 ANOS DE EXPERIÊNCIA"

2. **Navbar transparente glass** (logo à esquerda, menu central: Início · Serviços · Ambientes · Sobre Nós · Contato · ícones à direita: busca, telefone, orçamento)

3. **Hero Fullscreen cinematográfico**
   - Fundo: mansão moderna luxuosa à noite (Unsplash high-end)
   - Overlay gradiente escuro sofisticado (navy 90% → 30%)
   - Eyebrow dourado: "PISOS DE ALTO PADRÃO"
   - Headline gigante serif/Manrope display: **"FEITOS PARA TRANSFORMAR AMBIENTES"** com "TRANSFORMAR" em dourado itálico
   - Sub: 2 linhas curtas
   - CTA dourado pill "SOLICITAR ORÇAMENTO →"
   - 3 mini badges com ícones dourados lineares: Atendimento Personalizado · Projetos Exclusivos · Garantia de Qualidade

4. **Por Que Escolher** (fundo off-white)
   - Título centralizado com filete dourado abaixo
   - Grid 4 colunas, ícones quadrados navy com glyph dourado: Design Exclusivo · Materiais Premium · Entrega Garantida · Atendimento Humanizado

5. **Nossas Linhas / Especialidades** (Grid editorial assimétrico — bento)
   - Header com link "VER TODAS AS LINHAS →"
   - Layout exato da referência: 2 cards grandes em cima (Madeira, Vinílico), 3 cards menores embaixo (Cerâmica, Carpete, Acabamento)
   - Cada card: imagem cinematográfica, overlay gradient escuro, título serifado branco, descrição curta, "VER MAIS →"
   - Hover: zoom leve + glow dourado na borda

6. **Ambientes que Inspiram** (Masonry portfolio estilo revista de arquitetura)
   - Subtítulo: "Projetos reais, entregues com excelência"
   - Masonry assimétrico de 6-8 imagens ultra realistas de interiores
   - Botão central "VER MAIS PROJETOS →" estilo pill navy outline

7. **A Experiência New Creation** (4 colunas com ícones lineares dourados)
   - Projeto Personalizado · Acompanhamento Total · Tecnologia e Precisão · Satisfação Garantida

8. **Depoimentos premium** (3 cards minimalistas com aspas douradas grandes, estilo Apple/hotel de luxo)

9. **CTA Final cinematográfico**
   - Fundo escuro com imagem desfocada de interior + blur
   - Headline grande: "Pronto para transformar seu ambiente?"
   - Botão dourado pill "SOLICITAR ORÇAMENTO →"

10. **Footer minimalista premium** (4 colunas)
    - Coluna 1: logo + tagline + redes sociais (ícones circulares sutis)
    - Coluna 2: Institucional (Sobre, Projetos, Linhas, Contato)
    - Coluna 3: Atendimento (telefone, email, horário)
    - Coluna 4: Áreas Atendidas (NJ · NY · PA) + selos de pagamento opcional
    - Filete dourado fino + copyright centralizado

## Direção visual

- **Tipografia**: Headlines em serif display luxuoso (Cormorant Garamond ou similar) misturado com Manrope para títulos; corpo em Inter
- **Cores**: Navy `#07213D` dominante, Dourado `#C9A55B` (mais profundo, menos amarelo que o atual `#F9E68F`) para acentos, off-white `#F7F4EE` para seções claras
- **Animações** (Framer Motion):
  - Fade-up no scroll em cada seção
  - Parallax leve no hero
  - Hover cinematográfico nos cards (scale 1.03 + overlay darken)
  - Glow dourado sutil em CTAs
  - Transições com easing `[0.22, 1, 0.36, 1]`
- **Espaçamento**: muito respiro (py-32 em desktop), max-width 1280, gutters generosos

## Arquivos a editar/criar

- `src/index.css` — atualizar tokens: dourado mais profundo, adicionar fonte serif display, refinar gradientes
- `src/pages/Index.tsx` — adicionar TopBar antes do Header
- `src/pages/home/components/HomeTopBar.tsx` *(novo)* — barra superior fina
- `src/pages/home/components/HomeHeader.tsx` — glass effect, refinar
- `src/pages/home/components/HomeHero.tsx` — reescrever no estilo Piva
- `src/pages/home/components/HomeDifferentials.tsx` — refinar (Por Que Escolher)
- `src/pages/home/components/HomeServices.tsx` — bento assimétrico
- `src/pages/home/components/HomeGallery.tsx` — masonry editorial
- `src/pages/home/components/HomeExperience.tsx` *(novo)* — "A Experiência"
- `src/pages/home/components/HomeTestimonials.tsx` — aspas douradas premium
- `src/pages/home/components/HomeCta.tsx` — fundo cinematográfico
- `src/pages/home/components/HomeFooter.tsx` — refinar layout 4 colunas

## Conteúdo (PT-BR)

Adaptado para pisos: Madeira, Vinílico, Laminado, Cerâmica, Carpete, Acabamento. Áreas: NJ, NY, PA. Telefone/email placeholders mantidos.

Imagens: Unsplash de interiores luxuosos e pisos de alto padrão.
