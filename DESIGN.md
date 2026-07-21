# VOXEL Digital Fabrication - Minimalist Design System & Guidelines (Apple-Inspired)

> Documentação oficial do sistema de design minimalista, tokens visuais, tipografia de grande escala, linha de progresso dinâmica, iluminação ambiente e **Transição Suave de Seções (Hero Mask Fade Out & Crossfade Zone)** da **VOXEL Digital Fabrication**.

---

## 1. Filosofia de Design: Distilled & Confident

Inspirado na estética minimalista da Apple, o sistema visual da VOXEL prioriza:

- **Uma Ideia por Seção**: O usuário foca em um conceito por vez em blocos verticais sequenciais.
- **Respiro Generoso**: Espaçamento amplo (`160px` a `180px` de padding em seções) tornando o espaço em branco um elemento de destaque.
- **Tipografia Grande & Direta**: Frases curtas e confiantes sem parágrafos explicativos densos.
- **Eliminação de Ruído Gráfico**: Zero bordas pesadas, caixas fechadas, linhas secas ou pontos brancos no gradiente de fundo.
- **Transição de Seções Invisível**: Transições contínuas em gradiente e crossfade de opacidade sem cortes secos entre blocos.

---

## 2. Paleta de Cores Reduzida & Consistência Absoluta

| Token | Valor Hex | Descrição & Aplicação |
| :--- | :--- | :--- |
| `--bg-main` | `#050505` | Preto profundo minimalista (aplicado a todas as seções sem variação) |
| `--bg-card` | `#0c0c0e` | Fundo de containers arredondados de alta elevação |
| `--text-bright` | `#ffffff` | Branco absoluto para títulos e números confiantes |
| `--text-primary` | `#f4f4f5` | Texto principal de leitura |
| `--text-muted` | `#a1a1aa` | Subtítulos e legendas em tom neutro suave |
| `--text-dim` | `#888894` | Marcações secundárias sutis |
| `--accent-cyan` | `#38bdf8` | Cor de acento única para botões ativos, acendimentos de nós e barras de carregamento |

---

## 3. Padrão de Transição de Seções: Fade de Saída & Zona de Crossfade

### 3.1 Máscara de Gradiente Inferior no Fundo Animado (`/impeccable colorize`)
- **Máscara CSS (`mask-image`)**: Aplicada a `.hero-fullbleed-canvas-wrapper` (`-webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 75%, transparent 100%);`), dissolvendo o canvas suavemente para o preto `#050505` nos últimos 25% da área.
- **Vinheta de Transição Ampla (`.hero-bottom-vignette`)**: Expandida para `220px` na base (`background: linear-gradient(to top, #050505 0%, rgba(5, 5, 5, 0.95) 45%, rgba(5, 5, 5, 0.5) 80%, transparent 100%);`), eliminando qualquer possibilidade de linha horizontal.

### 3.2 Zona de Crossfade entre Seções (`/impeccable animate`)
- **Sobreposição Suave de Margem**: A seção `#servicos` possui `margin-top: -60px; z-index: 5;` e um estado de fade dinâmico.
- **Crossfade nos 30% Finais do Scroll do Hero**: Enquanto o Hero completa os últimos 30% da sua trilha de scroll, a seção `#servicos` ganha opacidade de `0` a `1.0` de forma contínua, fazendo com que o título "SERVIÇOS DE MANUFATURA" surja de forma limpa sobre o término do fundo animado.

---

## 4. Padrões de Interatividade & Metodologia

### 4.1 Linha de Progresso Conectada na Metodologia
- **Conexão Dinâmica**: Linha horizontal ultra-fina conectando os passos `01` a `04` da seção Metodologia (`.timeline-track-bar`).
- **Preenchimento Progressivo**: Preenchimento GPU (`transform: scaleX`) acompanhando a rolagem do scroll.
- **Iluminação de Nós**: Cada nó e número acendem dinamicamente (`.activated`) em tom cyan com expansão de escala (`scale(1.3)`).

### 4.2 Animação de Fundo Contínua Global (60fps GPU)
- Gradientes radiais ultra-discretos de luz e acento cyan (`opacity: 0.02` a `0.03`) com animação `@keyframes ambientNebulaShift` de 45 segundos em loop infinito.
