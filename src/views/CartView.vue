<template>
  <div class="cart">
    <h1>Корзина</h1>
    <div v-if="groupedCart.length" class="cart-grid">
      <div
        v-for="group in groupedCart"
        :key="group.product_id"
        class="cart-item-wrapper"
      >
        <ProductCard
          :product="group"
          :hideAddToCart="true"
          :showRemoveButton="false"
        />
        <div class="item-controls">
          <button @click="removeOne(group)" class="control-button remove">
            −
          </button>
          <span class="quantity">{{ group.quantity }}</span>
          <button @click="addOne(group)" class="control-button add">+</button>
        </div>
      </div>
    </div>
    <div v-else class="empty-cart">
      <p>Корзина пуста</p>
    </div>
    <div v-if="groupedCart.length" class="cart-footer">
      <button @click="checkout" class="checkout-button">Оформить заказ</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductCard from "@/components/ProductCard.vue";

export default {
  components: { ProductCard },
  computed: mapGetters(["groupedCart"]),
  methods: {
    removeOne(group) {
      if (group.ids && group.ids.length > 0) {
        const idToRemove = group.ids[0];
        this.$store
          .dispatch("REMOVE_ONE_FROM_CART", idToRemove)
          .catch(() => alert("Не удалось удалить товар"));
      }
    },
    addOne(group) {
      this.$store
        .dispatch("ADD_TO_CART", group.product_id)
        .catch(() => alert("Не удалось добавить товар"));
    },
    checkout() {
      this.$store
        .dispatch("CREATE_ORDER")
        .then(() => this.$router.push("/orders"))
        .catch(() => alert("Не удалось оформить заказ"));
    },
  },
  created() {
    this.$store.dispatch("FETCH_CART");
  },
};
</script>

<style scoped>
.cart {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.cart-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
  justify-content: center;
}

.cart-item-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.control-button {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.control-button.remove {
  background-color: #ffb3b3;
  color: #5c3c3c;
}

.control-button.remove:hover {
  background-color: #ff9999;
}

.control-button.add {
  background-color: #42b983;
  color: white;
}

.control-button.add:hover {
  background-color: #2c8d5e;
}

.quantity {
  font-weight: bold;
  min-width: 30px;
  text-align: center;
}

.cart-footer {
  margin-top: 30px;
  text-align: right;
}

.checkout-button {
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.checkout-button:hover {
  background-color: #2c8d5e;
}

.empty-cart {
  text-align: center;
  padding: 50px;
  color: #6c757d;
  font-size: 1.2rem;
}
</style>