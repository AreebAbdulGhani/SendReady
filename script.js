(() => {
  // Sticky nav shadow on scroll
  const nav = document.querySelector('nav');
  const onScroll = () => {
    if (window.scrollY > 8) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  const io = new IntersectionObserver(
    entries => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('shown');
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // How-it-works step switcher
  const steps = document.querySelectorAll('.step');
  const panes = document.querySelectorAll('.step-pane');
  const setStep = idx => {
    steps.forEach((s, i) => s.classList.toggle('active', i === idx));
    panes.forEach((p, i) => p.classList.toggle('active', i === idx));
  };
  steps.forEach((s, i) => {
    s.addEventListener('click', () => setStep(i));
    s.addEventListener('mouseenter', () => setStep(i));
  });

  // Auto-rotate through steps until user interacts
  let auto = 0;
  let userTouched = false;
  steps.forEach(s => s.addEventListener('click', () => (userTouched = true)));
  const tick = () => {
    if (userTouched) return;
    auto = (auto + 1) % steps.length;
    setStep(auto);
  };
  setInterval(tick, 2800);

  // Smooth scroll for in-page anchors (offset for sticky nav)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
})();
