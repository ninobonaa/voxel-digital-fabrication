/* ==========================================================================
   VOXEL DIGITAL FABRICATION - DESKTOP CANVAS ENGINE & STATIC MOBILE RUNTIME
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileDrawer();
  initModal();
  initProjectCarousel();
  initAppleScrollObserver();
  initMinimalTelemetryCounters();
  initProcessProgressTrack();
  initScrollScrubbedCanvas();
});

/* Mobile Drawer Logic */
function initMobileDrawer() {
  const mobileToggle = document.getElementById('mobileToggle');
  const closeDrawer = document.getElementById('closeDrawer');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('active');
    });
  }

  if (closeDrawer && mobileDrawer) {
    closeDrawer.addEventListener('click', () => {
      mobileDrawer.classList.remove('active');
    });
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer) mobileDrawer.classList.remove('active');
    });
  });
}

/* Modal Logic */
function initModal() {
  const modalBackdrop = document.getElementById('quoteModal');
  const closeModalBtn = document.getElementById('closeModal');
  const modalTriggers = document.querySelectorAll('[data-modal="quoteModal"]');
  const quoteForm = document.getElementById('quoteForm');
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('fileInput');
  const fileSelected = document.getElementById('fileSelected');
  const toast = document.getElementById('toast');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      if (modalBackdrop) modalBackdrop.classList.add('active');
    });
  });

  if (closeModalBtn && modalBackdrop) {
    closeModalBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
    });
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('active');
      }
    });
  }

  // File Dropzone interaction
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = '#ffffff';
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.style.borderColor = '';
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = '';
      if (e.dataTransfer.files.length > 0) {
        fileInput.files = e.dataTransfer.files;
        updateFileName(e.dataTransfer.files[0].name);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        updateFileName(fileInput.files[0].name);
      }
    });
  }

  function updateFileName(name) {
    if (fileSelected) {
      fileSelected.textContent = `✓ Arquivo selecionado: ${name}`;
    }
  }

  // Form Submission
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (modalBackdrop) modalBackdrop.classList.remove('active');
      quoteForm.reset();
      if (fileSelected) fileSelected.textContent = '';
      
      showToast('Solicitação enviada com sucesso!');
    });
  }

  function showToast(msg) {
    if (!toast) return;
    const toastMsg = document.getElementById('toastMsg');
    if (toastMsg) toastMsg.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }
}

/* Projects Carousel Logic */
function initProjectCarousel() {
  const projects = [
    {
      title: "Componentes de Engrenagens e Impulsor de Alta Tolerância",
      cat: "ENGENHARIA MECÂNICA",
      meta: "SLS Nylon PA12 | Tolerância ±0.05mm",
      img: "assets/project_gears.jpg"
    },
    {
      title: "Protótipo Funcional de Encaixe Snap-Fit Industrial",
      cat: "PROTOTIPAGEM RÁPIDA",
      meta: "SLA Resina Alta Temperatura | Ciclo 24 Horas",
      img: "assets/service_technical_parts.jpg"
    },
    {
      title: "Gabarito Técnico para Linha de Montagem Robótica",
      cat: "DISPOSITIVOS INDUSTRIAIS",
      meta: "FDM PETG Carbon Fiber | Peso Reduzido em 40%",
      img: "assets/service_special_projects.jpg"
    }
  ];

  let currentIndex = 0;
  const projectImg = document.getElementById('projectImg');
  const projectTitle = document.getElementById('projectTitle');
  const projectCat = document.getElementById('projectCat');
  const projectMeta = document.getElementById('projectMeta');
  const prevBtn = document.getElementById('prevProject');
  const nextBtn = document.getElementById('nextProject');

  function updateProject(index) {
    if (!projectImg || !projectTitle) return;
    
    projectImg.style.opacity = '0';
    projectImg.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
      projectImg.src = projects[index].img;
      projectTitle.textContent = projects[index].title;
      projectCat.textContent = projects[index].cat;
      projectMeta.textContent = projects[index].meta;
      
      projectImg.style.opacity = '1';
      projectImg.style.transform = 'scale(1)';
    }, 250);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % projects.length;
      updateProject(currentIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + projects.length) % projects.length;
      updateProject(currentIndex);
    });
  }
}

