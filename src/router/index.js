import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
// --- Añade estas líneas ---
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
// ------------------------

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
    // --- Reemplaza el componente temporal por el real ---
    component: Login, 
    meta: {
      title: 'Iniciar Sesión | Biblioteca'
    }
  },

  // --- Añade esta ruta nueva ---
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      title: 'Registrarse | Biblioteca'
    }
  },
  // ---------------------------

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