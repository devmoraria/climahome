const asset = (name) => `assets/${name}`;
const assets = {
  hero: [
    { src: asset('climatizacao-instalacao.jpeg'), label: 'Ar-condicionado', target: '#servico-climatizacao', alt: 'Técnico instalando unidade interna de ar-condicionado' },
    { src: asset('solar-telhado.jpeg'), label: 'Energia Solar', target: '#servico-solar', alt: 'Painéis solares instalados em telhado residencial visto de cima' },
    { src: asset('hidraulica-piscina-01.jpeg'), label: 'Hidráulica & Piscina', target: '#servico-hidraulica', alt: 'Painel de controle de sauna instalado' },
  ],
};

const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // troque pelo ID real da propriedade

function loadAnalytics() {
  if (window.gaLoaded) return;
  window.gaLoaded = true;
  gtag('consent', 'update', { 'analytics_storage': 'granted' });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID);
}

const cookieBanner = document.getElementById('cookie-banner');
const cookieAccept = document.getElementById('cookie-accept');
const cookieDecline = document.getElementById('cookie-decline');
const cookieChoice = localStorage.getItem('cookie_consent');

if (cookieChoice === 'granted') {
  loadAnalytics();
} else if (cookieChoice !== 'denied') {
  cookieBanner.classList.add('is-visible');
  document.body.classList.add('has-cookie-banner');
}

cookieAccept.addEventListener('click', () => {
  localStorage.setItem('cookie_consent', 'granted');
  cookieBanner.classList.remove('is-visible');
  document.body.classList.remove('has-cookie-banner');
  loadAnalytics();
});

cookieDecline.addEventListener('click', () => {
  localStorage.setItem('cookie_consent', 'denied');
  cookieBanner.classList.remove('is-visible');
  document.body.classList.remove('has-cookie-banner');
});

const cookiePrefsLink = document.getElementById('cookie-prefs-link');
if (cookiePrefsLink) {
  cookiePrefsLink.addEventListener('click', () => {
    cookieBanner.classList.add('is-visible');
    document.body.classList.add('has-cookie-banner');
  });
}

const heroImage = document.querySelector('.hero-media img');
const heroBadge = document.querySelector('.hero-badge');
const heroDots = [...document.querySelectorAll('.hero-dot')];
const heroPrev = document.querySelector('.hero-prev');
const heroNext = document.querySelector('.hero-next');
heroImage.src = assets.hero[0].src;
heroImage.alt = assets.hero[0].alt;
let heroIndex = 0;

function showHero(index) {
  heroIndex = index % assets.hero.length;
  heroBadge.href = assets.hero[heroIndex].target;
  heroDots.forEach((dot, dotIndex) => dot.classList.toggle('is-active', dotIndex === heroIndex));
  heroImage.style.opacity = '0';
  setTimeout(() => {
    heroImage.src = assets.hero[heroIndex].src;
    heroImage.alt = assets.hero[heroIndex].alt;
    heroBadge.innerHTML = '<span class="tag">Ver Serviço</span> · ' + assets.hero[heroIndex].label;
    heroImage.style.opacity = '1';
  }, 180);
}

const heroMedia = document.querySelector('.hero-media');
let heroAutoplay = null;

function startHeroAutoplay() {
  if (heroAutoplay) return;
  heroAutoplay = setInterval(() => showHero(heroIndex + 1), 5000);
}
function stopHeroAutoplay() {
  clearInterval(heroAutoplay);
  heroAutoplay = null;
}

startHeroAutoplay();
heroMedia.addEventListener('mouseenter', stopHeroAutoplay);
heroMedia.addEventListener('mouseleave', startHeroAutoplay);
heroMedia.addEventListener('focusin', stopHeroAutoplay);
heroMedia.addEventListener('focusout', startHeroAutoplay);

heroPrev.addEventListener('click', () => { showHero((heroIndex - 1 + assets.hero.length) % assets.hero.length); stopHeroAutoplay(); startHeroAutoplay(); });
heroNext.addEventListener('click', () => { showHero(heroIndex + 1); stopHeroAutoplay(); startHeroAutoplay(); });
heroDots.forEach((dot) => dot.addEventListener('click', () => { showHero(Number(dot.dataset.slide)); stopHeroAutoplay(); startHeroAutoplay(); }));
heroBadge.addEventListener('click', () => {
  const targetCard = document.querySelector(assets.hero[heroIndex].target);
  if (!targetCard) return;
  targetCard.classList.add('is-open');
  targetCard.querySelector('button').setAttribute('aria-expanded', 'true');
});

document.querySelectorAll('.service-card>button').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.service-card');
    const open = card.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(open));
  });
});

