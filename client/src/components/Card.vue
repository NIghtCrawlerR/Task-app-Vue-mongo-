<template>
  <router-link :to="'/'+card._id" class="card m-2">
    <div class="card-body">
      <h5 class="card-title">{{ card.title }}</h5>
      <p class="card-descr">{{ card.descr }}</p>
      <div>
        <span
          class="badge mr-2"
          v-for="label in card.labels"
          v-bind:key="label._id"
          :style="'background-color:'+label.color"
        >{{ label.title }}</span>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "Card",
  props: ["card"]
};
</script>

<style scoped>
.card {
  border-radius: 0;
  background-color: #243046;
  color: #fff;
  border: 1px solid #3e4c67;
  transition: all 0.3s;
  min-width: 120px;
}

.card:hover {
  text-decoration: none;
  background-color: #3e4c67;
}

.card-body {
  display: flex;
  flex-direction: column;
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
  font-size: 14px;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
</style>

