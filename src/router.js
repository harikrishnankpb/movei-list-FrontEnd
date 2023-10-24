import Home from './components/Home.vue';
import LogIn from './components/Login.vue';
import SignUp from './components/SignUp.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        name: 'Home',
        component: Home,
        path: '/'
    }, {
        name: 'LogIn',
        component: LogIn,
        path: '/login'
    },
    {
        name: 'SignUp',
        component: SignUp,
        path: '/signUp'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;