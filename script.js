const product = [
    {
        id: 1,
        image: 'image/campus_notebooks.jpg',
        category: 'Notebooks',
        title: 'Campus Notebook',
        price: '$14.49',
    },
    {
        id: 2,
        image: 'image/eraser.jpeg',
        category: 'Writing',
        title: 'Eraser',
        price: '$3.79',
    },
    {
        id: 3,
        image: 'image/g2_pens.jpeg',
        category: 'Writing',
        title: 'G2 Black Pen',
        price: '$4.49',
    },
    {
        id: 4,
        image: 'image/g2_pens_colors.jpeg',
        category: 'Writing',
        title: 'Assorted G2 Pens',
        price: '$7.57',
    },
    {
        id: 5,
        image: 'image/mildliner_highlighter_pack.jpg',
        category: 'Highlighters',
        title: 'Pack of Mildliner Highlighters',
        price: '$17.72',
    },
    {
        id: 6,
        image: 'image/mildliner_highlighter_small.jpg',
        category: 'Highlighters',
        title: 'Pack of Mildliner Highlighters',
        price: '$5.10',
    },
    {
        id: 7,
        image: 'image/pilot_pens.jpeg',
        category: 'Writing',
        title: 'Black Pilot Pens',
        price: '$10.45',
    },
    {
        id: 8,
        image: 'image/animal_sticker.jpeg',
        category: 'Stickers',
        title: 'Animal Sticker Pack',
        price: '$9.55',
    },
    {
        id: 9,
        image: 'image/flower_sticker.jpeg',
        category: 'Stickers',
        title: 'Flower Sticker Pack',
        price: '$7.55',
    },
    {
        id: 10,
        image: 'image/pencil.jpeg',
        category: 'Writing',
        title: 'Pencil',
        price: '$9.98',
    },
    {
        id: 11,
        image: 'image/lead_refill.jpeg',
        category: 'Writing',
        title: 'Pencil Lead 0.5mm',
        price: '$3.95',
    },
    {
        id: 12,
        image: 'image/pen_refill.jpeg',
        category: 'Writing',
        title: 'Pen Refill',
        price: '$1.95',
    }
]

const saleProducts = [
    { id: 20, image: 'image/stamp1.jpeg', title: 'Stamp Cal Pattern', price: '$9.76', actualPrice: '$19.55' },
    { id: 30, image: 'image/stamp2.jpeg', title: 'Stamp Notes Pattern', price: '$8.76', actualPrice: '$17.55' },
    { id: 40, image: 'image/stamp3.jpeg', title: 'Stamp Bird Pattern', price: '$8.76', actualPrice: '$17.55' },
    { id: 50, image: 'image/stamp4.jpeg', title: 'Stamp Menu Pattern', price: '$8.76', actualPrice: '$17.55' },
    { id: 60, image: 'image/stamp5.jpeg', title: 'Stamp To Do List Pattern', price: '$8.76', actualPrice: '$17.55' },
    { id: 70, image: 'image/stamp6.jpeg', title: 'Stamp Goat Pattern', price: '$8.76', actualPrice: '$17.55' },
    { id: 80, image: 'image/stamp7.jpeg', title: 'Stamp Cat Pattern', price: '$9.76', actualPrice: '$19.55' },
    { id: 90, image: 'image/stamp8.jpeg', title: 'Stamp Wreath Pattern', price: '$8.76', actualPrice: '$17.55' },
];

// Create card on featured slider
function createProductCard(product) {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    productCard.innerHTML = `
        <div class="product-image">
            <span class="discount-tag">50% off</span>
            <img src="${product.image}" class="product-thumb" alt="">

        </div>
        <div class="product-info">
            <h2 class="product-brand">${product.title}</h2>

            <span class="price">${product.price}</span><span class="actual-price">${product.actualPrice}</span>
        </div>
    `;
    return productCard;
}

function renderProducts() {
    const container = document.getElementById('productContainer');
    saleProducts.forEach(product => {
        container.appendChild(createProductCard(product));
    });
}

// Displays images based on slider
document.addEventListener('DOMContentLoaded', () => {
   
    renderProducts();
    renderProduct('All');

    const productContainers = [...document.querySelectorAll('.product-container')];
    const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
    const preBtn = [...document.querySelectorAll('.pre-btn')];

    productContainers.forEach((item, i) => {
        let containerDimensions = item.getBoundingClientRect();
        let containerWidth = containerDimensions.width;

        nxtBtn[i].addEventListener('click', () => {
            item.scrollLeft += containerWidth;
        });

        preBtn[i].addEventListener('click', () => {
            item.scrollLeft -= containerWidth;
        });
    });
});





