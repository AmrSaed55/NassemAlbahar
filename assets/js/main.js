const searchInput = document.querySelector('.navbar .search .search-input');
const searchBtn = document.querySelector('.navbar .search .search-icon');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar .nav-link');
const navButton = document.querySelector('.navbar .btn');
const navLogo = document.querySelector('.navbar .logo');
const navToggleBtn = document.querySelector('.navbar .navbar-toggler');

// ============================================================== auto typed js
let strings = [
  'We are a specialized online platform for hotels, offering an easy, secure, and transparent experience for comfortable stays without the hassle of lengthy searches or limitations. We gather the best hotel options in one place.',
];
if (
  location.pathname === '/index.html' ||
  location.pathname === '/' ||
  location.pathname === '/D:/Websites/GSAP/NassemAlbaharGSAP/index.html' ||
  location.pathname === '/NassemAlbahar/'
) {
  var typed = new Typed('#typed', {
    strings,
    typeSpeed: 10,
    backSpeed: 500,
    backDelay: 500,
    loop: false,
    showCursor: true,
  });
}
// ============================================================== Start Profile Table

// ============================================================== Start statistic table number counter
document.onscroll = () => {
  if (window.scrollY > 300) {
    const counters = document.querySelectorAll('.stat');

    const animateCount = (el, duration = 2000) => {
      const target = Number(el.dataset.target || 0);
      const suffix = el.dataset.suffix || '';
      const start = 0;
      const startTime = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(start + (target - start) * progress);
        el.textContent = value + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          if (el.dataset.done) return;
          el.dataset.done = '1';
          animateCount(el);
          obs.unobserve(el);
        });
      },
      { threshold: 0.4 },
    );

    counters.forEach((c) => observer.observe(c));
  }
};
// ============================================================== End statistic table number counter

searchBtn.addEventListener('click', () => {
  searchInput.classList.toggle('search-open');
});

document.body.onscroll = () => {
  if (window.scrollY > 200) {
    navbar.style.backgroundColor = 'var(--main-blue-color)';
    navbar.classList.add('shadow', 'opacity-100');
    navbar.classList.remove('bg-opacity-25', 'bg-light');
    // navbar.style.border = '1px solid black';
    // navButton.style.backgroundColor = 'var(--main-blue-color)';
    // navButton.style.color = 'white';
    navButton.addEventListener('mouseenter', () => {
      navButton.style.backgroundColor = 'var(--orange-color)';
      // navButton.style.color = 'var(--orange-color)';
      navButton.style.transition = 'all 0.3s ease-in-out';
    });
    navButton.addEventListener('mouseleave', () => {
      navButton.style.backgroundColor = 'var(--white-color)';
      // navButton.style.color = 'var(--main-blue-color)';
    });
    // searchBtn.style.color = 'var(--main-blue-color)';
    // searchInput.style.backgroundColor = '#a1a1a173';
    navLinks.forEach((link) => {
      if (!link.classList.contains('active')) {
        link.style.color = 'white';
      } else if (link.classList.contains('active')) {
        link.classList.add('active');
      } else {
        return;
      }
      navLinks.forEach((link) => {
        link.addEventListener('mouseenter', () => {
          navLinks.forEach((link) => {
            if (!link.classList.contains('active')) {
              link.style.color = 'white';
            } else {
              return;
            }
          });
          link.style.color = 'var(--orange-color)';
        });

        link.addEventListener('mouseleave', () => {
          if (
            !link.style.color == 'var(--orange-color)' ||
            !link.classList.contains('active')
          ) {
            link.style.color = 'white';
          }
        });
      });
    });
  } else {
    navToggleBtn.style.color = 'white';
    navbar.classList.remove('bg-white', 'shadow', 'opacity-100');
    navbar.classList.add('bg-opacity-25', 'bg-light');
    navLinks.forEach((link) => {
      if (!link.classList.contains('active')) {
        link.style.color = 'white';
      } else if (link.classList.contains('active')) {
        link.classList.add('active');
      } else {
        return;
      }
    });
    navLinks.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        navLinks.forEach((link) => {
          if (!link.classList.contains('active')) {
            link.style.color = 'white';
          } else {
            return;
          }
        });
        link.style.color = 'var(--orange-color)';
        link.style.transition = 'all 0.3s ease-in-out';
      });

      link.addEventListener('mouseleave', () => {
        if (
          !link.style.color === 'var(--main-blue-color)' ||
          !link.classList.contains('active')
        ) {
          link.style.color = 'white';
        }
      });
    });
    navButton.style.backgroundColor = 'var(--white-color)';
    navButton.style.color = 'var(--main-blue-color)';
    navButton.addEventListener('mouseenter', () => {
      navButton.style.backgroundColor = 'var(--main-blue-color)';
      navButton.style.color = 'var(--white-color)';
    });
    navButton.addEventListener('mouseleave', () => {
      navButton.style.backgroundColor = 'var(--white-color)';
      navButton.style.color = 'var(--main-blue-color)';
    });
    searchBtn.style.color = 'white';
    searchInput.style.backgroundColor = 'white';
  }
};

