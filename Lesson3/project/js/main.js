const curtCounterEl = document.querySelector('.btn-cart span');
const basketTotalEl = document.querySelector('.basketTotal');
const curtTotalValueEl = document.querySelector('.basketTotalValue');
const basketEl = document.querySelector('.basket');

document.querySelector('.btn-cart').addEventListener('click', () => {
  basketEl.classList.toggle('hidden');
});
class Hamburger {
  constructor(size, stuffing) {
    this.size = size;
    this.stuffing = stuffing;
    let price = 0;
    let calories = 0;
    this.spises = false;
    this.souse = false;
    if (size === "big") {
      price = price + 100;
      calories = calories + 40;
    }
    else if (size === "little") {
      price = price + 50;
      calories = calories + 20;
    }
    else {
      console.error(`Введен не верный размер у гамбургера`);
    };
    if (stuffing === "cheese") {
      price = price + 10;
      calories = calories + 20;
    }
    else if (stuffing === "salt") {
      price = price + 20;
      calories = calories + 5;
    }
    else if (stuffing === "potato") {
      price = price + 15;
      calories = calories + 10;
    }
    else {
      console.error(`Введен не верная начинка у гамбургера`);
    }
    this.price = price;
    this.calories = calories;

  }
  addTopping(topping) { // Добавить добавку 
    if (topping === "spises" && this.spises === false) {
      this.spises = true;
      this.price = this.price + 15;
    }
    if (topping === "souse" && this.souse === false) {
      this.souse = true;
      this.price = this.price + 20;
      this.calories = this.calories + 5;
    }
  }
  removeTopping(topping) { // Убрать добавку
    if (topping === "spises" && this.spises === true) {
      this.spises = false;
      this.price = this.price - 15;
    }
    if (topping === "souse" && this.souse === true) {
      this.souse = false;
      this.price = this.price - 20;
      this.calories = this.calories - 5;
    }
  }
  getToppings(topping) { // Получить список добавок
    console.log("Используются следующие добавки к Гамбургеру:")
    if (this.souse === true) {
      console.log("- полить майонезом;")
    }
    if (this.spises === true) {
      console.log("- посыпать специями;")
    }
    else {
      console.log("- добавок нет;")
    }
  }
  getSize() { // Узнать размер гамбургера
    console.log(this.size);
  }
  getStuffing() { // Узнать начинку гамбургера
    console.log(this.stuffing)
  }
  calculatePrice() { // Узнать цену
    console.log(this.price);
  }
  calculateCalories() { // Узнать калорийность
    console.log(this.calories);
  }
}

let bigCheese = new Hamburger(`big`, `cheese`);
let littlePotato = new Hamburger(`little`, `potato`);

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
// переписать на промис (!!!!!!!не fetch !!!!!!!!!!)
// Далее НЕ ИСПОЛЬЗОВАТЬ В КОДЕ!
/*let getRequest = (url, cb) => {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        console.log('Error');
      } else {
        cb(xhr.responseText);
      }
    }
  };
  xhr.send();
};*/
function getRequest(url) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = () => {
      if (xhr.readyState === 4) {
        if (xhr.status !== 200) {
          let error = console.log('Error');
          reject(error);
        }
        else {
          resolve(xhr.responseText)
        }
      }
    };
    xhr.send();
  });
}
// ---------------------------------
//console.log(getRequest());
class ProductList {
  constructor(container = '.products') {
    this.container = document.querySelector(container);
    this.goods = [];
    this.productObjects = [];

    // this.fetchGoods();
    // this.render();

    this.getProducts()
      .then((data) => {
        this.goods = data;
        this.render();
      });
  }

  // fetchGoods() {
  //   getRequest(`${API}/catalogData.json`, (data) => {
  //     console.log(data);
  //     this.goods = JSON.parse(data);
  //     this.render();
  //   });
  // }

  getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  render() {
    for (const good of this.goods) {
      const productObject = new ProductItem(good);
      console.log(productObject);
      this.productObjects.push(productObject);

      this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
    }
  }
}

class ProductItem {
  constructor(product, img = "img/auto150_200.png") {
    this.id = product.id_product;
    this.product_name = product.product_name;
    this.price = product.price;
    this.img = product.img || img;
  }

  getHTMLString() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
  }
}

let curt = {};



new ProductList();








const productEl = document.querySelector(`.products`);
document.querySelector(`.products`).addEventListener('click', event => {
  if (!event.target.classList.contains('buy-btn')) {
    return;
  }

  let id = event.target.parentNode.parentNode.dataset.id;
  let nameProd = event.target.parentNode.querySelector(`h3`).textContent;
  let priceProd = parseInt(event.target.parentNode.querySelector(`p`).textContent);
  //let imgUrlProd = event.target.parentNode.parentNode.querySelector(`.con_block_cards_img`).attributes.src.textContent;
  addToCart(id, nameProd, priceProd);

});
function addToCart(id, nameProd, priceProd, imgUrlProd) {
  // Если такого продукта еще не было добавлено в наш объект, который хранит
  // все добавленные товары, то создаем новый объект.
  if (!(id in curt)) {
    curt[id] = { id: id, name: nameProd, price: priceProd, count: 0, img: imgUrlProd };
    curtCounterEl.classList.remove(`hidden`);
  }
  // Добавляем в количество +1 к продукту.
  curt[id].count++;
  // Ставим новое количество добавленных товаров у значка корзины.
  curtCounterEl.textContent = getTotalBasketCount().toString();
  // Ставим новую общую стоимость товаров в корзине.
  curtTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
  // Отрисовываем продукт с данным id.
  renderProductInBasket(id);
}
function delFromCart(id) {
  delete curt[id];
  curtCounterEl.textContent = getTotalBasketCount().toString();
  if (curtCounterEl.textContent === `0`) {
    curtCounterEl.classList.add(`hidden`);
  };
  curtTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
}
function getTotalBasketCount() {
  return Object.values(curt).reduce((acc, product) => acc + product.count, 0);
}

function getTotalBasketPrice() {
  return Object
    .values(curt)
    .reduce((acc, product) => acc + product.price * product.count, 0);
}

function renderProductInBasket(productId) {
  if (productId == undefined) {
    return
  }
  else {
    // Получаем строку в корзине, которая отвечает за данный продукт.
    const basketRowEl = basketEl
      .querySelector(`.basketRow[data-id="${productId}"]`);
    // Если такой строки нет, то отрисовываем новую строку.
    if (!basketRowEl) {
      renderNewProductInBasket(productId);

      return;
    }
    // Получаем данные о продукте из объекта корзины, где хранятся данные о всех
    // добавленных продуктах.
    const product = curt[productId];
    // Ставим новое количество в строке продукта корзины.
    basketRowEl.querySelector('.productCount').textContent = product.count;
    // Ставим нужную итоговую цену по данному продукту в строке продукта корзины.
    basketRowEl
      .querySelector('.productTotalRow')
      .textContent = (product.price * product.count).toFixed(2);
  }
}
function renderNewProductInBasket(productId) {
  const productRow = `
  <div class="basketRow" data-id="${productId}">
    <div>${curt[productId].name}
    </div>
    <div>
      <span class="productCount">${curt[productId].count}</span> шт.
    </div>
    <div>${curt[productId].price}</div>
    <div>
      <span class="productTotalRow">${(curt[productId].price * curt[productId].count).toFixed(2)}</span>
    </div>
    <a class="delete" data-id="${productId}" href="#"> delete </a>
  </div>
  `;
  basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}

document.onclick = event => {
  if (event.target.classList.contains("delete")) {
    let id = event.target.dataset.id
    delFromCart(id)
    event.target.parentNode.remove();

  }
}