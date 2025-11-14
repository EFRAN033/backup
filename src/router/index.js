import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

// --- 1. IMPORTACIÓN DE VISTAS DE ESTUDIANTE ---
import MarketStudent from '../views/student/Market_student.vue';
import ProfileStudent from '../views/student/Profile_studen.vue';
import InventoryStudent from '../views/student/Inventory_student.vue'; // <-- Componente a usar
// --- NUEVA IMPORTACIÓN ---
import FavoriteStudent from '../views/student/Favorite_student.vue';

// ¡ERROR! Estos archivos no existen en tu repo. Debes crearlos
// o mantener comentadas las líneas de importación y las rutas.
// import LibraryStudent from '../views/student/Library_student.vue';
// import SavedStudent from '../views/student/Saved_student.vue';
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
    path: '/perfil', // Ruta para Profile_studen.vue
    name: 'perfil',
    component: ProfileStudent, 
    meta: {
      title: 'Mi Perfil | Biblioteca'
      // requiresAuth: true 
    }
  },
  
  // === RUTA CORREGIDA ===
  // Ahora la ruta '/biblioteca' (del sidebar) apunta
  // al componente 'InventoryStudent' (tu archivo).
  {
    path: '/biblioteca', // <-- CAMBIO: De '/inventory' a '/biblioteca'
    name: 'biblioteca',   // <-- CAMBIO: De 'inventory' a 'biblioteca'
    component: InventoryStudent, // El componente que importamos
    meta: {
      title: 'Mi Biblioteca | Biblioteca' // <-- CAMBIO: Título actualizado
      // requiresAuth: true 
    }
  },
  // ======================

  // --- NUEVA RUTA AÑADIDA ---
  {
    path: '/favoritos',
    name: 'favoritos',
    component: FavoriteStudent,
    meta: {
      title: 'Mis Favoritos | Biblioteca'
      // requiresAuth: true 
    }
  },
  // --------------------------

  /* --- RUTAS COMENTADAS ---
     Descomenta esto cuando crees los archivos
  
  // Esta era la ruta '/biblioteca' original, que apuntaba
  // a un archivo 'LibraryStudent' que no existe.
  // La hemos reemplazado por la de arriba.
  {
    path: '/biblioteca', 
    name: 'biblioteca',
    component: LibraryStudent, 
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
  */
  // -----------------------------------

  // --- ¡AQUÍ ESTÁ LA NUEVA RUTA AÑADIDA! ---
  {
    path: '/libro/:id', // :id es un parámetro dinámico
    name: 'BookDetail',
    // Asumiendo que crearás Detail_student.vue dentro de /views/student/
    component: () => import('../views/student/Detail_student.vue'),
    props: true, // Esto pasa el :id como "prop" al componente
    meta: {
      title: 'Detalle del Libro | Biblioteca'
      // requiresAuth: true 
    }
  },
  // -----------------------------------------

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