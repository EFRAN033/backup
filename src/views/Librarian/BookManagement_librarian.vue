<template>
  <div class="min-h-screen flex bg-[#F8FAFC] font-sans text-slate-600">
    
    <SidebarLibrarian />

    <div class="flex-1 flex flex-col h-screen overflow-hidden relative">
      
      <header class="h-20 flex-shrink-0 flex items-center justify-between px-10 bg-white/50 backdrop-blur-sm border-b border-slate-200/60 z-10">
        <div class="flex flex-col">
          <h1 class="text-xl font-bold text-slate-900 tracking-tight">Gestión Bibliográfica</h1>
          <nav class="flex gap-2 text-xs font-medium mt-0.5">
            <span class="text-slate-400 hover:text-slate-500 transition-colors cursor-pointer">Biblioteca</span>
            <span class="text-slate-300">/</span>
            <span class="text-indigo-600">Inventario Activo</span>
          </nav>
        </div>
        
        <div class="flex items-center gap-4">
          <button class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-200/50 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 hover:shadow-indigo-300">
            <Plus :size="18" stroke-width="2.5" />
            <span>Nuevo Libro</span>
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
              placeholder="Buscar por título, ISBN, autor..."
              class="block w-full pl-11 pr-4 py-3 bg-transparent text-sm font-medium text-slate-700 placeholder-slate-400 focus:outline-none rounded-xl focus:bg-slate-50 transition-colors"
            />
          </div>

          <div class="flex items-center gap-2 px-2 overflow-x-auto">
            <div class="h-8 w-px bg-slate-200 mx-1"></div> <button class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200/50">
              <Filter :size="16" />
              <span>Categoría</span>
              <ChevronDown :size="14" class="text-slate-400" />
            </button>

            <button class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200/50">
              <SlidersHorizontal :size="16" />
              <span>Estado</span>
              <ChevronDown :size="14" class="text-slate-400" />
            </button>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table class="w-full text-left border-collapse">
            <thead class="bg-slate-50/50">
              <tr>
                <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Detalle del Libro</th>
                <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">Ubicación & Cat.</th>
                <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 text-center">Disponibilidad</th>
                <th class="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 text-right">Gestión</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="(libro, index) in libros" :key="index" class="group hover:bg-slate-50/80 transition-colors duration-200">
                
                <td class="px-6 py-5">
                  <div class="flex items-start gap-4">
                    <div class="w-12 h-16 rounded bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-400 shadow-sm group-hover:shadow-md transition-shadow border border-slate-200">
                      <Book :size="20" stroke-width="1.5" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <h3 class="text-sm font-bold text-slate-800 truncate pr-4 group-hover:text-indigo-700 transition-colors">{{ libro.titulo }}</h3>
                      <p class="text-xs font-medium text-slate-500 mt-0.5">{{ libro.autor }}</p>
                      <div class="flex items-center gap-2 mt-1.5">
                        <span class="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-mono text-slate-500 tracking-wide border border-slate-200">ISBN {{ libro.isbn }}</span>
                        <span class="text-[10px] text-slate-400">{{ libro.editorial }} • {{ libro.year }}</span>
                      </div>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-5 align-top">
                  <div class="flex flex-col gap-1">
                    <span class="inline-flex w-fit items-center px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100/50">
                      {{ libro.categoria }}
                    </span>
                    <div class="flex items-center gap-1.5 text-xs text-slate-500 mt-1 pl-1">
                      <MapPin :size="14" class="text-slate-400" />
                      <span>Estante <strong class="text-slate-700">{{ libro.ubicacion }}</strong></span>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-5 align-middle">
                  <div class="flex flex-col items-center gap-1.5 w-32 mx-auto">
                    <div class="flex justify-between w-full text-xs mb-1">
                      <span class="font-bold" :class="libro.stockDisponible > 0 ? 'text-slate-700' : 'text-rose-600'">
                        {{ libro.stockDisponible }} disp.
                      </span>
                      <span class="text-slate-400">/ {{ libro.stockTotal }}</span>
                    </div>
                    <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        class="h-full rounded-full transition-all duration-500"
                        :class="libro.stockDisponible > 0 ? 'bg-emerald-500' : 'bg-rose-500'"
                        :style="{ width: (libro.stockDisponible / libro.stockTotal) * 100 + '%' }"
                      ></div>
                    </div>
                    <div class="mt-1">
                       <span v-if="libro.stockDisponible === 0" class="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">AGOTADO</span>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-5 text-right align-middle">
                  <div class="inline-flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity duration-200">
                    <button class="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Editar Libro">
                      <Edit3 :size="18" stroke-width="2" />
                    </button>
                    
                    <div class="h-4 w-px bg-slate-200 mx-1"></div>
                    
                    <button 
                      class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                      :class="libro.stockDisponible > 0 
                        ? 'bg-slate-900 text-white hover:bg-indigo-600 shadow-sm' 
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'"
                      :disabled="libro.stockDisponible === 0"
                    >
                      <span>Prestar</span>
                      <ArrowRight :size="14" />
                    </button>
                  </div>
                </td>

              </tr>
            </tbody>
          </table>

          <div class="bg-white px-6 py-4 border-t border-slate-200 flex items-center justify-between">
            <p class="text-xs text-slate-500">Mostrando <span class="font-bold text-slate-800">1-4</span> de <span class="font-bold text-slate-800">128</span> resultados</p>
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
  Search, Plus, Book, MapPin, Filter, SlidersHorizontal,
  ChevronDown, Edit3, Trash2, ArrowRight
} from 'lucide-vue-next'

const libros = ref([
  {
    titulo: 'Matemática 3° Secundaria: Edición Revisada',
    autor: 'Ministerio de Educación',
    year: 2023,
    editorial: 'MINEDU',
    isbn: '978-612-00-0001',
    categoria: 'Educación',
    ubicacion: 'A3-12',
    stockTotal: 20,
    stockDisponible: 12
  },
  {
    titulo: 'Diccionario Enciclopédico de Ciencias Naturales',
    autor: 'Augusto Salazar Bondy',
    year: 2021,
    editorial: 'Editorial Alfa',
    isbn: '978-612-00-0045',
    categoria: 'Referencia',
    ubicacion: 'B1-04',
    stockTotal: 15,
    stockDisponible: 14
  },
  {
    titulo: 'Historia del Perú: La República Aristocrática',
    autor: 'Valeria Rossi',
    year: 2023,
    editorial: 'Andina Editores',
    isbn: '978-612-00-9982',
    categoria: 'Historia',
    ubicacion: 'H2-10',
    stockTotal: 8,
    stockDisponible: 0 
  },
  {
    titulo: 'Física Fundamental I: Teoría y Práctica',
    autor: 'Carlos G. Martínez',
    year: 2020,
    editorial: 'Ciencia Pura',
    isbn: '978-612-00-3321',
    categoria: 'Ciencias',
    ubicacion: 'C4-01',
    stockTotal: 30,
    stockDisponible: 5
  }
])
</script>