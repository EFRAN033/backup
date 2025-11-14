import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

// --- 1. IMPORTACIÓN DE VISTAS DE ESTUDIANTE ---
import MarketStudent from '../views/student/Market_student.vue';
import ProfileStudent from '../views/student/Profile_student.vue';
// CAMBIOS A INGLÉS:
import LibraryStudent from '../views/student/Library_student.vue'; // <-- Nombre en Inglés
import SavedStudent from '../views/student/Saved_student.vue'; // <-- Nombre en Inglés
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

  // --- 2. RUTAS DE ESTUDIANTE (PARA EL SIDEBAR) ---
  {
    path: '/market',
    name: 'market',
    component: MarketStudent,
    meta: {
      title: 'Mercado | Biblioteca'
      // requiresAuth: true 
    }
  },
  {
    path: '/perfil', // Ruta para Profile_student.vue
    name: 'perfil',
    component: ProfileStudent,
    meta: {
      title: 'Mi Perfil | Biblioteca'
      // requiresAuth: true 
    }
  },
  {
    path: '/biblioteca', // Ruta para Library_student.vue
    name: 'biblioteca',
    component: LibraryStudent, // <-- CAMBIO A INGLÉS
    meta: {
      title: 'Mi Biblioteca | Biblioteca'
      // requiresAuth: true 
    }
  },
  {
    path: '/guardados', // Ruta para Saved_student.vue
    name: 'guardados',
    component: SavedStudent, // <-- CAMBIO A INGLÉS
    meta: {
      title: 'Mis Guardados | Biblioteca'
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