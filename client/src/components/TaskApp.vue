<template>
  <div>
    
    <Header v-on:changeMode="changeMode" />
    <Cards v-bind:cards="cards" v-on:getCardData="getCardData"/>
    
    <ModalBadges/>
  </div>
</template>

<script>
import Service from "../service";
import CardsList from "./CardsList";
//import ModalCard from "./ModalCard";
import ModalBadges from "./ModalBadges";
import Header from './Header.vue'

export default {
  name: "TaskApp",
  components: {
    CardsList,
    //ModalCard,
    ModalBadges,
    Header
  },
  methods: {
    // changeMode: function(mode) {
    //   this.mode = mode
    // },
    getCardData: function(d) {
      this.mode = 'edit'
      this.currentCard = d
      //console.log(this.currentCard)
    }
  },
  data() {
    return {
      cards: [],
      currentCard: [],
      error: "",
      text: "",
      mode: "add"
    };
  },
  async created() {
    try {
      this.cards = await Service.getCards();
    } catch (err) {
      this.error = err;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