document.querySelectorAll('.faq-item>button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const open = item.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(open));
  });
});

function applyGalleryFilter(filter) {
  document.querySelectorAll('.gallery figure').forEach((figure) => {
    figure.hidden = filter === 'all'
      ? figure.dataset.featured !== 'true'
      : figure.dataset.category !== filter;
  });
}

document.querySelectorAll('.filter-chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.filter-chip').forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-pressed', 'false');
    });
    chip.classList.add('active');
    chip.setAttribute('aria-pressed', 'true');
    applyGalleryFilter(chip.dataset.filter);
  });
});

applyGalleryFilter(document.querySelector('.filter-chip.active').dataset.filter);

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCloseButton = lightbox.querySelector('.lightbox-close');
const lightboxPrevButton = lightbox.querySelector('.lightbox-prev');
const lightboxNextButton = lightbox.querySelector('.lightbox-next');
let lightboxTrigger = null;

const closeLightbox = () => {
  lightbox.classList.remove('is-visible');
  if (lightboxTrigger) {
    lightboxTrigger.focus();
    lightboxTrigger = null;
  }
};

const visibleFigures = () => [...document.querySelectorAll('.gallery figure')].filter((figure) => !figure.hidden);

const showFigure = (figure) => {
  lightboxTrigger = figure;
  lightboxImage.src = figure.querySelector('img').src;
  lightboxImage.alt = figure.querySelector('figcaption').textContent;
};

const stepLightbox = (direction) => {
  const figures = visibleFigures();
  const currentIndex = figures.indexOf(lightboxTrigger);
  if (currentIndex === -1) return;
  const nextIndex = (currentIndex + direction + figures.length) % figures.length;
  showFigure(figures[nextIndex]);
};

document.querySelectorAll('.gallery figure').forEach((figure) => {
  figure.setAttribute('tabindex', '0');
  figure.setAttribute('role', 'button');
  const openFromFigure = () => {
    showFigure(figure);
    lightbox.classList.add('is-visible');
    lightboxCloseButton.focus();
  };
  figure.addEventListener('click', openFromFigure);
  figure.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openFromFigure();
    }
  });
});

lightboxPrevButton.addEventListener('click', () => stepLightbox(-1));
lightboxNextButton.addEventListener('click', () => stepLightbox(1));

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nome = document.getElementById('contact-nome').value.trim();
    const servico = document.getElementById('contact-servico').value;
    const local = document.getElementById('contact-local').value.trim();
    const descricao = document.getElementById('contact-descricao').value.trim();

    if (!nome || !servico || !local) {
      contactForm.reportValidity();
      return;
    }

    const linhas = [
      'Olá, ClimaHome! 👋',
      '',
      `Meu nome é *${nome}* e gostaria de solicitar um orçamento.`,
      '',
      `🔧 *Serviço:* ${servico}`,
      `📍 *Local:* ${local}`,
    ];
    if (descricao) linhas.push(`📝 *Detalhes:* ${descricao}`);
    linhas.push('', 'Aguardo o retorno, obrigado(a)!');

    const mensagem = encodeURIComponent(linhas.join('\n'));
    if (typeof gtag === 'function') {
      gtag('event', 'click_whatsapp', {
        event_category: 'contato',
        event_label: 'formulario_contato',
      });
    }
    window.open(`https://wa.me/5511922026867?text=${mensagem}`, '_blank', 'noopener');
  });
}

document.querySelectorAll('a[href^="https://wa.me/"]').forEach((link) => {
  link.addEventListener('click', () => {
    if (typeof gtag === 'function') {
      gtag('event', 'click_whatsapp', {
        event_category: 'contato',
        event_label: link.className || 'link_whatsapp',
      });
    }
  });
});

lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
lightboxCloseButton.addEventListener('click', closeLightbox);
const lightboxFocusable = [lightboxCloseButton, lightboxPrevButton, lightboxNextButton];

document.addEventListener('keydown', (event) => {
  if (!lightbox.classList.contains('is-visible')) return;
  if (event.key === 'Escape') {
    closeLightbox();
  } else if (event.key === 'ArrowLeft') {
    stepLightbox(-1);
  } else if (event.key === 'ArrowRight') {
    stepLightbox(1);
  } else if (event.key === 'Tab') {
    event.preventDefault();
    const currentIndex = lightboxFocusable.indexOf(document.activeElement);
    const direction = event.shiftKey ? -1 : 1;
    const nextIndex = (currentIndex + direction + lightboxFocusable.length) % lightboxFocusable.length;
    lightboxFocusable[nextIndex].focus();
  }
});
