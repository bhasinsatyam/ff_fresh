let products = []; // JSON data will be loaded here
let currentIndex = 0;
const itemsPerLoad = 20;
const productClass = "product col"
const placeholderImage = "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-collection-4_large.png?v=1530129177"

// Function to fetch products
async function fetchProducts() {
    try {
        const response = await fetch('/assets/products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}


// Function to render products
function renderProducts(startIndex, endIndex) {
    const container = document.getElementById('product-container');
    for (let i = startIndex; i < endIndex && i < products.length; i++) {
        const product = products[i];
        const productElement = document.createElement('div');
        productElement.className = productClass;
        productElement.innerHTML = `
            <div class="product-image ratio ratio-1x1"><img class="object-fit-contain w-full" src="${product['img link'] || placeholderImage}" alt=""></div>
            <div class="product-title text-center h4 mt-4">${product.Name}</div>
            <div class="product-price text-center text-success h2 mt-1">₹${product["Selling Price"]}</div>
            <div class="product-description text-center mt-1">${product.Description}</div>
        `;
        container.appendChild(productElement);
    }
}

// Function to load more products
function loadMore() {
    const startIndex = currentIndex;
    const endIndex = currentIndex + itemsPerLoad;
    renderProducts(startIndex, endIndex);
    currentIndex = endIndex;

    if (currentIndex >= products.length) {
        document.getElementById('loadMore').style.display = 'none';
    }
}

// Initialize
async function init() {
    products = await fetchProducts();
    loadMore();
    document.getElementById('loadMore').addEventListener('click', loadMore);
}

init();