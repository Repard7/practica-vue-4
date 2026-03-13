<template>
  <div class="product-card">
    <div class="image-container">
      <img
        :src="imageUrl"
        :alt="product.name"
        class="product-image"
        @error="handleImageError"
      />
      <span v-if="product.quantity" class="quantity-badge">
        {{ product.quantity }}
      </span>
    </div>
    <h3>{{ product.name }}</h3>
    <p>{{ product.description }}</p>
    <p class="price">{{ product.price }} ₽</p>
    <button
      v-if="$store.getters.isAuthenticated && !hideAddToCart"
      @click="addToCart"
    >
      В корзину
    </button>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    },
    hideAddToCart: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    imageUrl() {
      const imgBase =
        process.env.VUE_APP_IMG_BASE_URL || "http://lifestealer86.ru";
      const imagePath = this.product.image.replace(/^\//, "");
      return `${imgBase}/${imagePath}`;
    },
  },
  methods: {
    addToCart() {
      this.$store.dispatch("ADD_TO_CART", this.product.id).catch(() => {
        alert(
          "Не удалось добавить товар. Возможно, он уже в корзине или произошла ошибка."
        );
      });
    },
    handleImageError(event) {
      event.target.src =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    },
  },
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin: 10px;
  width: 250px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: relative;
}

.image-container {
  position: relative;
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  background-color: #f0f0f0;
}

.quantity-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #42b983;
  color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border: 2px solid white;
}

.product-card h3 {
  margin: 0 0 10px;
  font-size: 1.1rem;
}

.price {
  font-weight: bold;
  color: #42b983;
  margin-top: auto;
}

button {
  margin-top: 10px;
}
</style>