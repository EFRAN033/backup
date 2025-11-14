import { createRouter, createWebHistory } from 'vue-router';
// --- CAMBIO 1: IMPORTAMOS EL STORE PARA LA PROTECCIÓN DE RUTAS ---
import { useUserStore } from '../stores/user'; 

import MainPage from '../views/MainPage.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

// --- 1. IMPORTACIÓN DE VISTAS DE ESTUDIANTE ---
import MarketStudent from '../views/student/Market_student.vue';
import ProfileStudent from '../views/student/Profile_studen.vue';
import InventoryStudent from '../views/student/Inventory_student.vue'; 
import FavoriteStudent from '../views/student/Favorite_student.vue';

// --- 2. NUEVA IMPORTACIÓN DE VISTA DE ADMINISTRADOR ---
// Asegúrate de crear este archivo: src/views/admin/Dashboard_admin.vue
import DashboardAdmin from '../views/admin/Dashboard_admin.vue'; 
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

  // --- 3. RUTAS DE ESTUDIANTE (Añadido requiresAuth: true) ---
  {
    path: '/market', 
    name: 'market',
    component: MarketStudent,
    meta: {
      title: 'Mercado | Biblioteca',
      requiresAuth: true // Requiere estar logueado
    }
  },
  {
    path: '/perfil', 
    name: 'perfil',
    component: ProfileStudent, 
    meta: {
      title: 'Mi Perfil | Biblioteca',
      requiresAuth: true
    }
  },
  {
    path: '/biblioteca', 
    name: 'biblioteca',
    component: InventoryStudent, 
    meta: {
      title: 'Mi Biblioteca | Biblioteca',
      requiresAuth: true
    }
  },
  {
    path: '/favoritos', 
    name: 'favoritos',
    component: FavoriteStudent,
    meta: {
      title: 'Mis Favoritos | Biblioteca',
      requiresAuth: true
    }
  },
  
  // --- 4. RUTA DEL PANEL DE ADMINISTRACIÓN (CLAVE) ---
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardAdmin, 
    meta: {
      title: 'Panel de Control | Biblioteca',
      requiresAuth: true,      // Debe estar logueado
      requiresAdmin: true     // Debe tener rol de Admin (Bibliotecario/Revisor)
    }
  },
  // -------------------------------------------------

  {
    path: '/libro/:id', 
    name: 'BookDetail',
    component: () => import('../views/student/Detail_student.vue'),
    props: true, 
    meta: {
      title: 'Detalle del Libro | Biblioteca',
      requiresAuth: true
    }
  },
  
  // Ruta de fallback (404)
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
      return { top: 0 };
    }
  }
});

// --- 5. LÓGICA DE PROTECCIÓN DE RUTAS (ROUTER GUARD) ---
router.beforeEach((to, from, next) => {
  // 1. Actualiza el título de la página
  document.title = to.meta.title || 'Biblioteca Educativa';
  
  // 2. Obtiene el estado del usuario
  const userStore = useUserStore();
  const isLoggedIn = userStore.isLoggedIn; // Propiedad que indica si el token existe
  const userRole = userStore.user?.rol;   // Propiedad que contiene el rol (estudiante, bibliotecario, revisor)
  
  // Bloqueo 1: Requiere Autenticación General (Para rutas de estudiante/admin)
  if (to.meta.requiresAuth && !isLoggedIn) {
    // Si la ruta requiere login y no hay usuario, redirige
    return next('/login');
  } 

  // Bloqueo 2: Requiere Permisos de Administrador (Solo para /dashboard)
  if (to.meta.requiresAdmin) {
    // Roles que tienen acceso al panel de control
    const adminRoles = ['bibliotecario', 'revisor'];
    
    // Si la ruta requiere Admin, pero el usuario no tiene el rol correcto
    if (isLoggedIn && !adminRoles.includes(userRole)) {
      // Redirige al mercado (ruta de estudiante)
      console.log(`Acceso denegado. Rol: ${userRole}. Redirigiendo a /market.`);
      return next('/market'); 
    }
  }

  // 3. Permite la navegación (si pasó los filtros anteriores)
  next();
});

export default router;