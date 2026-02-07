document.addEventListener('DOMContentLoaded', () => {

    // ==============================================
    // 0. БАЗА ДАНИХ (Виправлено картинку Motul)
    // ==============================================
    const productsData = [
        {
            id: 1,
            title: "Motul 8100 X-cess 5W-40 (5L)",
            price: "1 850",
            // ЗАМІНИВ ПОСИЛАННЯ ТУТ:
            img: "https://alphalubricants.ie/wp-content/uploads/2022/09/motul_104256_8100_x_cess_5w40_4l_png-1.png",
            sku: "TP-3409",
            description: "100% синтетична моторна олива для сучасних бензинових і дизельних двигунів. Забезпечує відмінний захист двигуна в екстремальних умовах, легкий запуск взимку та економію палива. Рекомендовано для BMW, Mercedes, VW.",
            specs: {
                "Виробник": "Motul (Франція)",
                "В'язкість": "5W-40",
                "Об'єм": "5 літрів",
                "Тип основи": "Синтетика",
                "Стандарт API": "SN/CF"
            }
        },
        {
            id: 2,
            title: "Bosch Oil Filter P3030",
            price: "320",
            img: "https://www.boschautoparts.com/documents/647135/1488064/PremiumOil3_PDP_Carousel.jpg",
            sku: "TP-1102",
            description: "Фільтр преміум-класу від Bosch. Забезпечує ідеальну очистку оливи від забруднень та металевої стружки. Має посилений корпус та перепускний клапан для захисту двигуна при холодному пуску.",
            specs: {
                "Виробник": "Bosch (Німеччина)",
                "Тип": "Накрутний",
                "Висота": "85 мм",
                "Різьба": "M20x1.5",
                "Застосування": "VAG, Toyota, Honda"
            }
        },
        {
            id: 3,
            title: "Brembo Brake Pads Set",
            price: "2 100",
            img: "https://media.autodoc.de/360_photos/1661551/h-preview.jpg",
            sku: "TP-5521",
            description: "Комплект гальмівних колодок Brembo. Забезпечують ефективне гальмування та мінімальний знос диска. Спеціальна суміш феродо зменшує шум та пил при гальмуванні.",
            specs: {
                "Виробник": "Brembo (Італія)",
                "Вісь встановлення": "Передня",
                "Датчик зносу": "Присутній",
                "Гальмівна система": "Teves",
                "Комплект": "4 шт"
            }
        },
        {
            id: 4,
            title: "Varta Blue Dynamic D24",
            price: "3 400",
            img: "https://media.cdn.kaufland.de/product-images/1024x1024/684c036dd21a61218d282252fa702b20.jpg",
            sku: "TP-9090",
            description: "Надійний акумулятор серії Blue Dynamic. Забезпечує стабільно високий пусковий струм навіть у сильні морози. Ідеально підходить для автомобілів із середнім рівнем енергоспоживання.",
            specs: {
                "Виробник": "Varta (Чехія)",
                "Ємність": "60 Ah",
                "Пусковий струм": "540 A",
                "Полярність": "Права (+)",
                "Тип корпусу": "Європейський"
            }
        },
        {
            id: 5,
            title: "Амортизатор KYB Excel-G",
            price: "1 650",
            img: "https://images2.exist.ua/media/images/products/2021/01/45__um5kNJs.jpg",
            sku: "TP-7744",
            description: "Газонаповнений амортизатор серії Excel-G. Повертає підвісці характеристики нового автомобіля. Запатентована клапанна система та азот під тиском запобігають спінюванню масла.",
            specs: {
                "Виробник": "KYB (Японія)",
                "Тип": "Газо-масляний",
                "Сторона": "Передня ліва",
                "Серія": "Excel-G",
                "Країна": "Японія"
            }
        }
    ];

    // ==============================================
    // 1. ЗАПУСК ВСІХ ФУНКЦІЙ
    // ==============================================

    updateUserInterface(); // Шапка (Вхід/Вихід)
    updateCartCount();     // Лічильник кошика
    initMobileMenu();      // Мобільне меню

    // Логіка модалки та сторінок
    initCheckout();
    initAnimations();

    // 2. Каталог
    if (document.getElementById('category-filters')) {
        initFilters();
    }

    // 3. Кошик (Вивід товарів)
    if (document.getElementById('cart-items-container')) {
        renderCart();
    }

    // 4. СТОРІНКА ТОВАРУ
    if (document.getElementById('p-title')) {
        initProductPage(productsData);
    }
});

