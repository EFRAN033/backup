<template>
    <div class="flex min-h-screen bg-gray-100">
      
      <SidebarAdmin />
      
      <div class="flex-grow p-6 overflow-x-hidden">
        
        <div class="bg-white rounded-xl shadow-lg p-6">
          
          <header class="mb-8 pb-4 border-b border-gray-200">
            <h1 class="text-3xl font-bold text-gray-900">Gestión de Libros (Visualización y Borrado)</h1>
            <p class="text-gray-500 mt-1">El administrador puede **visualizar, filtrar y eliminar** libros, además de verificar al bibliotecario que subió cada item.</p>
          </header>
  
          <main>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              
              <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <h2 class="text-xl font-semibold text-gray-800">Total de Libros Registrados</h2>
                <p class="text-3xl font-bold text-indigo-600 mt-2">{{ totalBooks }}</p>
              </div>
              
              <div class="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                <h2 class="text-xl font-semibold text-gray-800">Libros Actualmente Prestados</h2>
                <p class="text-3xl font-bold text-rose-600 mt-2">{{ borrowedBooks }}</p>
              </div>
            </div>
            
            <section class="mt-10 p-6 rounded-xl border border-gray-100 bg-gray-50">
              <h2 class="text-2xl font-semibold text-gray-800 mb-4">Listado de Libros (Visualizar, Borrar y Auditoría)</h2>
              <div v-if="isLoading" class="mt-4 text-center text-indigo-500">Cargando datos de libros...</div>
              
              <div v-else class="overflow-x-auto">
                <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-4">
                  <thead class="bg-indigo-600 text-white">
                    <tr>
                      <th class="py-3 px-4 text-left">Título</th>
                      <th class="py-3 px-4 text-left">Autor</th>
                      <th class="py-3 px-4 text-left">Subido por</th>
                      <th class="py-3 px-4 text-left">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="book in books" :key="book.id" class="border-b hover:bg-gray-50">
                      <td class="py-3 px-4">{{ book.title }}</td>
                      <td class="py-3 px-4">{{ book.author }}</td>
                      <td class="py-3 px-4 text-sm text-gray-600">{{ book.uploader }}</td>
                      <td class="py-3 px-4 whitespace-nowrap">
                        <button @click="viewDetails(book.id)" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium mr-3">Ver</button>
                        <button @click="deleteBook(book.id)" class="text-rose-600 hover:text-rose-800 text-sm font-medium">Borrar</button>
                      </td>
                    </tr>
                    <tr v-if="books.length === 0">
                      <td colspan="4" class="py-4 text-center text-gray-500">No hay libros registrados.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
  
            </section>
          </main>
          
        </div> </div> </div> </template>
  
  <script setup>
    import { ref, onMounted } from 'vue';
    import SidebarAdmin from './Sidebar_admin.vue'; 
    import { useRouter } from 'vue-router'; 
  
    // --- Lógica del componente ---
    const router = useRouter();
    
    // Datos de ejemplo para la tabla (simulación de datos de API)
    const books = ref([
        { id: 1, title: 'Cien Años de Soledad', author: 'García Márquez', uploader: 'Bibliotecario A', status: 'Available' },
        { id: 2, title: '1984', author: 'George Orwell', uploader: 'Bibliotecario B', status: 'Loaned' },
        { id: 3, title: 'El Gran Gatsby', author: 'F. Scott Fitzgerald', uploader: 'Bibliotecario A', status: 'Available' },
        { id: 4, title: 'Don Quijote', author: 'Cervantes', uploader: 'Bibliotecario B', status: 'Available' },
    ]);
  
    const isLoading = ref(false);
    const totalBooks = ref(books.value.length);
    const borrowedBooks = ref(books.value.filter(b => b.status === 'Loaned').length);
  
    // Función para simular la eliminación (Borrar)
    const deleteBook = (bookId) => {
      if (confirm(`¿Estás seguro de que quieres eliminar el libro con ID ${bookId}? Esta acción es permanente.`)) {
        // Lógica de eliminación local
        books.value = books.value.filter(book => book.id !== bookId);
        
        // Actualizar estadísticas
        totalBooks.value = books.value.length;
        borrowedBooks.value = books.value.filter(b => b.status === 'Loaned').length;
        
        console.log(`Libro ${bookId} eliminado.`);
        // NOTA: Aquí iría la llamada a la API DELETE
      }
    };
  
    // Función para visualizar detalles (simulada)
    const viewDetails = (bookId) => {
        alert(`Visualizando detalles completos del libro ID ${bookId}. Aquí podrías redirigir a una vista de detalle del admin.`);
    };
  
    // Función de ejemplo para cargar datos al iniciar
    const fetchBooks = async () => {
      isLoading.value = true;
      try {
        // Simulación de carga de datos de la API (500ms de retraso)
        await new Promise(resolve => setTimeout(resolve, 500)); 
        
        // Aquí iría la llamada a la API GET /api/admin/books
        console.log('Datos de libros cargados para el admin.');
      } catch (error) {
        console.error('Error al cargar los libros:', error);
      } finally {
        isLoading.value = false;
      }
    };
  
    onMounted(() => {
      fetchBooks();
    });
  </script>
  
  <style scoped>
  /* Estilos específicos si son necesarios */
  </style>