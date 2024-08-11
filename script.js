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

document.addEventListener("DOMContentLoaded", function() {
    const cardsContainer = document.querySelector('.cards-container');
    const totalCards = 100;
    let cards = [];
    let originalCardsHTML = [];

    // Function to generate card HTML
    const generateCardHTML = (index) => {
        const date = index % 2 === 0 ? '2022-09-06' : '2022-09-05'; // Example dates
        const imgSrc = index % 2 === 0 ? 'img/rekam.jpg' : 'img/hp.png';
        const altText = `Card image ${index}`;
        const title = index % 2 === 0
            ? 'Jangan Asal Pilih Influencer, Berikut Cara Menyusun Strategi Influencer'
            : 'Kenali Tingkatan Influencers berdasarkan Jumlah Followers';
        const dateText = index % 2 === 0 ? '6 September 2022' : '5 September 2022';
        
        return `
            <div class="card" data-date="${date}">
                <img src="${imgSrc}" alt="${altText}" class="lazyload">
                <div class="card-content">
                    <p>${dateText}</p>
                    <h3 class="ellipsis">${title}</h3>
                </div>
            </div>
        `;
    };

    // Generate card elements and store original HTML
    for (let i = 1; i <= totalCards; i++) {
        const cardHTML = generateCardHTML(i);
        originalCardsHTML.push(cardHTML);
        const cardElement = document.createElement('div');
        cardElement.innerHTML = cardHTML;
        cards.push(cardElement.firstElementChild);
    }

    let currentPage = 1;
    let cardsPerPage = parseInt(document.getElementById('show-per-page').value);

    // Function to render cards based on pagination
    function renderCards() {
        cardsContainer.innerHTML = '';
        const startIndex = (currentPage - 1) * cardsPerPage;
        const endIndex = Math.min(startIndex + cardsPerPage, cards.length);

        for (let i = startIndex; i < endIndex; i++) {
            cardsContainer.appendChild(cards[i]);
        }

        // Update page info text with page number and total pages
        const totalPages = Math.ceil(totalCards / cardsPerPage);
        document.getElementById('page-info').textContent = `showing ${startIndex + 1} - ${endIndex} of ${totalCards}`;
        // Render pagination numbers
        renderPaginationNumbers(totalPages);
    }

    // Function to render pagination numbers
    function renderPaginationNumbers(totalPages) {
        const paginationNumbers = document.getElementById('pagination-numbers');
        paginationNumbers.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const pageNumberElement = document.createElement('button');
            pageNumberElement.textContent = i;
            pageNumberElement.classList.add('page-number');
            if (i === currentPage) {
                pageNumberElement.classList.add('active');
            }
            pageNumberElement.addEventListener('click', function() {
                currentPage = i;
                paginate();
            });
            paginationNumbers.appendChild(pageNumberElement);
        }
    }

    // Function to handle pagination
    function paginate() {
        renderCards();
    }

    // Event listener for changing cards per page
    document.getElementById('show-per-page').addEventListener('change', function() {
        cardsPerPage = parseInt(this.value);
        currentPage = 1; // Reset to the first page
        paginate();
    });

    // Event listener for previous page button
    document.getElementById('prev-page').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            paginate();
        }
    });

    // Event listener for next page button
    document.getElementById('next-page').addEventListener('click', function() {
        const totalPages = Math.ceil(totalCards / cardsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            paginate();
        }
    });

    // Event listener for sorting
    document.getElementById('sort').addEventListener('change', function() {
        sortOrder = this.value;
        if (sortOrder === 'default') {
            cards = originalCardsHTML.map((html, index) => {
                const cardElement = document.createElement('div');
                cardElement.innerHTML = html;
                return cardElement.firstElementChild;
            });
        } else {
            cards.sort((a, b) => {
                const dateA = new Date(a.dataset.date);
                const dateB = new Date(b.dataset.date);
                return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
            });
        }
        currentPage = 1; // Reset to the first page after sorting
        paginate();
    });

    paginate(); // Initial render
});
