<template>
  <div class="header">
    <div class="logo">
      <img src="../assets/Ultra-Ball-64.png" />
      POKEDEX
    </div>
    <input v-on:input="handleInput" v-on:change="handleInput">
    <div>Registration</div>
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
</style>