const categories = [...new Set(product.map((item)=>
    {return item}))]


let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

// Displays all products on website
function renderProduct(filterCategory = 'All') {
    let cart = document.getElementById('root');
    let filteredProducts = product;

    if (filterCategory !== 'All') {
        filteredProducts = product.filter(product => product.category === filterCategory);
    }

    cart.innerHTML = filteredProducts.map(item => {
        var{image, title, price} = item;
        return (
            `<div class="box">
                <div class="img-box">
                    <img src=${image}></img>
                </div>
                <div class="left">
                    <p>${title}</p>
                    <h2>${price}</h2>
                    <button onclick="addToCart(${item.id})">Add to Cart</button>
                
                </div>
            </div>`
        );
    }).join(``);

}

// Displays all products with properties
function renderProductList(productsToRender) {
    let cart = document.getElementById('root');
    cart.innerHTML = productsToRender.map(item => {
        var{image, title, price} = item;
        return (
            `<div class="box">
                <div class="img-box">
                    <img src=${image}></img>
                </div>
                <div class="left">
                    <p>${title}</p>
                    <h2>${price}</h2>
                    <button onclick="addToCart(${item.id})">Add to Cart</button>
                
                </div>
            </div>`
        );
    }).join('');
}





document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
    updateCartCountDisplay();
    cartCountElement.textContent = savedCartCount;
    cartItems = JSON.parse(localStorage.getItem('cart')) || [];

});

function updateCartCountFromStorage() {
    const savedCartCount = localStorage.getItem('cartCount') || 0;
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = savedCartCount;
}

// Updates the number of items in the cart
function updateCartCount() {
    localStorage.setItem('cartCount', cartItems.length);
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartItems.length;
}

// Adds item to cart
function addToCart(productId) {
    const productToAdd = product.find(p => p.id === productId);
    if (productToAdd) {
        // Load current cart items from localStorage
        cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems.push(productToAdd);

        // Save updated cart items and count to localStorage
        localStorage.setItem('cart', JSON.stringify(cartItems));
        localStorage.setItem('cartCount', cartItems.length);

        // Update the cart count display
        updateCartCountDisplay();
    }
}

// Removes item from cart
function removeFromCart(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    const itemIndex = cartItems.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        displayCartItems();  // Refresh the displayed cart items
        updateCartCountDisplay(); // Update the cart count display
    } else {
        console.error("Item not found in cart");
    }
}

// Updates the number of items in the cart
function updateCartCountDisplay() {
    const savedCartCount = localStorage.getItem('cartCount') || 0;
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = savedCartCount;
}



// Displays the items in the cart
function displayCartItems() {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsContainer = document.getElementById('cart-items');

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    const itemsHtml = cartItems.map((item, index) => {
        return `
            <div class="cart-item">
                <div class="cart-img-box">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="cart-info">
                    <p>${item.title}</p>
                    <p>${item.price}</p>
                    <button onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>`;
    }).join('');

    cartItemsContainer.innerHTML = itemsHtml;
}

// Displays the current number of items in the cart
function displayCurrentCartItems(){
    return cartItems.length();
}






// Displays the products based on category selected by user
function renderProduct(filterCategory = 'All') {
    const cart = document.getElementById('root');
    let filteredProducts = filterCategory === 'All' ? product : product.filter(p => p.category === filterCategory);


    cart.innerHTML = filteredProducts.map(item => {
        const {image, title, price} = item;
        return (
            `<div class="box">
                <div class="img-box">
                    <img src=${image}></img>
                </div>
                <div class="left">
                    <p>${title}</p>
                    <h2>${price}</h2>
                    <button onclick="addToCart(${item.id})">Add to Cart</button>
                
                </div>
            </div>`
        );
    }).join('');
}

document.querySelector('.dropdown select').addEventListener('change', function() {
    const selectedCategory = this.value;;
    renderProduct(selectedCategory);
});

document.querySelector('.search input[type="search"]').addEventListener('input', function() {
    const searchText = this.value.toLowerCase();
    filterAndRenderProducts(searchText);
});

// Filters products based on keywords typed in the search bar
function filterAndRenderProducts(searchText) {
    const filteredProducts = product.filter(p => 
        p.title.toLowerCase().includes(searchText)
    );
    renderProductList(filteredProducts);
}
