// js/main.js
// ハンバーガーメニューの開閉制御

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.header__hamburger');
    const nav = document.getElementById('global-nav');
    const closeBtn = nav.querySelector('.header__close');
    const navLinks = nav.querySelectorAll('.header__nav-link');

    if (!hamburger || !nav) {
        return;
    }

    // ハンバーガーをクリックしたら開閉
    hamburger.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('header__nav--open');
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    // ×ボタンで閉じる
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            nav.classList.remove('header__nav--open');
            hamburger.setAttribute('aria-expanded', false);
        });
    }

    // リンクをクリックしたらページに飛ぶ＋メニューを閉じる
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // href が # の場合はページトップにスクロール
            const href = link.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            nav.classList.remove('header__nav--open');
            hamburger.setAttribute('aria-expanded', false);
        });
    });
});


// -------------------------------------
// Smooth scroll for menu sidebar links
// -------------------------------------
document.querySelectorAll('.menu-sidebar__list a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (!target) return;

        // スムーススクロール
        window.scrollTo({
            top: target.offsetTop - 20, // 上に少し余白を残す
            behavior: 'smooth'
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".menu-sidebar");
    const footer = document.querySelector("footer");

    if (!sidebar || !footer) return;

    // --------------------------------------------------------
    // ★ スクロール量で表示・非表示を決める（超シンプル版）
    // --------------------------------------------------------
    const SCROLL_SHOW = 10; // 10pxスクロールしたら表示
    const SCROLL_HIDE = 10; // 10px未満なら非表示

    function onScroll() {
        const scrollY = window.scrollY || window.pageYOffset;
        const footerTop = footer.getBoundingClientRect().top;

        // スクロールしたら表示
        if (scrollY > SCROLL_SHOW) {
            sidebar.classList.add("is-active");
        }

        // 上まで戻ったら非表示
        if (scrollY < SCROLL_HIDE) {
            sidebar.classList.remove("is-active");
        }

        // footerに重ならないようにする
        if (footerTop < window.innerHeight) {
            sidebar.classList.add("is-end");
        } else {
            sidebar.classList.remove("is-end");
        }
    }

    window.addEventListener("scroll", onScroll);
    onScroll();
});
document.addEventListener('DOMContentLoaded', () => {
    const nails = [
        './images/nail_01.png',
        './images/nail_02.png',
        './images/nail_03.png',
        './images/nail_04.png',
        './images/nail_05.png'
    ];

    const nailImg = document.querySelector('.mv-hand__nail');
    if (!nailImg) return;

    const randomIndex = Math.floor(Math.random() * nails.length);
    nailImg.src = nails[randomIndex];
});