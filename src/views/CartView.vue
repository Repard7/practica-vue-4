<template>
  <div class="cart">
    <h1>Корзина</h1>
    <div v-if="groupedCart.length" class="cart-grid">
      <ProductCard
        v-for="group in groupedCart"
        :key="group.product_id"
        :product="group"
        :hideAddToCart="true"
      />
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
  computed: mapGetters(["groupedCart"]),
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.empty-cart {
  text-align: center;
  padding: 50px;
  color: #6c757d;
  font-size: 1.2rem;
}
</style>