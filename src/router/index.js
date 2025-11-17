import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../stores/user'; 

import MainPage from '../views/MainPage.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

// --- 1. IMPORTACIÓN DE VISTAS DE ESTUDIANTE ---
import MarketStudent from '../views/student/Market_student.vue';
import ProfileStudent from '../views/student/Profile_studen.vue';
import InventoryStudent from '../views/student/Inventory_student.vue'; 
import FavoriteStudent from '../views/student/Favorite_student.vue';

// --- 2. IMPORTACIÓN DE VISTAS DE ADMINISTRADOR ---
import DashboardAdmin from '../views/admin/Dashboard_admin.vue'; 

// --- 3. IMPORTACIÓN DE VISTAS DE BIBLIOTECARIO ---
import DashboardLibrarian from '../views/Librarian/Dashboard_librarian.vue';
import BookManagementLibrarian from '../views/Librarian/BookManagement_librarian.vue';
import RentalsLibrarian from '../views/Librarian/Rentals_librarian.vue';
import ProfileLibrarian from '../views/Librarian/Profile_librarian.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage,
    meta: { title: 'Inicio | Biblioteca' }
  },
  {
    path: '/login',
    name: 'login',
    component: Login, 
    meta: { title: 'Iniciar Sesión | Biblioteca' }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { title: 'Registrarse | Biblioteca' }
  },

  // --- RUTAS DE ESTUDIANTE ---
  {
    path: '/market', 
    name: 'market',
    component: MarketStudent, 
    meta: { title: 'Marketplace | Biblioteca', requiresAuth: true }
  },
  {
    path: '/profile', 
    name: 'profile',
    component: ProfileStudent, 
    meta: { title: 'Mi Perfil | Biblioteca', requiresAuth: true }
  },
  {
    path: '/inventory', 
    name: 'inventory',
    component: InventoryStudent, 
    meta: { title: 'Mi Inventario | Biblioteca', requiresAuth: true }
  },
  {
    path: '/favorites', 
    name: 'favorites',
    component: FavoriteStudent,
    meta: { title: 'Mis Favoritos | Biblioteca', requiresAuth: true }
  },
  
  // --- RUTA DE ADMINISTRADOR ---
  {
    path: '/dashboard', 
    name: 'dashboard',
    component: DashboardAdmin, 
    meta: {
      title: 'Panel de Control | Admin',
      requiresAuth: true,
      requiresAdmin: true
    }
  },

  // --- RUTAS DE BIBLIOTECARIO ---
  {
    path: '/bibliotecario/dashboard',
    name: 'librarian-dashboard',
    component: DashboardLibrarian,
    meta: { 
      title: 'Panel | Bibliotecario', 
      requiresAuth: true, 
      requiresAdmin: true 
    }
  },
  {
    path: '/bibliotecario/gestion-libros',
    name: 'librarian-books',
    component: BookManagementLibrarian,
    meta: { title: 'Gestión Libros | Bibliotecario', requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/bibliotecario/alquileres',
    name: 'librarian-rentals',
    component: RentalsLibrarian,
    meta: { title: 'Alquileres | Bibliotecario', requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/bibliotecario/profile',
    name: 'librarian-profile',
    component: ProfileLibrarian,
    meta: { title: 'Perfil | Bibliotecario', requiresAuth: true, requiresAdmin: true }
  },

  // --- DETALLE DE LIBRO ---
  {
    path: '/libro/:id', 
    name: 'BookDetail',
    component: () => import('../views/student/Detail_student.vue'),
    props: true, 
    meta: { title: 'Detalle del Libro | Biblioteca' }
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

// --- PROTECCIÓN DE RUTAS ---
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Biblioteca Educativa';
  
  const userStore = useUserStore();
  const isLoggedIn = userStore.isLoggedIn; 
  const userRole = userStore.user?.rol;   
  
  // 1. Si requiere auth y no está logueado -> Login
  if (to.meta.requiresAuth && !isLoggedIn) {
    return next('/login');
  } 

  // 2. Si requiere permisos "Privilegiados" (Admin/Bibliotecario/Revisor)
  if (to.meta.requiresAdmin) {
    const privilegedRoles = ['admin', 'bibliotecario', 'revisor'];
    
    // Si el usuario NO tiene uno de estos roles, lo mandamos al market (estudiante)
    if (isLoggedIn && !privilegedRoles.includes(userRole)) {
      return next('/market'); 
    }
  }
  
  next();
});

export default router;