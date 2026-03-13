<template>
  <div class="auth-container">
    <form class="auth-form" @submit.prevent="register">
      <h1>Регистрация</h1>
      <div class="form-group">
        <label>ФИО</label>
        <input
          type="text"
          required
          v-model="fio"
          placeholder="Иванов Иван Иванович"
        />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input
          type="email"
          required
          v-model="email"
          placeholder="example@mail.com"
        />
      </div>
      <div class="form-group">
        <label>Пароль</label>
        <input
          type="password"
          required
          v-model="password"
          placeholder="••••••••"
        />
      </div>
      <button type="submit" class="auth-button">Зарегистрироваться</button>
      <p class="auth-link">
        Уже есть аккаунт? <router-link to="/login">Войти</router-link>
      </p>
    </form>
  </div>
</template>

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
        .dispatch("REGISTER_REQUEST", userData)
        .then(() => this.$router.push("/login"))
        .catch((error) => {
          console.error("Ошибка регистрации:", error);
          alert("Ошибка регистрации. Проверьте введённые данные.");
        });
    },
  },
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.auth-form {
  width: 100%;
  max-width: 380px;
  padding: 30px 25px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
}

.auth-form h1 {
  text-align: center;
  margin-bottom: 24px;
  color: #2c3e50;
  font-size: 1.8rem;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #4a5568;
}

.form-group input {
  width: 93%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.1);
}

.auth-button {
  width: 100%;
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
}

.auth-button:hover {
  background-color: #2c8d5e;
}

.auth-button:active {
  transform: scale(0.98);
}

.auth-link {
  text-align: center;
  margin-top: 20px;
  color: #4a5568;
}

.auth-link a {
  color: #42b983;
  text-decoration: none;
  font-weight: 500;
}

.auth-link a:hover {
  text-decoration: underline;
}
</style>