<template>
  <div v-b-modal.cardModal>
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

  created() {
    //console.log(this.card)
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
  max-width: 300px;
}
</style>

