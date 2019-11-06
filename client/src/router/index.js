import Vue from 'vue'
import Router from 'vue-router'
import { store } from '../store'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/dashboard',
            name: 'CardsList',
            component: () => import('../components/CardsList'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/dashboard/add',
            name: 'AddCard',
            component: () => import('../components/AddCard.component'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/card/:id',
            name: 'EditCard',
            component: () => import('../components/EditCard.component'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/labels/get',
            name: 'LabelsForm',
            component: () => import('../components/Labels-form.component'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../components/Auth/index'),
            props: { regForm: true },
            meta: {
                requiresGuest: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../components/Auth/index'),
            props: { loginForm: true },
            meta: {
                requiresGuest: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.isLoggedIn) {//if not logged in
            //redirect
            next('/login')
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
        if (store.getters.isLoggedIn) {
            next('/dashboard')
        } else {
            next()
        }
    }
})

export default router