
document.addEventListener("DOMContentLoaded", function () {
    const menSection = document.getElementById("men");
    const womenSection = document.getElementById("women");
    const kidsSection = document.getElementById("kids");
    const contentContainer = document.getElementById("content");

    const apiEndpoint = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";

    function fetchData(section) {
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => displayData(data.categories.find(category => category.category_name === section)));
    }

    function displayData(category) {
        if (!category) {
            console.error("Invalid category");
            return;
        }

        const items = category.category_products.map(item => {
            const badge = item.badge_text ? `<div class="badge">${item.badge_text}</div>` : '';
            const secondImage = item.second_image !== "empty" ? `<img src="${item.second_image}" alt="${item.title}">` : '';

            return `
            <div class="product">
                <img src="${item.image}" alt="${item.title}">
                <div class="info">
                    <div class="title">${item.title}</div>
                    <div class="price">Price: ${item.price}</div>
                    <div class="vendor">Vendor: ${item.vendor}</div>
                    ${badge}
                    <button class="add-to-cart-button" onclick="addToCart(${item.id})" style="background-color: black; color: white;">Add to Cart</button>
                </div>
            </div>`;
        }).join('');

        contentContainer.innerHTML = items;
    }


    menSection.addEventListener("click", () => fetchData("Men"));
    womenSection.addEventListener("click", () => fetchData("Women"));
    kidsSection.addEventListener("click", () => fetchData("Kids"));
});

function addToCart(productId) {
    
    console.log(`Product added to cart. Product ID: ${productId}`);
}
