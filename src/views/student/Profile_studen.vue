<template>
  <div class="flex min-h-screen bg-gray-100">
    
    <Sidebar_student 
      :isExpanded="isExpanded" 
      @toggle-sidebar="isExpanded = !isExpanded" 
      @logout="handleLogout"
    />

    <main 
      class="flex-1 transition-all duration-300 ease-in-out"
      :class="isExpanded ? 'ml-64' : 'ml-20'"
    >
      
      <header class="bg-white shadow-sm p-6 md:p-8">
        <div class="flex flex-col sm:flex-row items-center gap-6 max-w-4xl mx-auto">
          <div class="flex-shrink-0 w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold uppercase">
            {{ user.initials }}
          </div>
          
          <div class="flex-grow text-center sm:text-left">
            <h1 class="text-3xl font-bold text-gray-900 capitalize">{{ user.name }}</h1>
            
            <div class="flex items-center justify-center sm:justify-start gap-2 mt-1 text-gray-600">
              <span class="font-semibold text-indigo-600">DNI:</span>
              <span class="text-lg">{{ user.dni || 'No registrado' }}</span>
            </div>
            
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
            @click="activeTab = 'reservas'" 
            :class="['tab-button', { 'active-tab': activeTab === 'reservas' }]"
            role="tab"
          >
            <Clock :size="18" />
            <span>Mis Reservas ({{ myReservations.length }})</span>
          </button>

          <button 
            @click="activeTab = 'prestamos'" 
            :class="['tab-button', { 'active-tab': activeTab === 'prestamos' }]"
            role="tab"
          >
            <BookMarked :size="18" />
            <span>Préstamos Activos ({{ myRentals.length }})</span>
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
          
          <div v-if="activeTab === 'reservas'" class="space-y-4">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Libros Reservados (Por Recoger)</h2>
            <div v-if="myReservations.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                v-for="reserva in myReservations" :key="reserva.id"
                class="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg flex flex-col sm:flex-row"
              >
                <div class="relative w-full sm:w-1/3 flex-shrink-0">
                    <img :src="reserva.imgUrl" :alt="reserva.title" class="w-full h-48 sm:h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"/>
                    <span class="absolute top-2 left-2 px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full shadow-md">
                        Reservado
                    </span>
                </div>
                <div class="p-4 flex-1 flex flex-col justify-between">
                    <div>
                        <h3 class="font-bold text-lg text-gray-900 mb-1">{{ reserva.title }}</h3>
                        <p class="text-sm text-gray-600">Autor: {{ reserva.author }}</p>
                        <p class="text-sm text-gray-700 mt-2">
                            Recoger antes del: <span class="font-semibold text-yellow-700">{{ reserva.pickupDeadline }}</span>
                        </p>
                    </div>
                    <div class="mt-4 flex justify-end">
                        <button class="px-4 py-2 text-sm font-semibold text-red-600 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500">
                            Cancelar Reserva
                        </button>
                    </div>
                </div>
              </div>
            </div>
            <p v-else class="text-gray-500 italic p-4 bg-white rounded-lg shadow-sm">No tienes ninguna reserva pendiente.</p>
          </div>
          
          <div v-if="activeTab === 'prestamos'" class="space-y-4">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Mis Libros Prestados</h2>
            <div v-if="myRentals.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                v-for="book in myRentals" :key="book.id"
                class="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg flex flex-col sm:flex-row"
              >
                <div class="relative w-full sm:w-1/3 flex-shrink-0">
                    <img :src="book.imgUrl" :alt="book.title" class="w-full h-48 sm:h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"/>
                    <span class="absolute top-2 left-2 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-md">
                        Activo
                    </span>
                </div>
                <div class="p-4 flex-1 flex flex-col justify-between">
                    <div>
                        <h3 class="font-bold text-lg text-gray-900 mb-1">{{ book.title }}</h3>
                        <p class="text-sm text-gray-600">Autor: {{ book.author }}</p>
                        <p class="text-sm text-gray-700 mt-2">
                            Fecha de devolución: <span class="font-semibold text-green-700">{{ book.dueDate }}</span>
                        </p>
                    </div>
                    <div class="mt-4 flex justify-end">
                        <button class="px-4 py-2 text-sm font-semibold text-indigo-700 bg-indigo-100 rounded-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            Ver Detalles
                        </button>
                    </div>
                </div>
              </div>
            </div>
            <p v-else class="text-gray-500 italic p-4 bg-white rounded-lg shadow-sm">No tienes ningún préstamo activo.</p>
          </div>

          <div v-if="activeTab === 'configuracion'" class="space-y-8">
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h2 class="text-xl font-semibold text-gray-800 border-b pb-3 mb-6">Información Personal</h2>
              <form @submit.prevent class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label for="name" class="form-label">Nombre Completo</label>
                    <input type="text" id="name" v-model="user.name" class="form-input" disabled>
                  </div>
                  <div>
                    <label for="email" class="form-label">Correo Electrónico</label>
                    <input type="email" id="email" v-model="user.email" class="form-input" disabled>
                  </div>
                </div>
                <div>
                  <label for="dni" class="form-label">DNI</label>
                  <input type="text" id="dni" v-model="user.dni" maxlength="8" class="form-input" disabled>
                </div>
                <div class="text-right">
                  <span class="text-xs text-gray-400 mr-2">Contacta al admin para cambios sensibles</span>
                </div>
              </form>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h2 class="text-xl font-semibold text-gray-800 border-b pb-3 mb-6">Cambiar Contraseña</h2>
              
              <form @submit.prevent="handleChangePassword" class="space-y-4">
                
                <div v-if="passwordMsg" class="p-3 bg-green-100 text-green-700 rounded-md text-sm">
                  {{ passwordMsg }}
                </div>
                <div v-if="passwordError" class="p-3 bg-red-100 text-red-700 rounded-md text-sm">
                  {{ passwordError }}
                </div>

                <div>
                  <label for="pass_current" class="form-label">Contraseña Actual</label>
                  <input 
                    v-model="passForm.current" 
                    type="password" 
                    id="pass_current" 
                    required
                    placeholder="Ingresa tu contraseña actual"
                    class="form-input"
                  >
                </div>
                <div>
                  <label for="pass_new" class="form-label">Nueva Contraseña</label>
                  <input 
                    v-model="passForm.new" 
                    type="password" 
                    id="pass_new" 
                    required
                    placeholder="Mínimo 6 caracteres"
                    class="form-input"
                  >
                </div>
                <div>
                  <label for="pass_confirm" class="form-label">Confirmar Nueva Contraseña</label>
                  <input 
                    v-model="passForm.confirm" 
                    type="password" 
                    id="pass_confirm" 
                    required
                    placeholder="Repite la nueva contraseña"
                    class="form-input"
                  >
                </div>
                <div class="text-right">
                  <button 
                    type="submit" 
                    :disabled="passwordLoading"
                    class="px-6 py-2 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ml-auto"
                  >
                    <Loader2 v-if="passwordLoading" class="animate-spin" :size="18" />
                    <span>{{ passwordLoading ? 'Actualizando...' : 'Actualizar Contraseña' }}</span>
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
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import Sidebar_student from './Sidebar_student.vue'

