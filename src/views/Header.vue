<template>
  <header class="fixed top-0 left-0 right-0 bg-header-bg text-white shadow-lg border-b border-white/10 z-10">
    
    <div class="container mx-auto flex items-center h-16 px-6 relative">
      
      <router-link 
        to="/" 
        aria-label="LibroHub - Volver al inicio"
        class="group flex items-center gap-3 text-2xl font-bold text-white transition-opacity duration-200 hover:opacity-80
               absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
      >
        <GraduationCap 
          :size="30" 
          class="text-blue-400 transition-transform duration-300 group-hover:rotate-[-12deg]" 
        />
        <span>LibroHub</span>
      </router-link>

      <nav class="flex items-center ml-auto" aria-label="Autenticación de usuario">
        
        <div class="hidden md:flex space-x-4 items-center">
          <div v-if="!userStore.isLoggedIn" class="flex space-x-4">
            <router-link 
              to="/login" 
              class="bg-button-dark text-white font-medium px-5 py-2.5 rounded-lg shadow-lg transform-gpu transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:shadow-none active:translate-y-px"
            >
              Iniciar Sesión
            </router-link>
            
            <router-link 
              to="/register" 
              class="bg-button-dark text-white font-medium px-5 py-2.5 rounded-lg shadow-lg transform-gpu transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:shadow-none active:translate-y-px"
            >
              Registrarse
            </router-link>
          </div>
          
          <div v-else>
            <button 
              @click="logout" 
              class="text-red-400 font-medium px-5 py-2.5 rounded-lg border border-red-400/75 transform-gpu transition-all duration-200 hover:bg-red-500/10 hover:text-red-300 active:translate-y-px"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        <div class="md:hidden">
          <div v-if="!userStore.isLoggedIn" class="flex space-x-2">
            <router-link 
              to="/login" 
              class="bg-button-dark text-white font-medium px-3 py-1.5 rounded-lg text-sm shadow-md transform-gpu transition-all active:shadow-none active:translate-y-px"
            >
              Iniciar Sesión
            </router-link>
            <router-link 
              to="/register" 
              class="bg-button-dark text-white font-medium px-3 py-1.5 rounded-lg text-sm shadow-md transform-gpu transition-all active:shadow-none active:translate-y-px"
            >
              Registrarse
            </router-link>
          </div>
          <div v-else>
            <button 
              @click="logout" 
              class="text-red-400 font-medium px-3 py-1.5 rounded-lg border border-red-400/75 text-sm transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>

    </div>
  </header>
</template>

<script setup>
// El script no necesita cambios
import { useRouter } from 'vue-router';
// Asumo que tu store está en @/stores/user, ajústalo si es necesario
import { useUserStore } from '@/stores/user'; 
import { GraduationCap } from 'lucide-vue-next'; 

const router = useRouter();
const userStore = useUserStore();

const logout = () => {
  userStore.clearUser(); 
  router.push('/login'); 
};
</script>