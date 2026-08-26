# ClimaHome Sustentável

Landing page institucional desenvolvida para a **ClimaHome Sustentável**, empresa de instalação e manutenção residencial de elétrica, energia solar, hidráulica e climatização em São Paulo/SP.

O objetivo do site é apresentar os serviços da empresa, exibir um portfólio de trabalhos realizados e direcionar o visitante para orçamento via WhatsApp, com o menor atrito possível entre o interesse e o contato.

## Sobre o projeto

Site estático, construído em HTML, CSS e JavaScript puros, sem frameworks ou processo de build. Essa escolha foi feita pela natureza do projeto: uma página institucional de divulgação, sem necessidade de backend, autenticação ou banco de dados — o que também reduz a superfície de ataque e simplifica hospedagem e manutenção.

## O que foi desenvolvido

- **Página principal** com hero em carrossel, seção de serviços, portfólio filtrável por categoria com lightbox, seção institucional, perguntas frequentes e formulário de contato
- **Formulário de contato sem backend**: monta a mensagem no próprio navegador e abre diretamente no WhatsApp, sem armazenar ou transmitir dados a nenhum servidor
- **Banner de cookies com consentimento prévio (opt-in)** para o Google Analytics, em conformidade com a LGPD
- **Página de política de privacidade** própria
- **SEO técnico**: meta tags, Open Graph, dados estruturados (JSON-LD) para negócio local e FAQ, `sitemap.xml` e `robots.txt`
- **Acessibilidade**: navegação por teclado, atributos ARIA e foco gerenciado nos componentes interativos (acordeões, lightbox, carrossel)

## Estrutura

```
.
├── index.html          # Página principal
├── privacidade.html    # Política de privacidade e cookies (LGPD)
├── styles.css           # Estilos
├── script.js            # Interatividade (carrossel, filtros, lightbox, cookies, formulário)
├── sitemap.xml
├── robots.txt
└── assets/               # Fotos, ícones e logos
```

## Stack

- HTML5 semântico
- CSS puro
- JavaScript vanilla, sem dependências
- Google Fonts (IBM Plex Sans, IBM Plex Mono, Space Grotesk)
- Google Analytics (GA4), carregado somente mediante consentimento

## Pendências para publicação

- Inserir o ID real da propriedade do Google Analytics (atualmente com placeholder)
- Confirmar e revisar as respostas do FAQ marcadas para validação com o cliente (área de cobertura, custo de visita técnica, emissão de nota fiscal, formas de pagamento, prazo de garantia)
- Definir domínio final e atualizar as URLs absolutas do projeto (meta tags, dados estruturados, sitemap e robots.txt)

## Privacidade

O site não coleta dados via formulário nem os armazena em servidor. O único dado tratado é de navegação, via Google Analytics, sempre condicionado ao consentimento do visitante no banner de cookies. Detalhes completos em [`privacidade.html`](./privacidade.html).

## Licença

Todo o conteúdo (textos, fotos e identidade visual) é de propriedade da ClimaHome Sustentável. Uso do código como referência é livre; reprodução do conteúdo ou das imagens para outros negócios não é autorizada.