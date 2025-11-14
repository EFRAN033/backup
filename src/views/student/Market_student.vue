<template>
  <div class="flex min-h-screen bg-gray-100">
    
    <Sidebar 
      :is-expanded="isExpanded" 
      @toggle-sidebar="isExpanded = !isExpanded" 
    />

    <main 
      class="flex-1 transition-all duration-300 ease-in-out"
      :class="isExpanded ? 'ml-64' : 'ml-20'"
    >
      
      <header class="bg-white p-6 md:p-8 shadow-sm">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Explora el Marketplace</h1>
        <p class="text-gray-600 mb-6">Encuentra libros de texto, novelas y más.</p>
        
        <div class="relative w-full max-w-2xl mx-auto">
          <label for="search" class="sr-only">Buscar por título, autor o editorial</label>
          <Search :size="20" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            v-model="filters.search"
            id="search"
            type="text"
            placeholder="Buscar por título, autor o ISBN..."
            class="w-full pl-12 pr-4 py-4 rounded-lg bg-gray-100 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </header>

      <nav class="bg-white p-4 md:px-8 border-y border-gray-200">
        <div class="flex flex-col md:flex-row gap-4">
          
          <div class="flex-grow flex items-center gap-4">
            <label for="category" class="sr-only">Categoría</label>
            <select v-model="filters.category" id="category" class="filter-select">
              <option value="all">Todas las Categorías</option>
              <option value="administracion">Administración</option>
              <option value="filosofia">Filosofía</option>
              <option value="ciencia">Ciencia</option>
              <option value="historia">Historia</option>
            </select>
            
            <label for="availability" class="sr-only">Disponibilidad</label>
            <select v-model="filters.availability" id="availability" class="filter-select">
              <option value="all">Disponibilidad</option>
              <option value="disponible">Disponible</option>
              <option value="prestado">Prestado</option>
            </select>

            <label for="condition" class="sr-only">Condición</label>
            <select v-model="filters.condition" id="condition" class="filter-select hidden md:block">
              <option value="all">Condición</option>
              <option value="nuevo">Nuevo</option>
              <option value="usado">Usado</option>
            </select>
          </div>

          <div class="flex-shrink-0 flex items-center gap-2">
            <span class="text-sm font-medium text-gray-700 whitespace-nowrap">
              {{ bookCountMessage }}
            </span>
            <button 
              @click="resetFilters" 
              class="ml-auto md:ml-2 p-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              title="Limpiar filtros"
            >
              <FilterX :size="18" />
            </button>
          </div>
        </div>
      </nav>

      <section class="p-6 md:p-8">
        
        <div v-if="filteredBooks.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          
          <RouterLink 
            v-for="book in filteredBooks" 
            :key="book.id"
            :to="`/libro/${book.id}`"
            class="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl group flex flex-col"
          >
            <div class="relative">
              <div class="bg-gray-100 h-64 flex items-center justify-center overflow-hidden p-6">
                <img 
                  :src="book.imgUrl" 
                  :alt="`Portada de ${book.title}`" 
                  class="w-full h-full object-contain"
                >
              </div>
              <span 
                class="absolute top-3 left-3 inline-block text-xs font-semibold px-3 py-1 rounded-full"
                :class="book.condition === 'nuevo' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'"
              >
                {{ book.condition === 'nuevo' ? 'Nuevo' : 'Usado' }}
              </span>
            </div>
            
            <div class="p-5 flex flex-col flex-grow">
              
              <div class="flex-grow mb-4">
                <p class="text-sm text-indigo-600 font-semibold mb-1">{{ book.categoryDisplay }}</p>
                <h3 class="text-base font-bold text-gray-900 group-hover:text-indigo-700" :title="book.title">
                  {{ book.title }}
                </h3>
                <p class="text-sm text-gray-600 mt-1">{{ book.author }}</p>
              </div>
              
              <div class="mt-auto flex justify-between items-center">
                <span class="text-xl font-bold text-gray-900">
                  S/ {{ book.price.toFixed(2) }}
                </span>
                <span 
                  class="inline-block text-sm font-medium"
                  :class="book.available > 0 
                    ? 'text-green-700' 
                    : 'text-red-700'"
                >
                  {{ book.available > 0 ? `${book.available} en stock` : 'Prestado' }}
                </span>
              </div>
            </div>
          </RouterLink>
          </div>

        <div v-else class="text-center text-gray-500 py-16">
          <BookX :size="48" class="mx-auto mb-4 text-gray-400" />
          <h3 class="text-xl font-semibold">Sin resultados</h3>
          <p class="mt-2">No se encontraron libros que coincidan con tu búsqueda.</p>
        </div>

      </section>
    </main>
    </div>
