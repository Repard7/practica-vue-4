<template>
  <div class="cart">
    <h1>Корзина</h1>
    <div v-if="groupedCart.length" class="cart-grid">
      <ProductCard
        v-for="group in groupedCart"
        :key="group.product_id"
        :product="group"
        :hideAddToCart="true"
        :showRemoveButton="true"
        @remove="removeOne(group)"
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
  methods: {
    removeOne(group) {
      if (group.ids && group.ids.length > 0) {
        const idToRemove = group.ids[0]; // первый идентификатор записи в корзине
        this.$store
          .dispatch("REMOVE_ONE_FROM_CART", idToRemove)
          .catch((error) => {
            console.error("Ошибка удаления:", error);
            alert("Не удалось удалить товар");
          });
      } else {
        console.warn("Нет id для удаления", group);
      }
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
  gap: 24px; /* увеличенный отступ между карточками */
  justify-content: center;
}

.empty-cart {
  text-align: center;
  padding: 50px;
  color: #6c757d;
  font-size: 1.2rem;
}
</style>