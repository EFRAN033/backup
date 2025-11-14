<template>
  <aside 
    class="fixed top-0 left-0 h-screen flex flex-col bg-indigo-900 text-white transition-all duration-300 ease-in-out z-50"
    :class="isExpanded ? 'w-64' : 'w-20'"
  >
    <div class="flex items-center gap-3 p-5" :class="isExpanded ? 'justify-start' : 'justify-center'">
      <GraduationCap :size="32" class="text-indigo-300 flex-shrink-0" />
      <span v-if="isExpanded" class="text-2xl font-bold whitespace-nowrap">LibroHub</span>
    </div>

    <button 
      @click="emit('toggle-sidebar')" 
      class="absolute top-7 -right-4 bg-white text-indigo-900 rounded-full p-1 shadow-lg hover:bg-indigo-100 transition z-50"
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
        <li>
          <RouterLink to="/market" class="nav-link" active-class="active-link">
            <ShoppingBag :size="24" class="flex-shrink-0" />
            <span v-if="isExpanded" class="nav-text">Marketplace</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/inventory" class="nav-link" active-class="active-link">
            <Library :size="24" class="flex-shrink-0" />
            <span v-if="isExpanded" class="nav-text">Biblioteca</span>
          </RouterLink>
        </li>

        <li>
          <RouterLink to="/favorites" class="nav-link" active-class="active-link">
            <Heart :size="24" class="flex-shrink-0" />
            <span v-if="isExpanded" class="nav-text">Mis Favoritos</span>
          </RouterLink>
        </li>
        </ul>
    </nav>

    <div class="p-4 border-t border-indigo-700/50">
      <ul class="space-y-3">
        <li>
          <RouterLink to="/profile" class="nav-link" active-class="active-link">
            <User :size="24" class="flex-shrink-0" />
            <span v-if="isExpanded" class="nav-text">Mi Perfil</span>
          </RouterLink>
        </li>
        <li>
          <button 
            @click="logout" 
            class="nav-link w-full text-red-300 hover:bg-red-700 hover:text-white"
          >
            <LogOut :size="24" class="flex-shrink-0" />
            <span v-if="isExpanded" class="nav-text">Cerrar Sesión</span>
          </button>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { 
  GraduationCap, 
  ChevronRight, 
  ShoppingBag, 
  Library, 
  User,
  Heart,
  LogOut 
} from 'lucide-vue-next'

defineProps({
  isExpanded: {
    type: Boolean,
    default: false
  }
})

// Solución para la funcionalidad: Declarar el evento 'logout'
const emit = defineEmits(['toggle-sidebar', 'logout'])

const logout = () => {
  emit('logout');
}
</script>

<style scoped>
/* --- ESTILOS DEL SIDEBAR --- */
.nav-link {
  /* Estas propiedades de p-3 definen el alto, que ahora se aplica correctamente al botón. */
  @apply flex items-center gap-4 p-3 rounded-lg text-indigo-200 transition-colors duration-200;
  @apply hover:bg-indigo-700 hover:text-white;
}
.active-link {
  @apply bg-indigo-600 text-white shadow-md;
}
.nav-text {
  @apply font-semibold whitespace-nowrap;
}
</style>