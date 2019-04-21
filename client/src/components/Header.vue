<template>
     <nav class="navbar text-light bg-dark">
        <div class="navbar-brand">Dashboard</div>
        <form class="form-inline">
            <!-- <button class="btn btn-outline-warning show-form mr-2" data-toggle="modal" data-target="#add_card" type="button">Add card</button> -->
            <b-button v-b-modal.cardModal v-on:click="$emit('changeMode', 'add')" class="mr-2">Add card</b-button>
            <b-button v-b-modal.add_badges class="btn-info mr-2">Add badges</b-button>
            
        </form>
    </nav>
</template>

<script>

export default {
    name: 'Header'
}
</script>
