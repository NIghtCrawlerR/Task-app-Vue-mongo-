<template>
  <div class="card m-2" v-b-modal.cardModal v-on:click="emitData">
    <div class="card-body">
      <h5 class="card-title">{{ card.title }}</h5>
      <p class="card-descr">{{ card.descr }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["card"],
  data() {
    return {
      info: []
    };
  },
  methods: {
    emitData: function() {
     // return this._props.card
      this.$emit('getCardData', this._props.card)
      // try {
      //   this.info = Service.getCardContent(this.card._id);
      //   console.log(this.info)
      // } catch (err) {
      //   this.info = err;
      // }
    }
  }
};
</script>

<style scoped>
.card {
  cursor: pointer;
  width: calc(100% / 5);
}
.card-title {
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  font-size: 16px;
}
.card-descr {
  line-height: 20px;
}
</style>

