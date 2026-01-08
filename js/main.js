document.addEventListener('DOMContentLoaded', () => {

    initHamburger();
    initSidebar();
    initRandomNail();
    initNews();
    initFadeIn();

});

// ===============================
// ハンバーガーメニュー
// ===============================
function initHamburger() {
    const hamburger = document.querySelector('.header__hamburger');
    const nav = document.getElementById('global-nav');
    if (!hamburger || !nav) return;

    const closeBtn = nav.querySelector('.header__close');
    const navLinks = nav.querySelectorAll('.header__nav-link');

    hamburger.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('header__nav--open');
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    closeBtn?.addEventListener('click', () => {
        nav.classList.remove('header__nav--open');
        hamburger.setAttribute('aria-expanded', false);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('header__nav--open');
            hamburger.setAttribute('aria-expanded', false);
        });
    });
}

// ===============================
// サイドバー制御
// ===============================
function initSidebar() {
    const sidebar = document.querySelector('.menu-sidebar');
    const footer = document.querySelector('footer');
    if (!sidebar || !footer) return;

    const onScroll = () => {
        const scrollY = window.scrollY;
        const footerTop = footer.getBoundingClientRect().top;

        sidebar.classList.toggle('is-active', scrollY > 10);
        sidebar.classList.toggle('is-end', footerTop < window.innerHeight);
    };

    window.addEventListener('scroll', onScroll);
    onScroll();
}

// ===============================
// mv ネイル画像ランダム
// ===============================
function initRandomNail() {
    const nailImg = document.querySelector('.mv-hand__nail');
    if (!nailImg) return;

    const nails = [
        './images/nail_01.png',
        './images/nail_02.png',
        './images/nail_03.png',
        './images/nail_04.png',
        './images/nail_05.png'
    ];

    nailImg.src = nails[Math.floor(Math.random() * nails.length)];
}

// ===============================
// News 取得
// ===============================
function initNews() {
    const newsList = document.getElementById('newsList');
    if (!newsList) return;

    fetch('https://07372dvbvs.microcms.io/api/v1/news?limit=5&orders=-publishedAt', {
        headers: { 'X-MICROCMS-API-KEY': 'zfFgx0n0t9tOJlidlCXEuMuUsvGf8PDRYh0u' }
    })
        .then(res => res.json())
        .then(data => {
            data.contents.forEach(item => {
                const li = document.createElement('li');
                li.className = 'news__item';

                const date = new Date(item.publishedAt);
                const formattedDate =
                    `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;

                li.innerHTML = `
          <a href="news-detail.html?id=${item.id}" class="news__link">
            <span class="news__date">${formattedDate}</span>
            <span class="news__text">${item.title}</span>
          </a>
        `;

                newsList.appendChild(li);
            });
        });
}

// ===============================
// スクロール ふわっと表示
// ===============================
function initFadeIn() {
    const sections = document.querySelectorAll('main section');
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-show');
                entry.target.querySelectorAll('*').forEach(el => {
                    el.classList.add('is-show');
                });
                obs.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -15% 0px'
    });

    sections.forEach(section => observer.observe(section));
}