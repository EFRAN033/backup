<template>
  <div class="min-h-screen flex bg-[#F8FAFC] font-sans text-slate-600">
    
    <SidebarLibrarian />

    <div class="flex-1 flex flex-col h-screen overflow-hidden relative">
      
      <header class="h-20 flex-shrink-0 flex items-center justify-between px-10 bg-white/50 backdrop-blur-sm border-b border-slate-200/60 z-10">
        <div class="flex flex-col">
          <h1 class="text-xl font-bold text-slate-900 tracking-tight">Control de Préstamos</h1>
          <nav class="flex gap-2 text-xs font-medium mt-0.5">
            <span class="text-slate-400 hover:text-slate-500 transition-colors cursor-pointer">Gestión</span>
            <span class="text-slate-300">/</span>
            <span class="text-indigo-600">Alquileres Activos e Histórico</span>
          </nav>
        </div>
        
        <div class="flex items-center gap-4">
          <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-200/50 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 hover:shadow-indigo-300">
            <PlusCircle :size="18" stroke-width="2.5" />
            <span>Registrar Salida</span>
          </button>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto px-10 py-8 scroll-smooth">
        
        <div class="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200/60 mb-8 flex flex-col md:flex-row justify-between gap-4 sticky top-0 z-20">
          
          <div class="relative flex-1 max-w-lg group">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search :size="18" class="text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Buscar por estudiante, libro o código..."
              class="block w-full pl-11 pr-4 py-3 bg-transparent text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none rounded-xl focus:bg-slate-50 transition-colors"
            />
          </div>

          <div class="flex items-center gap-2 px-2">
            <div class="h-8 w-px bg-slate-200 mx-1"></div> 
            
            <button class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200/50">
              <ListFilter :size="16" />
              <span>Estado</span>
              <ChevronDown :size="14" class="text-slate-400" />
            </button>

            <button class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200/50">
              <CalendarRange :size="16" />
              <span>Fecha</span>
              <ChevronDown :size="14" class="text-slate-400" />
            </button>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table class="w-full text-left border-collapse">
            <thead class="bg-slate-50/50">
              <tr>
                <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Estudiante / Usuario</th>
                <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Recurso Prestado</th>
                <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Cronograma</th>
                <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 text-center">Estado</th>
                <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="(alquiler, index) in alquileres" :key="index" class="group hover:bg-slate-50/80 transition-colors duration-200">
                
                <td class="px-6 py-5">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden">
                       <img :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${alquiler.usuario}`" alt="Avatar" class="w-full h-full">
                    </div>
                    <div>
                      <p class="text-sm font-bold text-slate-800">{{ alquiler.usuario }}</p>
                      <p class="text-xs text-slate-400">{{ alquiler.email }}</p>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-5">
                  <div class="flex items-center gap-3">
                    <div class="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                      <BookOpen :size="18" />
                    </div>
                    <span class="text-sm font-medium text-slate-700">{{ alquiler.titulo }}</span>
                  </div>
                </td>

                <td class="px-6 py-5 w-64">
                  <div class="flex justify-between text-[10px] font-medium text-slate-500 mb-1.5">
                    <span>{{ formatDate(alquiler.inicio) }}</span>
                    <span :class="checkOverdue(alquiler.fin) ? 'text-rose-500 font-bold' : ''">{{ formatDate(alquiler.fin) }}</span>
                  </div>
                  <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      class="h-full rounded-full"
                      :class="getProgressColor(alquiler)"
                      :style="{ width: calculateProgress(alquiler.inicio, alquiler.fin) + '%' }"
                    ></div>
                  </div>
                   <p v-if="checkOverdue(alquiler.fin) && alquiler.estado === 'Activo'" class="text-[10px] text-rose-500 mt-1 font-bold flex items-center gap-1">
                     <AlertCircle :size="10" /> Retraso detectado
                   </p>
                </td>

                <td class="px-6 py-5 text-center">
                  <span 
                    class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border"
                    :class="getStatusClasses(alquiler.estado, alquiler.fin)"
                  >
                    {{ alquiler.estado }}
                  </span>
                </td>

                <td class="px-6 py-5 text-right">
                   <div class="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    
                    <button 
                        v-if="alquiler.estado === 'Activo'"
                        class="p-2 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors" 
                        title="Marcar como Devuelto"
                    >
                      <Check :size="16" stroke-width="3" />
                    </button>

                    <button 
                        v-if="alquiler.estado === 'Activo'"
                        class="p-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors" 
                        title="Extender Plazo"
                    >
                      <Clock :size="16" stroke-width="2.5" />
                    </button>

                     <button class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Cancelar / Reportar">
                      <MoreVertical :size="16" />
                    </button>
                  </div>
                </td>

              </tr>
            </tbody>
          </table>
          
          <div class="bg-white px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            <p class="text-xs text-slate-500">Mostrando <span class="font-bold text-slate-800">1-2</span> de <span class="font-bold text-slate-800">15</span> préstamos</p>
            <div class="flex gap-2">
               <button class="px-3 py-1 text-xs font-medium text-slate-500 bg-white border border-slate-200 rounded-md hover:border-indigo-300 hover:text-indigo-600 transition-colors disabled:opacity-50">Anterior</button>
              <button class="px-3 py-1 text-xs font-medium text-slate-500 bg-white border border-slate-200 rounded-md hover:border-indigo-300 hover:text-indigo-600 transition-colors">Siguiente</button>
            </div>
          </div>

        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SidebarLibrarian from './Sidebar_librarian.vue'
import { 
  Search, PlusCircle, ListFilter, CalendarRange, ChevronDown, 
  BookOpen, Check, Clock, MoreVertical, AlertCircle
} from 'lucide-vue-next'

const alquileres = ref([
  {
    usuario: 'Cristian Perez',
    email: 'cris_6_2012@hotmail.com',
    titulo: 'Matemática 3° Secundaria',
    inicio: '2025-10-31',
    fin: '2025-11-30',
    estado: 'Activo'
  },
  {
    usuario: 'Gustavo Gomez',
    email: 'gus.dev@gmail.com',
    titulo: 'Diccionario de Ciencias',
    inicio: '2025-10-01',
    fin: '2025-10-15',
    estado: 'Devuelto'
  },
  {
    usuario: 'Maria Rodriguez',
    email: 'maria.rod@gmail.com',
    titulo: 'Historia Universal',
    inicio: '2025-10-15',
    fin: '2025-11-10', // Fecha pasada = Atraso
    estado: 'Activo' // Aún no devuelto pero fecha vencida
  }
])

// Utilidades para formato visual
const formatDate = (dateString) => {
  const options = { month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('es-ES', options)
}

const checkOverdue = (endDate) => {
  return new Date(endDate) < new Date()
}

const calculateProgress = (start, end) => {
  const totalDuration = new Date(end) - new Date(start)
  const elapsed = new Date() - new Date(start)
  let progress = (elapsed / totalDuration) * 100
  if (progress > 100) progress = 100 // Tope visual
  if (progress < 0) progress = 0
  return progress
}

const getProgressColor = (alquiler) => {
  if (alquiler.estado === 'Devuelto') return 'bg-emerald-500'
  if (checkOverdue(alquiler.fin)) return 'bg-rose-500'
  return 'bg-indigo-500'
}

const getStatusClasses = (estado, fin) => {
  if (estado === 'Devuelto') {
    return 'bg-emerald-50 text-emerald-700 border-emerald-100'
  }
  if (checkOverdue(fin) && estado === 'Activo') {
    return 'bg-rose-50 text-rose-700 border-rose-100' // Estado visual de "Atrasado"
  }
  return 'bg-blue-50 text-blue-700 border-blue-100' // Activo normal
}
</script>