<template>
  <form class="register" @submit.prevent="register">
    <h1>Регистрация</h1>
    <label>ФИО</label>
    <input type="text" required v-model="fio" />
    <label>Email</label>
    <input type="email" required v-model="email" />
    <label>Пароль</label>
    <input type="password" required v-model="password" />
    <hr />
    <button type="submit">Зарегистрироваться</button>
    <p>Уже есть аккаунт? <router-link to="/login">Войти</router-link></p>
  </form>
</template>

<style scoped>
.register {
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 10px;
  margin: 0 auto;
}
.register input,
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
      fio: "",
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      const userData = {
        fio: this.fio,
        email: this.email,
        password: this.password,
      };

      this.$store
        .dispatch("REGISTER_REQUEST", userData) // вызываем действие регистрации
        .then(() => {
          this.$router.push("/login"); // после успеха — на страницу входа
        })
        .catch((error) => {
          // Здесь можно показать ошибку пользователю (например, через alert или всплывающее сообщение)
          console.error("Ошибка регистрации:", error);
          alert("Ошибка регистрации. Проверьте введённые данные.");
        });
    },
  },
};
</script>