<template>
  <div class="cart">
    <h1>Корзина</h1>
    <div v-if="cart.length" class="cart-list">
      <ProductCard
        v-for="item in cart"
        :key="item.id"
        :product="item"
        :hideAddToCart="true"
      />
    </div>
    <div v-else>
      <p>Корзина пуста</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "CartView",
  components: { ProductCard },
  computed: mapGetters(["cart"]),
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
.cart-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}
</style>