<template>
    <aside 
      class="sticky top-0 h-screen flex flex-col bg-[#000037] text-white transition-all duration-300 ease-in-out z-50"
      :class="isExpanded ? 'w-64' : 'w-20'"
    >
      <div class="flex items-center gap-3 p-5" :class="isExpanded ? 'justify-start' : 'justify-center'">
        <div class="w-11 h-11 rounded-lg bg-white/10 flex-shrink-0 flex items-center justify-center text-lg font-bold">
          🎓
        </div>
        <span v-if="isExpanded" class="text-xl font-bold whitespace-nowrap">LibroHub</span>
      </div>
  
      <button
        @click="toggleSidebar"
        class="absolute top-7 -right-3 bg-white text-[#000037] rounded-full p-1 shadow-lg hover:bg-gray-100 transition z-50 border border-gray-200"
        aria-label="Expandir o colapsar menú"
      >
        <ChevronLeft :size="18" class="transition-transform duration-300" :class="!isExpanded ? 'rotate-180' : ''" />
      </button>
  
      <nav class="flex-grow p-4 space-y-2">
        
        <router-link 
          to="/bibliotecario/dashboard"
          class="flex items-center gap-4 p-3 rounded-xl text-white/85 hover:bg-white/10 transition-all duration-200"
          active-class="bg-[#4626d0] text-white shadow-md"
          :class="!isExpanded ? 'justify-center' : ''"
        >
          <Home :size="24" class="flex-shrink-0" />
          <span v-if="isExpanded" class="font-medium whitespace-nowrap">Dashboard</span>
        </router-link>
  
        <router-link 
          to="/bibliotecario/gestion-libros"
          class="flex items-center gap-4 p-3 rounded-xl text-white/85 hover:bg-white/10 transition-all duration-200"
          active-class="bg-[#4626d0] text-white shadow-md"
          :class="!isExpanded ? 'justify-center' : ''"
        >
          <BookOpen :size="24" class="flex-shrink-0" />
          <span v-if="isExpanded" class="font-medium whitespace-nowrap">Libros</span>
        </router-link>
  
        <router-link 
          to="/bibliotecario/alquileres"
          class="flex items-center gap-4 p-3 rounded-xl text-white/85 hover:bg-white/10 transition-all duration-200"
          active-class="bg-[#4626d0] text-white shadow-md"
          :class="!isExpanded ? 'justify-center' : ''"
        >
          <FileText :size="24" class="flex-shrink-0" />
          <span v-if="isExpanded" class="font-medium whitespace-nowrap">Alquileres</span>
        </router-link>
      </nav>
  
      <div class="p-4 mt-auto border-t border-white/10">
        <router-link 
          to="/bibliotecario/profile"
          class="flex items-center gap-4 p-3 rounded-xl text-white/85 hover:bg-white/10 transition-all duration-200"
          active-class="bg-[#4626d0] text-white shadow-md"
          :class="!isExpanded ? 'justify-center' : ''"
        >
          <UserCircle :size="24" class="flex-shrink-0" />
          <span v-if="isExpanded" class="font-medium whitespace-nowrap">Mi Perfil</span>
        </router-link>
      </div>
    </aside>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { 
    ChevronLeft, 
    Home, 
    BookOpen, 
    FileText, 
    UserCircle 
  } from 'lucide-vue-next'
  
  // Estado para controlar si está expandido o no
  const isExpanded = ref(false)
  
  // Función para cambiar el estado
  const toggleSidebar = () => {
    isExpanded.value = !isExpanded.value
  }
  </script>