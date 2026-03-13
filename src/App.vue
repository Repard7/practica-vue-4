<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <template v-if="$store.getters.isAuthenticated">
      | <router-link to="/cart">Корзина</router-link> |
      <router-link to="/orders">Заказы</router-link> |
      <a href="#" @click.prevent="logout">Выйти</a>
    </template>
    <template v-else>
      | <router-link to="/login">Вход</router-link> |
      <router-link to="/register">Регистрация</router-link>
    </template>
  </nav>
  <router-view />
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("LOGOUT").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>