/* APPLE-STYLE SCROLL REVEAL OBSERVER (DESKTOP ONLY / INSTANT VISIBILITY ON MOBILE) */
function initAppleScrollObserver() {
  const isMobile = window.innerWidth <= 900 || window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  const elements = document.querySelectorAll('.scroll-reveal');

  if (isMobile) {
    elements.forEach(el => {
      el.classList.add('revealed');
    });
    return;
  }

  const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -30px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elements.forEach(el => {
    observer.observe(el);
  });
}

/* DESKTOP CANVAS SCROLL-SCRUBBING ENGINE (MOBILE RUNTIME: ZERO FRAME DOWNLOADS) */
function initScrollScrubbedCanvas() {
  const canvas = document.getElementById('scrollCanvas');
  const canvasLoader = document.getElementById('canvasLoader');
  const track = document.getElementById('heroScrollTrack');
  const wrapper = document.getElementById('canvasWrapper');
  const heroContent = document.getElementById('heroContent');
  const heroMetrics = document.getElementById('heroMetrics');
  const servicosSection = document.getElementById('servicos');

  if (!canvas || !track) return;

  const isMobile = window.innerWidth <= 900 || window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  // STRICT MOBILE ISOLATION: Instant Exit - ZERO frame downloads, ZERO scroll listeners attached!
  if (isMobile) {
    if (wrapper) wrapper.style.display = 'none';
    if (heroContent) {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'none';
    }
    if (heroMetrics) {
      heroMetrics.style.opacity = '1';
      heroMetrics.style.transform = 'none';
    }
    if (servicosSection) {
      servicosSection.style.opacity = '1';
    }
    return;
  }

  // DESKTOP ONLY PIPELINE
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = canvas.getContext('2d');
  const FRAME_COUNT = 60;
  const rawFrames = new Array(FRAME_COUNT);
  const bitmaps = new Array(FRAME_COUNT);
  let loadedCount = 0;

  if (canvasLoader) canvasLoader.classList.add('loading');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawFrame(currentFrameIndex);
  }

  window.addEventListener('resize', resizeCanvas, { passive: true });
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Load high-res desktop frames
  for (let i = 1; i <= FRAME_COUNT; i++) {
    const img = new Image();
    const index = i - 1;
    const frameNum = String(i).padStart(3, '0');
    img.src = `assets/frames/frame_${frameNum}.jpg`;

    img.onload = () => {
      rawFrames[index] = img;
      if (window.createImageBitmap) {
        createImageBitmap(img).then(bmp => {
          bitmaps[index] = bmp;
          onFrameReady();
        }).catch(() => {
          bitmaps[index] = img;
          onFrameReady();
        });
      } else {
        bitmaps[index] = img;
        onFrameReady();
      }
    };
  }

  function onFrameReady() {
    loadedCount++;
    if (loadedCount === 1) {
      drawFrame(0);
      updateScrollFrame();
    }
    if (loadedCount >= 8 && canvasLoader) {
      canvasLoader.classList.remove('loading');
    }
  }

  function drawFrame(index) {
    const source = bitmaps[index] || rawFrames[index];
    if (source) {
      const imgRatio = source.width / source.height;
      const canvasRatio = canvas.width / canvas.height;

      let renderWidth, renderHeight, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        renderWidth = canvas.width;
        renderHeight = canvas.width / imgRatio;
        offsetX = canvas.width * 0.18;
        offsetY = (canvas.height - renderHeight) / 2;
      } else {
        renderWidth = canvas.height * imgRatio;
        renderHeight = canvas.height;
        offsetX = (canvas.width - renderWidth) * 0.95;
        offsetY = 0;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(source, offsetX, offsetY, renderWidth, renderHeight);
    }
  }

  let currentFrameIndex = 0;

  if (isReducedMotion) {
    drawFrame(59);
    if (heroContent) { heroContent.style.opacity = '1'; heroContent.style.transform = 'none'; }
    if (heroMetrics) { heroMetrics.style.opacity = '1'; heroMetrics.style.transform = 'none'; }
    return;
  }

  function updateScrollFrame() {
    const rect = track.getBoundingClientRect();
    const maxScroll = track.offsetHeight - window.innerHeight;

    if (maxScroll <= 0) return;

    let progress = -rect.top / maxScroll;
    progress = Math.max(0, Math.min(1, progress));

    // Desktop Canvas Frame Scrubbing (0 to 59)
    const targetIndex = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));

    if (targetIndex !== currentFrameIndex) {
      currentFrameIndex = targetIndex;
      drawFrame(currentFrameIndex);
    }

    // Desktop Hero Content & Metrics: 0% opacity at scroll top (progress 0) -> 100% opacity when piece finishes materialization (progress 1.0)
    const textOpacityVal = Math.max(0, Math.min(1, progress));

    if (heroContent) {
      heroContent.style.opacity = textOpacityVal.toFixed(3);
    }

    if (heroMetrics) {
      heroMetrics.style.opacity = textOpacityVal.toFixed(3);
    }

    // Desktop Section Crossfade Zone (#servicos)
    if (servicosSection) {
      if (progress > 0.8) {
        const crossfadeProgress = Math.min(1, (progress - 0.8) / 0.2);
        servicosSection.style.opacity = crossfadeProgress.toFixed(3);
      } else if (progress <= 0.8 && rect.top <= 0) {
        servicosSection.style.opacity = '0';
      }
    }
  }

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScrollFrame();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  updateScrollFrame();
}

