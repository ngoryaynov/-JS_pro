Vue.component('products', {
    data() {
        return {
            products: [],
            filtered: [],
            imgCatalog: `img/items/.png`,
        }
    },
    methods: {
        filter(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.$parent.getJson(`./api/products`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="con_block_items con_padding products">
            <product ref="refref" v-for="item of filtered" :key="item.id_product" :img="item.img_product" :product="item"></product>
        </div>
    `
});
Vue.component('product', {
    props: ['product', 'img'],
    data() {
        return {
            /**
             * Создали ссылку на API нашей корзины. Т.к. все компоненты у нас регистрируются в корневом экземпляре Vue,
             * то мы легко можем получить доступ к ним используя свойство $root.
             * $parent можно использовать для доступа к родительскому экземпляру из дочернего.
             */
            cartAPI: this.$root.$refs.cart,
        };
    },

    template: `
    <div class="con_block_cards products  ">
    <a class="item-link" href="product.html">
        
    </a>
    <div class="con_block_cards_block">
    <a class="item-link" href="product.html">
            <img class="con_block_cards_img" :src="img" alt="ELLERY X M'O CAPSULE">
            </a>


    <div class="card-box buy-btn" @click="$root.$refs.cart.addProduct(product)">
        <a class="card-link" href="#">
            <img src="img/items/add to card.svg" alt="Add to Cart">
                <p class="card-link_text">Add to Cart</p>
        </a>
    </div>
    <!-- 2
    <div class="card-box buy-btn" @click="$parent.$parent.$refs.cart.addProduct(product)">
        <a class="card-link" href="#">
            <img src="img/items/add to card.svg" alt="Add to Cart">
                <p class="card-link_text">Add to Cart</p>
        </a>
        </div >-->
    <a class="item-link" href="product.html">
        <div class="con_block_box_text">
            <h3 class="con_block_cards_name">{{ product.product_name }}</h3>
            <p class="con_block_cards_text">{{ product.product_text }}</p>
            <p class="con_block_cards_price">$ {{ product.price }}</p>
        </div>
    </a>

</div >


    `
});


/*

 <div class="con_block_cards">
                <a class="item-link" href="product.html">
                    <div class="con_block_cards_block">
                        <img class="con_block_cards_img" src="img/items/tovar_01.png" alt="ELLERY X M'O CAPSULE">
                        <div class="card-box">
                            <a class="card-link" href="#">
                                <img src="img/items/add to card.svg" alt="Add to Cart">
                                <p class="card-link_text">Add to Cart</p>
                            </a>
                        </div>
                    </div>
                </a>
                <a class="item-link" href="product.html">
                    <div class="con_block_box_text">
                        <h3 class="con_block_cards_name">ELLERY X M'O CAPSULE</h3>
                        <p class="con_block_cards_text">Known for her sculptural takes on traditional tailoring,
                            Australian
                            arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
                        <p class="con_block_cards_price">$52.00</p>
                    </div>
                </a>

            </div>






<products class="con_block_items con_padding products">
            <div class="con_block_cards">
                <a class="item-link" href="product.html">
                    <div class="con_block_cards_block">
                        <img class="con_block_cards_img" :src="img" alt="Some img" alt="ELLERY X M'O CAPSULE">
                        <div class="card-box buy-btn" @click="cartAPI.addProduct(product)">
                            <a class="card-link" href="#">
                                <img src="img/items/add to card.svg" alt="Add to Cart">
                                <p class="card-link_text">Add to Cart</p>
                            </a>
                        </div>
                        <!-- 1                    <div class="card-box buy-btn" @click="$root.$refs.cart.addProduct(product)">
                            <a class="card-link" href="#">
                                <img src="img/items/add to card.svg" alt="Add to Cart">
                                <p class="card-link_text">Add to Cart</p>
                            </a>
                        </div>
                        <!-- 2                    <div class="card-box buy-btn" @click="$parent.$parent.$refs.cart.addProduct(product)">
                            <a class="card-link" href="#">
                                <img src="img/items/add to card.svg" alt="Add to Cart">
                                <p class="card-link_text">Add to Cart</p>
                            </a>
                        </div>
                       
                    </div>
                </a>
                <a class="item-link" href="product.html">
                    <div class="con_block_box_text">
                        <h3 class="con_block_cards_name">{{product.product_name}}</h3>
                        <p class="con_block_cards_text">Known for her sculptural takes on traditional tailoring,
                            Australian
                            arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
                        <p class="con_block_cards_price">{{product.price}}$</p>
                    </div>
                </a>

            </div>
    </products>
    */