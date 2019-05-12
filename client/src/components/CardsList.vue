<template>
	<div class="d-flex flex-wrap m-2 mr-5">
		<draggable class="d-flex flex-wrap" draggable=".card" @update="onSort" :list="cards"> 
			<Card class="card" v-for="card in cards" v-bind:key="card._id" v-bind:card="card" />
			<router-link to="/add" class="add-card-button m-2"><i class="fas fa-plus mr-2"></i> Add card</router-link>
		</draggable>
	</div>
</template>

<script>
import Card from "./Card";
import axios from 'axios'
import draggable from 'vuedraggable'

export default {
	name: "CardsList",
	display: 'Simple',
	order: 0,
	components: {
		Card,
		draggable
	},
	data() {
		return {
			dragging: false,
			cards: []
		}
	},
	methods: {
		onSort: function(e) {
			let ids = []
			let orders = []
			this.cards.map((card, i) => {
				ids.push(card._id)
				orders.push(i)
			})

			axios.post('http://localhost:5000/api/routes/updateOrder/', {ids, orders}) 
				.then(response => console.log(response))
				.catch(err => console.log(err))
		}
	},
	async created() {
		axios.get('http://localhost:5000/api/routes/')
		.then(response => { this.cards = response.data })
		.catch(err => console.log(err))
	}
};
</script>

<style scoped>
  .add-card-button {
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #3e4c67;
    color: #3e4c67;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 16px;
    transition: all .3s;
    min-height: 100px;
  }
  .add-card-button:hover {
    background-color: #243046;
    color: #fff;
  }
</style>