// ==============================================
// ФУНКЦІЯ АНІМАЦІЇ (ДЛЯ INDEX.HTML)
// ==============================================

function initAnimations() {
    const hiddenElements = document.querySelectorAll('.hidden');
    if (hiddenElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        });
        hiddenElements.forEach(el => observer.observe(el));
    }
}

// ==============================================
// ФУНКЦІЇ КОШИКА ТА ОФОРМЛЕННЯ
// ==============================================

function initCheckout() {
    const checkoutBtn = document.getElementById('checkout-btn');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');
    const orderForm = document.getElementById('orderForm');

    if (checkoutBtn && modal) {
        checkoutBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }

    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('orderName').value;
            localStorage.removeItem('cart');
            if(modal) modal.style.display = 'none';
            alert(`Дякуємо, ${name}! Замовлення прийнято.`);
            window.location.href = 'index.html';
        });
    }
}

function addToCart(title, price, img, qty = 1) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.title === title);

    if (existing) { existing.qty += qty; }
    else { cart.push({ title, price, img, qty: qty }); }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const badge = document.getElementById('cart-badge');
    if (badge) {
        const count = cart.reduce((sum, item) => sum + item.qty, 0);
        badge.innerText = count;
        badge.style.display = count > 0 ? 'inline-block' : 'none';
    }
}

function renderCart() {
    const container = document.getElementById('cart-items-container');
    const totalBox = document.getElementById('cart-total-box');
    const finalPrice = document.getElementById('final-price');

    if(!container) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:40px; color:#fff;"><h2>Кошик порожній</h2><a href="catalog.html" class="buy-btn" style="margin-top:20px; display:inline-block; text-decoration:none; background:#ff5722; padding:10px 20px; border-radius:5px;">У КАТАЛОГ</a></div>';
        if(totalBox) totalBox.style.display = 'none';
        return;
    }

    if(totalBox) totalBox.style.display = 'block';

    let html = `<table class="cart-table" style="width:100%; color:#fff; border-collapse: collapse;">
                    <thead>
                        <tr style="border-bottom:1px solid #333; text-align:left;">
                            <th style="padding:10px;">Фото</th>
                            <th>Товар</th>
                            <th>Ціна</th>
                            <th>К-сть</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>`;

    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        html += `
        <tr style="border-bottom:1px solid #222;">
            <td style="padding:10px;"><img src="${item.img}" style="width:50px; height:50px; object-fit:contain; background:#fff; border-radius:4px;"></td>
            <td>${item.title}</td>
            <td>${item.price} грн</td>
            <td>
                <input type="number" min="1" value="${item.qty}" onchange="changeQty(${index}, this.value)" 
                style="width:50px; padding:5px; background:#222; border:1px solid #444; color:#fff; text-align:center; border-radius:4px;">
            </td>
            <td><i class="fa-solid fa-trash" style="color:#ff4444; cursor:pointer;" onclick="removeFromCart(${index})"></i></td>
        </tr>`;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
    if(finalPrice) finalPrice.innerText = total;
}

function changeQty(index, newQty) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if(parseInt(newQty) > 0) cart[index].qty = parseInt(newQty);
    else cart[index].qty = 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

// ==============================================
// ФУНКЦІЇ СТОРІНКИ ТОВАРУ (ОНОВЛЕНО)
// ==============================================

