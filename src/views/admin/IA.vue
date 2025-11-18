<template>
    <div class="flex min-h-screen bg-gray-100">
      
      <SidebarAdmin />
      
      <div class="flex-grow p-6 overflow-x-hidden">
        
        <div class="bg-white rounded-xl shadow-lg p-6">
          
          <header class="mb-8 pb-4 border-b border-gray-200">
            <h1 class="text-3xl font-bold text-gray-900">Herramienta de Inteligencia Artificial (IA)</h1>
            <p class="text-gray-500 mt-1">Herramientas de análisis y generación asistidas por IA para la gestión de la biblioteca.</p>
          </header>
  
          <main>
            <div class="grid grid-cols-1 gap-6">
              
              <section class="bg-indigo-50 border border-indigo-200 rounded-xl p-5 shadow-sm">
                <h2 class="text-xl font-semibold text-indigo-800 mb-3">Análisis de Datos o Recomendaciones</h2>
                
                <textarea 
                  v-model="aiInput"
                  class="w-full h-32 p-3 border border-indigo-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 resize-none text-gray-700"
                  placeholder="Ingresa texto para análisis (ej: reseña de un libro) o un tema para generar contenido..."
                ></textarea>
                
                <button 
                  @click="runAI"
                  :disabled="isLoading"
                  class="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-150 font-medium disabled:opacity-50"
                >
                  {{ isLoading ? 'Analizando...' : 'Ejecutar Herramienta IA' }}
                </button>
              </section>
              
              <section class="mt-4 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <h2 class="text-xl font-semibold text-gray-800 mb-3">Resultados del Motor de IA</h2>
                <div class="min-h-32 p-4 bg-gray-50 border border-dashed border-gray-300 rounded-lg text-gray-600">
                  <p v-if="aiResult" class="whitespace-pre-wrap">{{ aiResult }}</p>
                  <p v-else class="text-gray-400">El resultado de la herramienta de IA aparecerá aquí.</p>
                </div>
              </section>
              
            </div>
          </main>
          
        </div> </div> </div> </template>
  
  <script setup>
    import { ref } from 'vue';
    
    // IMPORTAR el componente Sidebar_admin.vue
    // Asumiendo que IA.vue y Sidebar_admin.vue están en la misma carpeta (src/views/admin)
    import SidebarAdmin from './Sidebar_admin.vue'; 
  
    // --- Lógica del componente ---
    const aiInput = ref('');
    const aiResult = ref(null); 
    const isLoading = ref(false);
  
    // Función para manejar la ejecución de la IA
    const runAI = async () => {
      isLoading.value = true;
      aiResult.value = null;
      
      // Simulación de una llamada a API
      try {
        if (!aiInput.value.trim()) {
          aiResult.value = 'Por favor, introduce un texto o un comando para ejecutar la IA.';
          return;
        }
  
        await new Promise(resolve => setTimeout(resolve, 1500)); 
        
        // Simulación del resultado
        aiResult.value = `Análisis completado para: "${aiInput.value}". \n\nResultado: El motor de IA sugiere que este contenido tiene alta relevancia para la categoría de ciencia ficción.`;
  
      } catch (error) {
        console.error('Error al ejecutar la herramienta de IA:', error);
        aiResult.value = 'Error al procesar la solicitud. Por favor, inténtalo de nuevo.';
      } finally {
        isLoading.value = false;
      }
    };
  </script>
  
  <style scoped>
  /* Estilos específicos si son necesarios */
  </style>