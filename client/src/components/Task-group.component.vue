<template>
    <div class="task-group mb-3">
         <h3><input class="form-control input-editable group-title" type="text" v-model="group.name"></h3>
         <div class="progress mb-3">
            <div class="progress-bar progress-bar-striped" v-bind:style="{ width: progressWidth + '%' }" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{ this.itemsCompleted + ' of ' + this.itemsCount }}</div>
        </div>
          <div class="task-list-body">
            <div v-for="task in group.tasks" v-bind:key="task.id" class="task-item" :class="hideCompleted && task.checked ? 'hidden':''">
              <input type="checkbox" :id="task.id" v-on:change="setComplete" :checked="task.checked">
              <label :for="task.id" class="checkbox"></label>
              <input type="text" class="form-control input-editable" v-model="task.task">
            
            </div>
          </div>
          <input class="form-control mt-3 mb-3" type="text" v-on:keypress="addTask" :data-id="group.id" placeholder="Add task..." >

          <span class="btn-link b-0" v-on:click="toggleCompleted">{{ hideCompleted ? 'Show completed' : 'Hide completed' }}</span>
          <span class="btn-link btn-link-danger pull-right">Remove list</span>
    </div>
</template>

<script>
import uuid from 'uuid'

export default {
    name: 'TaskGroup',
    props: ['group'],
    data() {
        return {
            itemsCount: 0,
            itemsCompleted: 0,
            progressWidth: 0,
            hideCompleted: true
        }
    },
    methods: {
        addTask: function (e) {
            if(e.keyCode === 13) {
                e.preventDefault()
                let grp = this.group,
                    val = e.target.value;
                grp.tasks.push({ task: val, checked: false, id: uuid.v4() })

                e.target.value = ''
                this.countCompleted()
                this.$emit('setChange', grp)
            }
        },
        setComplete: function (e) {
            let thatId = e.target.id
            this.group.tasks.map(task => {
                if(task.id == thatId) task.checked = !task.checked
                return task
            })
            this.countCompleted()
            this.$emit('setChange', this.group)
            //console.log(this.group)
        },
        toggleCompleted: function() {
            this.hideCompleted = !this.hideCompleted
        },
        countCompleted: function () {
            this.itemsCount = this.group.tasks.length
            this.itemsCompleted = this.group.tasks.filter(item => item.checked).length
            this.progressWidth = (100 / this.itemsCount) * this.itemsCompleted || 0

        }
    },
    created: function() {
        this.countCompleted()
    }
}
</script>

<style scoped>
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
    }
    .btn-link {
        cursor: pointer;
    }
    .btn-link-danger {
        color: #d41a3c;
    }
    .hidden {
        display: none
    }
</style>
