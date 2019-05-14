<template>
  <div id="app">
    <!-- <TaskApp/> -->
    <Header></Header>
    <router-view v-on:showMessage="showMessage"></router-view>
    <Message v-if="message.isShow" v-bind:message="message"></Message>
  </div>
</template>

<script>
// import TaskApp from './components/TaskApp.vue'
import Header from './components/Header'
import Message from './components/Message.component'

export default {
  name: 'app',
  components: {
    Header,
    Message
  },
  methods: {
      showMessage: function (data) {
          this.message.status = data.status
          this.message.text = data.text
          this.message.isShow = true
          setTimeout(() => {
              this.message.isShow = false
          }, 3000)
      }
  },
  data(){
      return {
          rootMode: 'rootMode',
          message: {'isShow': false, 'status': '', 'text': ''}
      }
  },
  created: function () {
      this.$root.$on('showMessage', this.showMessage);
  }
}
</script>

<style>
:root {
    --badge-red: #fa004b;
    --badge-yellow: #fbff04;
    --badge-green: #1dd34a;
    --badge-blue: #0486ff;
    --badge-pink: #ff2ea1;
    --badge-purple: #9b0e5c;
    --badge-default: #b6b6b6;
}

body {
    background-color: #141b29 !important;
}

.clearfix {
    content: "";
    display: table;
    clear: both;
}

h3 {
    color: #fff;
    text-transform: uppercase;
    font-weight: 500;
    font-size: 20px;
    letter-spacing: 1px;
}

/*Buttons*/
.btn-success {
    background: #00bbce;
    border-color: #00bbce;
}
.btn-success:hover {
    background: #00ce89;
    border-color: #00ce89;
}
.btn-danger {
    background: #d41a3c;
    border-color: #d41a3c;
}
.btn-warning {
    background: #ff9900;
    border-color: #ff9900;
    color: #fff;
}
.btn-warning:hover {
    color: #fff;
}
.btn-link-danger {
    color: #d41a3c;
}

/*Inputs*/
::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: rgba(255, 255, 255, .5) !important;
}

input[type=checkbox] {
    position: absolute;
    opacity: 0;
    left: -9999px;
}
input[type=checkbox] + .checkbox {
    position: relative;
    padding-left: 30px;
}
input[type=checkbox] + .checkbox::before {
    position: absolute;
    content: '';
    width: 20px;
    height: 20px;
    background: transparent;
    border: 1px solid #FF9900;
    left: 0;
    top: 9px;
}

input[type=checkbox] + .checkbox::after {
    position: absolute;
    content: '✓';
    color: #FF9900;
    left: 5px;
    top: -5px;
    font-weight: 600;
    font-size: 25px;
    transform: scale(0);
    transition: all .3s;
}
input[type=checkbox]:checked + .checkbox + .task {
    color: #989898;
}
input[type=checkbox]:checked + .checkbox::after {
    transform: scale(1);
}

input[type=radio]{
    position: absolute;
    left: -9999px;
}
input[type=radio] + label{
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    background: #f1f1f1;
    margin-right: 10px;
    cursor: pointer;
}
.pull-right {
    float: right;
}

.form-control {
    color: #fff !important;
    background-color: #33415a !important;
    border-color: #4e6080 !important;
}
.btn-outline-light {
  border-color: #4e6080 !important;
  color: #4e6080 !important;
}
.btn-link {
    color: #00c2ff !important;
}
.btn-link-danger {
    color: #ef0f36 !important;
}
.btn-outline-danger {
    color: #ef0f36;
    border-color: #ef0f36;
}
</style>
