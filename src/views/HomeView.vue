<template>
  <div class="home">
    <h1>Каталог товаров</h1>
    <div v-if="products.length" class="product-list">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
    <div v-else>Загрузка товаров...</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProductCard from "@/components/ProductCard.vue";

export default {
  name: "HomeView",
  components: { ProductCard },
  computed: {
    ...mapState(["products"]),
  },
  created() {
    // Загружаем товары при создании компонента, если их ещё нет
    if (!this.products.length) {
      this.$store.dispatch("FETCH_PRODUCTS");
    }
  },
};
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
</style>