<template>
  <div id="app">
    <Header v-bind:user="user.email"/>
    <router-view
      v-bind:user="user"
      v-bind:addToFavoutires="addToFavoutires"
      v-bind:removeFromFavoutires="removeFromFavoutires"
      v-bind:favourites="favourites"
    />
  </div>
</template>

<script>
import firebase, { functions } from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { values } from "lodash";

import Header from "./components/Header";

import config from "./config";

firebase.initializeApp(config.firebaseConfig);

export default {
  name: "app",
  data() {
    return {
      user: {
        uid: "",
        email: "",
        type: ""
      },
      favourites: []
    };
  },
  components: {
    Header
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      this.loggedIn(user);
      console.log(user);
      this.user = user
        ? {
            uid: user.uid,
            email: user.email,
            type: user.displayName
          }
        : {
            uid: "",
            email: "",
            type: ""
          };
      if (this.$route.path === "/auth" && user) {
        this.$router.replace("/");
      }
    });
  },
  methods: {
    addToFavoutires: function(card) {
      firebase
        .database()
        .ref(`/pokemons/${this.user.uid}/${card.id}`)
        .set(card);
    },
    removeFromFavoutires: function(card) {
      firebase
        .database()
        .ref(`/pokemons/${this.user.uid}/${card.id}`)
        .set(null);
    },
    loggedIn: function(user) {
      if (user) {
        firebase
          .database()
          .ref(`/pokemons/${user.uid}`)
          .on("value", snap => {
            const data = snap.val();
            this.favourites = data ? values(data) : [];
          });
      }
    }
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
