<template>
  <div class="product-card">
    <img
      :src="imageUrl"
      :alt="product.name"
      class="product-image"
      @error="handleImageError"
    />
    <h3>{{ product.name }}</h3>
    <p>{{ product.description }}</p>
    <p class="price">{{ product.price }} ₽</p>
    <button v-if="$store.getters.isAuthenticated">В корзину</button>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageUrl() {
      // Базовый URL для изображений (можно вынести в .env)
      const imgBase = process.env.VUE_APP_IMG_BASE_URL || 'http://lifestealer86.ru';
      // Убираем возможный начальный слеш у пути изображения
      const imagePath = this.product.image.replace(/^\//, '');
      return `${imgBase}/${imagePath}`;
    }
  },
  methods: {
    handleImageError(event) {
      // Если картинка не загрузилась, показываем прозрачный пиксель (или можно оставить серый фон)
      event.target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    }
  }
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin: 10px;
  width: 250px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
}
.product-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: #f0f0f0;
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