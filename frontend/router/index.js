import { createRouter, createWebHistory } from 'vue-router';
import IndexItem from '../src/components/IndexItem.vue';

const routes = [
    {
        path: '/',
        component: IndexItem,
        meta: {
            title: 'Website-parser'
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});

export default router;

