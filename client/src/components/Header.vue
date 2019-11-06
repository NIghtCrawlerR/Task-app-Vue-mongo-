<template>
  <nav class="navbar text-light">
    <router-link to="/" class="header-button">
      <i class="fas fa-home"></i>
    </router-link>
    <router-link to="/add" class="header-button" v-b-tooltip.hover.left title="Add new card">
      <i class="fas fa-plus"></i>
    </router-link>
    <router-link to="/labels/get" class="header-button" v-b-tooltip.hover.left title="Add labels">
      <i class="fas fa-tags"></i>
    </router-link>
    <a to="/logout" class="header-button" @click.prevent="logoutUser">
      <i class="fas fa-sign-out-alt"></i>
    </a>
  </nav>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Header',
  methods: {
    ...mapActions(['logout']),
    logoutUser() {
      this.logout()
    }
  }
}
</script>

<style scoped>
a {
  color: #fff;
  text-decoration: none;
}
.navbar {
  padding: 0;
  background-color: #243046;
  display: block;
  width: 48px;
  height: 100%;
  position: fixed;
  right: 0;
  top: 0;
}
.header-button {
  display: block;
  font-size: 20px;
  margin: 20px 0;
  text-align: center;
  transition: all 0.3s;
}
.header-button:hover {
  color: #ff9900;
}
</style>

