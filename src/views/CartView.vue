<template>
  <div class="cart">
    <h1>Корзина</h1>
    <div v-if="groupedCart.length" class="cart-content">
      <div class="cart-grid">
        <ProductCard
          v-for="group in groupedCart"
          :key="group.product_id"
          :product="group"
          :hideAddToCart="true"
          :showRemoveButton="true"
          @remove="removeOne(group)"
        />
      </div>
      <div class="cart-footer">
        <div class="total">Итого: {{ totalPrice }} ₽</div>
        <button @click="checkout" class="checkout-button">
          Оформить заказ
        </button>
      </div>
    </div>
    <div v-else class="empty-cart">
      <p>Корзина пуста</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductCard from "@/components/ProductCard.vue";

export default {
  components: { ProductCard },
  computed: {
    ...mapGetters(["groupedCart"]),
    totalPrice() {
      return this.groupedCart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
  },
  methods: {
    removeOne(group) {
      if (group.ids && group.ids.length > 0) {
        const idToRemove = group.ids[0];
        this.$store
          .dispatch("REMOVE_ONE_FROM_CART", idToRemove)
          .catch(() => alert("Не удалось удалить товар"));
      }
    },
    checkout() {
      this.$store
        .dispatch("CREATE_ORDER")
        .then(() => {
          this.$router.push("/orders");
        })
        .catch((error) => {
          console.error("Ошибка оформления заказа:", error);
          alert(
            "Не удалось оформить заказ. Возможно, корзина пуста или произошла ошибка."
          );
        });
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

.cart-footer {
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.total {
  font-size: 1.3rem;
  font-weight: bold;
}

.checkout-button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 30px;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.checkout-button:hover {
  background-color: #369f6e;
}

.empty-cart {
  text-align: center;
  padding: 50px;
  color: #6c757d;
  font-size: 1.2rem;
}
</style>