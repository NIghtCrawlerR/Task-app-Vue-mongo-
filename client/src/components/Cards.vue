<template>
  <div class="d-flex flex-wrap cards">
        <Card v-bind:key="card.id" v-for="card in cards" v-bind:card="card" v-on:getCardData="emitData"/>
  </div>
</template>

<script>
import Card from "./Card";

export default {
  name: "Cards",
  props: ["cards"],
  components: {
    Card
  },
  methods: {
    emitData: function(d){
      this.$emit('getCardData', d)
    }
  }
};
</script>