// ===== Sample Data =====
if (
  location.pathname === '/profile.html' ||
  location.pathname === '/D:/Websites/GSAP/NassemAlbaharGSAP/profile.html'
) {
  const orders = Array.from({ length: 52 }, (_, i) => {
    const statuses = ['Verified', 'Ongoing', 'On Hold'];
    const status = statuses[i % 3];
    return {
      id: i + 1,
      orderNumber: '#75442',
      date: '16 Feb 2026',
      roomName: 'Luxury Room',
      price: 250.0,
      currency: 'R.S',
      status,
    };
  });

  // ===== State =====
  const state = {
    query: '',
    page: 1,
    pageSize: 10,
    sortKey: null,
    sortDir: 'asc',
    selected: new Set(),
  };

  // ===== DOM =====
  const dtBody = document.getElementById('dtBody');
  const ordersCards = document.getElementById('ordersCards');

  const dtSearch = document.getElementById('dtSearch');
  const dtPrev = document.getElementById('dtPrev');
  const dtNext = document.getElementById('dtNext');

  const dtRangeText = document.getElementById('dtRangeText');
  const dtRangeTextMobile = document.getElementById('dtRangeTextMobile');

  const dtPager = document.getElementById('dtPager');
  const dtPageSize = document.getElementById('dtPageSize');
  const dtSelectAll = document.getElementById('dtSelectAll');

  const dtPrintBtn = document.getElementById('dtPrintBtn');
  const dtDownloadAllBtn = document.getElementById('dtDownloadAllBtn');
  const dtFilterBtn = document.getElementById('dtFilterBtn');

  // ===== Helpers =====
  function statusBadge(status) {
    if (status === 'Verified')
      return `<span class="badge-soft badge-verified">Verified</span>`;
    if (status === 'Ongoing')
      return `<span class="badge-soft badge-ongoing">Ongoing</span>`;
    return `<span class="badge-soft badge-hold">On Hold</span>`;
  }

  function matchesQuery(order, q) {
    if (!q) return true;
    const hay =
      `${order.orderNumber} ${order.date} ${order.roomName} ${order.price} ${order.status}`.toLowerCase();
    return hay.includes(q.toLowerCase());
  }

  function compare(a, b, key, dir) {
    let va = a[key],
      vb = b[key];
    if (key === 'price') {
      va = Number(va);
      vb = Number(vb);
    }
    if (typeof va === 'string') {
      va = va.toLowerCase();
      vb = vb.toLowerCase();
    }

    if (va < vb) return dir === 'asc' ? -1 : 1;
    if (va > vb) return dir === 'asc' ? 1 : -1;
    return 0;
  }

  function getViewData() {
    let filtered = orders.filter((o) => matchesQuery(o, state.query));
    if (state.sortKey)
      filtered.sort((a, b) => compare(a, b, state.sortKey, state.sortDir));

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / state.pageSize));
    state.page = Math.min(state.page, totalPages);

    const startIdx = (state.page - 1) * state.pageSize;
    const endIdx = Math.min(startIdx + state.pageSize, total);

    return {
      rows: filtered.slice(startIdx, endIdx),
      total,
      totalPages,
      startIdx,
      endIdx,
    };
  }

  function renderPager(totalPages) {
    dtPager.innerHTML = '';

    const windowSize = 5;
    let start = Math.max(1, state.page - Math.floor(windowSize / 2));
    let end = Math.min(totalPages, start + windowSize - 1);
    start = Math.max(1, end - windowSize + 1);

    // optional: first
    if (start > 1) {
      dtPager.appendChild(pageItem(1, state.page === 1));
      if (start > 2) dtPager.appendChild(ellipsisItem());
    }

    for (let p = start; p <= end; p++)
      dtPager.appendChild(pageItem(p, p === state.page));

    // optional: last
    if (end < totalPages) {
      if (end < totalPages - 1) dtPager.appendChild(ellipsisItem());
      dtPager.appendChild(pageItem(totalPages, state.page === totalPages));
    }
  }

  function pageItem(p, active) {
    const li = document.createElement('li');
    li.className = `page-item ${active ? 'active' : ''}`;
    li.innerHTML = `<button class="page-link" type="button">${p}</button>`;
    li.querySelector('button').addEventListener('click', () => {
      state.page = p;
      render();
    });
    return li;
  }

  function ellipsisItem() {
    const li = document.createElement('li');
    li.className = 'page-item disabled';
    li.innerHTML = `<span class="page-link">…</span>`;
    return li;
  }

  function updateSortIndicators() {
    document
      .querySelectorAll('[data-sort-indicator]')
      .forEach((el) => (el.textContent = ''));
    if (!state.sortKey) return;
    const indicator = document.querySelector(
      `[data-sort-indicator="${state.sortKey}"]`,
    );
    if (indicator) indicator.textContent = state.sortDir === 'asc' ? '▲' : '▼';
  }

  function syncSelectAll() {
    // Works for table view (md+)
    const { rows } = getViewData();
    if (!dtSelectAll) return;

    if (rows.length === 0) {
      dtSelectAll.checked = false;
      dtSelectAll.indeterminate = false;
      return;
    }
    const checkedCount = rows.filter((r) => state.selected.has(r.id)).length;
    dtSelectAll.checked = checkedCount === rows.length;
    dtSelectAll.indeterminate = checkedCount > 0 && checkedCount < rows.length;
  }

  function renderTableRows(rows) {
    dtBody.innerHTML = rows
      .map((o) => {
        const checked = state.selected.has(o.id) ? 'checked' : '';
        return `
              <tr>
                <td>
                  <input class="form-check-input dt-row-check" type="checkbox" data-id="${o.id}" ${checked} />
                </td>

                <td class="fw-semibold">${o.orderNumber}</td>

                <td class="d-none d-lg-table-cell">${o.date}</td>

                <td class="d-none d-lg-table-cell truncate">${o.roomName}</td>

                <td class="fw-semibold text-nowrap">${o.price.toFixed(2)} ${o.currency}</td>

                <td>${statusBadge(o.status)}</td>

                <td class="text-end col-actions">
                  <button class="btn btn-link text-decoration-none p-0 dt-download" data-id="${o.id}">
                    <i class="bi bi-download"></i>
                    <span class="d-none d-xl-inline ms-1">Download</span>
                  </button>
                </td>
              </tr>
            `;
      })
      .join('');

    // row checkbox
    document.querySelectorAll('.dt-row-check').forEach((chk) => {
      chk.addEventListener('change', (e) => {
        const id = Number(e.target.dataset.id);
        e.target.checked ? state.selected.add(id) : state.selected.delete(id);
        syncSelectAll();
      });
    });

    // download
    document.querySelectorAll('.dt-download').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = Number(btn.dataset.id);
        alert('Download order id: ' + id);
      });
    });
  }

  function renderCards(rows) {
    ordersCards.innerHTML = rows
      .map((o) => {
        const checked = state.selected.has(o.id) ? 'checked' : '';
        return `
              <div class="order-card bg-white p-3 mb-2">
                <div class="d-flex align-items-start justify-content-between gap-2">
                  <div class="d-flex align-items-center gap-2">
                    <input class="form-check-input dt-card-check mt-1" type="checkbox" data-id="${o.id}" ${checked} />
                    <div>
                      <div class="fw-semibold">${o.orderNumber}</div>
                      <div class="meta">${o.date}</div>
                    </div>
                  </div>
                  <div>${statusBadge(o.status)}</div>
                </div>

                <div class="kv mt-3">
                  <div class="k">Room</div><div class="v">${o.roomName}</div>
                  <div class="k">Price</div><div class="v fw-semibold">${o.price.toFixed(2)} ${o.currency}</div>
                </div>

                <div class="d-flex justify-content-between align-items-center mt-3">
                  <button class="btn btn-outline-secondary btn-sm dt-download" data-id="${o.id}">
                    <i class="bi bi-download me-1"></i> Download
                  </button>
                  <span class="text-muted small">ID: ${o.id}</span>
                </div>
              </div>
            `;
      })
      .join('');

    // card checkbox
    document.querySelectorAll('.dt-card-check').forEach((chk) => {
      chk.addEventListener('change', (e) => {
        const id = Number(e.target.dataset.id);
        e.target.checked ? state.selected.add(id) : state.selected.delete(id);
        syncSelectAll();
      });
    });

    // download
    document.querySelectorAll('.orders-cards .dt-download').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = Number(btn.dataset.id);
        alert('Download order id: ' + id);
      });
    });
  }

  function render() {
    const { rows, total, totalPages, startIdx, endIdx } = getViewData();

    const rangeText = `${total === 0 ? 0 : startIdx + 1} - ${endIdx} of ${total}`;
    dtRangeText.textContent = rangeText;
    dtRangeTextMobile.textContent = rangeText;

    // render both views; CSS decides which is visible
    renderCards(rows);
    renderTableRows(rows);

    dtPrev.disabled = state.page <= 1;
    dtNext.disabled = state.page >= totalPages;

    renderPager(totalPages);
    updateSortIndicators();
    syncSelectAll();
  }

  // ===== Events =====
  dtSearch.addEventListener('input', (e) => {
    state.query = e.target.value.trim();
    state.page = 1;
    render();
  });

  dtPrev.addEventListener('click', () => {
    state.page = Math.max(1, state.page - 1);
    render();
  });

  dtNext.addEventListener('click', () => {
    state.page = state.page + 1;
    render();
  });

  dtPageSize.addEventListener('change', (e) => {
    state.pageSize = Number(e.target.value);
    state.page = 1;
    render();
  });

  dtSelectAll.addEventListener('change', (e) => {
    const { rows } = getViewData();
    if (e.target.checked) rows.forEach((r) => state.selected.add(r.id));
    else rows.forEach((r) => state.selected.delete(r.id));
    render();
  });

  document.querySelectorAll('.dt-sort').forEach((th) => {
    th.addEventListener('click', () => {
      const key = th.dataset.key;
      if (state.sortKey === key)
        state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
      else {
        state.sortKey = key;
        state.sortDir = 'asc';
      }
      render();
    });
  });

  dtPrintBtn.addEventListener('click', () => window.print());

  dtDownloadAllBtn.addEventListener('click', () => {
    const ids = Array.from(state.selected);
    alert(
      ids.length ? `Download selected: ${ids.join(', ')}` : 'No selected rows',
    );
  });

  dtFilterBtn.addEventListener('click', () => {
    alert('Hook your filter modal here');
  });

  // ===== Init =====
  render();
}
// ============================================================== End Profile Table

