let lastScrollTop = 0;
const navbar = document.getElementById('main-header');

window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Scrolling down
        navbar.classList.add('hidden');
        navbar.classList.remove('transparent');
    } else {
        // Scrolling up
        navbar.classList.remove('hidden');
        navbar.classList.add('transparent');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
});

// Lazy loading initialization
const lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazyload"
});

const template1 = (index) => `
    <div class="card">
        <img src="img/hp.png" alt="Card image ${index}" class="lazyload">
        <div class="card-content">
            <p>5 September 2022</p>
            <h3 class="ellipsis">Kenali Tingkatan Influencers berdasarkan Jumlah Followers</h3>
        </div>
    </div>
`;

const template2 = (index) => `
    <div class="card">
        <img src="img/rekam.jpg" alt="Card image ${index}" class="lazyload">
        <div class="card-content">
            <p>5 September 2022</p>
            <h3 class="ellipsis">Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer</h3>
        </div>
    </div>
`;
document.addEventListener("DOMContentLoaded", function() {
    const cardsContainer = document.querySelector('.cards-container');
    const totalCards = 100;

    for (let i = 1; i <= totalCards; i++) {
        // Menentukan template mana yang akan digunakan
        let cardHTML;
        if (i % 2 === 0) {
            cardHTML = template2(i);
        } else {
            cardHTML = template1(i);
        }

        // Menambahkan card ke dalam container utama
        cardsContainer.insertAdjacentHTML('beforeend', cardHTML);
    }
});

