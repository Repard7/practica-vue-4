<template>
  <div class="orders">
    <h1>Мои заказы</h1>
    <div v-if="orders.length" class="orders-list">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-header">
          <span>Заказ №{{ order.id }}</span>
          <span class="order-price">{{ order.order_price }} ₽</span>
        </div>
        <div class="order-products">
          Товары: {{ order.products.join(", ") }}
        </div>
      </div>
    </div>
    <div v-else class="empty-orders">
      <p>У вас пока нет заказов</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "OrdersView",
  computed: mapGetters(["orders"]),
  created() {
    this.$store.dispatch("FETCH_ORDERS");
  },
};
</script>

<style scoped>
.orders {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
}

.order-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 10px;
}

.order-price {
  color: #42b983;
}

.order-products {
  color: #6c757d;
  font-size: 0.9rem;
}

.empty-orders {
  text-align: center;
  padding: 50px;
  color: #6c757d;
}
</style>