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
    .message h3 {
        text-transform: uppercase;
        font-size: 18px;
        letter-spacing: 1px;
    }
    .message p {
        font-size: 14px;
    }
    .message.success {
        background-color: rgb(79, 195, 136, .6);
        border-color: #48d88f;
    }
    .message.warning {
        background-color: rgba(195, 154, 79, 0.6);
        border-color: #d89e48;
    }
    .message.error {
        background-color: rgba(195, 79, 89, 0.6);
        border-color: #d8484f;
    }
</style>
