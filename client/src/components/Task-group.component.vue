<template>
  <div class="task-group mb-3">
    <span class="handle pull-right">
      <i class="fas fa-bars"></i>
    </span>
    <h3>
      <input
        class="form-control input-editable group-title"
        v-on:keydown="$emit('isTyping')"
        type="text"
        v-model="group.name"
      />
    </h3>
    <div class="progress mb-3">
      <div
        class="progress-bar progress-bar-striped"
        v-bind:style="{ width: progressWidth + '%' }"
      >{{ this.itemsCompleted + ' of ' + this.itemsCount }}</div>
    </div>
    <draggable
      class="task-list-body"
      group="tasks"
      ghost-class="ghost-item"
      handle=".handle"
      :options="{animation:150}"
      @change="onSort"
      :list="group.tasks"
    >
      <div
        v-for="task in tasks"
        v-bind:key="task.id"
        class="task-item"
        :class="hideCompleted && task.checked ? 'hidden':''"
      >
        <input type="checkbox" :id="task.id" v-on:change="setComplete" :checked="task.checked" />
        <label :for="task.id" class="checkbox"></label>
        <input
          type="text"
          class="form-control input-editable"
          v-model="task.task"
          v-on:keydown="$emit('isTyping')"
        />
        <span class="remove" :id="task.id" v-on:click="removeTask">
          <i class="fas fa-times"></i>
        </span>
        <span class="handle">
          <i class="fas fa-bars"></i>
        </span>
      </div>
    </draggable>
    <input
      type="text"
      class="form-control mt-3 mb-3"
      v-on:keypress="addTask"
      placeholder="Add task..."
    />

    <span
      v-if="itemsCompleted > 0"
      class="btn-link b-0"
      v-on:click="toggleCompleted"
    >{{ hideCompleted ? 'Show completed' : 'Hide completed' }}</span>
    <span class="btn-link btn-link-danger pull-right" v-on:click="$emit('removeGroup', group.id)">
      <i class="fas fa-trash-alt mr-2"></i> Remove
    </span>

    <div class="clearfix"></div>
  </div>
</template>

<script>
import uuid from "uuid";
import draggable from 'vuedraggable'

export default {
  name: "TaskGroup",
  display: "Handle",
  props: ["group"],
  components: {
    draggable
  },
  data() {
    return {
      itemsCount: 0,
      itemsCompleted: 0,
      progressWidth: 0,
      hideCompleted: true,
      dragging: false,
      tasks: this.group.tasks.sort((a, b) => a.order - b.order)
    };
  },
  methods: {
    addTask: function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        let grp = this.group,
          val = e.target.value;
        grp.tasks.push({ task: val, checked: false, id: uuid.v4() });

        e.target.value = "";
        this.countCompleted();
        this.$emit("setChange", grp);
      }
    },
    removeTask: function (e) {
      let thatId = e.target.id,
        tasks = this.group.tasks
      tasks.splice(tasks.indexOf(tasks.find(el => el.id == thatId)), 1)
      this.countCompleted();
      this.$emit("setChange", this.group);
    },
    setComplete: function (e) {
      let thatId = e.target.id;
      this.group.tasks.map(task => {
        if (task.id == thatId) task.checked = !task.checked;
        return task;
      });
      this.countCompleted();
      this.$emit("setChange", this.group);
    },
    toggleCompleted: function () {
      this.hideCompleted = !this.hideCompleted;
    },
    countCompleted: function () {
      this.itemsCount = this.group.tasks.length;
      this.itemsCompleted = this.group.tasks.filter(item => item.checked).length;
      this.progressWidth = (100 / this.itemsCount) * this.itemsCompleted || 0;
    },
    onSort: function () {
      this.group.tasks.map((task, i) => {
        task['order'] = i
      })
      this.countCompleted();
      this.$emit("setChange", this.group);
    }
  },
  created: function () {
    this.countCompleted();
  }
};
</script>

<style scoped>
.task-list-body {
  position: relative;
}
.task-group {
  padding: 20px;
  background: #243046;
  border: 1px solid #3e4c67;
}
.task-item {
  display: flex;
}
.input-editable {
  background-color: transparent !important;
  border-color: transparent !important;
}
.input-editable:hover {
  border-color: #4e6080 !important;
}
.group-title {
  text-transform: uppercase;
  font-weight: bold;
  width: 90%;
}
.progress {
  background-color: #33415a;
}
.btn-link {
  cursor: pointer;
}
.btn-link-danger {
  color: #d41a3c;
}
.hidden {
  display: none;
}
.remove {
  color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  padding: 7px 0 7px 20px;
  transition: all 0.3s;
}
.remove:hover {
  color: rgba(255, 255, 255, 1);
}
.remove i {
  pointer-events: none;
}
.handle {
  cursor: move;
  padding: 7px 0 7px 20px;
  color: #fff;
}
.ghost-item {
  background-color: #33415a;
  padding: 0 10px;
  opacity: 0.5;
}
</style>
