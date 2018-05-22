<template>
  <div class="header">
    <div class="logo">
      <img src="../assets/Ultra-Ball-64.png"/>
      <span class="text">POKEDEX | {{user}} </span>
    </div>
    <div class="navigation">
      <router-link to="/" v-bind:class="{active: $route.path === '/'}">Home</router-link>
      |
      <router-link to="/favourites" v-bind:class="{active: $route.path === '/favourites'}">Favourites</router-link>
      |
      <router-link v-if="!user" to="/auth" v-bind:class="{active: $route.path === '/auth'}">Login</router-link>
      <a v-if="user" v-on:click="handleLogout">Logout</a>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase/app'
  import 'firebase/auth'

  export default {
    name: "vue-header",
    props: {
      user: String
    },
    methods: {
      handleLogout: function () {
        firebase.auth().signOut().catch(err => console.log(err))
      }
    }
  };
</script>

<style scoped>
  .header {
    background-color: coral;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 30px;
    color: white;
  }

  .logo {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 24px;
  }

  .logo img {
    padding-right: 10px;
  }

  .navigation {
    display: flex;
    width: 350px;
    justify-content: space-between;
    font-size: 20px;
  }

  .navigation a {
    text-decoration: none;
    color: white;
  }

  .navigation .active {
    font-weight: bold;
  }

  .navigation a {
    cursor: pointer;
  }
</style>
