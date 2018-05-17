<template>
  <div>
    <Header v-bind:search="search" v-bind:types="types"/>
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
        pokemons: [],
        types: [''],
        searchData: {
          name: '',
          types: ''
        }
      }
    },
    created() {
      fetch('https://api.pokemontcg.io/v1/cards')
        .then(res => res.json())
        .then(data => {
          this.pokemons = data.cards
        })
      fetch('https://api.pokemontcg.io/v1/types')
        .then(res => res.json())
        .then(data => {
          this.types = [...data.types, ''].sort()
        })
    },
    methods: {
      search: _.debounce(function ({value, type}) {
        const searchData = {
          ...this.searchData,
          [type]: value
        }
        fetch(`https://api.pokemontcg.io/v1/cards?name=${searchData.name}&types=${searchData.types}`)
          .then(res => res.json())
          .then(data => {
            this.pokemons = data.cards
            this.searchData = searchData
          })
      }, 10)
    },
    components: {
      Header,
      Pokemons
    }
  }
</script>

<style scoped>

</style>
