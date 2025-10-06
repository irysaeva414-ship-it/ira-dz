                    
(function renderProducts() {
  products = [
        {
            id: 1,
            name: 'Г/Ц Блинчики с мясом вес, Россия',
            img: 'img/image.png',
            currentPrice: '44,50 ₽',
            oldPrice: '50,50 ₽',
            discount: '-50%',
            rating: 3
        },
        {
            id: 2,
            name: 'Молоко ПРОСТОКВАШИНО паст. питьевое цельное отборное...',
            img: 'img/image (1).png',
            currentPrice: '44,50 ₽',
            oldPrice: '50,50 ₽',
            discount: '-50%',
            rating: 3
        },
        {
            id: 3,
            name: 'Колбаса сырокопченая МЯСНАЯ ИСТОРИЯ Сальчичон и Тоскан...',
            img: 'img/image (2).png',
            currentPrice: '44,50 ₽',
            oldPrice: '50,50 ₽',
            discount: '-50%',
            rating: 5
        },
        {
            id: 4,
            name: 'Сосиски вареные МЯСНАЯ ИСТОРИЯ Молочные и с сыро...',
            img: 'img/image (3).png',
            currentPrice: '44,50 ₽',
            oldPrice: '50,50 ₽',
            discount: '-50%',
            rating: 3
        }
    ];

    const productsGrid = document.querySelector('.promotions-section .products-grid');
    if (!productsGrid) return;

    const childNodes = Array.from(productsGrid.childNodes);
    const placeholderIndex = childNodes.findIndex(
        (n) => n.nodeType === Node.COMMENT_NODE && /product/i.test(n.nodeValue || '')
    );

    const cardsHtml = products
        .map((p) => {
            const starsFilled = '★'.repeat(Math.max(0, Math.min(5, p.rating)));
            const starsEmpty = '☆'.repeat(5 - Math.max(0, Math.min(5, p.rating)));
            return `
            <div class="product-card" data-id="${p.id}">
                <div class="product-image">
                    ${p.discount ? `<div class="discount-badge">${p.discount}</div>` : ''}
                    <div class="favorite-icon">♡</div>
                    <div class="product-img"><img src="${p.img}" alt="${p.name}"></div>
                </div>
                <div class="product-info">
                    <div class="price">
                        <span class="current-price">${p.currentPrice}</span>
                        ${p.oldPrice ? `<span class="old-price">${p.oldPrice}</span>` : ''}
                    </div>
                    ${p.oldPrice ? `
                    <div class="price-labels">
                        <span class="card-price">С картой</span>
                        <span class="regular-price">Обычная</span>
                    </div>` : ''}
                    <h3 class="product-name">${p.name}</h3>
                    <div class="rating">
                        <span class="star filled">${starsFilled}</span><span class="star">${starsEmpty}</span>
                    </div>
                    <button class="add-to-cart">В корзину</button>
                </div>
            </div>`;
        })
        .join('');

    if (placeholderIndex !== -1) {
        const placeholderNode = childNodes[placeholderIndex];
        const wrapper = document.createElement('div');
        wrapper.innerHTML = cardsHtml;
        const fragment = document.createDocumentFragment();
        while (wrapper.firstChild) fragment.appendChild(wrapper.firstChild);
        productsGrid.insertBefore(fragment, placeholderNode.nextSibling);
    } else {
        productsGrid.insertAdjacentHTML('afterbegin', cardsHtml);
    }
})();


