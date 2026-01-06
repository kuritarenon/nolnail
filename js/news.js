const url = 'https://07372dvbvs.microcms.io/api/v1/news?orders=-publishedAt';
const apiKey = 'zfFgx0n0t9tOJlidlCXEuMuUsvGf8PDRYh0u';

const newsList = document.getElementById('newsList');

fetch(url, {
    headers: {
        'X-MICROCMS-API-KEY': apiKey
    }
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
    })
    .catch(err => console.error(err));