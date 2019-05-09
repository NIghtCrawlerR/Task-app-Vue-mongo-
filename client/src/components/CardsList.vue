<template>
  <div class="d-flex flex-wrap cards">
        <router-link class="card m-3" v-for="card in cards" v-bind:key="card._id" :to="'/'+card._id">
          <Card v-bind:card="card" />
        </router-link>
        
  </div>
</template>

<script>
import Card from "./Card";
import Service from "../service"

export default {
  name: "CardsList",
  components: {
    Card
  },
  data() {
    return {
      cards: []
    }
  },
  // methods: {
  //   emitData: function(d){
  //     this.$emit('getCardData', d)
  //   }
  // }
  async created() {
    try {
      this.cards = await Service.getCards();
      console.log(this.cards)
    } catch (err) {
      this.error = err;
    }
  }
};
</script>

<style scoped>
  .card {
        border-radius: 0;
        background-color: #243046;
        color: #fff;
        border: 1px solid #3e4c67;
  }
</style>





