import {
  createRouter,
  createWebHistory,
} from 'vue-router';

import Main from '@/pages/Main.vue';
import TxPage from '@/pages/TxPage';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Main
    },
    {
        path: '/tx/:transactionHash',
        name: 'txPage',
        component: TxPage
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router;