// ============================================================== Start Luxury Table
const dashboard = document.querySelector('.rating-dashboard');

let started = false;

const animateDashboard = () => {
  if (started) return;
  started = true;

  // ===== Animate Progress Bars =====
  document.querySelectorAll('.metric-progress').forEach((bar) => {
    const value = bar.getAttribute('data-progress');
    const progressBar = bar.querySelector('.metric-bar');

    setTimeout(() => {
      progressBar.style.width = value + '%';
    }, 200);
  });

  // ===== Animate Metric Numbers =====
  document.querySelectorAll('.metric-value').forEach((el) => {
    const target = parseFloat(el.getAttribute('data-value'));
    let current = 0;

    const increment = target / 40;

    const counter = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.innerText = target.toFixed(1);
        clearInterval(counter);
      } else {
        el.innerText = current.toFixed(1);
      }
    }, 20);
  });

  // ===== Animate Main Score =====
  const scoreEl = document.querySelector('.score-number');
  const scoreTarget = parseInt(scoreEl.getAttribute('data-score'));
  let scoreCurrent = 0;

  const scoreCounter = setInterval(() => {
    scoreCurrent += 2;
    if (scoreCurrent >= scoreTarget) {
      scoreEl.innerText = scoreTarget;
      clearInterval(scoreCounter);
    } else {
      scoreEl.innerText = scoreCurrent;
    }
  }, 20);
};

