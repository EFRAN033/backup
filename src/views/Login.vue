<template>
    <div class="min-h-screen bg-header-bg flex items-center justify-center p-4 relative pt-24 pb-12">
      
      <header class="fixed top-0 left-0 right-0 bg-header-bg border-b border-white/10 shadow-lg z-10">
        <div class="container mx-auto flex items-center justify-between py-4 px-6">
          <RouterLink 
            to="/"
            class="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200"
            aria-label="Volver al inicio"
          >
            <ArrowLeft :size="20" />
            <span class="text-sm hidden sm:block">Volver</span>
          </RouterLink>
          
          <h1 class="text-lg font-semibold text-white">
            Iniciar Sesión
          </h1>
          
          <div class="w-20 sm:w-28"></div> 
        </div>
      </header>
      <div 
        class="w-full max-w-md animate-fade-in-up" 
        style="animation-delay: 100ms;"
      >
        <div class="bg-blue-950/50 backdrop-blur-md border border-purple-500/30 rounded-lg p-8 shadow-2xl">
          
          <div class="text-center mb-8">
            <RouterLink to="/" class="flex items-center justify-center gap-3 text-white/80 hover:text-white transition-colors duration-300">
              <GraduationCap :size="36" class="text-blue-400" />
              <span class="text-2xl font-bold">LibroHub</span>
            </RouterLink>
            </div>
  
          <form @submit.prevent="handleLogin" class="space-y-6">
            
            <div v-if="error" class="bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-lg p-3 text-center">
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
              />
            </div>
  
            <div class="relative">
              <div class="flex justify-between items-center mb-2">
                <label class="block text-purple-300 text-sm">Contraseña</label>
                <RouterLink to="#" class="text-purple-300 hover:text-purple-100 text-sm transition">
                  ¿La olvidaste?
                </RouterLink>
              </div>
              <input
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••••"
                class="w-full bg-purple-900/30 border border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition"
                required
                :disabled="loading"
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
  // Importamos los iconos nuevos
  import { GraduationCap, EyeOff, Eye, Loader2, ArrowLeft } from 'lucide-vue-next'
  
  const router = useRouter()
  const formData = ref({
    email: '',
    password: ''
  })
  
  const showPassword = ref(false)
  const loading = ref(false)
  const error = ref(null)
  
  const handleLogin = () => {
    loading.value = true
    error.value = null
  
    // Simulación de llamada a API
    setTimeout(() => {
      try {
        if (formData.value.password === 'password') {
          throw new Error('Correo o contraseña incorrectos.')
        }
        
        console.log('Login Exitoso:', formData.value)
        router.push('/') 
  
      } catch (err) {
        error.value = err.message
      } finally {
        loading.value = false
      }
    }, 1500)
  }
  </script>