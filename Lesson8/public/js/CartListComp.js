Vue.component('cartlist', {
    data() {
        return {
            imgCart: `img/items/.png`,
            cartUrl: '/db/userCart.json',
            cartItems: [],
            showCart: false,
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 });
                find.quantity++;
            } else {
                let prod = Object.assign({ quantity: 1 }, product);
                this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    });
            }
        },
        remove(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                        }
                    });
            } else {
                this.$parent.deleteJson(`/api/cart/${item.id_product}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    });
            }
        },
    },
    mounted() {
        this.$parent.getJson('/api/cart')
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    template: `
               
            <div class="cart_block">
                <p v-if="!cartItems.length">Корзина пуста</p>
                <cart-item class="cart-item" 
                v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item" 
                :img="item.img_product"
                @remove="remove">
                </cart-item>
                
            <div class="button_block">
                <a href="#">
                    <div class="button">
                        <p>CLEAR SHOPPING CART</p>
                    </div>
                </a>
                <a href="#">
                <div class="button">
                    CONTINUE SHOPPING
                </div>
                </a>
            </div>
            

            
            
        `
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
                <div class="tovar">
                <div class="img product-bio">
                    <img :src="img" alt="Some image">
                </div>
                <div class="text">
                    <h1 class="name">{{cartItem.product_name}}</h1>
                    <p class="prop">Price: <span class="price">{{cartItem.price}}$</span>
                    </p>
                    <p class="prop">Color: <span>Red</span></p>
                    <p class="prop">Size: <span>Xl</span> </p>
                    <p class="prop">Quantity: {{cartItem.quantity}} </p>
                </div>
                <a class="close del-btn" @click="$emit('remove', cartItem)">
                    <img src="img/close.svg" alt="close">
                </a>
                </div>
    `
});

/*
                        */