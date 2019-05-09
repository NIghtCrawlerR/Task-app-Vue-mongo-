<template>
     <nav class="navbar text-light bg-dark">
        <div class="navbar-brand"><router-link to="/">Dashboard</router-link></div>
        <form class="form-inline">
            <b-button class="mr-2"><router-link to="/add">Add card</router-link></b-button>
            <b-button v-b-modal.add_badges class="btn-info mr-2">Add badges</b-button>
        </form>
    </nav>
</template>

<script>

export default {
    name: 'Header'
}
</script>

<style scoped>
    a {
        color: #fff;
        text-decoration: none;
    }
</style>

