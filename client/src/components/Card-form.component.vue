<template>
	<div>
		<div class="container mt-4 mb-5">
		<router-link to="/" class="btn btn-outline-light mb-4">
			<i class="fas fa-arrow-left"></i> Back
		</router-link>
		<b-button variant="none" v-if="mode === 'edit'" class="pull-right btn-outline-danger" v-on:click="deleteCard">
			<i class="fas fa-trash-alt mr-2"></i> Delete card
		</b-button>
		<form class="card_inner" v-on:submit="onSubmit">
			<div class="form-group">
				<label v-if="mode == 'add'" for="title">Title</label>
				<input type="text" v-model="title" class="form-control" :class="mode == 'edit' ? 'input-editable card-title' : ''" placeholder="Title" required>
			</div>
			<div class="form-group">
				<label v-if="mode == 'add'" for="descr">Description</label>
				<textarea class="form-control" v-model="descr" :class="mode == 'edit' ? 'input-editable' : ''" placeholder="Description" ></textarea>
			</div>
		
			<TaskGroup
			v-for="group in taskGroups"
			v-bind:key="group.id"
			v-bind:group="group"
			v-on:setChange="setChange"
			v-on:removeGroup="removeGroup"
			></TaskGroup>

			<b-button variant="primary" size="sm" v-on:click="addGroup">Add list</b-button>
			<br>
			<b-button variant="info" type="submit" class="mt-5">
				{{ mode === "add" ? "Create card" : "Save changes" }}
			</b-button>
		</form>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import uuid from "uuid";
import TaskGroup from "./Task-group.component";

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
		order: "",
		taskGroups: []
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
		this.taskGroups.map((grp, i) => {
			if (grp.id == id) this.taskGroups.splice(i, 1);
		});
		this.onSubmit()
    },
    setChange: function (e) {
		this.taskGroups.find(grp => {
			return grp.id == e.id;
		}).tasks = e.tasks;
		this.onSubmit()
    },
    deleteCard: function () {
		let isDel = window.confirm("Are you sure?");
		if (isDel)
			axios
			.delete(
				"http://localhost:5000/api/routes/delete/" + this.$route.params.id
			)
			.then(response => {
				this.$router.push("/");
				this.$root.$emit("showMessage", response.data);
				console.log(response);
			});
    },
    onSubmit: function (e) {
		if (e) e.preventDefault();
		let newCard = {
			title: this.title,
			descr: this.descr,
			order: this.order,
			taskGroups: this.taskGroups
		};
		if (this.mode === "add") {
			axios
			.post("http://localhost:5000/api/routes/add", newCard)
			.then(response => {
				this.title = "";
				this.descr = "";
				this.taskGroups = [];
				this.$root.$emit("showMessage", response.data);
				console.log(response);
			})
			.catch(err => console.log(err));
		} else {
			axios.post("http://localhost:5000/api/routes/update/" + this.$route.params.id, newCard)
			.then(response => {
				this.$root.$emit("showMessage", response.data);
			});
		}
    }
  },
  created: function () {
    if (this.mode === "edit") {
      axios
        .get("http://localhost:5000/api/routes/" + this.$route.params.id)
        .then(response => {
          (this.title = response.data.title),
            (this.descr = response.data.descr),
            (this.order = response.data.order),
            (this.taskGroups = response.data.taskGroups);
          console.log(response);
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

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

</style>

