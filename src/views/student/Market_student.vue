<template>
    <div class="flex min-h-screen">
      
      <aside 
        class="fixed top-0 left-0 h-screen flex flex-col bg-blue-950 text-white transition-all duration-300 ease-in-out z-50"
        :class="isExpanded ? 'w-64' : 'w-20'"
      >
        <div class="flex items-center gap-3 p-5" :class="isExpanded ? 'justify-start' : 'justify-center'">
          <GraduationCap :size="32" class="text-blue-400 flex-shrink-0" />
          <span v-if="isExpanded" class="text-2xl font-bold whitespace-nowrap">LibroHub</span>
        </div>
  
        <button 
          @click="isExpanded = !isExpanded" 
          class="absolute top-7 -right-4 bg-white text-purple-900 rounded-full p-1 shadow-lg hover:bg-purple-100 transition z-50"
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
              <RouterLink to="/biblioteca" class="nav-link" active-class="active-link">
                <Library :size="24" class="flex-shrink-0" />
                <span v-if="isExpanded" class="nav-text">Biblioteca</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/guardados" class="nav-link" active-class="active-link">
                <Bookmark :size="24" class="flex-shrink-0" />
                <span v-if="isExpanded" class="nav-text">Mis Guardados</span>
              </RouterLink>
            </li>
          </ul>
        </nav>
  
        <div class="p-4 border-t border-purple-800/50">
          <RouterLink to="/perfil" class="nav-link" active-class="active-link">
            <User :size="24" class="flex-shrink-0" />
            <span v-if="isExpanded" class="nav-text">Mi Perfil</span>
          </RouterLink>
        </div>
      </aside>
  
      <main 
        class="flex-1 bg-slate-100 transition-all duration-300 ease-in-out"
        :class="isExpanded ? 'ml-64' : 'ml-20'"
      >
        
        <header class="bg-indigo-700 p-6 md:p-8 text-white shadow-lg">
          <h1 class="text-3xl font-bold mb-2">Mercado de Libros</h1>
          <p class="text-indigo-200 mb-6">Búsqueda de libros por título, autor, categorías, etc.</p>
  
          <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            <div class="relative md:col-span-4">
              <label for="search" class="sr-only">Buscar por título, autor o editorial</label>
              <Search :size="18" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                v-model="filters.search"
                id="search"
                type="text"
                placeholder="Buscar por título, autor o editorial"
                class="w-full pl-10 pr-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            
            <div class="md:col-span-2">
              <label for="category" class="sr-only">Categoría</label>
              <select v-model="filters.category" id="category" class="filter-select">
                <option value="all">Categoría</option>
                <option value="ficcion">Ficción</option>
                <option value="filosofia">Filosofía</option>
                <option value="ciencia">Ciencia</option>
                <option value="historia">Historia</option>
              </select>
            </div>
            
            <div class="md:col-span-2">
              <label for="availability" class="sr-only">Disponibilidad</label>
              <select v...model="filters.availability" id="availability" class="filter-select">
                <option value="all">Disponibilidad</option>
                <option value="disponible">Disponible</option>
                <option value="prestado">Prestado</option>
              </select>
            </div>
  
            <div class="md:col-span-3 flex items-center gap-2 text-indigo-200">
              <label for="yearMin" class="text-sm whitespace-nowrap">Año:</label>
              <input 
                v-model="filters.yearMin"
                id="yearMin" 
                type="number" 
                placeholder="min"
                aria-label="Año mínimo"
                class="w-full px-3 py-3 rounded-lg bg-white/90 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 [appearance:textfield]"
              >
              <span>-</span>
              <label for="yearMax" class="sr-only">Año máximo</label>
              <input 
                v-model="filters.yearMax"
                id="yearMax" 
                type="number" 
                placeholder="max"
                aria-label="Año máximo"
                class="w-full px-3 py-3 rounded-lg bg-white/90 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 [appearance:textfield]"
              >
            </div>
  
            <div class="md:col-span-1">
              <button 
                @click="resetFilters" 
                class="w-full h-full px-4 py-3 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                title="Limpiar filtros"
              >
                Limpiar
              </button>
            </div>
  
          </div>
        </header>
  
        <section class="p-6 md:p-8">
          
          <h2 class="text-xl font-semibold text-gray-700 mb-6">
            {{ bookCountMessage }}
          </h2>
  
          <div v-if="filteredBooks.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            
            <RouterLink 
              v-for="book in filteredBooks" 
              :key="book.id"
              :to="`/libro/${book.id}`"
              class="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col"
            >
              <div class="bg-gray-100 h-64 flex items-center justify-center overflow-hidden p-6">
                <img 
                  :src="book.imgUrl" 
                  :alt="`Portada de ${book.title}`" 
                  class="w-full h-full object-contain"
                >
              </div>
              
              <div class="p-5 flex flex-col flex-grow text-center">
                
                <div class="flex-grow">
                  <h3 class="text-base font-semibold text-gray-900 h-12" :title="book.title">
                    {{ book.title }}
                  </h3>
                  <p class="text-sm text-gray-600 mb-4">{{ book.author }}</p>
                </div>
                
                <div class="mt-auto">
                  <span 
                    class="inline-block text-sm font-medium px-5 py-2 rounded-lg"
                    :class="book.available > 0 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-red-200 text-red-800'"
                  >
                    {{ book.available > 0 ? `Disponibles: ${book.available}` : 'Prestado' }}
                  </span>
                </div>
              </div>
            </RouterLink>
            </div>
  
          <div v-else class="text-center text-gray-500 py-16">
            <p>No se encontraron libros que coincidan con tu búsqueda.</p>
          </div>
  
        </section>
      </main>
      </div>
  </template>
    
  <script setup>
  import { ref, computed } from 'vue'
  import { RouterLink } from 'vue-router'
  import { 
    GraduationCap, 
    ChevronRight, 
    ShoppingBag, 
    Library, 
    Bookmark, 
    User,
    Search
  } from 'lucide-vue-next'
  
  // --- ESTADO DEL SIDEBAR ---
  const isExpanded = ref(false)
  
  // --- ESTADO DE MARKETPLACE ---
  
  // --- 1. Estado de los Filtros ---
  const defaultFilters = {
    search: '',
    category: 'all',
    availability: 'all',
    yearMin: '',
    yearMax: ''
  }
  
  const filters = ref({ ...defaultFilters })
  
  // --- 2. Datos de Ejemplo (Mock Data) ---
  const allBooks = ref([
    {
      id: 1,
      title: 'Crítica de la razón pura',
      author: 'Immanuel Kant',
      available: 6,
      category: 'filosofia',
      year: 1781,
      imgUrl: '/images/libro1.png'
    },
    {
      id: 2,
      title: 'El origen de las especies',
      author: 'Charles Darwin',
      available: 3,
      category: 'ciencia',
      year: 1859,
      imgUrl: '/images/libro2.png'
    },
    {
      id: 3,
      title: 'Economía y sociedad: Esbozo...',
      author: 'Max Weber',
      available: 10,
      category: 'historia',
      year: 1922,
      imgUrl: '/images/libro3.png'
    },
    {
      id: 4,
      title: 'Armas, gérmenes y acero: ...',
      author: 'Jared Diamond',
      available: 8,
      category: 'historia',
      year: 1997,
      imgUrl: '/images/libro4.png'
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
      
      const yearMin = parseInt(filters.value.yearMin) || 0
      const yearMax = parseInt(filters.value.yearMax) || Infinity
      
      const matchesYearMin = !filters.value.yearMin || book.year >= yearMin
      const matchesYearMax = !filters.value.yearMax || book.year <= yearMax
  
      return matchesSearch && matchesCategory && matchesAvailability && matchesYearMin && matchesYearMax
    })
  })
  
  // --- 4. Mensaje de Conteo ---
  const bookCountMessage = computed(() => {
    const count = filteredBooks.value.length
    return count === 1 ? '1 Libro Encontrado' : `${count} Libros Encontrados`
  })
  
  // --- 5. Funciones de Filtro ---
   
  const resetFilters = () => {
    filters.value = { ...defaultFilters }
  }
  
  </script>
    
  <style scoped>
  /* --- ESTILOS DEL SIDEBAR --- */
  .nav-link {
    @apply flex items-center gap-4 p-3 rounded-lg text-purple-300 transition-colors duration-200;
    @apply hover:bg-purple-800 hover:text-white;
  }
  .active-link {
    @apply bg-purple-700 text-white shadow-md;
  }
  .nav-text {
    @apply font-semibold whitespace-nowrap;
  }
  
  /* --- ESTILOS DE MARKET --- */
  .filter-select {
    @apply w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400;
    @apply appearance-none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 1.25em 1.25em;
    padding-right: 2.5rem;
  }
  
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  /* Clase para ocultar labels visualmente pero mantenerlas accesibles */
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