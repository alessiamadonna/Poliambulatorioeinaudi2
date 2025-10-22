// ======================
// TERAPIE.JS (nessun eval, nessun inline script, compatibile CSP)
// ======================

// Sistema di navigazione categorie
const categoryCards = document.querySelectorAll('.category-card');
const categoryButtons = document.querySelectorAll('.category-btn');
const categoryGrid = document.getElementById('categoryGrid');
const categoryBar = document.getElementById('categoryBar');
const therapyContents = document.querySelectorAll('.therapy-content');

function showCategory(category) {
  // Nascondi grid iniziale
  categoryGrid.classList.add('collapsed');

  // Mostra barra categorie
  categoryBar.classList.add('active');

  // Aggiorna stati bottoni
  categoryButtons.forEach(btn => {
    if (btn.dataset.category === category) {
      btn.classList.add('active', category);
    } else {
      btn.classList.remove('active', 'fisica', 'test', 'alternative');
    }
  });

  // Mostra contenuto corrispondente
  therapyContents.forEach(content => {
    if (content.id === category) {
      content.classList.add('active');
    } else {
      content.classList.remove('active');
    }
  });

  // Scroll smooth alla sezione
  setTimeout(() => {
    categoryBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

// Click sulle card iniziali
categoryCards.forEach(card => {
  card.addEventListener('click', () => {
    const category = card.dataset.category;
    showCategory(category);
  });
});

// Click sui bottoni della barra
categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.category;
    showCategory(category);
  });
});

// Animazione hover per le card terapie
const therapyItems = document.querySelectorAll('.therapy-item');
therapyItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'translateX(15px) scale(1.02)';
  });

  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translateX(0) scale(1)';
  });
});

// Smooth scroll per navigation (solo anchor interni)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    // Non bloccare se il link contiene .html (link esterni)
    if (!this.href.includes('.html')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// ======================
// "Scopri di più" — contenuti diversi per card
// ======================

const DETAILS = {
  "fisioterapia": `
    <p><strong>Obiettivi:</strong> recupero funzionale post-infortunio e gestione del dolore.</p>
    <p><strong>Durata seduta:</strong> 45–60 minuti. <strong>Frequenza:</strong> 1–2 volte/settimana.</p>
    <p><strong>Metodi:</strong> terapia manuale, esercizi terapeutici, rieducazione motoria.</p>
  `,
  "podologia": `
    <p>Valutazione del passo e trattamenti per calli, unghie incarnite, ipercheratosi.</p>
    <p>Consulenza su plantari personalizzati e prevenzione.</p>
  `,
  "logopedia": `
    <p>Riabilitazione dei disturbi di linguaggio, voce, articolazione e deglutizione.</p>
    <p>Indicata per adulti e bambini. Percorsi personalizzati.</p>
  `,
  "test allergologici": `
    <p>Skin prick test e valutazioni cliniche per rinite, asma, dermatiti.</p>
    <p>Referto con indicazioni terapeutiche e prevenzione.</p>
  `,
  "programmi nutrizionali": `
    <p>Piani alimentari personalizzati su obiettivi (peso, performance, benessere).</p>
    <p>Educazione alimentare, diario e controlli periodici.</p>
  `,
  "test intolleranze alimentari": `
    <p>Valutazione reattività a specifici alimenti. Interpretazione clinica dei risultati.</p>
    <p>Eventuale rientroduzione controllata e piano nutrizionale dedicato.</p>
  `,
  "scleroterapia": `
    <p>Trattamento ambulatoriale per capillari e piccole varici.</p>
    <p>Protocollo su più sedute. Norme pre/post trattamento incluse.</p>
  `,
  "agopuntura": `
    <p>Supporto nel dolore cronico, stress, disordini funzionali.</p>
    <p>Sedute di 30–45 minuti; ciclo personalizzato.</p>
  `,
  "omeopatia": `
    <p>Approccio olistico centrato sulla persona, integrazione con stile di vita.</p>
    <p>Colloquio iniziale esteso e follow-up programmati.</p>
  `
};

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

document.querySelectorAll('.therapy-discover').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.therapy-item');
    const titleEl = item.querySelector('.therapy-info h3');
    const key = slugify(titleEl ? titleEl.textContent : '');

    // crea una sola extra-info per card, se non esiste
    let extra = item.querySelector('.therapy-info .extra-info');
    if (!extra) {
      extra = document.createElement('div');
      extra.className = 'extra-info';
      extra.innerHTML = DETAILS[key] || `<p>Dettagli in aggiornamento per: <em>${titleEl ? titleEl.textContent : ''}</em>.</p>`;
      const info = item.querySelector('.therapy-info');
      if (info) info.appendChild(extra);
    }

    const isVisible = extra.classList.toggle('visible');
    btn.textContent = isVisible ? 'Mostra meno' : 'Scopri di più';
    if (isVisible) {
      extra.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});