// ===== Trigger on Scroll =====
if (
  location.pathname === '/luxuryDoubleSuit.html' ||
  location.pathname ===
    '/D:/Websites/GSAP/NassemAlbaharGSAP/luxuryDoubleSuit.html'
) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateDashboard();
        }
      });
    },
    { threshold: 0.3 },
  );

  observer.observe(dashboard);
}
// ============================================================== End Luxury Table

// ================================================================================== Start GSAP Animation
// =================================================================================  Home page
const landingContent = document.querySelector('.landing-content');
const knowUsLeftContent = document.querySelector('#know-us .section-content ');
const knowUsImg = document.querySelector('#know-us img');
const knowUsLabel = document.querySelector('#know-us .section-label');
const roomsCards = document.querySelectorAll('#rooms .rooms-cards');
const roomsBTN = document.querySelectorAll('#rooms .btn');
const roomsLable = document.querySelectorAll('#rooms .section-label');
const roomsH2 = document.querySelectorAll('#rooms h2');
const featuresGSAP = document.querySelectorAll('.features-gsap');
const featuresLabel = document.querySelectorAll('#our-features .section-label');
const featuresH2 = document.querySelectorAll('#our-features h2');
// =================================================================================  about page
const aboutUsBeutifulFeatures = document.querySelectorAll('.card-group');
const BeutifulFeaturesLabel = document.querySelectorAll(
  '#beautiful-features .section-label',
);
const partnersLabel = document.querySelectorAll('#partners .section-label');
// ========================================================================== booking page
const bookingLeftSide = document.querySelector('#booking-now .left-side');
// ========================================================================== forgot password page
const forgotPasswordLeftSide = document.querySelector(
  '#forgot-password .left-preview',
);
// ========================================================================== login & signup page
const loginRightImage = document.querySelector('.loginImageContainer img');
// ================================================================================= luxury double suit page
const similarRoomsLabel = document.querySelectorAll(
  '#similar-rooms .section-label',
);
const similarRoomsCards = document.querySelectorAll(
  '#similar-rooms .rooms-GSAP',
);
// ================================================================================= luxury rooms page
const luxuryRooms = document.querySelectorAll(
  '#luxury-rooms .luxury-rooms-gsap',
);
// ================================================================================= profile page
const viewTable = document.querySelector('#profile .table-responsive');
// ================================================================================= thank you page
const thankYouImage = document.querySelector('#thank-you img');
const thankYouH1 = document.querySelector('#thank-you h1');
const thankYouParagraph = document.querySelector('#thank-you p');

