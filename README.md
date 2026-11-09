# Futevôlei em casa

App de treino de futevôlei para celular: treinos A a F com aquecimento, análise de fundamentos, testes de habilidade, histórico e timer. Funciona offline e pode ser instalado na tela inicial (PWA).

Sem backend: os dados ficam no `localStorage` do aparelho. Na aba **Perfil** dá para **exportar e importar um backup em JSON**.

## Rodar localmente

```bash
python3 -m http.server 8000
```

Abra http://localhost:8000. O service worker só funciona em `localhost` ou HTTPS.

## Estrutura

| Arquivo | Função |
|---|---|
| `index.html` | Página |
| `app.css`, `app.js` | Estilos e lógica |
| `fonts/` | Figtree e Shantell Sans (locais) |
| `icons/` | Favicon e ícones do PWA |
| `manifest.webmanifest` | Instalação como app |
| `sw.js` | Cache offline |

## Publicar uma mudança

Suba `VERSION` em `sw.js` (ex.: `v1` para `v2`) para descartar o cache antigo nos aparelhos.

## Hospedagem (Vercel)

Site estático, sem build. `vercel.json` já define os cabeçalhos (o `sw.js` nunca fica em cache, fontes e ícones sim).

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # produção
```

Ou importe o repositório no painel da Vercel: Framework Preset **Other**, sem Build Command, sem Output Directory.
