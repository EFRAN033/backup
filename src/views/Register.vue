<template>
  <div class="min-h-screen bg-header-bg flex flex-col items-center justify-center p-4 relative">
    
    <div class="absolute top-6 left-6 sm:top-8 sm:left-8 z-10">
      <RouterLink 
        to="/"
        class="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200"
        aria-label="Volver al inicio"
      >
        <ArrowLeft :size="20" />
        <span class="text-sm hidden sm:block">Volver</span>
      </RouterLink>
    </div>

    <div 
      class="w-full max-w-2xl animate-fade-in-up" 
      style="animation-delay: 100ms;"
    >
      <div class="bg-blue-950/50 backdrop-blur-md border border-purple-500/30 rounded-lg p-8 shadow-2xl">
        
        <div class="text-center mb-8">
          <RouterLink to="/" class="flex items-center justify-center gap-3 text-white/80 hover:text-white transition-colors duration-300 mb-4">
            <GraduationCap :size="36" class="text-blue-400" />
            <span class="text-3xl font-bold">LibroHub</span>
          </RouterLink>
          <h2 class="text-2xl font-semibold text-white">
            Crea tu cuenta
          </h2>
        </div>

        <form @submit.prevent="handleRegister" class="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <div 
            v-if="globalError" 
            class="col-span-1 sm:col-span-2 bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-lg p-3 text-center animate-fade-in"
          >
            {{ globalError }}
          </div>
          
          <div>
            <label class="block text-purple-300 text-sm mb-2">Nombres</label>
            <input 
              v-model="formData.nombres" 
              type="text" 
              placeholder="Juan" 
              class="w-full bg-purple-900/30 border border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition" 
              required 
              :disabled="loading" 
            />
          </div>

          <div>
            <label class="block text-purple-300 text-sm mb-2">Apellidos</label>
            <input 
              v-model="formData.apellidos" 
              type="text" 
              placeholder="Pérez" 
              class="w-full bg-purple-900/30 border border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition" 
              required 
              :disabled="loading" 
            />
          </div>

          <div class="col-span-1 sm:col-span-2">
            <label class="block text-purple-300 text-sm mb-2">Quiero registrarme como</label>
            <select
              v-model="formData.rol"
              class="w-full bg-purple-900/30 border border-purple-500/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400 transition"
              :disabled="loading"
            >
              <option value="estudiante">Estudiante</option>
              <option value="bibliotecario">Bibliotecario</option>
              <option value="revisor">Revisor</option>
            </select>
          </div>

          <div v-if="['estudiante', 'bibliotecario'].includes(formData.rol)">
            <label class="block text-purple-300 text-sm mb-2">
              DNI / Cédula <span class="text-red-400">*</span>
            </label>
            <input
              v-model="formData.dni"
              type="text"
              placeholder="12345678"
              class="w-full bg-purple-900/30 border border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition"
              required
              maxlength="8"
              pattern="\d*" 
              title="Solo números"
              :disabled="loading"
              @input="formData.dni = formData.dni.replace(/[^0-9]/g, '').slice(0, 8)" 
            />
          </div>

          <div v-if="formData.rol === 'bibliotecario'">
            <label class="block text-purple-300 text-sm mb-2">
              Teléfono de Contacto <span class="text-red-400">*</span>
            </label>
            <input
              v-model="formData.telefono"
              type="tel"
              placeholder="987654321"
              class="w-full bg-purple-900/30 border border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition"
              required
              :disabled="loading"
            />
          </div>

          <div class="col-span-1 sm:col-span-2">
            <label class="block text-purple-300 text-sm mb-2">Correo electrónico</label>
            <input 
              v-model="formData.correo" 
              type="email" 
              placeholder="tucorreo@gmail.com" 
              class="w-full bg-purple-900/30 border border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition" 
              required 
              :disabled="loading" 
            />
          </div>

          <template v-if="formData.rol === 'estudiante'">
            <div class="relative">
              <label class="block text-purple-300 text-sm mb-2">Contraseña</label>
              <input
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••••"
                class="w-full bg-purple-900/30 border border-purple-500/50 rounded-lg px-4 py-3 pr-10 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition"
                required
                :class="{ 'border-red-500/70': passwordError }"
                :disabled="loading"
              />
              <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-[39px] text-purple-300 hover:text-purple-100 transition" :disabled="loading">
                <component :is="showPassword ? EyeOff : Eye" :size="20" />
              </button>
            </div>

            <div class="relative">
              <label class="block text-purple-300 text-sm mb-2">Repetir Contraseña</label>
              <input
                v-model="formData.passwordConfirm"
                :type="showPasswordConfirm ? 'text' : 'password'"
                placeholder="••••••••••"
                class="w-full bg-purple-900/30 border border-purple-500/50 rounded-lg px-4 py-3 pr-10 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition"
                required
                :class="{ 'border-red-500/70': passwordError }"
                :disabled="loading"
              />
              <button type="button" @click="showPasswordConfirm = !showPasswordConfirm" class="absolute right-3 top-[39px] text-purple-300 hover:text-purple-100 transition" :disabled="loading">
                <component :is="showPasswordConfirm ? EyeOff : Eye" :size="20" />
              </button>
            </div>
            
            <p v-if="passwordError" class="col-span-1 sm:col-span-2 text-red-400 text-sm mt-0 -mb-3">
              {{ passwordError }}
            </p>
          </template>

          <div 
            v-if="formData.rol !== 'estudiante'" 
            class="col-span-1 sm:col-span-2 bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm rounded-lg p-3 text-center"
          >
            <p v-if="formData.rol === 'bibliotecario'">
              Tu solicitud será revisada. Nos contactaremos contigo al número proporcionado para validar tu acceso.
            </p>
            <p v-else>
              Tu solicitud de registro como '{{ formData.rol }}' será revisada por un administrador.
            </p>
          </div>

          <div class="col-span-1 sm:col-span-2 mt-2">
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-white text-purple-900 font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 hover:bg-purple-100 disabled:bg-purple-200 disabled:text-purple-600 disabled:cursor-not-allowed"
            >
              <Loader2 v-if="loading" :size="20" class="animate-spin" />
              <span v-else>
                → {{ formData.rol === 'estudiante' ? 'Registrarse' : 'Enviar Solicitud' }}
              </span>
            </button>
          </div>

          <div class="col-span-1 sm:col-span-2 text-center">
            <p class="text-purple-300 text-sm mt-3">
              ¿Ya tienes cuenta?
              <RouterLink to="/login" class="text-white font-semibold hover:text-purple-200 transition">
                Inicia sesión aquí
              </RouterLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { GraduationCap, Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-vue-next'

const router = useRouter()

// Datos del formulario
const formData = ref({
  nombres: '',
  apellidos: '',
  dni: '',        // Usado para Estudiante y Bibliotecario
  telefono: '',   // Usado solo para Bibliotecario
  rol: 'estudiante',
  correo: '',
  password: '',
  passwordConfirm: ''
})

const showPassword = ref(false)
const showPasswordConfirm = ref(false)
const loading = ref(false)
const globalError = ref(null)

// Validación de contraseñas
const passwordError = computed(() => {
  if (formData.value.rol === 'estudiante' &&
      formData.value.password && 
      formData.value.passwordConfirm &&
      formData.value.password !== formData.value.passwordConfirm) 
  {
      return 'Las contraseñas no coinciden.'
  }
  return ''
})

// Limpiar campos irrelevantes al cambiar de rol
watch(() => formData.value.rol, (newRol) => {
  globalError.value = null 
  
  if (newRol !== 'estudiante') {
    formData.value.password = ''
    formData.value.passwordConfirm = ''
  }
  
  if (newRol !== 'bibliotecario') {
    formData.value.telefono = ''
  }
  
  // Si pasamos a Revisor (que no usa DNI en este ejemplo), limpiamos DNI
  if (!['estudiante', 'bibliotecario'].includes(newRol)) {
    formData.value.dni = ''
  }
})

const handleRegister = async () => {
  globalError.value = null

  // 1. Validaciones Generales
  if (!formData.value.nombres || !formData.value.apellidos || !formData.value.correo) {
    globalError.value = 'Por favor, completa tus nombres, apellidos y correo.'
    return
  }

  // 2. Validaciones de DNI (Estudiantes y Bibliotecarios)
  if (['estudiante', 'bibliotecario'].includes(formData.value.rol)) {
      if (!formData.value.dni || formData.value.dni.length !== 8) {
          globalError.value = 'El DNI debe tener 8 dígitos válidos.'
          return
      }
  }

  // 3. Validaciones de Teléfono (Solo Bibliotecarios)
  if (formData.value.rol === 'bibliotecario') {
      if (!formData.value.telefono) {
          globalError.value = 'El teléfono es obligatorio para bibliotecarios.'
          return
      }
  }

  // 4. Validaciones de Contraseña (Solo Estudiantes)
  if (formData.value.rol === 'estudiante') {
    if (!formData.value.password || formData.value.password.length < 6) {
      globalError.value = 'La contraseña debe tener al menos 6 caracteres.'
      return
    }
    if (passwordError.value) {
      globalError.value = passwordError.value
      return
    }
  }

  loading.value = true 
  
  // Construir Payload
  const payload = {
    nombres: formData.value.nombres,
    apellidos: formData.value.apellidos,
    dni: formData.value.dni,
    telefono: formData.value.telefono, // Se envía solo si tiene valor
    correo: formData.value.correo,
    rol: formData.value.rol,
    password: formData.value.rol === 'estudiante' ? formData.value.password : null
  }

  try {
    const API_URL = import.meta.env.VITE_APP_API_URL;
    
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || 'Ocurrió un error en el registro.')
    }

    const result = await response.json()
    
    if (formData.value.rol === 'estudiante') {
      alert('¡Cuenta creada exitosamente! Por favor, inicia sesión.') 
      router.push('/login')
    } else {
      alert('¡Solicitud enviada! Tu cuenta será revisada por un administrador.')
      router.push('/')
    }

  } catch (err) {
    globalError.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.bg-header-bg {
  background-color: #11095d; 
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0; 
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
</style>