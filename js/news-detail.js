document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) return;

    const url = `https://07372dvbvs.microcms.io/api/v1/news/${id}`;
    const apiKey = 'zfFgx0n0t9tOJlidlCXEuMuUsvGf8PDRYh0u';

    fetch(url, {
        headers: {
            'X-MICROCMS-API-KEY': apiKey
        }
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById('newsDate').textContent =
                new Date(data.publishedAt).toLocaleDateString('ja-JP');

            document.getElementById('newsTitle').textContent = data.title;
            document.getElementById('newsBody').innerHTML = data.content;
        })
        .catch(err => {
            console.error('news detail error:', err);
        });
});