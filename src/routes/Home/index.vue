<template>
  <div class="container">
    <div class="input-wrap">
      <input v-on:input="handleInput" v-on:change="handleInput" name="name" placeholder="Pokemon name"/>
      <select v-on:select="handleInput" v-on:change="handleInput" name="types">
        <option selected="selected" disabled>Pokemon type</option>
        <option v-for="type in types" v-bind:key="type">
          {{type}}
        </option>
      </select>
    </div>
    <div v-for="pokemon in pokemons" v-bind:key="pokemon.id" class="card">
      <img v-bind:src="pokemon.imageUrl"/>
      <div class="cardData">
        <p>{{pokemon.name}}</p>
        <p>Number: {{pokemon.number}}</p>
        <p>HP: {{pokemon.hp}}</p>
        <p v-for="type in pokemon.types" v-bind:key="type" class="attacks">
          <i class="energy" v-bind:class="type.toLowerCase()"></i>
          {{type}}
        </p>
        <p v-if="user.email && !pokemon.favourite" v-on:click="handleClickAdd(pokemon)" >
          <i class="far fa-heart"></i>
        </p>
        <p v-if="user.email && pokemon.favourite" v-on:click="handleClickRemove(pokemon)" >
          <i class="fas fa-heart"></i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import config from "../../config";

export default {
  name: "Home",
  data() {
    return {
      pokemons: [],
      types: [""],
      searchData: {
        name: "",
        types: ""
      }
    };
  },
  props: {
    user: {
      type: Object
    },
    addToFavoutires: {
      type: Function
    },
    removeFromFavoutires: {
      type: Function
    },
    favourites: {
      type: Array
    }
  },
  created() {
    fetch(`${config.apiUrl}cards`)
      .then(res => res.json())
      .then(data => {
        this.pokemons = data.cards;
      });
    fetch(`${config.apiUrl}types`)
      .then(res => res.json())
      .then(data => {
        this.types = [...data.types, ""].sort();
      });
  },
  watch: {
    favourites: function(value) {
      this.pokemons = this.pokemons.map(p => ({
        ...p,
        favourite: value.findIndex(v => v.id === p.id) !== -1
      }));
    }
  },
  methods: {
    handleClickAdd: function(pokemon) {
      this.addToFavoutires(pokemon);
    },
    handleClickRemove: function(pokemon) {
      this.removeFromFavoutires(pokemon);
    },
    handleInput: _.debounce(function({ target }) {
      const searchData = {
        ...this.searchData,
        [target.name]: target.value
      };
      fetch(
        `${config.apiUrl}cards?name=${searchData.name}&types=${
          searchData.types
        }`
      )
        .then(res => res.json())
        .then(data => {
          this.pokemons = data.cards;
          this.searchData = searchData;
        });
    }, 10)
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  background-color: lightblue;
}

.input-wrap {
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-around;
}

input,
select {
  width: 25%;
  padding: 12px 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 18px;
  height: 50px;
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
  input,
  select {
    width: 50%;
    padding: 6px 10px;
    font-size: 14px;
    height: 35px;
  }

  .card {
    width: 50%;
  }
}
</style>
