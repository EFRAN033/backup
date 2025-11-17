<template>
  <header class="sticky top-0 left-0 right-0 bg-header-bg text-white shadow-lg border-b border-white/10 z-50 transition-all duration-300">
    
    <div class="container mx-auto flex items-center justify-between h-16 px-6">
      
      <router-link 
        to="/" 
        aria-label="LibroHub - Ir al inicio"
        class="group flex items-center gap-3 text-2xl font-bold text-white transition-opacity duration-200 hover:opacity-90"
      >
        <GraduationCap 
          :size="32" 
          class="text-blue-400 transition-transform duration-300 group-hover:rotate-[-12deg] group-hover:scale-110" 
        />
        <span class="tracking-wide">LibroHub</span>
      </router-link>

      <nav class="flex items-center gap-4" aria-label="Menú principal">
        
        <div class="hidden md:flex items-center gap-3">
          <div v-if="!userStore.isLoggedIn" class="flex items-center gap-3">
            
            <router-link 
              to="/login" 
              class="text-white/90 font-medium px-5 py-2.5 rounded-lg border border-transparent 
                     hover:bg-white/10 hover:border-white/20 transition-all duration-200"
            >
              Iniciar Sesión
            </router-link>
            
            <router-link 
              to="/register" 
              class="bg-button-dark text-white font-medium px-5 py-2.5 rounded-lg shadow-md 
                     transform transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0"
            >
              Registrarse
            </router-link>
          </div>
          
          <div v-else class="flex items-center gap-4">
            <span class="text-sm text-white/80 font-light">Bienvenido</span>
            <button 
              @click="logout" 
              class="text-red-400 font-medium px-4 py-2 rounded-lg border border-red-400/30 
                     hover:bg-red-400/10 hover:border-red-400/60 transition-all duration-200"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>

        <div class="md:hidden flex items-center">
          <div v-if="!userStore.isLoggedIn" class="flex items-center gap-2">
            <router-link 
              to="/login" 
              class="text-sm font-medium text-white/80 px-3 py-2"
            >
              Entrar
            </router-link>
            <router-link 
              to="/register" 
              class="bg-button-dark text-white text-sm font-medium px-4 py-2 rounded-lg shadow-sm"
            >
              Registro
            </router-link>
          </div>
          <div v-else>
            <button 
              @click="logout" 
              class="text-red-400 text-xs font-medium border border-red-400/30 px-3 py-1.5 rounded-lg"
            >
              Salir
            </button>
          </div>
        </div>
      </nav>

    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user'; 
import { GraduationCap } from 'lucide-vue-next'; 

const router = useRouter();
const userStore = useUserStore();

const logout = () => {
  userStore.clearUser(); 
  router.push('/login'); 
};
</script>