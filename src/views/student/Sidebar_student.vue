<template>
  <aside 
    class="fixed top-0 left-0 h-screen flex flex-col bg-blue-950 text-white transition-all duration-300 ease-in-out z-50"
    :class="isExpanded ? 'w-64' : 'w-20'"
  >
    
    <div class="flex items-center gap-3 p-5" :class="isExpanded ? 'justify-start' : 'justify-center'">
      <GraduationCap :size="32" class="text-blue-400 flex-shrink-0" />
      <span v-show="isExpanded" class="text-2xl font-bold whitespace-nowrap transition-opacity opacity-100">LibroHub</span>
    </div>

    <button 
      @click="isExpanded = !isExpanded" 
      class="absolute top-7 -right-4 bg-white text-purple-900 rounded-full p-1 shadow-lg hover:bg-purple-100 transition z-50"
      aria-label="Expandir o colapsar menú"
    >
      <ChevronRight 
        :size="20" 
        class="transition-transform duration-300" 
        :class="isExpanded ? 'rotate-180' : ''" 
      />
    </button>

    <nav class="flex-grow p-4">
      <ul class="space-y-3">
        
        <li class="relative group">
          <RouterLink 
            to="/market" 
            class="nav-link" 
            active-class="active-link"
            aria-label="Marketplace"
          >
            <ShoppingBag :size="24" class="flex-shrink-0" />
            <span v-show="isExpanded" class="nav-text">Marketplace</span>

            <span v-show="!isExpanded" class="tooltip">
              Marketplace
            </span>
          </RouterLink>
        </li>

        <li class="relative group">
          <RouterLink 
            to="/inventory" 
            class="nav-link" 
            active-class="active-link"
            aria-label="Mis Alquileres"
          >
            <Archive :size="24" class="flex-shrink-0" />
            <span v-show="isExpanded" class="nav-text">Mis Alquileres</span>
            <span v-show="!isExpanded" class="tooltip">
              Mis Alquileres
            </span>
          </RouterLink>
        </li>
        <li class="relative group">
          <RouterLink 
            to="/biblioteca" 
            class="nav-link" 
            active-class="active-link"
            aria-label="Biblioteca"
          >
            <Library :size="24" class="flex-shrink-0" />
            <span v-show="isExpanded" class="nav-text">Biblioteca</span>
            <span v-show="!isExpanded" class="tooltip">
              Biblioteca
            </span>
          </RouterLink>
        </li>
        
        <li class="relative group">
          <RouterLink 
            to="/guardados" 
            class="nav-link" 
            active-class="active-link"
            aria-label="Mis Guardados"
          >
            <Bookmark :size="24" class="flex-shrink-0" />
            <span v-show="isExpanded" class="nav-text">Mis Guardados</span>
            <span v-show="!isExpanded" class="tooltip">
              Mis Guardados
            </span>
          </RouterLink>
        </li>

      </ul>
    </nav>

    <div class="p-4 border-t border-purple-800/50">
      <div class="relative group"> <RouterLink 
          to="/perfil" 
          class="nav-link" 
          active-class="active-link"
          aria-label="Mi Perfil"
        >
          <User :size="24" class="flex-shrink-0" />
          <span v-show="isExpanded" class="nav-text">Mi Perfil</span>
          <span v-show="!isExpanded" class="tooltip">
              Mi Perfil
          </span>
        </RouterLink>
      </div>
    </div>

  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { 
  GraduationCap, 
  ChevronRight, 
  ShoppingBag, 
  Library, 
  Bookmark, 
  User,
  Archive // <-- ICONO IMPORTADO
} from 'lucide-vue-next'

const isExpanded = ref(false)
</script>

<style scoped>
/* Usamos @apply de Tailwind para crear clases reutilizables y limpias */

.nav-link {
  @apply flex items-center gap-4 p-3 rounded-lg text-purple-300 transition-colors duration-200;
  @apply hover:bg-purple-800 hover:text-white; /* Efecto hover */
}

/* Esta clase se aplica automáticamente por Vue Router al link activo */
.active-link {
  @apply bg-purple-700 text-white shadow-md; /* Estilo activo */
}

.nav-text {
  @apply font-semibold whitespace-nowrap transition-opacity duration-200;
}

/* MEJORA DE UI/UX: 
  Estilos para el tooltip que aparece en modo colapsado.
*/
.tooltip {
  @apply absolute left-full top-1/2 -translate-y-1/2 ml-4; /* Posicionamiento */
  @apply bg-blue-900 text-white text-sm font-medium; /* Estilo */
  @apply px-3 py-1.5 rounded-md shadow-lg; /* Forma */
  @apply opacity-0 invisible group-hover:opacity-100 group-hover:visible; /* Lógica de hover */
  @apply transition-all duration-150;
  @apply whitespace-nowrap z-50; /* Asegura que esté por encima de todo */
}
</style>