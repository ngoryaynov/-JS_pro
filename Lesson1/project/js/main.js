const products = [
  { id: 1, title: 'Notebook', price: 1000 },
  { id: 2, title: 'Mouse', price: 100 },
  { id: 3, title: 'Keyboard', price: 250 },
  { id: 4, title: 'Gamepad', price: 150 },
];

const getProductHTMLString = (item, img = "img/auto150_200.png") =>
  `<div class="product-item">
                <img src=${item.img || img}>
                <h3>${item.title}</h3>
                <p>${item.price}</p>
                <button class="by-btn">Add to Cart</button>
              </div>`;

const renderProducts = (productList) => {
  const list = productList.map((item) => getProductHTMLString(item)).join(``);

  document.querySelector('.products').innerHTML = list;
}

renderProducts(products);
