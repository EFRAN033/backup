

import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage,
    meta: {
      title: 'Inicio | Biblioteca' 
    }
  },

  {
    path: '/login',
    name: 'login',

    component: { template: '<div>Página de Login</div>' }, 
    meta: {
      title: 'Iniciar Sesión | Biblioteca'
    }
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        top: 0,
        behavior: 'smooth'
      };
    }
  }
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Biblioteca Educativa'; 
  next(); 
});


export default router;