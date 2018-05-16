<template>
  <div class="header">
    <div class="logo">
      <img src="../assets/Ultra-Ball-64.png"/>
      <span class="text">POKEDEX</span>
    </div>
    <input v-on:input="handleInput" v-on:change="handleInput">
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
      search: {
        type: Function
      }
    },
    methods: {
      handleInput({target}) {
        this.search(target.value)
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

  input {
    width: 50%;
    padding: 12px 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 18px;
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

    input {
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
