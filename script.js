(function() {
    // Link de pagamento padrão (altere aqui)
    const linkPagamento = 'https://pay.kirvano.com/569c78c9-3f36-43d8-b0f4-75a8276827a4'; 

    function setButtonLink(btnId) {
      const btn = document.getElementById(btnId);
      if (btn) {
        btn.href = btn.getAttribute('data-payment-link') || linkPagamento;
      }
    }

    setButtonLink('buyHero');
    setButtonLink('buyBenefits');
    setButtonLink('buyFinal');
  })();

  (function () {
  // Link de pagamento padrão (altere aqui)
  const linkPagamento = "https://pay.kirvano.com/569c78c9-3f36-43d8-b0f4-75a8276827a4";

  function setButtonLink(btnId) {
    const btn = document.getElementById(btnId);
    if (btn) btn.href = btn.getAttribute("data-payment-link") || linkPagamento;
  }

  setButtonLink("buyHero");
  setButtonLink("buyBenefits");
  setButtonLink("buyFinal");

  // =========================
  // 1) REVEAL ON SCROLL
  // =========================
  const revealTargets = [
    ".hero-content",
    ".hero-mockup",
    ".section-title",
    ".benefit-item",
    ".highlight-quote-inner",
    ".preview-badge",
    ".preview-title",
    ".cover-card",
    ".proof-item",
    ".final-offer .badge",
    ".final-offer .section-title",
    ".final-offer .price",
    ".final-offer ul",
    "#buyFinal",
  ];

  const nodes = new Set();
  revealTargets.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => nodes.add(el));
  });

  // Classes base
  nodes.forEach((el) => el.classList.add("reveal"));

  // Stagger nos benefícios
  const benefitsWrap = document.querySelector(".benefits-vertical");
  if (benefitsWrap) benefitsWrap.classList.add("stagger");

  // Float/hover nos cards
  document.querySelectorAll(".cover-card, .proof-item").forEach((el) => {
    el.classList.add("float-card");
  });

  // Flutuação suave no mockup do hero
  const heroMockup = document.querySelector(".hero-mockup");
  if (heroMockup) heroMockup.classList.add("soft-float");

  // Botões com pulse (só o principal e o final)
  const buyHero = document.getElementById("buyHero");
  const buyFinal = document.getElementById("buyFinal");
  if (buyHero) buyHero.classList.add("pulse");
  if (buyFinal) buyFinal.classList.add("pulse");

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");

          // se for wrapper stagger, anima filhos em sequência
          if (entry.target.classList.contains("stagger")) {
            entry.target.classList.add("is-visible");
          }
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  // Observa os nós individuais
  nodes.forEach((el) => io.observe(el));
  // Observa wrapper dos benefícios
  if (benefitsWrap) io.observe(benefitsWrap);

  // =========================
  // 2) PARALLAX LEVE NO HERO MOCKUP
  // =========================
  let rafId = null;
  function onScrollParallax() {
    if (!heroMockup) return;

    const rect = heroMockup.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;

    // Progresso dentro da viewport (-1 a 1)
    const center = rect.top + rect.height / 2;
    const t = (center - vh / 2) / (vh / 2);
    const move = Math.max(-1, Math.min(1, t)) * 10; // px

    heroMockup.style.transform = `translateY(${move * -1}px)`;
  }

  function requestParallax() {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      onScrollParallax();
      rafId = null;
    });
  }

  window.addEventListener("scroll", requestParallax, { passive: true });
  window.addEventListener("resize", requestParallax);
  requestParallax();

  // =========================
  // 3) SPOTLIGHT SEGUINDO O MOUSE (HERO)
  // =========================
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.addEventListener(
      "mousemove",
      (e) => {
        const r = hero.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        hero.style.setProperty("--mx", `${x}%`);
        hero.style.setProperty("--my", `${y}%`);
      },
      { passive: true }
    );
  }

  // =========================
  // 4) MICRO-INTERAÇÃO: BENEFÍCIO “pula” ao entrar
  // =========================
  const benefitItems = document.querySelectorAll(".benefit-item");
  benefitItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.style.transform = "translateY(-3px)";
      item.style.transition = "transform .18s ease";
    });
    item.addEventListener("mouseleave", () => {
      item.style.transform = "";
    });
  });
})();
