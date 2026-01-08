// news-detail.js

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) return;

    fetchNewsDetail(id);
});

// ----------------------------
// 記事取得
// ----------------------------
function fetchNewsDetail(id) {
    const url = `https://07372dvbvs.microcms.io/api/v1/news/${id}`;
    const apiKey = 'zfFgx0n0t9tOJlidlCXEuMuUsvGf8PDRYh0u';

    fetch(url, {
        headers: { 'X-MICROCMS-API-KEY': apiKey }
    })
        .then(res => res.json())
        .then(renderNews)
        .catch(err => console.error('news detail error:', err));
}

// ----------------------------
// 描画
// ----------------------------
function renderNews(data) {
    document.getElementById('newsDate').textContent =
        new Date(data.publishedAt).toLocaleDateString('ja-JP');

    document.getElementById('newsTitle').textContent = data.title;
    document.getElementById('newsBody').innerHTML = data.content;

    // 描画後に fade-in 初期化
    initFadeIn();
}

// ----------------------------
// fade-in（news-detail専用）
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