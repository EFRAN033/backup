<template>
  <div class="flex min-h-screen bg-gray-100">
    
    <Sidebar_student 
      :isExpanded="isExpanded" 
      @toggle-sidebar="isExpanded = !isExpanded" 
    />

    <main 
      class="flex-1 transition-all duration-300 ease-in-out"
      :class="isExpanded ? 'ml-64' : 'ml-20'"
    >
      
      <header class="bg-white shadow-sm p-6 md:p-8">
        <div class="flex flex-col sm:flex-row items-center gap-6 max-w-4xl mx-auto">
          <div class="flex-shrink-0 w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
            {{ user.initials }}
          </div>
          <div class="flex-grow text-center sm:text-left">
            <h1 class="text-3xl font-bold text-gray-900">{{ user.name }}</h1>
            <p class="text-gray-600 text-lg mt-1">{{ user.university }}</p>
            <p class="text-gray-500 text-sm mt-1">{{ user.email }}</p>
          </div>
          <div class="flex-shrink-0">
            <button 
              @click="activeTab = 'configuracion'"
              class="px-5 py-2 rounded-lg font-semibold text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Edit3 :size="16" class="inline -mt-1 mr-2" />
              Editar Perfil
            </button>
          </div>
        </div>
      </header>

      <div class="p-6 md:p-8 max-w-4xl mx-auto">
        
        <nav class="flex border-b border-gray-300 mb-6" role="tablist">
          <button 
            @click="activeTab = 'publicaciones'" 
            :class="['tab-button', { 'active-tab': activeTab === 'publicaciones' }]"
            role="tab"
          >
            <BookOpen :size="18" />
            <span>Mis Publicaciones ({{ myBooks.length }})</span>
          </button>
          <button 
            @click="activeTab = 'prestamos'" 
            :class="['tab-button', { 'active-tab': activeTab === 'prestamos' }]"
            role="tab"
          >
            <BookMarked :size="18" />
            <span>Mis Préstamos ({{ myRentals.length }})</span>
          </button>
          <button 
            @click="activeTab = 'configuracion'" 
            :class="['tab-button', { 'active-tab': activeTab === 'configuracion' }]"
            role="tab"
          >
            <Settings :size="18" />
            <span>Configuración</span>
          </button>
        </nav>

        <section>
          
          <div v-if="activeTab === 'publicaciones'" class="space-y-4">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Mis Libros en Venta/Préstamo</h2>
            <div v-if="myBooks.length > 0" class="space-y-4">
              <div 
                v-for="book in myBooks" :key="book.id"
                class="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4"
              >
                <img :src="book.imgUrl" :alt="book.title" class="w-16 h-20 object-contain bg-gray-100 rounded">
                <div class="flex-grow">
                  <h3 class="font-semibold text-gray-900">{{ book.title }}</h3>
                  <p class="text-sm text-gray-600">
                    <span class.="font-medium">S/ {{ book.price.toFixed(2) }}</span> - 
                    <span :class="book.available > 0 ? 'text-green-700' : 'text-red-700'">
                      {{ book.available > 0 ? `Disponibles: ${book.available}` : 'Prestado' }}
                    </span>
                  </p>
                </div>
                <button class="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300">
                  Administrar
                </button>
              </div>
            </div>
            <p v-else class="text-gray-500">No tienes ningún libro publicado.</p>
          </div>
          
          <div v-if="activeTab === 'prestamos'" class="space-y-4">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Mis Libros Prestados</h2>
            <div v-if="myRentals.length > 0" class="space-y-4">
              <div 
                v-for="book in myRentals" :key="book.id"
                class="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4"
              >
                <img :src="book.imgUrl" :alt="book.title" class="w-16 h-20 object-contain bg-gray-100 rounded">
                <div class="flex-grow">
                  <h3 class="font-semibold text-gray-900">{{ book.title }}</h3>
                  <p class="text-sm text-gray-600">Préstamo vence: {{ book.dueDate }}</p>
                </div>
                <button class="px-4 py-2 rounded-lg text-sm font-semibold text-indigo-700 bg-indigo-100 hover:bg-indigo-200">
                  Ver Detalles
                </button>
              </div>
            </div>
            <p v-else class="text-gray-500">No tienes ningún préstamo activo.</p>
          </div>

          <div v-if="activeTab === 'configuracion'" class="space-y-8">
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h2 class="text-xl font-semibold text-gray-800 border-b pb-3 mb-6">Información Personal</h2>
              <form @submit.prevent class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="name" class="form-label">Nombre Completo</label>
                    <input type="text" id="name" v-model="user.name" class="form-input">
                  </div>
                  <div>
                    <label for="email" class="form-label">Correo Electrónico</label>
                    <input type="email" id="email" v-model="user.email" class="form-input">
                  </div>
                </div>
                <div>
                  <label for="university" class="form-label">Universidad</label>
                  <input type="text" id="university" v-model="user.university" class="form-input">
                </div>
                <div class="text-right">
                  <button type="submit" class="px-6 py-2 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h2 class="text-xl font-semibold text-gray-800 border-b pb-3 mb-6">Cambiar Contraseña</h2>
              <form @submit.prevent class="space-y-4">
                <div>
                  <label for="pass_current" class="form-label">Contraseña Actual</label>
                  <input type="password" id="pass_current" class="form-input">
                </div>
                <div>
                  <label for="pass_new" class="form-label">Nueva Contraseña</label>
                  <input type="password" id="pass_new" class="form-input">
                </div>
                <div>
                  <label for="pass_confirm" class="form-label">Confirmar Nueva Contraseña</label>
                  <input type="password" id="pass_confirm" class="form-input">
                </div>
                <div class="text-right">
                  <button type="submit" class="px-6 py-2 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    Actualizar Contraseña
                  </button>
                </div>
              </form>
            </div>

          </div>

        </section>
      </div>
    </main>
    </div>
