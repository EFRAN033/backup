<template>
    <aside 
      class="fixed top-0 left-0 h-screen flex flex-col bg-indigo-900 text-white transition-all duration-300 ease-in-out z-50"
      :class="expanded ? 'w-64' : 'w-20'"
    >
      <div class="flex items-center gap-3 p-5" :class="expanded ? 'justify-start' : 'justify-center'">
        <svg class="w-8 h-8 text-indigo-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.5l8 4.5v9l-8 4.5-8-4.5v-9l8-4.5zm0 0v9"></path>
        </svg>
        <span v-if="expanded" class="text-2xl font-bold whitespace-nowrap">AdminPanel</span>
      </div>
  
      <button 
        @click="$emit('toggle-sidebar')" 
        class="absolute top-7 -right-4 bg-white text-indigo-900 rounded-full p-1 shadow-lg hover:bg-indigo-100 transition z-50"
        aria-label="Expandir o colapsar menú"
      >
        <svg 
          class="w-5 h-5 transition-transform duration-300" 
          :class="expanded ? 'rotate-180' : ''"
          fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
  
      <nav class="flex-grow p-4">
        <ul class="space-y-3">
          <li v-for="item in menuItems" :key="item.label">
            <button 
              :class="['nav-link w-full', { 'active-link': item.active }]"
              @click="$emit('navigate', item.label)"
            >
              <svg class="w-6 h-6 flex-shrink-0" 
                   :class="{ 'text-white': item.active, 'text-indigo-200': !item.active }" 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.dPath"></path>
              </svg>
              <span v-if="expanded" class="nav-text">{{ item.label }}</span>
            </button>
          </li>
        </ul>
      </nav>
  
      <div class="p-4 border-t border-indigo-700/50">
        <ul class="space-y-3">
          <li>
            <button class="nav-link w-full">
              <svg class="w-6 h-6 flex-shrink-0 text-indigo-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
              <span v-if="expanded" class="nav-text">Mi Perfil</span>
            </button>
          </li>
          <li>
            <button 
              @click="$emit('logout')" 
              class="nav-link w-full text-red-300 hover:bg-red-700 hover:text-white"
            >
              <svg class="w-6 h-6 flex-shrink-0 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H7a3 3 0 01-3-3v-5a3 3 0 013-3h3"></path>
              </svg>
              <span v-if="expanded" class="nav-text">Cerrar Sesión</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  defineProps({
      expanded: {
          type: Boolean,
          default: false
      },
      menuItems: {
          type: Array,
          required: true
      }
  });
  
  defineEmits(['toggle-sidebar', 'navigate', 'logout']);
  </script>
  
  <style scoped>
  .nav-link {
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