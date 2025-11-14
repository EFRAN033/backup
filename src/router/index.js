import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

// --- 1. AÑADE LA IMPORTACIÓN PARA TU NUEVA VISTA ---
import MarketStudent from '../views/student/Market_student.vue';
// ----------------------------------------------------

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
    component: Login, 
    meta: {
      title: 'Iniciar Sesión | Biblioteca'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      title: 'Registrarse | Biblioteca'
    }
  },

  // --- 2. AÑADE ESTA NUEVA RUTA AQUÍ ---
  // Esta es la ruta a la que redirigirá el Login
  {
    path: '/market',
    name: 'market',
    component: MarketStudent,
    meta: {
      title: 'Mercado | Biblioteca'
      // (Más adelante puedes añadir esto para proteger la ruta)
      // requiresAuth: true 
    }
  },
  // -----------------------------------

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