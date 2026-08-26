# ClimaHome Sustentável

Landing page institucional para a **ClimaHome Sustentável**, empresa de instalação e manutenção residencial de elétrica, energia solar, hidráulica e climatização em São Paulo/SP.

Site estático (HTML, CSS e JavaScript puros, sem frameworks ou build step), pronto para deploy direto em qualquer hospedagem de arquivos estáticos.

## Funcionalidades

- **Hero com carrossel** de fotos autoplay, pausável no hover/foco
- **Cards de serviços** expansíveis (elétrica & climatização, energia solar, hidráulica & piscina)
- **Galeria de portfólio** filtrável por categoria, com lightbox navegável por teclado
- **FAQ em acordeão**
- **Formulário de contato** que monta a mensagem e abre diretamente no WhatsApp (sem backend, sem dados armazenados em servidor)
- **Banner de cookies com consent gate** para o Google Analytics (GA4), em conformidade com a LGPD
- **SEO**: meta tags, Open Graph, dados estruturados (JSON-LD) para negócio local e FAQ, `sitemap.xml` e `robots.txt`
- Botão flutuante de WhatsApp e links diretos de contato no rodapé

## Estrutura do projeto

```
.
├── index.html          # Página principal
├── privacidade.html     # Política de privacidade e cookies (LGPD)
├── styles.css           # Estilos (CSS puro)
├── script.js             # Interatividade (carrossel, filtros, lightbox, cookies, formulário)
├── sitemap.xml
├── robots.txt
└── assets/               # Fotos, ícones e logos
```

## Como rodar localmente

Não há dependências nem processo de build. Basta servir os arquivos estáticos:

```bash
# Opção 1: Python
python3 -m http.server 8000

# Opção 2: Node (npx)
npx serve .
```

Depois acesse `http://localhost:8000`.

> Abrir `index.html` direto no navegador (`file://`) também funciona, mas alguns comportamentos (como paths relativos) são mais confiáveis servindo por HTTP.

## Deploy

O projeto é 100% estático, então funciona em qualquer serviço de hospedagem de arquivos. Algumas opções:

**GitHub Pages**
1. Em Settings → Pages, selecione a branch `main` e a pasta raiz (`/`).
2. O site fica disponível em `https://<usuario>.github.io/<repositorio>/`.
3. Para domínio próprio, adicione um arquivo `CNAME` na raiz com o domínio desejado e configure o DNS (registro `CNAME` apontando para `<usuario>.github.io`, ou registros `A` para os IPs do GitHub Pages).

**Netlify / Vercel**
1. Importe o repositório diretamente do GitHub.
2. Não é necessário configurar build command nem output directory — é um site estático puro (root = raiz do projeto).
3. Ambos oferecem HTTPS automático e permitem configurar domínio próprio depois direto no painel.

Independente da hospedagem escolhida, depois de configurar o domínio final é preciso atualizar as URLs absolutas fixas no projeto:
- `index.html`: `canonical`, tags Open Graph (`og:url`, `og:image`) e dados estruturados JSON-LD
- `privacidade.html`: `canonical`
- `sitemap.xml`
- `robots.txt` (linha do `Sitemap:`)

## Configuração pendente antes de publicar

- [ ] Substituir `G-XXXXXXXXXX` pelo ID real da propriedade do Google Analytics em `index.html` e `script.js`
- [ ] Confirmar e revisar as respostas do FAQ marcadas com `<!-- CONFIRMAR -->` em `index.html` (área de cobertura, custo de visita técnica, emissão de nota fiscal, formas de pagamento, prazo de garantia)
- [ ] Definir domínio final e atualizar as URLs absolutas (ver seção acima)

## Privacidade e cookies

O site não possui formulário de cadastro nem armazena dados em servidor — o formulário de contato apenas monta uma mensagem e abre o WhatsApp Web/App no dispositivo do visitante. O único dado coletado é de navegação, via Google Analytics, e apenas mediante consentimento explícito no banner de cookies (consent mode do GA4, com estado inicial `denied`). Detalhes completos em [`privacidade.html`](./privacidade.html).

## Stack

- HTML5 semântico
- CSS puro (sem pré-processador ou framework)
- JavaScript vanilla (sem dependências)
- Google Fonts (IBM Plex Sans, IBM Plex Mono, Space Grotesk)
- Google Analytics (GA4), carregado sob consentimento

## Licença

Todo o conteúdo (textos, fotos e identidade visual) é de propriedade da ClimaHome Sustentável. Uso do código como referência é livre; reprodução do conteúdo/imagens para outros negócios não é autorizada.
