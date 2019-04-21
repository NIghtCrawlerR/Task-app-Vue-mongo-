<template>
  <div id="app">
    <TaskApp/>
  </div>
</template>

<script>
import TaskApp from './components/TaskApp.vue'

export default {
  name: 'app',
  components: {
    TaskApp
  },
  data(){
      return {
          rootMode: 'rootMode'
      }
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
input[type=checkbox] {
    position: absolute;
    opacity: 0;
    width: 20px;
    height: 20px;
    z-index: 100;
}
input[type=checkbox] + .checkbox {
    position: absolute;
}
input[type=checkbox] + .checkbox::before {
    position: absolute;
    content: '';
    width: 20px;
    height: 20px;
    background: #fff;
    border: 1px solid #1984ff;
    left: 0;
    top: 2px;
}

input[type=checkbox] + .checkbox::after {
    position: absolute;
    content: '✓';
    color: #1984ff;
    left: 5px;
    top: -12px;
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
</style>
