import Vue from 'vue'
import Router from 'vue-router'
import CardsList from '../components/CardsList'
import AddCard from '../components/AddCard.component'
import EditCard from '../components/EditCard.component'

Vue.use(Router)

export default new Router ({
    routes: [
        {
            path: '/',
            name: 'CardsList',
            component: CardsList
        },
        {
            path: '/add',
            name: 'AddCard',
            component: AddCard
        },
        {
            path: '/:id',
            name: 'EditCard',
            component: EditCard
        }
    ]
})