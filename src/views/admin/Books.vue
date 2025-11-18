<template>
    <div class="flex min-h-screen bg-[#f2f2f2] font-sans">
      
      <SidebarAdmin 
        :expanded="isSidebarExpanded" 
        @toggle-sidebar="isSidebarExpanded = !isSidebarExpanded"
      /> 
      
      <div 
        class="flex-grow px-4 py-8 overflow-x-hidden transition-all duration-300 ease-in-out"
      >
        
        <header class="mb-8 pl-2"> 
          <div class="flex justify-between items-center">
            <div>
                <h1 class="text-2xl font-semibold text-gray-900">
                    Inventario de Libros
                </h1>
                <p class="text-sm text-gray-500 mt-1">
                    Supervisa el flujo de tu colección y audita préstamos.
                </p>
            </div>
            <button class="px-6 py-2.5 rounded-xl bg-[#4626d0] text-white text-sm font-bold shadow-md hover:bg-[#341caa] transition flex items-center gap-2">
                <span>+ Nuevo Libro</span>
            </button>
          </div>
        </header>
  
        <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-gray-300 px-2">
            <div class="flex flex-col justify-center">
                <span class="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Total Catálogo</span>
                <div class="flex items-baseline gap-2">
                    <span class="text-3xl font-bold text-gray-900">{{ totalBooks }}</span>
                    <span class="text-xs text-gray-500 font-medium">libros</span>
                </div>
            </div>

            <div class="flex flex-col justify-center border-l border-gray-300 pl-6">
                <span class="text-xs font-bold uppercase tracking-wider text-rose-500 mb-1">Prestados</span>
                <div class="flex items-baseline gap-2">
                    <span class="text-3xl font-bold text-rose-600">{{ borrowedBooks }}</span>
                    <span class="text-xs text-rose-500 font-medium">fuera</span>
                </div>
            </div>

            <div class="flex flex-col justify-center border-l border-gray-300 pl-6">
                <span class="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">Disponible</span>
                <div class="flex items-baseline gap-2">
                    <span class="text-3xl font-bold text-emerald-600">{{ totalBooks - borrowedBooks }}</span>
                    <span class="text-xs text-emerald-600 font-medium">en stock</span>
                </div>
            </div>
        </section>
  
        <main class="px-2">
            <div class="flex flex-col md:flex-row justify-between items-end md:items-center mb-6 gap-4">
                <div class="relative w-full md:w-1/3">
                    <input 
                        type="text" 
                        placeholder="Buscar título o autor..." 
                        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#4626d0] focus:border-[#4626d0] text-sm bg-white"
                    >
                    <svg class="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                
                <select class="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 focus:border-[#4626d0] focus:ring-[#4626d0] bg-white">
                    <option value="all">Todos los estados</option>
                    <option value="loaned">Solo Prestados</option> 
                    <option value="available">Solo Disponibles</option>
                </select>
            </div>

            <div v-if="isLoading" class="py-12 text-center text-[#4626d0] animate-pulse text-sm font-medium">Cargando inventario...</div>
            
            <div v-else class="w-full overflow-x-auto bg-white shadow-sm rounded-xl border border-gray-200">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Libro</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Autor</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Auditoría</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Estado</th>
                            <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                        <tr v-for="book in books" :key="book.id" class="hover:bg-indigo-50/20 transition duration-150">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ book.title }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ book.author }}</td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div class="flex items-center gap-2">
                                    <div class="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                                        {{ book.uploader.charAt(0) }}
                                    </div>
                                    <span>{{ book.uploader }}</span>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span 
                                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                  :class="book.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                                >
                                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path v-if="book.status === 'Available' ? 'd' : ''" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                    <path v-if="book.status !== 'Available' ? 'd' : ''" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                  </svg>
                                  {{ book.status === 'Available' ? 'Disponible' : 'Prestado' }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <button @click="viewDetails(book.id)" class="px-3 py-1 bg-[#4626d0] text-white text-xs rounded-lg hover:bg-[#341caa] transition inline-flex items-center">Ver</button>
                                <button @click="deleteBook(book.id)" class="px-3 py-1 bg-white border border-gray-300 text-gray-700 text-xs rounded-lg hover:bg-gray-50 transition inline-flex items-center">Borrar</button>
                            </td>
                        </tr>
                        <tr v-if="books.length === 0">
                            <td colspan="5" class="px-6 py-10 text-center text-sm text-gray-500 italic">No encontramos libros que coincidan con tu búsqueda.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
      </div> 
    </div> 
</template>
  
<script setup>
    import { ref, onMounted, computed } from 'vue';
    import SidebarAdmin from './Sidebar_admin.vue'; 
    import { useRouter } from 'vue-router'; 
  
    const router = useRouter();
    
    // Iniciamos colapsado para que coincida con el estado visual más común
    const isSidebarExpanded = ref(false);

    const books = ref([
        { id: 1, title: 'Cien Años de Soledad', author: 'García Márquez', uploader: 'Bibliotecario A', status: 'Available' },
        { id: 2, title: '1984', author: 'George Orwell', uploader: 'Bibliotecario B', status: 'Loaned' },
        { id: 3, title: 'El Gran Gatsby', author: 'F. Scott Fitzgerald', uploader: 'Bibliotecario A', status: 'Available' },
        { id: 4, title: 'Don Quijote', author: 'Cervantes', uploader: 'Bibliotecario B', status: 'Available' },
        { id: 5, title: 'Crónica de una muerte anunciada', author: 'García Márquez', uploader: 'Bibliotecario A', status: 'Loaned' },
    ]);
  
    const isLoading = ref(false);
    
    const totalBooks = computed(() => books.value.length);
    const borrowedBooks = computed(() => books.value.filter(b => b.status === 'Loaned').length);

    const deleteBook = (bookId) => {
      if (confirm(`¿Confirmar eliminación del libro ID ${bookId}?`)) {
        books.value = books.value.filter(book => book.id !== bookId);
      }
    };
  
    const viewDetails = (bookId) => {
        alert(`Detalles ID ${bookId}`);
    };
  
    const fetchBooks = async () => {
      isLoading.value = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); 
      } finally {
        isLoading.value = false;
      }
    };
  
    onMounted(() => {
      fetchBooks();
    });
</script>