</template>
  
<script setup>
import { ref } from 'vue'
// 3. Importar el componente Sidebar
import Sidebar_student from './Sidebar_student.vue' // (Ajusta la ruta si es necesario)

// 4. Se eliminó 'RouterLink' y los íconos del sidebar (GraduationCap, ChevronRight, etc.)
import { 
  Edit3,
  BookOpen,
  BookMarked,
  Settings
} from 'lucide-vue-next'

// --- Imágenes (Mock) ---
import imgLibro4 from '@/assets/imagenes/libro4.png'
import imgLibro2 from '@/assets/imagenes/libro2.png'
import imgLibro1 from '@/assets/imagenes/libro1.png'

// --- ESTADO DEL SIDEBAR ---
// 5. Este estado ahora controla al componente hijo y al <main>
const isExpanded = ref(false)

// --- ESTADO DEL PERFIL ---
const activeTab = ref('publicaciones') // Pestaña por defecto

// 1. Datos del Usuario (Mock)
const user = ref({
  name: 'Javier Gonzales',
  email: 'javier.admin@universidad.edu.pe',
  university: 'Universidad Nacional de Ica',
  initials: 'JG'
})

// 2. Libros publicados por el usuario (Mock)
const myBooks = ref([
  {
    id: 4,
    title: 'Principios de Marketing',
    author: 'Philip Kotler',
    available: 8,
    imgUrl: imgLibro4,
    price: 80.00,
  }
])

// 3. Libros prestados por el usuario (Mock)
const myRentals = ref([
  {
    id: 1,
    title: 'Crítica de la razón pura',
    author: 'Immanuel Kant',
    imgUrl: imgLibro1,
    dueDate: '20 de Diciembre, 2025'
  },
  {
    id: 2,
    title: 'El origen de las especies',
    author: 'Charles Darwin',
    imgUrl: imgLibro2,
    dueDate: '15 de Enero, 2026'
  }
])

</script>
  
<style scoped>
/* --- 6. Se eliminaron los estilos .nav-link, .active-link y .nav-text --- */

/* --- ESTILOS DEL PERFIL (UI FASE 3) --- */

/* Estilo para los botones de las pestañas */
.tab-button {
  @apply flex items-center gap-2 px-4 py-3 font-semibold text-gray-500 border-b-2 border-transparent -mb-px;
  @apply transition-colors duration-200 hover:text-indigo-600 hover:border-indigo-300;
}

/* Estilo para la pestaña activa */
.active-tab {
  @apply text-indigo-700 border-indigo-600;
}

/* Estilos para los formularios (minimalista) */
.form-label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}
.form-input {
  @apply w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900;
  @apply border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white;
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