<template>
  <div class="container">
    <div class="auth-card">
      <div class="title">Login</div>
      <div class="red">
        {{errors.login}}
      </div>
      <div class="input-field">
        <label for="email">Email:</label>
        <input v-on:input="handleLoginInput" v-on:change="handleLoginInput" name="email"
               placeholder="Email" id="email" type="text" class="validate">
      </div>
      <div class="input-field">
        <label for="password">Password:</label>
        <input v-on:input="handleLoginInput" v-on:change="handleLoginInput" name="password"
               placeholder="Password" id="password" type="password" class="validate">
      </div>
      <button v-on:click="handleLogin">Login</button>
    </div>
    <div class="auth-card">
      <div class="title">Registration</div>
      <div class="red">
        {{errors.registration}}
      </div>
      <div class="input-field">
        <label for="registration-email">Email:</label>
        <input v-on:input="handleRegistrationInput" v-on:change="handleRegistrationInput" name="email"
               placeholder="Email" id="registration-email" type="text" class="validate">
      </div>
      <div class="input-field">
        <label for="registration-password">Password:</label>
        <input v-on:input="handleRegistrationInput" v-on:change="handleRegistrationInput" name="password"
               placeholder="Password" id="registration-password" type="password" class="validate">
      </div>
      <button v-on:click="handleRegistration">Register</button>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase/app'
  import 'firebase/auth'

  export default {
    name: "Auth",
    data() {
      return {
        errors: {
          login: '',
          registration: ''
        },
        login: {
          email: '',
          password:
            '',
        }
        ,
        registration: {
          email: '',
          password:
            '',
        }
      }
    },
    methods: {
      handleRegistrationInput: function ({target}) {
        this.registration = {
          ...this.registration,
          [target.name]: target.value
        }
      },
      handleRegistration: function () {
        const {email, password} = this.registration
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .catch(err => this.errors.registration = err.message);
      },
      handleLoginInput: function ({target}) {
        this.login = {
          ...this.login,
          [target.name]: target.value
        }
      },
      handleLogin: function () {
        const {email, password} = this.login
        firebase.auth().signInWithEmailAndPassword(email, password)
          .catch(err => this.errors.login = err.message);
      }
    }
  };
</script>

<style scoped>
  .container {
    background-color: lightblue;
    min-height: calc(100vh - 100px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .auth-card {
    display: flex;
    flex-direction: column;
    border: 1px solid gray;
    border-radius: 10px;
    background-color: white;
    padding: 20px;
    width: 400px;
    margin-bottom: 40px;
  }

  .red {
    color: red;
    font-weight: bold;
  }

  .title {
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    width: 100%;
  }

  .input-field {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    height: 70px;
  }

  .input-field input, button {
    width: 100%;
    padding: 12px 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 18px;
    height: 40px;
  }

  button {
    margin-top: 10px;
    height: 50px;
    background-color: seagreen;
    color: white;
  }
</style>
