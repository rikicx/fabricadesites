# Fábrica de Sites — home

React + Vite + TypeScript. Só a home. Sem CMS, login, dashboard ou backend.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b + vite build
npm run lint
npm run typecheck
```

---

## ⚠ 1. Número de WhatsApp — a única coisa que ativa todos os CTAs

**Arquivo:** `src/data/site.ts`
**Linha:** primeira propriedade do objeto `WHATSAPP`

```ts
export const WHATSAPP = {
  numero: '',   // ◀── AQUI
```

**Formato:** só dígitos, com código do país e DDD, sem espaços nem pontuação.

```
55 + DDD + número     →     "5511987654321"
```

Esse único valor alimenta seis pontos do site:

| Onde | Mensagem pré-preenchida (editável em `WHATSAPP.mensagens`) |
| --- | --- |
| CTA do header | `header` |
| CTA principal do hero | `hero` |
| CTA da seção Preço | `plano` |
| CTA final | `ctaFinal` |
| Botão flutuante | `flutuante` |
| Link do rodapé | `rodape` |

**Comportamento enquanto estiver vazio (proposital):**

- os botões aparecem em estado desabilitado com a etiqueta "WhatsApp pendente";
- o botão flutuante não é renderizado;
- em `npm run dev` aparece um aviso fixo no rodapé da tela.

Isso existe para impedir que o site vá ao ar com link morto. Preencheu o número, tudo volta ao normal sozinho — nenhuma outra alteração é necessária.

---

## ⚠ 2. Outras pendências

Todas concentradas em `src/data/site.ts`. Busque por `PENDENTE`.

| # | Item | Onde | Como resolver |
| --- | --- | --- | --- |
| 1 | Número de WhatsApp | `WHATSAPP.numero` | ver acima |
| 2 | Logo da marca | `src/components/primitives.tsx` → `.logo__mark` | hoje é um quadrado verde; trocar pelo monograma FS |
| 3 | Logos de clientes | `clientes[]` | pôr arquivos em `public/clientes/`, ajustar `logo`, marcar `placeholder: false` |
| 4 | Screenshots do portfólio | `projetos[]` | pôr prints em `public/projetos/`, ajustar `imagem`, `nome`, `link`, marcar `placeholder: false` |
| 5 | Condições comerciais | `plano.condicoes[]` | preencher `valor` e marcar `definido: true` — só aparece no site o que estiver definido |
| 6 | Respostas do FAQ | `faq[]` com `pendente: true` | revisar quando as condições comerciais forem decididas |
| 7 | Política de privacidade | `links.politicaPrivacidade` | trocar `#politica-de-privacidade` pela URL real |
| 8 | Ícone do WhatsApp | `public/whatsapp-icon.png` | substituir pelo PNG oficial (WhatsApp Brand Center), mesmo nome de arquivo |
| 9 | Escopo dos serviços | `servicos[]` | **rascunho de estrutura, não oferta fechada** — revisar nome, descrição e `inclui[]`; marcar `pendente: false` só no que vende hoje; apagar o que não faz |
| 10 | Quem conduz | `quemSomos.responsavel` | nome, papel, bio, foto — bloco invisível até `definido: true` |
| 11 | Números do estúdio | `quemSomos.numeros` | anos, projetos, cidade — item sem `valor` não é renderizado |
| 12 | Canais de contato | `contato.canais` | e-mail, horário, cidade — item sem `valor` não aparece |

A faixa de logos e os cards do portfólio mostram uma etiqueta tracejada "pendente" enquanto forem placeholders. As etiquetas somem sozinhas quando os dados reais entrarem.

---

## 3. Cor e tema

**Arquivo:** `src/styles/tokens.css`

O verde ácido é constante nos dois temas. O que muda é o papel que ele pode exercer:

- **tema escuro** — o verde pode ser texto (15.8:1 sobre o preto);
- **tema claro** — o verde **não pode ser texto**: verde ácido sobre off-white dá 1.15:1. Para texto no tema claro existe `--brand-text`, uma versão escurecida (5.9:1).

Para trocar a identidade depois, altere apenas dois valores:

```css
--brand: #c4f82a;       /* superfícies, preenchimentos, bordas, CTA */
--brand-text: #4b6800;  /* dentro de [data-theme='light'] — verde como texto */
```

O ritmo de bandas claras e escuras sobrevive à troca de tema: a classe `.inverted` inverte a polaridade da seção usando `--surface-inv` / `--fg-inv`, então a alternância continua existindo nos dois temas, só troca de lado.

---

## 4. Campo de pontos com holofote no cursor

`src/components/DotField.tsx` + bloco `.dotfield` em `src/styles/components.css`.

Duas camadas com a **mesma** grade de pontos. A de cima e mais forte e so aparece
dentro de uma mascara radial que segue o cursor — como a grade e identica nas
duas, o holofote nao desloca nada, so acende os pontos que ja estavam ali.

```tsx
<div className="qualquer-bloco has-dots">
  <DotField />
  ...conteudo...
</div>
```

`has-dots` cuida de `position: relative`, `overflow: hidden` e de manter o
conteudo acima dos pontos.

| Prop | Padrao | O que faz |
| --- | --- | --- |
| `gap` | `28` | distancia entre pontos, em px |
| `radius` | `420` | raio do holofote, em px |
| `base` | `0.14` | opacidade fora do holofote |
| `glow` | `0.38` | opacidade dentro do holofote |
| `ease` | `0.16` | 1 = colado no cursor, 0.1 = preguicoso |

A cor vem de `--dot-rgb`, definido por tema em `tokens.css` e invertido dentro
de `.inverted`. No CTA final ha um override fixo (`--dot-rgb: 11 11 10`) porque
o fundo e o verde da marca nos dois temas.

**Onde esta aplicado hoje:** seçao de processo (bloco fixado) e CTA final.

**Custo:** mover a mascara repinta a area da camada a cada frame. Por isso ela
fica confinada ao bloco, nunca full-page, e o movimento e interpolado. Se
travar em aparelho fraco, suba `ease` para `0.3` ou reduza `radius`.

Desligado em `pointer: coarse` e em `prefers-reduced-motion` — nesses casos
sobra a camada base estatica.

---

## 5. Páginas e rotas

| Rota | Arquivo | Estado |
| --- | --- | --- |
| `/` | `src/pages/Home.tsx` | completa |
| `/servicos` | `src/pages/Servicos.tsx` | ⚠ escopo dos serviços pendente |
| `/quem-somos` | `src/pages/QuemSomos.tsx` | ⚠ bloco "quem conduz" pendente |
| `/contato` | `src/pages/Contato.tsx` | ⚠ e-mail, horário e cidade pendentes |
| qualquer outra | `src/pages/NaoEncontrada.tsx` | 404 |

Roteamento com `react-router-dom` e `BrowserRouter` (URLs limpas, sem `#`).

**Deploy:** BrowserRouter exige que o servidor devolva `index.html` para
qualquer rota. Sem isso, abrir `fabricadesites.com/servicos` direto no
navegador dá 404. Já vão no projeto:

- `public/_redirects` — Netlify
- `vercel.json` — Vercel

Para Apache use `.htaccess` com `FallbackResource /index.html`; para nginx,
`try_files $uri /index.html`.

**Navegação:** `navegacao[]` em `site.ts` aceita rota (`/servicos`) e âncora
com rota (`/#como-funciona`). O componente `NavLink` resolve os dois casos, e
o `ScrollManager` cuida de rolar até a âncora **depois** que a rota nova
montou — sem ele, clicar em "Como funciona" estando em `/contato` navegaria
para a home e ficaria no topo.

**Formulário de contato:** não há backend. Os campos montam uma mensagem e
abrem o WhatsApp. Nada trafega para servidor nenhum — não há endpoint, não há
armazenamento e não há LGPD a tratar nesta etapa. Quando existir backend, o
ponto de troca é a função `texto` em `src/pages/Contato.tsx`.

---

## 6. Estrutura

```
src/
  data/site.ts            todo o conteúdo, links, preço e config
  hooks/index.ts          tema, reveal, scroll, parallax, visibilidade da aba
  components/
    primitives.tsx        Logo, Reveal, botões, toggle de tema
    Header.tsx            navegação fixa + menu mobile
    Hero.tsx              headline, palavra dinâmica, preço, CTAs, marca gráfica
    Clients.tsx           faixa de logos (marquee)
    Portfolio.tsx         cards assimétricos
    Process.tsx           seção fixada durante o scroll
    Sections.tsx          diferencial, por que, plano, FAQ, CTA final, rodapé
    DotField.tsx          campo de pontos por bloco (hero)
    DotBackdrop.tsx       campo de pontos global, fixed na viewport
    navigation.tsx        NavLink, ScrollManager, PageHero
    WhatsAppFab.tsx       botão flutuante
  pages/
    Home.tsx              composicao das secoes da home
    Servicos.tsx          catalogo + processo em lista + preco + FAQ
    QuemSomos.tsx         manifesto, principios, quem conduz
    Contato.tsx           canais + formulario que monta mensagem
    NaoEncontrada.tsx     404
  styles/
    tokens.css            cor, tipografia, espaçamento, temas
    base.css              reset, tipografia, foco, reduced-motion
    components.css        componentes
    sections.css          seções da home
    pages.css             páginas internas
```

Nenhum componente contém conteúdo hardcoded. Tudo vem de `src/data/site.ts`.

---

## 7. Movimento

Todas as animações usam `transform` e `opacity`. Nada bloqueia o scroll nativo.

- **Aba oculta:** o marquee e a palavra dinâmica pausam via `visibilitychange`.
- **`prefers-reduced-motion`:** durações vão a zero, o marquee vira faixa com scroll horizontal, a palavra dinâmica para na primeira palavra, os reveals ficam visíveis. A intenção visual permanece; só a implementação simplifica.
- **Mobile:** parallax de cursor desligado (`pointer: fine`), seção de processo deixa de ser fixada abaixo de 880px e vira lista empilhada.

---

## 8. O que foi validado e o que não foi

**Validado nesta máquina:**

- `npm run lint` — sem erros nem avisos;
- `npm run typecheck` e `tsc -b` — sem erros;
- `npm run build` — sucesso (CSS ~28 kB, JS ~171 kB / 54 kB gzip);
- contraste calculado numericamente em todos os pares de texto dos dois temas — todos ≥ 4.5:1 (`--fg-faint` e a cor do botão de WhatsApp foram corrigidos por reprovarem);
- HTML semântico: `main`, `header`, `footer`, `nav` com `aria-label`, headings em ordem, `aria-expanded`/`aria-controls` no menu e no FAQ, skip link, foco visível preservado.

**NÃO validado — precisa de navegador real:**

- render visual em desktop e em 390px de largura;
- ausência de scroll horizontal em telas estreitas;
- comportamento real da seção fixada durante o scroll;
- estados de hover e navegação por teclado na prática;
- `prefers-reduced-motion` ligado;
- desempenho em aparelho intermediário.

Rode `npm run dev` e valide esses seis pontos antes de qualquer publicação.
