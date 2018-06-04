<template>
  <div class="container">
    <div class="auth-card">
      <div class="tabs">
        <div v-bind:class="{active: tab === 'login'}" v-on:click="handleClick('login')">Login</div>
        <div v-bind:class="{active: tab === 'registration'}" v-on:click="handleClick('registration')">Registration</div>
      </div>
      <div v-if="tab === 'login'">
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
      <div v-if="tab === 'registration'">
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
        <div class="input-field">
          <label for="registration-type">Favourite type:</label>
          <select v-on:input="handleRegistrationInput" v-on:change="handleRegistrationInput" name="type" id="registration-type">
            <option v-for="type in types" v-bind:key="type">
              {{type}}
            </option>
          </select>
        </div>
        <button v-on:click="handleRegistration">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import config from "../../config";

export default {
  name: "Auth",
  data() {
    return {
      tab: "login",
      type: [""],
      errors: {
        login: "",
        registration: ""
      },
      login: {
        email: "",
        password: ""
      },
      registration: {
        email: "",
        password: "",
        type: ""
      }
    };
  },
  created() {
    fetch(`${config.apiUrl}types`)
      .then(res => res.json())
      .then(data => {
        this.types = [...data.types, ""].sort();
      });
  },
  methods: {
    handleClick: function(tab) {
      this.tab = tab;
    },
    handleRegistrationInput: function({ target }) {
      this.registration = {
        ...this.registration,
        [target.name]: target.value
      };
    },
    handleRegistration: function() {
      const { email, password, type } = this.registration;
      console.log(type);
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(({ user }) =>
          user
            .updateProfile({
              displayName: type
            })
            .catch(err => (this.errors.registration = err.message))
        )
        .catch(err => (this.errors.registration = err.message));
    },
    handleLoginInput: function({ target }) {
      this.login = {
        ...this.login,
        [target.name]: target.value
      };
    },
    handleLogin: function() {
      const { email, password } = this.login;
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(err => (this.errors.login = err.message));
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

.tabs {
  display: flex;
  justify-content: space-around;
  padding-bottom: 10px;
}

.tabs div {
  width: 150px;
  text-align: center;
  cursor: pointer;
}

.tabs .active {
  font-weight: bold;
  border-bottom: 2px solid coral;
}

.red {
  color: red;
  font-weight: bold;
}

.input-field {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  height: 70px;
}

.input-field input,
.input-field select,
button {
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

@media only screen and (max-width: 768px) {
  .auth-card {
    width: 80%;
  }
}
</style>
