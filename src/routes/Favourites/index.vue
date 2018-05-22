<template>
  <div class="container">
    fav
  </div>
</template>

<script>
  export default {
    name: 'Pokemons',
    props: {
      pokemons: {
        type: Array
      }
    }
  }
</script>

<style scoped>
  .container {
    background-color: lightblue;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    min-height: calc(100vh - 100px);
  }
</style>
