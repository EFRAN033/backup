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
              id="form-error"
              aria-live="polite"
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
                aria-describedby="form-error"
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
                aria-describedby="form-error"
              />
            </div>
  
            <div>
              <label class="block text-purple-300 text-sm mb-2">Quiero registrarme como</label>
              <select
                v-model="formData.rol"
                class="w-full bg-purple-900/30 border border-purple-500/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400 transition"
                :disabled="loading"
                aria-describedby="form-error"
              >
                <option value="estudiante">Estudiante</option>
                <option value="bibliotecario">Bibliotecario</option>
                <option value="revisor">Revisor</option>
              </select>
            </div>
  
            <div>
              <label class="block text-purple-300 text-sm mb-2">Correo electrónico</label>
              <input
                v-model="formData.correo"
                type="email"
                placeholder="tucorreo@gmail.com"
                class="w-full bg-purple-900/30 border border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition"
                required
                :disabled="loading"
                aria-describedby="form-error"
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
                  aria-describedby="form-error"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-[39px] text-purple-300 hover:text-purple-100 transition"
                  :disabled="loading"
                >
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
                  aria-describedby="form-error"
                />
                <button
                  type="button"
                  @click="showPasswordConfirm = !showPasswordConfirm"
                  class="absolute right-3 top-[39px] text-purple-300 hover:text-purple-100 transition"
                  :disabled="loading"
                >
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
              Tu solicitud de registro como '{{ formData.rol }}' será revisada por un administrador.
            </div>
  
            <div class="col-span-1 sm:col-span-2 mt-2">
              <button
                type="submit"
                :disabled="loading"
                class="w-full bg-white text-purple-900 font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2
                       hover:bg-purple-100
                       disabled:bg-purple-200 disabled:text-purple-600 disabled:cursor-not-allowed"
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
                <RouterLink
                  to="/login"
                  class="text-white font-semibold hover:text-purple-200 transition"
                >
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
  const formData = ref({
    nombres: '',
    apellidos: '',
    rol: 'estudiante',
    correo: '',
    password: '',
    passwordConfirm: ''
  })
  
  const showPassword = ref(false)
  const showPasswordConfirm = ref(false)
  const loading = ref(false)
  const globalError = ref(null)
  
  // Computada para error de contraseña
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

  // Watcher para limpiar contraseñas si el rol cambia
  watch(() => formData.value.rol, (newRol) => {
    if (newRol !== 'estudiante') {
      formData.value.password = ''
      formData.value.passwordConfirm = ''
      globalError.value = null 
    }
  })
  
  // --- LÓGICA DE ENVÍO CON FETCH Y .ENV ---
  const handleRegister = async () => {
    globalError.value = null
  
    // 1. Validación de campos comunes
    if (!formData.value.nombres || !formData.value.apellidos || !formData.value.correo) {
      globalError.value = 'Por favor, completa tus nombres, apellidos y correo.'
      return
    }

    // 2. Validación de contraseña (SOLO para estudiantes)
    if (formData.value.rol === 'estudiante') {
      if (!formData.value.password || !formData.value.passwordConfirm) {
        globalError.value = 'Por favor, completa todos los campos de contraseña.'
        return
      }
      if (formData.value.password.length < 6) {
        globalError.value = 'La contraseña debe tener al menos 6 caracteres.'
        return
      }
      if (passwordError.value) {
        globalError.value = passwordError.value + ' Por favor, corrígelas.'
        return
      }
    }

    // 3. Envío a la API
    loading.value = true 
    
    // Construimos el payload que espera el DTO de FastAPI
    const payload = {
      nombres: formData.value.nombres,
      apellidos: formData.value.apellidos,
      correo: formData.value.correo,
      rol: formData.value.rol,
      password: formData.value.rol === 'estudiante' ? formData.value.password : null
    }

    try {
      // Usamos la variable de entorno VITE_APP_API_URL
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
      console.log('Respuesta del servidor:', result.mensaje)

      // Lógica de redirección
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