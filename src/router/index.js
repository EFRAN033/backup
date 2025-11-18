import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../stores/user'; 

// --- VISTAS GENERALES ---
import MainPage from '../views/MainPage.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

// --- 1. IMPORTACIÓN DE VISTAS DE ESTUDIANTE ---
import MarketStudent from '../views/student/Market_student.vue';
import ProfileStudent from '../views/student/Profile_studen.vue';
import InventoryStudent from '../views/student/Inventory_student.vue'; 
import FavoriteStudent from '../views/student/Favorite_student.vue';
import DetailStudent from '../views/student/Detail_student.vue'; // Importación directa o lazy loading abajo

// --- 2. IMPORTACIÓN DE VISTAS DE ADMINISTRADOR ---
import DashboardAdmin from '../views/admin/Dashboard_admin.vue'; 
// AÑADIDO: Importación de las nuevas vistas de Admin
import BooksAdmin from '../views/admin/Books.vue';
import IAAdmin from '../views/admin/IA.vue';
import ProfileAdmin from '../views/admin/Profile_admin.vue'; 

// --- 3. IMPORTACIÓN DE VISTAS DE BIBLIOTECARIO ---
import DashboardLibrarian from '../views/Librarian/Dashboard_librarian.vue';
import BookManagementLibrarian from '../views/Librarian/BookManagement_librarian.vue';
import RentalsLibrarian from '../views/Librarian/Rentals_librarian.vue';
import ProfileLibrarian from '../views/Librarian/Profile_librarian.vue';

const routes = [
  // --- RUTAS PÚBLICAS ---
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
  // Detalle de libro (Lazy loading opcional mantenido como en tu ejemplo)
  {
    path: '/libro/:id', 
    name: 'BookDetail',
    component: () => import('../views/student/Detail_student.vue'),
    props: true, 
    meta: { title: 'Detalle del Libro | Biblioteca' }
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
  // AÑADIDO: Rutas de Libros, IA y Perfil para Admin
  {
    path: '/admin/libros',
    name: 'Books_admin',
    component: BooksAdmin,
    meta: { title: 'Gestión Libros | Admin', requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/ia',
    name: 'IA_admin',
    component: IAAdmin,
    meta: { title: 'Herramienta IA | Admin', requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/perfil',
    name: 'Profile_admin',
    component: ProfileAdmin,
    meta: { title: 'Mi Perfil | Admin', requiresAuth: true, requiresAdmin: true }
  },

  // --- RUTAS DE BIBLIOTECARIO ---
  {
    path: '/bibliotecario/dashboard',
    name: 'Dashboard_librarian',
    component: DashboardLibrarian,
    meta: { 
      title: 'Panel | Bibliotecario', 
      requiresAuth: true, 
      requiresAdmin: true 
    }
  },
  {
    path: '/bibliotecario/gestion-libros',
    name: 'Books_librarian', 
    component: BookManagementLibrarian,
    meta: { title: 'Gestión Libros | Bibliotecario', requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/bibliotecario/alquileres',
    name: 'Rentals_librarian', 
    component: RentalsLibrarian,
    meta: { title: 'Alquileres | Bibliotecario', requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/bibliotecario/perfil',
    name: 'Profile_librarian', 
    component: ProfileLibrarian,
    meta: { title: 'Perfil | Bibliotecario', requiresAuth: true, requiresAdmin: true }
  },

  // --- CATCH ALL (404) ---
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

// --- PROTECCIÓN DE RUTAS (GLOBAL GUARDS) ---
router.beforeEach((to, from, next) => {
  // 1. Actualizar el título de la página
  document.title = to.meta.title || 'Biblioteca Educativa';
  
  const userStore = useUserStore();
  
  // Verificamos autenticación desde el store (Pinia)
  const isLoggedIn = userStore.isLoggedIn; 
  const userRole = userStore.user?.rol;   
  
  // Rutas públicas que queremos proteger de usuarios logueados
  const publicRoutes = ['home', 'login', 'register'];

  // LÓGICA DE REDIRECCIÓN: Si está logueado y va a una ruta pública, lo redirigimos
  if (isLoggedIn && publicRoutes.includes(to.name)) {
    
    let redirectRouteName = 'market'; 
    
    if (userRole === 'admin') {
      redirectRouteName = 'dashboard';
    } else if (userRole === 'bibliotecario') {
      redirectRouteName = 'Dashboard_librarian';
    } 
    
    if (to.name !== redirectRouteName) {
        return next({ name: redirectRouteName });
    }
  }

  // 2. Si la ruta requiere auth y el usuario NO está logueado -> Redirigir a Login
  if (to.meta.requiresAuth && !isLoggedIn) {
    return next({ name: 'login' });
  } 

  // 3. Si la ruta requiere permisos de Admin (o roles privilegiados)
  if (to.meta.requiresAdmin) {
    const privilegedRoles = ['admin', 'bibliotecario', 'revisor'];
    
    // Si está logueado pero NO tiene el rol adecuado, redirigir al market
    if (isLoggedIn && !privilegedRoles.includes(userRole)) {
      return next({ name: 'market' }); 
    }
  }
  
  // 4. Permitir navegación
  next();
});

export default router;