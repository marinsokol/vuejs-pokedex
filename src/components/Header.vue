<template>
  <div class="header">
    <div class="logo">
      <img src="../assets/Ultra-Ball-64.png"/>
      <span class="text">POKEDEX</span>
    </div>
    <input v-on:input="handleInput" v-on:change="handleInput" name="name" placeholder="Pokemon name"/>
    <select v-on:select="handleInput" v-on:change="handleInput" name="types">
      <option selected="selected" disabled>Pokemon type</option>
      <option v-for="type in types" v-bind:key="type">
        {{type}}
      </option>
    </select>
    <div class="navigation">
      <div>Favourites</div>
      |
      <div>Registration</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'vue-header',
    props: {
      types: {
        type: Array
      },
      search: {
        type: Function
      }
    },
    methods: {
      handleInput({target}) {
        this.search({
          value: target.value,
          type: target.name
        })
      }
    }
  }
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

  input, select {
    width: 25%;
    padding: 12px 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 18px;
    height: 50px;
  }

  .navigation {
    display: flex;
    width: 180px;
    justify-content: space-between;
  }

  @media only screen and (max-width: 768px) {
    /* For mobile phones: */
    .header {
      flex-direction: column;
    }

    img {
      width: 40px;
      height: 40px;
    }

    input, select {
      width: 100%;
    }

    .logo {
      margin-bottom: 10px;
    }

    .navigation {
      margin-top: 10px;
    }
  }
</style>
