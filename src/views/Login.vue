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
        class="w-full max-w-md animate-fade-in-up" 
        style="animation-delay: 100ms;"
      >
        <div class="bg-blue-950/50 backdrop-blur-md border border-purple-500/30 rounded-lg p-8 shadow-2xl">
          
          <div class="text-center mb-8">
            <RouterLink to="/" class="flex items-center justify-center gap-3 text-white/80 hover:text-white transition-colors duration-300 mb-4">
              <GraduationCap :size="36" class="text-blue-400" />
              <span class="text-3xl font-bold">LibroHub</span>
            </RouterLink>
            <h2 class="text-2xl font-semibold text-white">
              Iniciar Sesión
            </h2>
          </div>
  
          <form @submit.prevent="handleLogin" class="space-y-6">
            
            <div 
              v-if="error" 
              id="form-error"
              aria-live="polite"
              class="bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-lg p-3 text-center animate-fade-in"
            >
              {{ error }}
            </div>
  
            <div>
              <label class="block text-purple-300 text-sm mb-2">Correo electrónico</label>
              <input
                v-model="formData.email"
                type="email"
                placeholder="tucorreo@gmail.com"
                class="w-full bg-purple-900/30 border border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition"
                required
                :disabled="loading"
                aria-describedby="form-error" 
              />
            </div>
  
            <div class="relative">
              <label class="block text-purple-300 text-sm mb-2">Contraseña</label>
              
              <div class="relative">
                <input
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••••"
                  class="w-full bg-purple-900/30 border border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition"
                  required
                  :disabled="loading"
                  aria-describedby="form-error"
                />
                <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-purple-100 transition"
                    :disabled="loading"
                  >
                    <component :is="showPassword ? EyeOff : Eye" :size="20" />
                  </button>
              </div>
              
              <RouterLink to="#" class="block text-right text-purple-300 hover:text-purple-100 text-sm transition mt-2">
                ¿La olvidaste?
              </RouterLink>
            </div>
  
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-white text-purple-900 font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2
                     hover:bg-purple-100
                     disabled:bg-purple-200 disabled:text-purple-600 disabled:cursor-not-allowed"
            >
              <Loader2 v-if="loading" :size="20" class="animate-spin" />
              <span v-else>→ Iniciar sesión</span>
            </button>
          </form>
  
          <p class="text-center text-purple-300 text-sm mt-6">
            ¿No tienes cuenta?
            <RouterLink 
              to="/register"
              class="text-white font-semibold hover:text-purple-200 transition"
            >
              Registrate aquí
            </RouterLink>
          </p>
  
          </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { RouterLink, useRouter } from 'vue-router'
  import { GraduationCap, EyeOff, Eye, Loader2, ArrowLeft } from 'lucide-vue-next'
  
  const router = useRouter()
  const formData = ref({
    email: '',
    password: ''
  })
  
  const showPassword = ref(false)
  const loading = ref(false)
  const error = ref(null)

  // --- INICIO DE CAMBIOS ---

  /**
   * Decodifica un JWT (JSON Web Token) para leer su payload.
   * No verifica la firma, solo lee los datos.
   * @param {string} token El token JWT
   * @returns {object | null} El payload decodificado o null si falla.
   */
  const decodeJwt = (token) => {
    try {
      const base64Url = token.split('.')[1]; // Obtiene el payload
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Error al decodificar el JWT:", e);
      return null;
    }
  }
  
  const handleLogin = async () => {
    error.value = null
  
    if (!formData.value.email || !formData.value.password) {
      error.value = 'Por favor, completa todos los campos.'
      return
    }
  
    loading.value = true
  
    const payload = {
      email: formData.value.email,
      password: formData.value.password
    }

    try {
      const API_URL = import.meta.env.VITE_APP_API_URL;
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Error al iniciar sesión. Verifica tus credenciales.')
      }

      const data = await response.json() 
      
      // 1. Guardar el token
      localStorage.setItem('user_token', data.access_token)
      
      // 2. Decodificar el token para leer el ROL
      const tokenPayload = decodeJwt(data.access_token)

      // 3. Redirigir basado en el ROL
      if (tokenPayload && tokenPayload.rol === 'estudiante') {
        console.log('Login Exitoso (Estudiante), redirigiendo a /market');
        router.push('/market'); // <-- ¡REDIRECCIÓN A MARKET!

      } else if (tokenPayload && (tokenPayload.rol === 'bibliotecario' || tokenPayload.rol === 'revisor')) {
        // (A futuro) Redirección para otros roles
        console.log('Login Exitoso (Admin/Revisor), redirigiendo a /dashboard');
        router.push('/dashboard'); // (Ejemplo: llévalos a un dashboard admin)

      } else {
        // Fallback si el rol no se reconoce
        console.log('Login Exitoso (Rol desconocido), redirigiendo a /');
        router.push('/') 
      }
  
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  // --- FIN DE CAMBIOS ---
  </script>