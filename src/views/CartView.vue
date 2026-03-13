<template>
  <div class="cart">
    <h1>Корзина</h1>
    <div v-if="cart.length">
      <div v-for="item in cart" :key="item.id" class="cart-item">
        <h3>{{ item.name }}</h3>
        <p>{{ item.description }}</p>
        <p class="price">{{ item.price }} ₽</p>
        <!-- Пока без группировки и кнопок, просто отображаем каждый элемент -->
      </div>
    </div>
    <div v-else>
      <p>Корзина пуста</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CartView",
  computed: mapGetters(["cart"]),
  created() {
    // Загружаем корзину при переходе на страницу
    this.$store.dispatch("FETCH_CART");
  },
};
</script>

<style scoped>
.cart {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.cart-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cart-item h3 {
  margin: 0;
}
.price {
  font-weight: bold;
  color: #42b983;
}
</style>