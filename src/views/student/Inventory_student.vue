<template>
    <div class="bg-gray-100 flex min-h-screen">
      
      <Sidebar_student 
        :is-expanded="isExpanded" 
        @toggle-sidebar="isExpanded = !isExpanded" 
      />
  
      <div 
        class="flex-1 h-screen overflow-y-auto transition-all duration-300 ease-in-out"
        :class="isExpanded ? 'ml-64' : 'ml-20'"
      >
        
        <main class="container mx-auto max-w-7xl p-4 md:p-8">
          
          <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Mis Alquileres
          </h1>
  
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full min-w-max">
                <thead class="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th class="text-left text-sm font-semibold text-gray-600 px-6 py-4">
                      Libro
                    </th>
                    <th class="text-left text-sm font-semibold text-gray-600 px-6 py-4">
                      Alquilado
                    </th>
                    <th class="text-left text-sm font-semibold text-gray-600 px-6 py-4">
                      Devolución
                    </th>
                    <th class="text-left text-sm font-semibold text-gray-600 px-6 py-4">
                      Estado
                    </th>
                    <th class="text-left text-sm font-semibold text-gray-600 px-6 py-4">
                      Acciones
                    </th>
                  </tr>
                </thead>
                
                <tbody class="divide-y divide-gray-200">
                  <tr v-if="rentedBooks.length === 0">
                    <td colspan="5" class="text-center text-gray-500 px-6 py-12">
                      Aún no tienes libros alquilados.
                    </td>
                  </tr>
  
                  <tr v-for="book in rentedBooks" :key="book.id" class="hover:bg-gray-50 transition-colors">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center gap-4">
                        <img 
                          :src="book.imgUrl" 
                          :alt="`Portada de ${book.bookTitle}`"
                          class="w-12 h-16 object-cover rounded-md shadow-sm"
                        >
                        <div>
                          <p class="text-sm font-semibold text-gray-900">{{ book.bookTitle }}</p>
                          <p class="text-xs text-gray-600">{{ book.bookAuthor }}</p>
                        </div>
                      </div>
                    </td>
                    
                    <td class="px-6 py-4 whitespace-nowrap">
                      <p class="text-sm text-gray-700">{{ book.rentedOn }}</p>
                    </td>
                    
                    <td class="px-6 py-4 whitespace-nowrap">
                      <p class="text-sm font-semibold" :class="book.status === 'Vencido' ? 'text-red-700' : 'text-gray-700'">
                        {{ book.dueDate }}
                      </p>
                    </td>
                    
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span 
                        class="inline-block text-xs font-semibold px-3 py-1 rounded-full"
                        :class="book.status === 'Activo' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'"
                      >
                        {{ book.status }}
                      </span>
                    </td>
  
                    <td class="px-6 py-4 whitespace-nowrap">
                      
                      <button 
                        v-if="book.status === 'Activo'"
                        class="px-4 py-2 rounded-lg bg-indigo-100 text-indigo-700 text-sm font-semibold hover:bg-indigo-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        title="Renovar este alquiler"
                      >
                        Renovar
                      </button>
                      
                      <button 
                        v-else-if="book.status === 'Vencido'"
                        class="px-4 py-2 rounded-lg bg-red-100 text-red-800 text-sm font-semibold hover:bg-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
                        title="Gestionar devolución o multa"
                      >
                        Gestionar
                      </button>
                      
                      </td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
          
        </main>
      </div>
      
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  // --- IMPORTACIÓN DEL SIDEBAR ---
  import Sidebar_student from './Sidebar_student.vue' // Ajusta la ruta si es necesario
  
  // --- IMÁGENES (Asegúrate de que estas rutas son correctas) ---
  // Usaremos las mismas imágenes del mock anterior por simplicidad
  import imgLibro1 from '@/assets/imagenes/libro1.png'
  import imgLibro2 from '@/assets/imagenes/libro2.png'
  
  // --- CAMBIO 3: Añadir el estado del sidebar ---
  const isExpanded = ref(false)
  
  // --- ESTADO ---
  const rentedBooks = ref([
    {
      id: 1,
      bookTitle: 'Crítica de la razón pura',
      bookAuthor: 'Immanuel Kant',
      imgUrl: imgLibro1,
      rentedOn: '15 Oct, 2025',
      dueDate: '15 Nov, 2025',
      status: 'Activo',
      rentalPrice: 45.00
    },
    {
      id: 2,
      bookTitle: 'El origen de las especies',
      bookAuthor: 'Charles Darwin',
      imgUrl: imgLibro2,
      rentedOn: '01 Oct, 2025',
      dueDate: '01 Nov, 2025',
      status: 'Vencido',
      rentalPrice: 55.00
    }
    // Puedes añadir más libros alquilados aquí
  ])
  
  </script>
  
  <style scoped>
  /* No se necesitan estilos 'scoped' adicionales. 
    Toda la estructura se gestiona con las clases de Tailwind.
  */
  </style>