<template>
  <div class="flex min-h-screen bg-[#f2f2f2] font-sans">
    
    <SidebarAdmin 
      :expanded="isSidebarExpanded" 
      @toggle-sidebar="isSidebarExpanded = !isSidebarExpanded"
    />
    
    <div class="flex-grow px-4 py-8 overflow-x-hidden transition-all duration-300 ease-in-out">
      
      <header class="mb-8 pl-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
              <h1 class="text-2xl font-semibold text-gray-900">
                  Asistente Bibliotecario (IA)
              </h1>
              <p class="text-sm text-gray-500 mt-1">
                  Automatiza descripciones de libros, correos a usuarios y análisis de inventario.
              </p>
          </div>
          <div class="flex items-center gap-3">
              <span class="px-3 py-1 bg-purple-100 text-[#4626d0] text-xs font-bold rounded-full flex items-center gap-1">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
                  Modelo: Librarian-GPT v2.0
              </span>
          </div>
      </header>

      <main class="px-2 grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div class="lg:col-span-2 flex flex-col gap-6">
              
              <section class="bg-white shadow-sm rounded-xl border border-gray-200 p-6">
                  <div class="flex justify-between items-center mb-4">
                      <h2 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <svg class="w-5 h-5 text-[#4626d0]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                          Solicitud
                      </h2>
                      <button 
                          v-if="aiInput" 
                          @click="aiInput = ''; aiResult = null" 
                          class="text-xs text-gray-400 hover:text-red-500 transition"
                      >
                          Limpiar
                      </button>
                  </div>
                  
                  <div class="relative">
                      <textarea 
                        v-model="aiInput"
                        class="w-full h-40 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4626d0] focus:border-[#4626d0] resize-none text-sm text-gray-700 bg-gray-50 transition-all placeholder-gray-400"
                        placeholder="Selecciona una herramienta rápida a la derecha o escribe tu propia consulta..."
                      ></textarea>
                  </div>
                  
                  <div class="mt-4 flex justify-between items-center">
                      <div class="text-xs text-gray-400 italic">
                          * La IA utiliza datos simulados del inventario actual.
                      </div>
                      <button 
                        @click="runAI"
                        :disabled="isLoading || !aiInput.trim()"
                        class="px-6 py-2.5 rounded-xl bg-[#4626d0] text-white text-sm font-bold shadow-md hover:bg-[#341caa] transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <svg v-if="isLoading" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <span v-if="!isLoading">Generar Respuesta</span>
                        <span v-else>Procesando...</span>
                      </button>
                  </div>
              </section>

              <transition name="fade">
                  <section v-if="aiResult || isLoading" class="bg-white shadow-sm rounded-xl border border-gray-200 p-6 min-h-[200px]">
                      <h2 class="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Resultado Generado</h2>
                      
                      <div v-if="isLoading" class="flex flex-col items-center justify-center py-8 space-y-4">
                          <div class="w-10 h-10 border-4 border-[#4626d0] border-t-transparent rounded-full animate-spin"></div>
                          <p class="text-sm text-gray-500 animate-pulse">Consultando base de conocimientos...</p>
                      </div>

                      <div v-else class="prose prose-sm max-w-none text-gray-700 bg-gray-50 p-5 rounded-lg border border-gray-100 relative group">
                          <button class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition bg-white border border-gray-200 p-1.5 rounded shadow-sm hover:bg-gray-100" title="Copiar texto">
                              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                          </button>
                          
                          <div class="whitespace-pre-wrap leading-relaxed font-mono text-sm">{{ aiResult }}</div>
                      </div>
                  </section>
              </transition>
          </div>

          <div class="lg:col-span-1 space-y-6">
              
              <div class="bg-white shadow-sm rounded-xl border border-gray-200 p-6">
                  <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Herramientas de Gestión</h3>
                  <div class="space-y-3">
                      <button 
                          @click="setPrompt('catalog')"
                          class="w-full text-left p-3 rounded-lg border border-gray-100 hover:border-[#4626d0] hover:bg-indigo-50 transition group"
                      >
                          <div class="flex items-center gap-3">
                              <div class="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-[#4626d0] group-hover:text-white transition">
                                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                              </div>
                              <div>
                                  <p class="text-sm font-bold text-gray-800">Alta de Libros</p>
                                  <p class="text-xs text-gray-500">Generar sinopsis y tags</p>
                              </div>
                          </div>
                      </button>

                      <button 
                          @click="setPrompt('email')"
                          class="w-full text-left p-3 rounded-lg border border-gray-100 hover:border-[#4626d0] hover:bg-indigo-50 transition group"
                      >
                          <div class="flex items-center gap-3">
                              <div class="p-2 bg-yellow-100 text-yellow-600 rounded-lg group-hover:bg-[#4626d0] group-hover:text-white transition">
                                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                              </div>
                              <div>
                                  <p class="text-sm font-bold text-gray-800">Notificación de Retraso</p>
                                  <p class="text-xs text-gray-500">Redactar email formal</p>
                              </div>
                          </div>
                      </button>

                       <button 
                          @click="setPrompt('analysis')"
                          class="w-full text-left p-3 rounded-lg border border-gray-100 hover:border-[#4626d0] hover:bg-indigo-50 transition group"
                      >
                          <div class="flex items-center gap-3">
                              <div class="p-2 bg-green-100 text-green-600 rounded-lg group-hover:bg-[#4626d0] group-hover:text-white transition">
                                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                              </div>
                              <div>
                                  <p class="text-sm font-bold text-gray-800">Análisis de Tendencias</p>
                                  <p class="text-xs text-gray-500">Reporte mensual de lectura</p>
                              </div>
                          </div>
                      </button>
                  </div>
              </div>

              <div class="bg-gradient-to-br from-[#4626d0] to-[#231383] rounded-xl p-6 text-white shadow-lg">
                  <h3 class="font-bold text-lg mb-2">¿Sabías que?</h3>
                  <p class="text-xs text-white/80 leading-relaxed">
                      Puedes usar esta herramienta para generar listas de "Lecturas Recomendadas" para la página principal basadas en los libros menos prestados del mes.
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

  // --- Control del Sidebar ---
  const isSidebarExpanded = ref(false);

  // --- Lógica de IA ---
  const aiInput = ref('');
  const aiResult = ref(null); 
  const isLoading = ref(false);

  // --- Plantillas Predefinidas (Prompt Engineering simulado) ---
  const setPrompt = (type) => {
      aiResult.value = null; // Limpiar resultado anterior
      if (type === 'catalog') {
          aiInput.value = "Genera una sinopsis atractiva, 5 etiquetas (tags) y el género literario probable para el libro titulado: '[TITULO DEL LIBRO]' escrito por [AUTOR].";
      } else if (type === 'email') {
          aiInput.value = "Redacta un correo electrónico formal pero amable para el estudiante [NOMBRE] recordándole que el libro '[LIBRO]' tiene un retraso de 3 días. Incluye instrucciones de devolución.";
      } else if (type === 'analysis') {
          aiInput.value = "Analiza los préstamos de este mes: Mayoría de novelas juveniles prestadas, baja rotación en libros de historia. Genera 3 estrategias para mejorar la rotación de historia.";
      }
  };

  const runAI = async () => {
    if (!aiInput.value.trim()) return;

    isLoading.value = true;
    aiResult.value = null;
    
    try {
      // Simular tiempo de espera de red (API)
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      
      // LOGICA SIMULADA DE RESPUESTA (Mocks)
      const inputLower = aiInput.value.toLowerCase();
      let response = "";

      if (inputLower.includes('sinopsis') || inputLower.includes('tags')) {
          response = `📚 **Resultado de Catalogación**\n\n**Sinopsis Sugerida:**\n"Una obra cautivadora que explora las profundidades de la condición humana a través de una narrativa envolvente. El autor teje magistralmente una trama llena de intriga y emoción que mantendrá al lector pegado a sus páginas desde el primer capítulo..."\n\n**Género:** Ficción Literaria / Drama\n\n**Etiquetas (Tags):**\n#Novedad #LiteraturaContemporanea #BestSeller #Drama #LecturaRecomendada\n\n**Ubicación Sugerida:** Estante A-14 (Ficción General)`;
      } 
      else if (inputLower.includes('correo') || inputLower.includes('retraso')) {
          response = `✉️ **Borrador de Correo Electrónico**\n\n**Asunto:** Recordatorio de Devolución - Biblioteca Central\n\nEstimado/a usuario,\n\nEsperamos que te encuentres bien. Te escribimos para recordarte amablemente que el plazo de préstamo para el libro mencionado en tu cuenta ha vencido hace 3 días.\n\nPor favor, acércate a la biblioteca lo antes posible para realizar la devolución o renovación del material y evitar sanciones en tu cuenta.\n\nAtentamente,\nEl Equipo de Biblioteca.`;
      } 
      else if (inputLower.includes('analiza') || inputLower.includes('estrategias')) {
           response = `📊 **Análisis Estratégico**\n\n1. **Exhibición Temática:** Crear una mesa de exhibición en la entrada titulada "La Historia cobra vida" con los libros de historia más visuales.\n2. **Club de Lectura:** Organizar una sesión mensual enfocada en biografías históricas.\n3. **Incentivos:** Ofrecer doble puntuación en el sistema de recompensas (kambitos) por el alquiler de libros de la sección de Historia durante este mes.`;
      }
      else {
          response = `🤖 **Respuesta Genérica**\n\nHe procesado tu solicitud: "${aiInput.value}".\n\nComo modelo de lenguaje especializado en bibliotecas, recomiendo verificar esta información en la base de datos física antes de proceder. Si necesitas ayuda con catalogación, redacción o análisis, por favor utiliza los botones de la derecha.`;
      }

      aiResult.value = response;

    } catch (error) {
      console.error('Error:', error);
      aiResult.value = 'Error al conectar con el servidor de IA. Intente nuevamente.';
    } finally {
      isLoading.value = false;
    }
  };
</script>

<style scoped>
/* Transición suave para el resultado */
.fade-enter-active, .fade-leave-active {
transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
opacity: 0;
}
</style>