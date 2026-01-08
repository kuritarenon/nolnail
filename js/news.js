// news.js

document.addEventListener('DOMContentLoaded', () => {
    fetchNewsList();
});

// ----------------------------
// News 取得
// ----------------------------
function fetchNewsList() {
    const url = 'https://07372dvbvs.microcms.io/api/v1/news?orders=-publishedAt';
    const apiKey = 'zfFgx0n0t9tOJlidlCXEuMuUsvGf8PDRYh0u';

    const newsList = document.getElementById('newsList');
    if (!newsList) return;

    fetch(url, {
        headers: { 'X-MICROCMS-API-KEY': apiKey }
    })
        .then(res => res.json())
        .then(data => {
            renderNewsList(data.contents, newsList);
            initFadeIn(); // ← 描画後に fade
        })
        .catch(err => console.error(err));
}

// ----------------------------
// 描画
// ----------------------------
function renderNewsList(contents, newsList) {
    contents.forEach(item => {
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

    initFadeIn();
}

// ----------------------------
// fade-in（news list 用）
// ----------------------------
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
        rootMargin: '0px 0px -20% 0px',
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));
}