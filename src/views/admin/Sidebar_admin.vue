<template>
  <aside 
    class="fixed top-0 left-0 h-screen flex flex-col bg-indigo-900 text-white transition-all duration-300 ease-in-out z-50"
    :class="expanded ? 'w-64' : 'w-20'"
  >
    <div class="flex items-center gap-3 p-5" :class="expanded ? 'justify-start' : 'justify-center'">
      <LayoutGrid :size="32" class="text-indigo-300 flex-shrink-0" />
      <span v-if="expanded" class="text-2xl font-bold whitespace-nowrap">AdminPanel</span>
    </div>

    <button 
      @click="$emit('toggle-sidebar')" 
      class="absolute top-7 -right-4 bg-white text-indigo-900 rounded-full p-1 shadow-lg hover:bg-indigo-100 transition z-50"
      aria-label="Expandir o colapsar menú"
    >
      <ChevronRight 
        :size="20" 
        class="transition-transform duration-300" 
        :class="expanded ? 'rotate-180' : ''" 
      />
    </button>

    <nav class="flex-grow p-4">
      <ul class="space-y-3">
        <li v-for="item in sidebarItems" :key="item.label">
          <button 
            :class="[
              'nav-link w-full', 
              { 'active-link': item.active },
              // FIX: Centra el contenido si está colapsado, alinea a la izquierda si está expandido
              { 'justify-center': !expanded, 'justify-start': expanded }
            ]"
            @click="$emit('navigate', item.label)"
          >
            <component 
              :is="item.iconComponent" 
              :size="24" 
              :class="{ 'text-white': item.active, 'text-indigo-200': !item.active }" 
              class="flex-shrink-0"
            />
            <span v-if="expanded" class="nav-text">{{ item.label }}</span>
          </button>
        </li>
      </ul>
    </nav>

    <div class="p-4 border-t border-indigo-700/50">
      <ul class="space-y-3">
        <li>
          <button class="nav-link w-full" :class="{'justify-center': !expanded, 'justify-start': expanded}">
            <User :size="24" class="text-indigo-200 flex-shrink-0" />
            <span v-if="expanded" class="nav-text">Mi Perfil</span>
          </button>
        </li>
        <li>
          <button 
            @click="$emit('logout')" 
            class="nav-link w-full text-red-300 hover:bg-red-700 hover:text-white"
            :class="{'justify-center': !expanded, 'justify-start': expanded}"
          >
            <LogOut :size="24" class="text-red-300 flex-shrink-0" />
            <span v-if="expanded" class="nav-text">Cerrar Sesión</span>
          </button>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import { 
    LayoutGrid, 
    ChevronRight, 
    User, 
    LogOut,
    Home,       
    BookOpen,   
    Bot         
} from 'lucide-vue-next'; 

defineProps({
    expanded: {
        type: Boolean,
        default: false
    }
});

// Corregido: Usar la referencia directa al componente (Home, BookOpen, Bot)
// en lugar de la cadena de texto ('Home', 'BookOpen', 'Bot').
const sidebarItems = ref([
    { label: 'Inicio', active: true, iconComponent: Home }, 
    { label: 'Libros', active: false, iconComponent: BookOpen },
    { label: 'IA', active: false, iconComponent: Bot } 
]);

defineEmits(['toggle-sidebar', 'navigate', 'logout']);
</script>

<style scoped>
.nav-link {
  /* Se eliminó justify-start/center de aquí para manejarlo dinámicamente en el template */
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