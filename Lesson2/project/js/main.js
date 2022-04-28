const curtCounterEl = document.querySelector('.product-item span');
const basketTotalEl = document.querySelector('.basketTotal');
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

class ProductList {
  constructor(container = '.products') {
    this.container = document.querySelector(container);
    this.goods = [];
    this.productObjects = [];

    this.fetchGoods();
    this.render();
    this.calculateAllPrice();
  }

  fetchGoods() {
    this.goods = [
      { id: 1, title: 'Notebook', price: 20000 },
      { id: 2, title: 'Mouse', price: 1500 },
      { id: 3, title: 'Keyboard', price: 5000 },
      { id: 4, title: 'Gamepad', price: 4500 },
    ];
  }
  calculateAllPrice() {
    let allPrice = 0;
    for (let i = 0; i < this.goods.length; i++) {
      allPrice = allPrice + this.goods[i].price;
    }
    console.log(`Суммарная стоимость всех продуктов равна ${allPrice}`)
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
    this.id = product.id;
    this.title = product.title;
    this.price = product.price;
    this.img = product.img || img;
  }

  getHTMLString() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
  }
}

new ProductList();

// const products = [
//   {id: 1, title: 'Notebook', price: 20000},
//   {id: 2, title: 'Mouse', price: 1500},
//   {id: 3, title: 'Keyboard', price: 5000},
//   {id: 4, title: 'Gamepad', price: 4500},
// ];
//
// const renderProduct = (item, img='https://via.placeholder.com/200x150') => `<div class="product-item">
//               <img src="${img}" alt="Some img">
//               <div class="desc">
//                   <h3>${item.title}</h3>
//                   <p>${item.price} \u20bd</p>
//                   <button class="buy-btn">Купить</button>
//               </div>
//           </div>`;
//
// const renderProducts = list => {
//   document
//       .querySelector('.products')
//       .insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
// };
//
// renderProducts(products);
//
