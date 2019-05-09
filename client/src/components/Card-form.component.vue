<template>
  <div>
    <div class="container mt-4">
        
      <form class="new_card" v-on:submit="onSubmit">
        <!--Modal body-->
        <!-- <div class="form-group">
                <label for="title">Badges</label>
                <select name="data" data-field="badges" multiple="multiple" value="" class="form-control" id="badges">
                    <option value="1">1</option>
                </select>
                
        </div>-->
        <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            class="form-control"
            name="data"
            v-model="title"
            data-field="title"
            id="title"
            placeholder="Title"
            required
          >
        </div>
        <div class="form-group">
          <label for="descr">Description</label>
          <textarea
            class="form-control"
            v-model="descr"
            name="data"
            data-field="descr"
            id="descr"
            placeholder="Description"
            rows="4"
          ></textarea>
        </div>
        <input type="hidden" name="data" data-field="index" value="0">
        <TaskGroup v-for="group in taskGroups" v-bind:key="group.id" v-bind:group="group" v-on:setChange="setChange"></TaskGroup>  
 

        <b-button variant="primary" size="sm" v-on:click="addGroup">Add list</b-button>
        <br>
        <b-button variant="success" type="submit" class="mt-3">{{mode === 'add' ? 'Create card' : 'Save changes'}}</b-button>
        <br>
        <b-button variant="danger" v-if="mode === 'edit'" v-on:click="deleteCard">Delete card</b-button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import uuid from 'uuid'
import TaskGroup from './Task-group.component'

export default {
  name: "Form",
  props: ["mode"],
  components: {
      TaskGroup
  },
  data() {
    return {
      title: "",
      descr: "",
      taskGroups: []
    };
  },
  methods: {
    addGroup: function() {
      this.taskGroups.push({
        id: uuid.v4(),
        name: "Group " + (this.taskGroups.length + 1),
        tasks: []
      });
    },
    setChange: function(e) {
      this.taskGroups.find(grp => {
        return grp.id == e.id
      }).tasks = e.tasks
    },
    deleteCard: function(){
        let isDel = window.confirm('Are you sure?')
        if(isDel) axios.delete("http://localhost:5000/api/routes/delete/"+this.$route.params.id)
            .then(res => {
                this.$router.push('/')
                console.log(res)
            })
    },
    onSubmit: function(e) {
      e.preventDefault();
      let newCard = {
        title: this.title,
        descr: this.descr,
        taskGroups: this.taskGroups
      };

      if(this.mode === 'add') {
        axios.post("http://localhost:5000/api/routes/add", newCard)
            .then(response => {
            this.title = "";
            this.descr = "";
            this.taskGroups = [];
            console.log(response);
            })
            .catch(err => console.log(err));
      }
      else {
          axios.post("http://localhost:5000/api/routes/update/"+this.$route.params.id, newCard)
          .then(res => console.log(res))
      }
     
    }
  },
  created: function() {
      if(this.mode === 'edit') {
          axios.get('http://localhost:5000/api/routes/' + this.$route.params.id)
                .then(response => {
                    this.title = response.data.title,
                    this.descr = response.data.descr,
                    this.taskGroups = response.data.taskGroups
                    console.log(response)
                })
                .catch((err) => console.log(err))
      }
  }
};
</script>

<style scoped>
  h3, p, label, input {
    color: #fff;
  }
</style>

