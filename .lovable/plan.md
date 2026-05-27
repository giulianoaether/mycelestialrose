## Nova forma da constelação em /memorias — coração atravessado

Trocar as coordenadas das 8 estrelas em `src/routes/memorias.tsx` para desenhar um **coração** (referência: imagem enviada). Mantenho a ideia da flecha implícita pelo posicionamento diagonal, mas com 8 pontos o foco é o coração — o algoritmo atual conecta automaticamente pares de estrelas com distância < 30, então os contornos do coração emergem naturalmente como linhas da constelação.

### Novas coordenadas (viewBox 0–100 × 0–62.5)

Ordem narrativa preservada (memória #1 → #8), começando pelo lobo esquerdo do coração e terminando na ponta inferior — o "hoje" como o ápice emocional, no fundo do coração.

| # | Memória | x | y | Posição no coração |
|---|---|---|---|---|
| 1 | O primeiro olhar | 30 | 12 | topo do lobo esquerdo |
| 2 | A primeira viagem | 18 | 20 | lateral externa esquerda |
| 3 | A noite das estrelas | 16 | 32 | meio esquerdo |
| 4 | Um café às pressas | 50 | 22 | centro/vale entre os lobos |
| 5 | A conversa difícil | 70 | 12 | topo do lobo direito |
| 6 | Aquele abraço | 82 | 20 | lateral externa direita |
| 7 | Risadas no carro | 84 | 32 | meio direito |
| 8 | 3 anos | 50 | 54 | ponta inferior do coração |

### Características

- Forma fechada de coração: lobos arredondados em cima, vale no centro (estrela #4), ponta única embaixo (#8).
- Distâncias entre vizinhos de contorno ficam ~12–22 (abaixo do limite de 30), garantindo que as linhas tracem o contorno do coração.
- A estrela #8 ("hoje") ancora a base — narrativamente, o ponto onde toda a história converge.
- Simétrica horizontalmente, ecoando a imagem de referência.

### Arquivos afetados

- `src/routes/memorias.tsx` — apenas o array `memories` (campos `x` e `y`). Texto, datas, tipografia, paleta, animações, modal, container e `SectionTransition` permanecem intactos.