function initProductPage(data) {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));
    const product = data.find(p => p.id === productId);

    if (product) {
        // 1. Основна інфа
        document.getElementById('p-title').innerText = product.title;
        document.getElementById('p-price').innerText = product.price;
        document.title = product.title + " | TURBO PARTS";
        if(product.sku) document.getElementById('p-sku').innerText = product.sku;
        if(document.getElementById('mainImg')) document.getElementById('mainImg').src = product.img;

        // 2. Опис (Короткий та повний)
        const shortDesc = document.getElementById('p-short-desc');
        const fullDesc = document.getElementById('p-full-desc');

        if (shortDesc) shortDesc.innerText = product.description.split('.')[0] + "."; // Перше речення
        if (fullDesc) fullDesc.innerText = product.description;

        // 3. Таблиця характеристик
        const specsTable = document.getElementById('p-specs-table');
        if (specsTable && product.specs) {
            let rows = '';
            for (const [key, value] of Object.entries(product.specs)) {
                rows += `
                <tr style="border-bottom: 1px solid #333;">
                    <td style="padding: 10px; color: #888; width: 40%;">${key}</td>
                    <td style="padding: 10px; color: #fff; font-weight: 600;">${value}</td>
                </tr>`;
            }
            specsTable.innerHTML = rows;
        }

        // 4. Кнопка "Купити"
        const buyBtn = document.querySelector('.buy-btn');
        const qtyInput = document.querySelector('.qty-input');

        if(buyBtn) {
            // Клонуємо кнопку, щоб видалити старі події
            const newBtn = buyBtn.cloneNode(true);
            buyBtn.parentNode.replaceChild(newBtn, buyBtn);

            newBtn.onclick = () => {
                const qty = qtyInput ? parseInt(qtyInput.value) : 1;
                const rawPrice = parseInt(product.price.replace(/\s/g, ''));

                addToCart(product.title, rawPrice, product.img, qty);
                alert("Товар додано в кошик!");
            };
        }
    }
}

// ==============================================
// ІНШЕ
// ==============================================

function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if(menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => { navLinks.classList.toggle('active'); });
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.querySelector('input[type="email"]').value;
    localStorage.setItem('currentUser', JSON.stringify({ name: email.split('@')[0], email: email }));
    window.location.href = 'index.html';
}

function updateUserInterface() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const navLinks = document.querySelector('.nav-links');
    const oldUserMenu = document.getElementById('user-menu-item');
    if (oldUserMenu) oldUserMenu.remove();

    const li = document.createElement('li');
    li.id = 'user-menu-item';

    if (user) {
        li.innerHTML = `
            <a href="cart.html" style="margin-right:10px;"><i class="fa-solid fa-cart-shopping"></i> <span id="cart-badge" style="background:#ff5722; color:#fff; padding:2px 6px; border-radius:50%; font-size:10px; display:none;">0</span></a> 
            <a href="#" onclick="logout()"><i class="fa-solid fa-user"></i> ${user.name}</a>`;
        const loginLink = document.querySelector('a[href="login.html"]');
        if(loginLink) loginLink.parentElement.style.display = 'none';
    } else {
        li.innerHTML = `<a href="login.html"><i class="fa-regular fa-user"></i> Вхід</a>`;
    }
    navLinks.appendChild(li);
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function initFilters() {
    const categoryLinks = document.querySelectorAll('#category-filters a');
    const filterBtn = document.querySelector('.filter-btn');

    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            applyFilters();
        });
    });
    if(filterBtn) filterBtn.addEventListener('click', applyFilters);
}

function applyFilters() {
    const activeLink = document.querySelector('#category-filters .active');
    const activeCategory = activeLink ? activeLink.getAttribute('data-filter') : 'all';
    document.querySelectorAll('.product-card').forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (activeCategory === 'all' || activeCategory === cardCat) card.style.display = 'flex';
        else card.style.display = 'none';
    });
}