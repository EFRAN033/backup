<template>
    <div class="flex min-h-screen bg-gray-100">
      
      <Sidebar_student 
        :is-expanded="isExpanded" 
        @toggle-sidebar="isExpanded = !isExpanded" 
      />
  
      <main 
        class="flex-1 transition-all duration-300 ease-in-out"
        :class="isExpanded ? 'ml-64' : 'ml-20'"
      >
        
          <header class="bg-white p-6 md:p-8 shadow-sm">
            <h1 class="text-3xl font-bold text-gray-900">Mi Pila de Lectura Favorita</h1>
            <p class="text-gray-600 mt-1">Explora, gestiona y destaca tus libros más apreciados.</p>
          </header>
    
          <section class="p-6 md:p-8">
            
            <div v-if="favoriteBooks.length > 0" class="max-w-6xl mx-auto flex overflow-hidden min-h-[600px] border border-gray-300">
              
              <div v-if="selectedBook" class="w-3/5 p-8 flex flex-col justify-between bg-white">
                <div>
                  <div class="flex gap-8 mb-6">
                    <img 
                      :src="selectedBook.image" 
                      :alt="`Portada de ${selectedBook.title}`" 
                      class="w-48 h-64 object-cover rounded-lg shadow-xl flex-shrink-0"
                    >
                    <div class="flex flex-col justify-center">
                      <h2 class="text-4xl font-extrabold text-gray-900 leading-tight">{{ selectedBook.title }}</h2>
                      <p class="text-xl font-medium text-blue-600 mt-2">{{ selectedBook.author }}</p>
                      <p class="text-sm text-gray-500 mt-1">ID: #{{ selectedBook.id }}</p>
                    </div>
                  </div>
                  
                  <p class="text-gray-700 mt-4 max-w-lg italic border-l-4 border-gray-300 pl-4">
                    "Este libro es una pieza fundamental de mi colección. Su impacto filosófico
                    cambió mi perspectiva sobre el conocimiento y la moral. Lo mantengo
                    siempre en mi lista para relecturas profundas."
                  </p>
                </div>
                
                <button 
                  @click="removeFavorite(selectedBook.id)"
                  class="w-full max-w-sm flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-red-600 text-white text-lg font-semibold hover:bg-red-700 transition-all shadow-lg self-end"
                >
                  <Trash2 :size="20" />
                  Quitar de Favoritos
                </button>
              </div>
    
              <div class="w-2/5 border-l border-gray-300 bg-gray-50 p-6 overflow-y-auto">
                <h3 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-300">Toda mi Pila ({{ favoriteBooks.length }})</h3>
                
                <div class="space-y-1">
                  <div 
                    v-for="book in favoriteBooks" 
                    :key="book.id"
                    @click="selectedBook = book"
                    class="p-3 cursor-pointer transition-all duration-200"
                    :class="{ 
                      // Fila destacada: Se usa color de fondo simple, no shadow/rounded
                      'bg-blue-200 text-blue-800 font-bold border-r-4 border-blue-600': selectedBook && selectedBook.id === book.id,
                      'hover:bg-gray-200 text-gray-700': !selectedBook || selectedBook.id !== book.id
                    }"
                  >
                    <h4 class="text-base leading-snug">{{ book.title }}</h4>
                    <p class="text-xs mt-0.5" 
                       :class="selectedBook && selectedBook.id === book.id ? 'text-blue-700' : 'text-gray-500'">
                      {{ book.author }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center text-gray-500 py-16 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
              <BookHeart :size="48" class="mx-auto mb-4 text-gray-400" />
              <h3 class="text-xl font-semibold text-gray-800">Sin favoritos</h3>
              <p class="mt-2 text-gray-600">Aún no has añadido ningún libro a tu pila de lectura.</p>
              <button class="mt-6 px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors">
                Explorar libros
              </button>
            </div>
    
          </section>
        </main>
      </div>
    </template>
    
    <script setup>
    import { ref, watch } from 'vue'
    
    // 5. Importar el Sidebar
    import Sidebar_student from './Sidebar_student.vue'
    
    // 6. Importar iconos
    import { BookHeart, Trash2 } from 'lucide-vue-next'
    
    // 7. Estado para controlar el sidebar
    const isExpanded = ref(false)
    
    // --- (Mock Data de ejemplo) ---
    import imgLibro1 from '@/assets/imagenes/libro1.png' 
    import imgLibro2 from '@/assets/imagenes/libro2.png'
    
    const mockBooks = [
      { id: 1, title: 'Crítica de la razón pura', author: 'Immanuel Kant', image: imgLibro1 },
      { id: 2, title: 'El mundo como voluntad y representación', author: 'Arthur Schopenhauer', image: imgLibro2 },
      { id: 3, title: 'Así habló Zaratustra', author: 'Friedrich Nietzsche', image: imgLibro1 },
      { id: 4, title: 'El ser y la nada', author: 'Jean-Paul Sartre', image: imgLibro2 },
      { id: 5, title: 'Ética a Nicómaco', author: 'Aristóteles', image: imgLibro1 },
    ];
    
    const favoriteBooks = ref(mockBooks)
    
    // Estado para el libro seleccionado/destacado
    const selectedBook = ref(favoriteBooks.value.length > 0 ? favoriteBooks.value[0] : null)
    
    // --- Funciones ---
    function removeFavorite(bookId) {
      // 1. Quitar el libro de la lista
      favoriteBooks.value = favoriteBooks.value.filter(book => book.id !== bookId)
      
      // 2. Lógica UX: Si el libro quitado era el destacado, selecciona el siguiente o pone null
      if (selectedBook.value && selectedBook.value.id === bookId) {
        selectedBook.value = favoriteBooks.value.length > 0 ? favoriteBooks.value[0] : null
      }
    }
    
    // Lógica de resguardo: si el libro destacado fue eliminado por otros medios (hipotético)
    watch(favoriteBooks, (newBooks) => {
        if (selectedBook.value && !newBooks.some(book => book.id === selectedBook.value.id)) {
            selectedBook.value = newBooks.length > 0 ? newBooks[0] : null;
        }
    }, { deep: true });
    
    </script>
      
    <style scoped>
    /* No se necesitan estilos adicionales ya que Tailwind CSS maneja el diseño único */
    </style>