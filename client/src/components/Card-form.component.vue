<template>
  <div>
    <div class="container mt-4 mb-5">
      <router-link to="/" class="btn btn-outline-light mb-4">
        <i class="fas fa-arrow-left"></i> Back
      </router-link>
      <b-button
        variant="none"
        v-if="mode === 'edit'"
        class="pull-right btn-outline-danger"
        v-on:click="deleteCard"
      >
        <i class="fas fa-trash-alt mr-2"></i> Delete card
      </b-button>
      <h3 v-else class="pull-right card-title">Add new card</h3>
      <form class="card_inner" v-on:submit="onSubmit">
        <div class="form-group mb-4">
          <label v-if="mode == 'add'" for="title">Title</label>
          <input
            type="text"
            v-model="title"
            class="form-control"
            v-on:keydown="isTyping"
            :class="mode == 'edit' ? 'input-editable card-title' : ''"
            placeholder="Title"
            required
          />
        </div>

        <multiselect
          class="form-control mb-3"
          v-model="selectedLabels"
          :multiple="true"
          :options="labels"
          label="title"
          track-by="title"
          @input="onSelect"
          :placeholder="'Select labels'"
        >
          <template slot="tag" slot-scope="{option, remove}">
            <span class="multiselect__tag" :style="'background-color:'+option.color">
              {{option.title}}
              <i
                @click="remove(option)"
                aria-hidden="true"
                tabindex="1"
                class="multiselect__tag-icon"
              ></i>
            </span>
          </template>
          <template slot="option" slot-scope="props" v-on:click="onSelect">
            <span
              class="badge"
              :style="'background-color:'+props.option.color"
            >{{props.option.title}}</span>
          </template>
        </multiselect>

        <div class="form-group mb-5">
          <label v-if="mode == 'add'" for="descr">Description</label>
          <textarea-autosize
            class="form-control"
            v-model="descr"
            v-on:keydown="isTyping"
            :class="mode == 'edit' && descr ? 'input-editable' : ''"
            placeholder="Description"
          ></textarea-autosize>
        </div>

        <draggable ghost-class="ghost" @update="onSort" :list="taskGroups">
          <TaskGroup
            v-for="group in taskGroups"
            v-bind:key="group.id"
            v-bind:group="group"
            v-on:setChange="setChange"
            v-on:removeGroup="removeGroup"
            v-on:isTyping="isTyping"
          ></TaskGroup>
        </draggable>
        <b-button variant="primary" size="sm" v-on:click="addGroup">Add list</b-button>
        <br />
        <b-button
          variant="info"
          type="submit"
          class="mt-5"
        >{{ mode === "add" ? "Create card" : "Save changes" }}</b-button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import uuid from "uuid";
import TaskGroup from "./Task-group.component";
import draggable from 'vuedraggable';
import Multiselect from 'vue-multiselect'

const apiEndpoint = 'https://mevn-dashboard.herokuapp.com'

export default {
  name: "Form",
  props: ["mode"],
  components: {
    TaskGroup,
    draggable,
    Multiselect
  },
  data() {
    return {
      title: "",
      descr: "",
      order: "",
      taskGroups: [],
      selectedLabels: [],
      labels: [],
      timeout: null
    };
  },
  methods: {
    addGroup: function () {
      this.taskGroups.push({
        id: uuid.v4(),
        name: "Group " + (this.taskGroups.length + 1),
        tasks: []
      });
    },
    removeGroup: function (id) {
      let isDel = window.confirm("Delete this group?");
      if (isDel) {
        this.taskGroups.map((grp, i) => {
          if (grp.id == id) this.taskGroups.splice(i, 1);
        });
        if (this.mode == 'edit') this.onSubmit()
      }
    },
    setChange: function (e) {
      this.taskGroups.find(grp => {
        return grp.id == e.id;
      }).tasks = e.tasks;
      if (this.mode == 'edit') this.onSubmit()
    },
    deleteCard: function () {
      let isDel = window.confirm("Are you sure?");
      if (isDel)
        axios
          .delete(
            apiEndpoint + "/api/routes/delete/" + this.$route.params.id
          )
          .then(response => {
            this.$router.push("/");
            this.$root.$emit("showMessage", response.data);
          });
    },
    onSubmit: function (e) {
      if (e) e.preventDefault();

      let newCard = {
        title: this.title,
        descr: this.descr,
        order: this.order,
        taskGroups: this.taskGroups,
        labels: this.selectedLabels
      };

      if (this.mode === "add") {
        axios
          .post(apiEndpoint + "/api/routes/add", newCard)
          .then(response => {
            this.title = "";
            this.descr = "";
            this.taskGroups = [];
            this.selectedLabels = [];
            this.$root.$emit("showMessage", response.data);
          })
      } else {
        axios.post(apiEndpoint + "/api/routes/update/" + this.$route.params.id, newCard)
          .then(response => {
            this.$root.$emit("showMessage", response.data);
          });
      }
    },
    onSort: function () {
      this.taskGroups.map((grp, i) => {
        grp['order'] = i
      })
      if (this.mode == 'edit') this.onSubmit();
    },
    isTyping: function () {
      if (this.mode == 'add') return !1
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        if (this.mode == 'edit') this.onSubmit();
      }, 2000);
    },
    onSelect: function () {
      if (this.mode == 'edit') this.onSubmit()
    }
  },
  created: function () {
    if (this.mode == 'add') axios.get(apiEndpoint + "/api/routes/").then(res => this.order = res.data.length + 1)

    axios.get(apiEndpoint + "/api/routes/labels/get")
      .then(response => {
        this.labels = response.data
      })

    if (this.mode === "edit") {
      axios
        .get(apiEndpoint + "/api/routes/" + this.$route.params.id)
        .then(response => {
          (this.title = response.data.title),
            (this.descr = response.data.descr),
            (this.order = response.data.order),
            (this.selectedLabels = response.data.labels),
            (this.taskGroups = response.data.taskGroups.sort((a, b) => a.order - b.order));
        })
    }
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
h3,
p,
label,
input {
  color: #fff;
}
textarea {
  resize: none;
}
.card_inner {
  background-color: #243046;
  border: 1px solid #3e4c67;
  padding: 30px;
}
.card-title {
  text-transform: uppercase;
  font-weight: 500;
  font-size: 20px;
  letter-spacing: 1px;
}

.input-editable {
  background-color: transparent !important;
  border-color: transparent !important;
}
.input-editable:hover {
  border-color: #4e6080 !important;
}

.ghost {
  opacity: 0.5;
}
</style>