// =======================================  GSAP Animation
document.addEventListener('DOMContentLoaded', (event) => {
  // =========================================================== start home page
  gsap.registerPlugin(GSDevTools, ScrollTrigger);
  // gsap code here!
  gsap.from(landingContent, {
    autoAlpha: 0,
    x: 150,
    duration: 1.5,
  });
  gsap.from(knowUsLeftContent, {
    autoAlpha: 0,
    y: 180,
    duration: 1.5,
    ease: 'bounce.out',
    scrollTrigger: {
      trigger: knowUsLeftContent,
      start: 'top 80%', // لما العنصر يدخل 80% من الشاشة
      toggleActions: 'play reverse play reverse',
    },
  });
  gsap.from(knowUsImg, {
    autoAlpha: 0,
    y: -100,
    duration: 1.5,
    ease: 'bounce.out',
    scrollTrigger: {
      trigger: knowUsLeftContent,
      start: 'top 80%', // لما العنصر يدخل 80% من الشاشة
      toggleActions: 'play reverse play reverse',
    },
  });

  gsap.from(knowUsLabel, {
    autoAlpha: 0,
    y: -250,
    duration: 1,
    ease: 'bounce.out',
    scrollTrigger: {
      trigger: knowUsLeftContent,
      start: 'top 80%', // لما العنصر يدخل 80% من الشاشة
      toggleActions: 'play reverse play reverse',
    },
  });
  gsap.from(featuresGSAP, {
    autoAlpha: 0,
    y: 250,
    duration: 1.5,
    ease: 'bounce.out',
    scrollTrigger: {
      trigger: featuresGSAP,
      start: 'top 100%', // لما العنصر يدخل 80% من الشاشة
      toggleActions: 'play reverse play reverse',
    },
  });
  gsap.from(featuresLabel, {
    autoAlpha: 0,
    y: 250,
    duration: 1.5,
    ease: 'bounce.out',
    scrollTrigger: {
      trigger: featuresGSAP,
      start: 'top 100%', // لما العنصر يدخل 80% من الشاشة
      toggleActions: 'play reverse play reverse',
    },
  });
  gsap.from(featuresH2, {
    autoAlpha: 0,
    y: 250,
    duration: 1.5,
    ease: 'bounce.out',
    scrollTrigger: {
      trigger: featuresGSAP,
      start: 'top 100%', // لما العنصر يدخل 80% من الشاشة
      toggleActions: 'play reverse play reverse',
    },
  });
  gsap.from(roomsCards, {
    autoAlpha: 0,
    y: -250,
    duration: 1.5,
    ease: 'bounce.out',
    scrollTrigger: {
      trigger: roomsCards,
      start: 'top 80%', // لما العنصر يدخل 80% من الشاشة
      toggleActions: 'play reverse play reverse',
    },
  });
  gsap.from(roomsLable, {
    autoAlpha: 0,
    y: -250,
    duration: 1.5,
    ease: 'bounce.out',
    scrollTrigger: {
      trigger: roomsCards,
      start: 'top 80%', // لما العنصر يدخل 80% من الشاشة
      toggleActions: 'play reverse play reverse',
    },
  });
  gsap.from(roomsBTN, {
    autoAlpha: 0,
    y: -250,
    duration: 1.5,
    ease: 'bounce.out',
    scrollTrigger: {
      trigger: roomsCards,
      start: 'top 80%', // لما العنصر يدخل 80% من الشاشة
      toggleActions: 'play reverse play reverse',
    },
  });
  gsap.from(roomsH2, {
    autoAlpha: 0,
    y: -250,
    duration: 1.5,
    ease: 'bounce.out',
    scrollTrigger: {
      trigger: roomsCards,
      start: 'top 80%', // لما العنصر يدخل 80% من الشاشة
      toggleActions: 'play reverse play reverse',
    },
  });
  // ================================================================================ end home page
  // ================================================================================== Start about us page
  gsap.from(aboutUsBeutifulFeatures, {
    autoAlpha: 0,
    y: 150,
    duration: 1.5,
    ease: 'bounce.out',
    scrollTrigger: {
      trigger: aboutUsBeutifulFeatures,
      start: 'top 80%', // لما العنصر يدخل 80% من الشاشة
      toggleActions: 'play reverse play reverse',
    },
  });
  gsap.from(BeutifulFeaturesLabel, {
    autoAlpha: 0,
    x: -100,
    duration: 1.5,
    ease: 'bounce.out',
    scrollTrigger: {
      trigger: aboutUsBeutifulFeatures,
      start: 'top 80%', // لما العنصر يدخل 80% من الشاشة
      toggleActions: 'play reverse play reverse',
    },
  });
  gsap.from(partnersLabel, {
    autoAlpha: 0,
    x: -100,
    duration: 1.5,
    ease: 'bounce.out',
    scrollTrigger: {
      trigger: '.partners-wrapper',
      start: 'top 80%', // لما العنصر يدخل 80% من الشاشة
      toggleActions: 'play reverse play reverse',
    },
  });
  // ================================================================================== End about us page
  // ================================================================================== Start booking page
  gsap.from(bookingLeftSide, {
    autoAlpha: 0,
    x: 150,
    duration: 1.5,
    ease: 'bounce.out',
    scrollTrigger: {
      trigger: bookingLeftSide,
      start: 'top 80%', // لما العنصر يدخل 80% من الشاشة
      toggleActions: 'play reverse play reverse',
    },
  });
  // ================================================================================== End booking page
  // ================================================================================== Start forgot password page
  gsap.from(forgotPasswordLeftSide, {
    autoAlpha: 0,
    x: 150,
    duration: 1.5,
    ease: 'bounce.out',
    scrollTrigger: {
      trigger: forgotPasswordLeftSide,
      start: 'top 80%', // لما العنصر يدخل 80% من الشاشة
      toggleActions: 'play reverse play reverse',
    },
  });
  // ================================================================================== End forgot password page
  // ================================================================================== Start login page
  gsap.from(loginRightImage, {
    autoAlpha: 0,
    x: -150,
    duration: 1.5,
    ease: 'bounce.out',
    scrollTrigger: {
      trigger: loginRightImage,
      start: 'top 80%', // لما العنصر يدخل 80% من الشاشة
      toggleActions: 'play reverse play reverse',
    },
  });
  // ================================================================================== End login page
  // ================================================================================= Start luxury double suit page
  gsap.from(similarRoomsLabel, {
    autoAlpha: 0,
    x: -100,
    duration: 1.5,
    ease: 'bounce.out',
    scrollTrigger: {
      trigger: similarRoomsCards,
      start: 'top 80%', // لما العنصر يدخل 80% من الشاشة
      toggleActions: 'play reverse play reverse',
    },
  });
  gsap.from(similarRoomsCards, {
    autoAlpha: 0,
    y: -100,
    duration: 1.5,
    ease: 'bounce.out',
    scrollTrigger: {
      trigger: similarRoomsCards,
      start: 'top 80%', // لما العنصر يدخل 80% من الشاشة
      toggleActions: 'play reverse play reverse',
    },
  });
  // ================================================================================= End luxury double suit page
  // ================================================================================= Start luxury rooms page
  gsap.from(luxuryRooms, {
    autoAlpha: 0,
    y: -160,
    duration: 1.5,
    ease: 'bounce.out',
  });
  // ================================================================================= End luxury rooms page
  // ================================================================================= Start profile page
  gsap.from(viewTable, {
    autoAlpha: 0,
    y: -100,
    duration: 1.5,
    ease: 'bounce.out',
  });
  // ================================================================================= End profile page
  // ================================================================================= Start thank you page
  const ThnakYouTL = gsap.timeline();
  ThnakYouTL.from(thankYouImage, {
    rotate: -360,
    duration: 1,
    ease: 'bounce.out',
  });
  ThnakYouTL.from(thankYouH1, {
    autoAlpha: 0,
    // duration: 1,
    ease: 'power2.out',
  });
  ThnakYouTL.from(thankYouParagraph, {
    autoAlpha: 0,
    y: 50,
    // duration: 1,
    ease: 'bounce.out',
  });
  // GSDevTools.create();
});

// ================================================================================== End GSAP Animation

// ================== Start To Top Button

// Function to calculate scroll percentage
function getScrollPercentage() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = document.documentElement.clientHeight;

  // The total scrollable distance is the total height minus the viewport height
  const scrollableDistance = scrollHeight - clientHeight;

  if (scrollableDistance === 0) {
    return 0; // Avoid division by zero if the page isn't scrollable
  }

  const percentage = (scrollTop / scrollableDistance) * 100;
  return percentage;
}

// Function to show/hide the button
function toggleToTopButton() {
  const toTopBtn = document.querySelector('#btn-back-to-top');
  const scrollPercent = getScrollPercentage();
  const visibilityThreshold = 20; // Show the button after 20% of the page is scrolled

  if (scrollPercent >= visibilityThreshold) {
    toTopBtn.style.display = 'block';
  } else {
    toTopBtn.style.display = 'none';
  }
}

// Function to scroll to the top of the page
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // For smooth scrolling
  });
}

// Listen for the scroll event
window.addEventListener('scroll', toggleToTopButton);

// Initial check in case the page loads scrolled
toggleToTopButton();
// ================== End To Top Button
