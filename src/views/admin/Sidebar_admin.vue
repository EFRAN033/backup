<template>
  <aside 
    class="sticky top-0 h-screen flex flex-col bg-[#000037] text-white transition-all duration-300 ease-in-out z-50 shadow-xl"
    :class="isExpanded ? 'w-64' : 'w-20'"
  >
    <div class="flex items-center gap-3 p-6 h-20 border-b border-white/5" :class="isExpanded ? 'justify-start' : 'justify-center'">
      <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0 flex items-center justify-center text-lg shadow-lg">
        🎓
      </div>
      <div class="overflow-hidden" v-if="isExpanded">
         <span class="text-lg font-bold tracking-wide whitespace-nowrap opacity-0 animate-fade-in" :class="{ 'opacity-100': isExpanded }">LibroHub</span>
      </div>
    </div>

    <button
      @click="toggleSidebar"
      class="absolute top-8 -right-3 w-6 h-6 bg-white text-indigo-900 rounded-full flex items-center justify-center shadow-md hover:bg-indigo-50 transition-transform hover:scale-110 z-50 border border-slate-100 cursor-pointer"
      aria-label="Expandir o colapsar menú"
    >
      <ChevronLeft :size="14" class="transition-transform duration-300" :class="!isExpanded ? 'rotate-180' : ''" />
    </button>

    <nav 
      class="flex-grow px-3 py-6 space-y-2 no-scrollbar transition-all"
      :class="isExpanded ? 'overflow-y-auto' : 'overflow-visible'"
    >
      
      <router-link 
        :to="{ name: 'Dashboard_librarian' }"
        class="flex items-center gap-3 p-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200 group relative"
        active-class="bg-indigo-600 text-white shadow-lg shadow-indigo-900/50"
        :class="!isExpanded ? 'justify-center' : ''"
      >
        <Home :size="22" class="flex-shrink-0 transition-colors" />
        <span v-if="isExpanded" class="font-medium text-sm whitespace-nowrap transition-opacity duration-300">Dashboard</span>
        
        <div v-if="!isExpanded" class="absolute left-14 bg-slate-800 text-white text-xs px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[60] shadow-xl border border-slate-600/50">
          Dashboard
        </div>
      </router-link>

      <router-link 
        :to="{ name: 'Books_librarian' }" 
        class="flex items-center gap-3 p-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200 group relative"
        active-class="bg-indigo-600 text-white shadow-lg shadow-indigo-900/50"
        :class="!isExpanded ? 'justify-center' : ''"
      >
        <BookOpen :size="22" class="flex-shrink-0 transition-colors" />
        <span v-if="isExpanded" class="font-medium text-sm whitespace-nowrap transition-opacity duration-300">Libros</span>
        
        <div v-if="!isExpanded" class="absolute left-14 bg-slate-800 text-white text-xs px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[60] shadow-xl border border-slate-600/50">
          Gestión Libros
        </div>
      </router-link>

      <router-link 
        :to="{ name: 'Rentals_librarian' }"
        class="flex items-center gap-3 p-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200 group relative"
        active-class="bg-indigo-600 text-white shadow-lg shadow-indigo-900/50"
        :class="!isExpanded ? 'justify-center' : ''"
      >
        <FileText :size="22" class="flex-shrink-0 transition-colors" />
        <span v-if="isExpanded" class="font-medium text-sm whitespace-nowrap transition-opacity duration-300">Alquileres</span>
        
        <div v-if="!isExpanded" class="absolute left-14 bg-slate-800 text-white text-xs px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[60] shadow-xl border border-slate-600/50">
          Alquileres
        </div>
      </router-link>

    </nav>

    <div class="p-3 border-t border-white/5 mb-2">
      <router-link 
        :to="{ name: 'Profile_librarian' }"
        class="flex items-center gap-3 p-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200 group relative"
        active-class="bg-indigo-600 text-white shadow-lg shadow-indigo-900/50"
        :class="!isExpanded ? 'justify-center' : ''"
      >
        <UserCircle :size="22" class="flex-shrink-0 transition-colors" />
        <span v-if="isExpanded" class="font-medium text-sm whitespace-nowrap transition-opacity duration-300">Mi Perfil</span>
        
        <div v-if="!isExpanded" class="absolute left-14 bg-slate-800 text-white text-xs px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[60] shadow-xl border border-slate-600/50">
          Ver Perfil
        </div>
      </router-link>

       <button 
        @click="handleLogout" 
        class="w-full flex items-center gap-3 p-3 mt-1 rounded-xl text-rose-300 hover:text-rose-100 hover:bg-rose-500/20 transition-all duration-200 group relative"
        :class="!isExpanded ? 'justify-center' : ''"
      >
        <LogOut :size="22" class="flex-shrink-0 transition-colors" />
        <span v-if="isExpanded" class="font-medium text-sm whitespace-nowrap transition-opacity duration-300">Salir</span>
        
        <div v-if="!isExpanded" class="absolute left-14 bg-slate-800 text-white text-xs px-3 py-2 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-[60] shadow-xl border border-slate-600/50">
          Cerrar Sesión
        </div>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; 
import { useUserStore } from '../../stores/user'; 

import { 
  ChevronLeft, 
  Home, 
  BookOpen, 
  FileText, 
  UserCircle,
  LogOut 
} from 'lucide-vue-next';

const isExpanded = ref(false); 

const router = useRouter();
const userStore = useUserStore();

const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value;
};

const handleLogout = () => {
  userStore.clearUser(); 
  router.push({ name: 'login' });
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>