</template>
  
<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
// --- IMPORTACIONES DE COMPONENTES ---
import Sidebar from './Sidebar_student.vue'

// --- IMPORTACIONES DE ICONOS ---
// Ya no se importan los iconos del sidebar aquí
import { 
  Search,
  FilterX, 
  BookX
} from 'lucide-vue-next'

// --- Imágenes ---
import imgLibro1 from '@/assets/imagenes/libro1.png'
import imgLibro2 from '@/assets/imagenes/libro2.png'
import imgLibro3 from '@/assets/imagenes/libro3.png'
import imgLibro4 from '@/assets/imagenes/libro4.png'

// --- ESTADO DEL SIDEBAR ---
// Este estado se mantiene en el padre
const isExpanded = ref(false)

// --- ESTADO DE MARKETPLACE ---

// --- 1. Estado de los Filtros ---
// ¡CAMBIO! Añadido 'condition' para la "Persona"
const defaultFilters = {
  search: '',
  category: 'all',
  availability: 'all',
  condition: 'all',
}

const filters = ref({ ...defaultFilters })

// --- 2. Datos de Ejemplo (Mock Data) ---
// ¡CAMBIO! Añadido 'price', 'condition' y 'categoryDisplay'
const allBooks = ref([
    {
      id: 1,
      title: 'Crítica de la razón pura',
      author: 'Immanuel Kant',
      available: 6,
      category: 'filosofia',
      categoryDisplay: 'Filosofía',
      year: 1781,
      imgUrl: imgLibro1,
      price: 45.00,
      condition: 'usado'
    },
    {
      id: 2,
      title: 'El origen de las especies',
      author: 'Charles Darwin',
      available: 3,
      category: 'ciencia',
      categoryDisplay: 'Ciencia',
      year: 1859,
      imgUrl: imgLibro2,
      price: 55.00,
      condition: 'nuevo'
    },
    {
      id: 3,
      title: 'Economía y sociedad: Esbozo...',
      author: 'Max Weber',
      available: 0,
      category: 'historia',
      categoryDisplay: 'Historia',
      year: 1922,
      imgUrl: imgLibro3,
      price: 30.00,
      condition: 'usado'
    },
    {
      id: 4,
      title: 'Principios de Marketing', // <-- Para la "Persona"
      author: 'Philip Kotler',
      available: 8,
      category: 'administracion',
      categoryDisplay: 'Administración',
      year: 1997,
      imgUrl: imgLibro4,
      price: 80.00,
      condition: 'nuevo'
    }
  ])

// --- 3. Lógica de Filtro ---
const filteredBooks = computed(() => {
  const searchLower = filters.value.search.toLowerCase()
  
  return allBooks.value.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchLower) || 
                          book.author.toLowerCase().includes(searchLower)
    const matchesCategory = filters.value.category === 'all' || 
                            book.category === filters.value.category
    const matchesAvailability = filters.value.availability === 'all' || 
                                (filters.value.availability === 'disponible' && book.available > 0) ||
                                (filters.value.availability === 'prestado' && book.available === 0)
    // ¡CAMBIO! Añadido filtro por condición
    const matchesCondition = filters.value.condition === 'all' ||
                             book.condition === filters.value.condition
  
    return matchesSearch && matchesCategory && matchesAvailability && matchesCondition
  })
})

// --- 4. Mensaje de Conteo ---
const bookCountMessage = computed(() => {
  const count = filteredBooks.value.length
  return count === 1 ? '1 Libro' : `${count} Libros`
})

// --- 5. Funciones de Filtro ---
const resetFilters = () => {
  filters.value = { ...defaultFilters }
}

</script>
  
<style scoped>
/* Los estilos del sidebar se han movido a sidebar.vue
*/

/* --- ESTILOS DE MARKET (UI FASE 3) --- 
  - Estilos "suaves" y "minimalistas" 
*/
.filter-select {
  @apply w-full md:w-auto flex-grow md:flex-grow-0 px-4 py-2 rounded-lg bg-gray-100 text-gray-800;
  @apply border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white;
  @apply appearance-none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1.25em 1.25em;
  padding-right: 2.5rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>