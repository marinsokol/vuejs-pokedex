<template>
  <div id="app">
    <Header v-bind:user="user"/>
    <router-view v-bind:user="user"/>
  </div>
</template>

<script>
  import firebase from 'firebase/app'
  import 'firebase/auth'

  import Header from './components/Header'

  import config from './config'

  firebase.initializeApp(config.firebaseConfig)

  export default {
    name: "app",
    data() {
      return {
        user: ''
      }
    },
    components: {
      Header
    },
    created() {
      firebase.auth().onAuthStateChanged((user) => {
        this.user = user ? user.email : ''
        if (this.$route.path === '/auth' && user) {
          this.$router.replace('/')
        }
      })
    }
  };
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
