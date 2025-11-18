<template>
  <div class="flex min-h-screen bg-[#f2f2f2] font-sans">
    
    <SidebarAdmin 
      :expanded="isSidebarExpanded" 
      @toggle-sidebar="isSidebarExpanded = !isSidebarExpanded"
    />
    
    <div class="flex-grow px-4 py-8 overflow-x-hidden transition-all duration-300 ease-in-out">
      
      <header class="mb-8 pl-2">
          <div class="flex justify-between items-center">
              <div>
                  <h1 class="text-2xl font-semibold text-gray-900">
                      Herramienta de Inteligencia Artificial
                  </h1>
                  <p class="text-sm text-gray-500 mt-1">
                      Generación de contenido y análisis de datos para la biblioteca.
                  </p>
              </div>
              <div class="hidden md:block">
                  <span class="px-3 py-1 bg-purple-100 text-[#4626d0] text-xs font-bold rounded-full">
                      Motor v1.0 Activo
                  </span>
              </div>
          </div>
      </header>

      <main class="px-2 grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div class="lg:col-span-2 flex flex-col gap-6">
              <section class="bg-white shadow-sm rounded-xl border border-gray-200 p-6">
                  <h2 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <svg class="w-5 h-5 text-[#4626d0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                      Entrada de Datos
                  </h2>
                  
                  <div class="relative">
                      <textarea 
                        v-model="aiInput"
                        class="w-full h-40 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4626d0] focus:border-[#4626d0] resize-none text-sm text-gray-700 bg-gray-50 transition-all"
                        placeholder="Escribe aquí el texto que deseas analizar, resumir o el tema para generar contenido..."
                      ></textarea>
                      <div class="absolute bottom-3 right-3 text-xs text-gray-400">
                          {{ aiInput.length }} caracteres
                      </div>
                  </div>
                  
                  <div class="mt-4 flex justify-end">
                      <button 
                        @click="runAI"
                        :disabled="isLoading || !aiInput.trim()"
                        class="px-6 py-2.5 rounded-xl bg-[#4626d0] text-white text-sm font-bold shadow-md hover:bg-[#341caa] transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <svg v-if="isLoading" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <span v-if="!isLoading">✨ Ejecutar Análisis</span>
                        <span v-else>Procesando...</span>
                      </button>
                  </div>
              </section>

              <section v-if="aiResult || isLoading" class="bg-white shadow-sm rounded-xl border border-gray-200 p-6 relative overflow-hidden">
                  <h2 class="text-lg font-semibold text-gray-800 mb-4">Resultados</h2>
                  
                  <div v-if="isLoading" class="flex flex-col items-center justify-center py-10 space-y-4">
                      <div class="w-12 h-12 border-4 border-[#4626d0] border-t-transparent rounded-full animate-spin"></div>
                      <p class="text-sm text-gray-500 animate-pulse">Consultando el modelo de IA...</p>
                  </div>

                  <div v-else class="prose prose-sm max-w-none text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <p class="whitespace-pre-wrap leading-relaxed">{{ aiResult }}</p>
                  </div>
              </section>
          </div>

          <div class="lg:col-span-1">
              <div class="bg-white shadow-sm rounded-xl border border-gray-200 p-6">
                  <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Sugerencias Rápidas</h3>
                  <ul class="space-y-3">
                      <li>
                          <button @click="aiInput = 'Genera un resumen corto de Don Quijote para estudiantes de secundaria.'" class="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-purple-50 border border-transparent hover:border-purple-200 transition text-xs text-gray-600 hover:text-[#4626d0]">
                              📚 Resumen para estudiantes
                          </button>
                      </li>
                      <li>
                          <button @click="aiInput = 'Analiza el sentimiento de esta reseña: El servicio fue lento pero los libros estaban en excelente estado.'" class="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-purple-50 border border-transparent hover:border-purple-200 transition text-xs text-gray-600 hover:text-[#4626d0]">
                              🧐 Análisis de sentimientos
                          </button>
                      </li>
                      <li>
                          <button @click="aiInput = 'Recomienda 5 libros similares a 1984 de George Orwell.'" class="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-purple-50 border border-transparent hover:border-purple-200 transition text-xs text-gray-600 hover:text-[#4626d0]">
                              💡 Recomendaciones literarias
                          </button>
                      </li>
                  </ul>
              </div>

              <div class="mt-6 bg-gradient-to-br from-[#4626d0] to-[#231383] rounded-xl p-6 text-white shadow-lg">
                  <h3 class="font-bold text-lg mb-2">¿Necesitas ayuda?</h3>
                  <p class="text-xs text-white/80 mb-4 leading-relaxed">
                      Nuestra IA está en fase beta. Verifica siempre la información generada antes de publicarla oficialmente en la plataforma.
                  </p>
              </div>
          </div>

      </main>
      
    </div> 
  </div> 
</template>

<script setup>
  import { ref } from 'vue';
  import SidebarAdmin from './Sidebar_admin.vue'; 

  // --- Estado del Sidebar ---
  const isSidebarExpanded = ref(false);

  // --- Lógica de la IA ---
  const aiInput = ref('');
  const aiResult = ref(null); 
  const isLoading = ref(false);

  const runAI = async () => {
    if (!aiInput.value.trim()) return;

    isLoading.value = true;
    aiResult.value = null;
    
    try {
      // Simulación de espera (API Call)
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      
      // Simulación del resultado
      aiResult.value = `✅ Análisis Exitoso.\n\nBasado en tu entrada: "${aiInput.value.substring(0, 30)}..."\n\nLa IA sugiere que este contenido es altamente relevante para usuarios interesados en literatura clásica. Se recomienda etiquetar este recurso con: #Clásicos, #Educación, #LecturaObligatoria.`;

    } catch (error) {
      console.error('Error:', error);
      aiResult.value = 'Error al procesar la solicitud.';
    } finally {
      isLoading.value = false;
    }
  };
</script>