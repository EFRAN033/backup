<template>
    <component 
      :is="iconComponent" 
      :size="size" 
      :stroke-width="strokeWidth"
      :class="customClass" 
    />
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import * as icons from 'lucide-vue-next';
  
  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    size: {
      type: [String, Number],
      default: 24,
    },
    strokeWidth: {
      type: [String, Number],
      default: 2,
    },
    class: {
      type: String,
      default: '',
    }
  });
  
  // Lógica para convertir el nombre 'kebab-case' (ej: chevron-left) 
  // al formato 'PascalCase' de los componentes (ej: ChevronLeft)
  const iconComponent = computed(() => {
    if (!props.name) return null;
    
    const pascalName = props.name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    
    // Retorna el icono si existe en la librería, si no, no renderiza nada
    return icons[pascalName] || null;
  });
  </script>