<template>
    <div class="container mt-4 mb-5">
        <router-link to="/" class="btn btn-outline-light mb-4">
			<i class="fas fa-arrow-left"></i> Back
		</router-link>
        <h3 class="pull-right">Add labels</h3>
        <form class="label-form" v-on:submit="onSubmit">
             <label v-if="labels.length > 0">Labels:</label>
            <div class="form-group">
                <span v-for="label in labels" v-bind:key="label._id" class="badge badge-primary mr-2" :style="'background-color:'+label.color">
                    {{ label.title }}
                    <span v-on:click="removeLabel" :id="label._id" class="remove"><i class="fas fa-times"></i></span>
                </span>
            </div>

            <div class="form-group">
                <label>Label title</label>
                <input type="text" class="form-control" v-model="title" required>
            </div>

            <div class="form-group">
                <label>Choose color</label>
                <div class="colors">
                    <div v-for="color in colors" v-bind:key="color">
                        <input type="radio" name="color" :id="color" :value="color" v-model="lColor">
                        <label :for="color" :style="'background-color:'+color"></label>
                    </div>
                </div>
            </div>
            <b-button variant="info" type="submit">Create label</b-button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'LabelsForm',
    data () {
        return {
            title: '',
            lColor: '',
            labels: [],
            colors: ['#1d64e9', '#1d97e9', '#06b440', '#ffbb00', '#e71b36', '#951be7']
        }
    },
    methods: {
        removeLabel: function (e) {
            let isDel = window.confirm("Delete label?");
            let thatId = e.target.id,
                labels = this.labels

            if (isDel) axios.delete("http://localhost:5000/api/routes/labels/delete/"+ thatId)
            .then(response => {
                labels.splice(labels.indexOf(labels.find(el => el._id == thatId)), 1)
                this.$root.$emit("showMessage", response.data);
            })
            .catch(err => this.$root.$emit("showMessage", err.data))
        },
        onSubmit: function (e) {
            e.preventDefault();

            let newLabel = {
                title: this.title,
                color: this.lColor
            }
            console.log(newLabel)
            axios.post("http://localhost:5000/api/routes/labels/add", newLabel)
            .then(response => {
                this.labels.push(newLabel)
                this.title = '',
                this.$root.$emit("showMessage", response.data);
            })
            .catch(err => this.$root.$emit("showMessage", err.data))
        }
    },
    created: function () {
        axios.get("http://localhost:5000/api/routes/labels/get")
            .then(response => {
                this.labels = response.data
                console.log(this.labels)
            })
            
    }
}
</script>

<style scoped>
    h3 {
        font-size: 20px;
    }
    .label-form {
        background-color: #243046;
        border: 1px solid #3e4c67;
        color: #fff;
        padding: 30px;
    }
    .colors {
        display: flex;
    }
    .colors label {
        width: 15px;
        height: 15px;
        background-color: #333;
    }
    .colors input:checked + label {
        border: 1px solid #fff;
    }
    .badge {
        position: relative;
        padding-left: 15px;
        padding-right: 15px;
    }
    .remove {
        cursor: pointer;
        position: absolute;
        top: -10px;
        right: -10px;
        background-color: rgb(228, 27, 54);
        padding: 3px 5px;
        text-align: center;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid rgba(255, 255, 255, .5);
        transition: all .3s;
        opacity: 0;
    }
    .remove i {
        pointer-events: none;
    }
    .badge:hover .remove {
        opacity: 1;
    }
</style>

