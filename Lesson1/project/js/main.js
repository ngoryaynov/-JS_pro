const products = [
  { id: 1, title: 'Notebook', price: 1000 },
  { id: 2, title: 'Mouse', price: 100 },
  { id: 3, title: 'Keyboard', price: 250 },
  { id: 4, title: 'Gamepad', price: 150 },
];

const getProductHTMLString = (title, price, img = "img/auto150_200.png") =>
  `<div class="product-item">
                <img src=${img}>
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="by-btn">Add to Cart</button>
              </div>`;

const renderProducts = (productList) => {
  const list = productList.map((good) => getProductHTMLString(good.title, good.price)).join(``);

  document.querySelector('.products').innerHTML = list;
}

renderProducts(products);
