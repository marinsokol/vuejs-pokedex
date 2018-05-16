<template>
  <div class="container">
    <div v-for="pokemon in pokemons" v-bind:key="pokemon.id" class="card">
      <img v-bind:src="pokemon.imageUrl"/>
      <div class="cardData">
        <p>{{pokemon.name}}</p>
        <p>Number: {{pokemon.number}}</p>
        <p>HP: {{pokemon.hp}}</p>
        <p v-if="pokemon.weaknesses">Weaknesses</p>
        <div v-for="week in pokemon.weaknesses" v-bind:key="week.type" class="weaknesses">
          <i class="energy" v-bind:class="week.type.toLowerCase()"></i>
          {{week.value}}
        </div>
      </div>
    </div>
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
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .card {
    position: relative;
    width: 10%;
    float: left;
  }

  .card:hover .cardData {
    display: block;
  }

  img {
    width: 100%;
  }

  .cardData {
    display: none;
    background: whitesmoke none repeat scroll 0 0;
    height: 100%;
    width: 100%;
    opacity: 0.9;
    text-align: center;
    text-transform: uppercase;
    color: #000;
    text-shadow: 2px 2px rgba(0, 0, 0, 0.09);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  p {
    margin: 0;
    margin-top: 15px;
  }

  .weaknesses {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .energy {
    background-image: url('../assets/energy-types-f0fdba3b2e216b418fbedace0c050f36.png');
    width: 25px;
    height: 25px;
    display: inline-block;
  }

  .energy.grass {
    background-position: -25px -50px
  }

  .energy.colorless {
    background-position: -25px 0
  }

  .energy.fire {
    background-position: 0 0
  }

  .energy.water {
    background-position: -75px -50px
  }

  .energy.lightning {
    background-position: -50px -50px
  }

  .energy.darkness {
    background-position: 0 -50px
  }

  .energy.fairy {
    background-position: -50px 0
  }

  .energy.psychic {
    background-position: -75px -25px
  }

  .energy.metal {
    background-position: -75px 0
  }

  .energy.dragon {
    background-position: 0 -25px
  }

  .energy.fighting {
    background-position: -50px -25px
  }
</style>
