(function () {
  'use strict';

  /* ── CURSOR ── */
  const cur  = document.getElementById('cur');
  const ring = document.getElementById('cur-ring');
  if (!cur || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a, button, .proj-card, .conn-card, .course-item, .hn-tile, .hds-cell').forEach(el => {
    el.addEventListener('mouseenter', () => { cur.classList.add('hover'); ring.classList.add('hover'); });
    el.addEventListener('mouseleave', () => { cur.classList.remove('hover'); ring.classList.remove('hover'); });
  });

  /* ── SKILL BARS ── */
  const skillObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.sk-fill').forEach((bar, i) => {
        const w = parseFloat(bar.dataset.w || 1);
        setTimeout(() => {
          bar.style.transition = 'transform 1.2s cubic-bezier(0.4,0,0.2,1)';
          bar.style.transform  = `scaleX(${w})`;
        }, i * 55);
      });
      skillObs.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.skills-grid').forEach(el => skillObs.observe(el));

  /* ── SCROLL REVEAL ── */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ── LIVE CLOCK ── */
  const clockEl = document.getElementById('live-clock');
  function updateClock() {
    if (!clockEl) return;
    const now = new Date();
    clockEl.textContent = [now.getHours(), now.getMinutes(), now.getSeconds()]
      .map(n => String(n).padStart(2, '0')).join(':');
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* ── LIVE DATE ── */
  const dateEl = document.getElementById('live-date');
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = [now.getDate(), now.getMonth() + 1, now.getFullYear()]
      .map(n => String(n).padStart(2, '0')).join('/');
  }

  /* ── BARCODE BARS ── */
  document.querySelectorAll('.barcode-svg').forEach(svg => {
    svg.innerHTML = '';
    [1,.4,.7,.3,1,.5,.8,.4,.6,.3,.9,.5,.7,.4,1,.35,.75,.5,.9,.4,.6,.8,.3,.7,.5,.4,.9,.6].forEach(h => {
      const s = document.createElement('span');
      s.style.height = Math.round(h * 24) + 'px';
      svg.appendChild(s);
    });
  });

  /* ── CONTACT FORM ── */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      alert('To activate:\n1. Sign up free at formspree.io\n2. Create a form → copy your URL\n3. Set: <form action="YOUR_URL" method="POST">');
    });
  }

})();
