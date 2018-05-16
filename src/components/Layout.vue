<template>
  <div>
    <Header v-bind:search="search"/>
    <Pokemons v-bind:pokemons="pokemons"/>
  </div>
</template>

<script>
  import _ from 'lodash'
  import Header from './Header'
  import Pokemons from './Pokemons'

  export default {
    name: 'layout',
    data() {
      return {
        pokemons: []
      }
    },
    created() {
      fetch('https://api.pokemontcg.io/v1/cards')
        .then(res => res.json())
        .then(data => {
          this.pokemons = data.cards
        })
    },
    methods: {
      search: _.debounce(function (name) {
        fetch(`https://api.pokemontcg.io/v1/cards?name=${name}`)
          .then(res => res.json())
          .then(data => {
            this.pokemons = data.cards
          })
      }, 100)
    },
    components: {
      Header,
      Pokemons
    }
  }
</script>

<style scoped>

</style>
