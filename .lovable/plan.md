## Reposicionar e remodelar a constelação em /memorias

Dois ajustes combinados em `src/routes/memorias.tsx`: enquadramento vertical mais compacto **e** uma nova forma para a constelação.

### 1. Enquadramento vertical

- Trocar `aspect-[16/10] w-full` por `w-full max-w-3xl h-[clamp(320px,52vh,520px)]`, mantendo `viewBox="0 0 100 62.5"` (o SVG centraliza sozinho).
- Reduzir `mt-16` → `mt-10` e `py-24` → `py-20` na section.
- Trocar o cálculo `top: ${m.y / 0.625}%` por `top: ${m.y * (100/62.5)}%` (equivalente, mas explícito agora que a altura não vem mais do aspect ratio).
- Resultado: a constelação fica visualmente "abraçada" pela frase "Cada estrela aqui é uma lembrança…" acima e pelo link "O que eu amo em você" abaixo, na mesma tela em desktops comuns.

### 2. Nova forma da constelação

Reescrever as coordenadas `x, y` das 8 memórias para desenhar uma constelação com mais intenção poética — uma curva ascendente em arco aberto (como uma trajetória de voo, ecoando o avião do Pequeno Príncipe), com a estrela #8 ("3 anos / hoje") como ponto mais alto e luminoso à direita, e a #1 ("O primeiro olhar") ancorando o canto inferior esquerdo.

Coordenadas novas (mantendo o sistema 0–100 em x e 0–62.5 em y do viewBox):

| # | Memória | x | y |
|---|---|---|---|
| 1 | O primeiro olhar | 10 | 50 |
| 2 | A primeira viagem | 22 | 38 |
| 3 | A noite das estrelas | 34 | 26 |
| 4 | Um café às pressas | 44 | 42 |
| 5 | A conversa difícil | 56 | 30 |
| 6 | Aquele abraço | 64 | 46 |
| 7 | Risadas no carro | 76 | 32 |
| 8 | 3 anos | 88 | 18 |

Características do novo desenho:
- Arco ascendente da esquerda inferior à direita superior, com pequenas oscilações verticais que dão ritmo (sobe-desce-sobe), evitando uma curva mecânica.
- Distâncias entre estrelas vizinhas ficam entre 12 e 18 unidades — abaixo do limite de 30 usado para desenhar linhas de conexão, então o arco se conecta naturalmente como uma constelação contínua, em vez do emaranhado denso atual.
- Estrela #8 destacada no topo direito, reforçando narrativamente o "hoje" como ápice da jornada.

Nada mais muda: texto, datas, paleta, tipografia, animações de entrada, modal, `SectionTransition` — todos preservados.

### Arquivos afetados

- `src/routes/memorias.tsx` (único)