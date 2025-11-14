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
// ----------------------------------------------------

// --- 2. IMPORTACIÓN DE VISTA DE ADMINISTRADOR ---
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

  // --- 3. RUTAS DE ESTUDIANTE (PARA EL SIDEBAR) ---
  {
    path: '/market', 
    name: 'market',
    component: MarketStudent, 
    meta: {
      title: 'Marketplace | Biblioteca'
      // requiresAuth: true 
    }
  },
  {
    path: '/profile', 
    name: 'profile',
    component: ProfileStudent, 
    meta: {
      title: 'Mi Perfil | Biblioteca'
      // requiresAuth: true 
    }
  },
  {
    path: '/inventory', 
    name: 'inventory',
    component: InventoryStudent, 
    meta: {
      title: 'Mi Inventario | Biblioteca'
      // requiresAuth: true 
    }
  },
  {
    path: '/favorites', 
    name: 'favorites',
    component: FavoriteStudent,
    meta: {
      title: 'Mis Favoritos | Biblioteca'
      // requiresAuth: true 
    }
  },
  
  // --- 4. RUTA DE ADMINISTRADOR (Dashboard) ---
  {
    path: '/dashboard', 
    name: 'dashboard',
    component: DashboardAdmin, 
    meta: {
      title: 'Panel de Control | Admin',
      requiresAuth: true,    // Requiere que el usuario esté logueado
      requiresAdmin: true    // Requiere un rol privilegiado
    }
  },
  // ----------------------------------------

  {
    path: '/libro/:id', 
    name: 'BookDetail',
    component: () => import('../views/student/Detail_student.vue'),
    props: true, 
    meta: {
      title: 'Detalle del Libro | Biblioteca'
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
  const isLoggedIn = userStore.isLoggedIn; 
  const userRole = userStore.user?.rol;   
  
  // Bloqueo 1: Requiere Autenticación General (Para rutas de estudiante/admin)
  if (to.meta.requiresAuth && !isLoggedIn) {
    return next('/login');
  } 

  // Bloqueo 2: Requiere Permisos de Administrador (Solo para /dashboard)
  if (to.meta.requiresAdmin) {
    // CAMBIO AÑADIDO: Incluye el rol 'admin'
    const adminRoles = ['admin', 'bibliotecario', 'revisor'];
    
    // Si la ruta requiere Admin, pero el usuario no tiene el rol correcto
    if (isLoggedIn && !adminRoles.includes(userRole)) {
      return next('/market'); // Redirige a la ruta por defecto del estudiante
    }
  }
  
  // Si no hay restricciones o si se cumplen, continúa
  next();
});


export default router;