/* METODOLOGIA SCROLL PROGRESS FILL LINE */
function initProcessProgressTrack() {
  const timelineSection = document.getElementById('processTimeline');
  const progressFill = document.getElementById('progressFill');
  const steps = document.querySelectorAll('.process-step-clean');

  if (!timelineSection || !progressFill) return;

  function updateProgress() {
    const rect = timelineSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const startPoint = windowHeight * 0.8;
    const endPoint = windowHeight * 0.2;
    
    let progress = (startPoint - rect.top) / (rect.height + (startPoint - endPoint));
    progress = Math.max(0, Math.min(1, progress));

    progressFill.style.transform = `scaleX(${progress})`;

    const percentage = progress * 100;
    steps.forEach((step, idx) => {
      const stepMilestone = (idx / (steps.length - 1)) * 100;
      if (percentage >= stepMilestone - 5) {
        step.classList.add('activated');
      } else {
        step.classList.remove('activated');
      }
    });
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
}

/* TELEMETRY NUMERICAL COUNTERS ANIMATION */
function initMinimalTelemetryCounters() {
  const counterElements = [
    { id: 'countPrecisao', endVal: 0.05, decimals: 2, prefix: '±', suffix: 'mm' },
    { id: 'countPecas', endVal: 12000, decimals: 0, prefix: '+', suffix: '' }
  ];

  const observerOptions = { threshold: 0.5 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetId = entry.target.id;
        const config = counterElements.find(c => c.id === targetId);
        if (config) {
          animateCount(entry.target, config);
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counterElements.forEach(config => {
    const el = document.getElementById(config.id);
    if (el) observer.observe(el);
  });

  function animateCount(el, config) {
    let startTimestamp = null;
    const duration = 1800;

    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeVal = 1 - Math.pow(1 - progress, 4);
      const currentVal = easeVal * config.endVal;

      if (config.decimals > 0) {
        el.textContent = `${config.prefix}${currentVal.toFixed(config.decimals)}${config.suffix}`;
      } else {
        const formatted = Math.floor(currentVal).toLocaleString('pt-BR');
        el.textContent = `${config.prefix}${formatted}${config.suffix}`;
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }
}
