import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import Setting from '../views/Setting.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Main
        },
        {
            path: '/setting',
            component: Setting
        },
    ]
})

export default router