<template>
    <div class="message" :class="message.status">
        <div class="status">

        </div>
        <div class="info">
            <h3>{{ message.status }}</h3>
            <p>{{ message.text }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Message',
    props: ['message']
}
</script>

<style scoped>
    .message {
        width: 250px;
        height: auto;
        border: 1px solid #fff;
        color: #fff;
        background-color: rgba(255, 255, 255, .5);
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 20px;
    }
    .message.success {
        background-color: rgb(79, 195, 136, .6);
        border-color: #48d88f;
    }
    .message.warning {

    }
    .message.error {

    }
</style>
