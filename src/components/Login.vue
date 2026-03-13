<template>
  <form class="login" @submit.prevent="login">
    <h1>Авторизация</h1>
    <label>Email</label>
    <input type="email" required v-model="email" />
    <label>Пароль</label>
    <input type="password" required v-model="password" />
    <hr />
    <button type="submit">Войти</button>
    <p>
      Нет аккаунта? <router-link to="/register">Зарегистрироваться</router-link>
    </p>
  </form>
</template>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 10px;
  margin: 0 auto;
}
.login input,
button {
  border: 1px solid black;
  border-radius: 5px;
}
hr {
  margin: 10px 0;
}
</style>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const userData = {
        email: this.email,
        password: this.password,
      };

      this.$store
        .dispatch("AUTH_REQUEST", userData)
        .then(() => this.$router.push("/"))
        .catch((error) => {
          // Обработка ошибки (например, показать сообщение)
          console.error("Ошибка входа:", error);
          alert("Неверный email или пароль");
        });
    },
  },
};
</script>