import { 
  Edit3,
  Clock, 
  BookMarked,
  Settings,
  Loader2 
} from 'lucide-vue-next'

// Imports de imágenes
import imgLibro4 from '@/assets/imagenes/libro4.png'
import imgLibro2 from '@/assets/imagenes/libro2.png'
import imgLibro1 from '@/assets/imagenes/libro1.png'
import imgLibro5 from '@/assets/imagenes/libro4.png' 

const isExpanded = ref(false)
const activeTab = ref('reservas')
const router = useRouter()
const userStore = useUserStore()

// --- LÓGICA PARA OBTENER DATOS REALES DEL STORE ---
const userData = userStore.user || {}

const getInitials = (nombres, apellidos) => {
    const n = nombres ? nombres.charAt(0) : ''
    const a = apellidos ? apellidos.charAt(0) : ''
    return (n + a).toUpperCase() || 'U'
}

const user = ref({
  name: `${userData.nombres || ''} ${userData.apellidos || ''}`.trim(),
  email: userData.email || '',
  dni: userData.dni || '',
  initials: getInitials(userData.nombres, userData.apellidos)
})

// --- LÓGICA DE CAMBIO DE CONTRASEÑA ---
const passForm = ref({
  current: '',
  new: '',
  confirm: ''
})
const passwordLoading = ref(false)
const passwordMsg = ref('')
const passwordError = ref('')

const handleChangePassword = async () => {
  // 1. Resetear mensajes
  passwordMsg.value = ''
  passwordError.value = ''

  // 2. Validaciones Locales
  if (passForm.value.new !== passForm.value.confirm) {
    passwordError.value = 'Las nuevas contraseñas no coinciden.'
    return
  }
  if (passForm.value.new.length < 6) {
    passwordError.value = 'La nueva contraseña debe tener al menos 6 caracteres.'
    return
  }

  // 3. Preparar envío
  passwordLoading.value = true
  
  try {
    const API_URL = import.meta.env.VITE_APP_API_URL
    
    // Endpoint definido en tu auth_router.py
    const response = await fetch(`${API_URL}/auth/me/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userStore.token}` // Enviamos el token del usuario logueado
      },
      body: JSON.stringify({
        password_actual: passForm.value.current,
        password_nueva: passForm.value.new
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.detail || 'Error al actualizar la contraseña')
    }

    // 4. Éxito
    passwordMsg.value = '¡Contraseña actualizada correctamente!'
    // Limpiar formulario
    passForm.value = { current: '', new: '', confirm: '' }

  } catch (error) {
    console.error(error)
    passwordError.value = error.message
  } finally {
    passwordLoading.value = false
  }
}

// Datos de ejemplo para libros (estos siguen siendo estáticos por ahora)
const myReservations = ref([
  {
    id: 4,
    title: 'Principios de Marketing',
    author: 'Philip Kotler',
    imgUrl: imgLibro4,
    pickupDeadline: 'Mañana, 12:00 PM' 
  },
  {
    id: 5,
    title: 'La invención de los derechos humanos',
    author: 'Lynn Hunt',
    imgUrl: imgLibro5,
    pickupDeadline: 'Hoy, 5:00 PM'
  }
])

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

const handleLogout = () => {
  userStore.clearUser() 
  router.push('/login')
}
</script>
  
<style scoped>
.tab-button {
  @apply flex items-center gap-2 px-4 py-3 font-semibold text-gray-500 border-b-2 border-transparent -mb-px;
  @apply transition-colors duration-200 hover:text-indigo-600 hover:border-indigo-300;
}

.active-tab {
  @apply text-indigo-700 border-indigo-600;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}
.form-input {
  @apply w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900;
  @apply border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white;
}
</style>