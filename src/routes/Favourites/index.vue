<template>
  <div class="container">
    <div v-if="!user || !user.uid" class="modal">
     You are not logged in.
     <router-link to="/auth">Click to login</router-link>
    </div>
    <div v-if="!favourites.length && user.uid" class="modal">
      No pokemons added to favourites.
    </div>
    <div v-for="pokemon in favourites" v-bind:key="pokemon.id" class="card">
      <img v-bind:src="pokemon.imageUrl"/>
      <div class="cardData">
        <p>{{pokemon.name}}</p>
        <p>Number: {{pokemon.number}}</p>
        <p>HP: {{pokemon.hp}}</p>
        <p v-for="type in pokemon.types" v-bind:key="type" class="attacks">
          <i class="energy" v-bind:class="type.toLowerCase()"></i>
          {{type}}
        </p>
        <p v-on:click="handleClickRemove(pokemon)" >
          <i class="fas fa-heart"></i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Favourites",
  props: {
    user: {
      type: Object
    },
    removeFromFavoutires: {
      type: Function
    },
    favourites: {
      type: Array
    }
  },
  methods: {
    handleClickRemove: function(pokemon) {
      this.removeFromFavoutires(pokemon);
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  background-color: lightblue;
  min-height: calc(100vh - 104px);
}

.modal {
  width: 50%;
  height: 100px;
  border: 1px solid gray;
  border-radius: 15px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 20px;
}

.card {
  position: relative;
  width: 20%;
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

.attacks {
  display: flex;
  align-items: center;
  justify-content: center;
}

.weaknesses {
  display: flex;
  align-items: center;
  justify-content: center;
}

.energy {
  background-image: url("../../assets/energy-types-f0fdba3b2e216b418fbedace0c050f36.png");
  width: 25px;
  height: 25px;
  display: inline-block;
  margin-right: 5px;
}

.energy.grass {
  background-position: -25px -50px;
}

.energy.colorless {
  background-position: -25px 0;
}

.energy.fire {
  background-position: 0 0;
}

.energy.water {
  background-position: -75px -50px;
}

.energy.lightning {
  background-position: -50px -50px;
}

.energy.darkness {
  background-position: 0 -50px;
}

.energy.fairy {
  background-position: -50px 0;
}

.energy.psychic {
  background-position: -75px -25px;
}

.energy.metal {
  background-position: -75px 0;
}

.energy.dragon {
  background-position: 0 -25px;
}

.energy.fighting {
  background-position: -50px -25px;
}

.fa-heart {
  font-size: 30px;
}

@media only screen and (max-width: 768px) {
  .modal {
    width: 90%;
    font-size: 16px;
  }
  .card {
    width: 50%;
  }
}
</style>
