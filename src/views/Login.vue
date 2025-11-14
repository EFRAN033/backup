<template>
    <div class="min-h-screen bg-gradient-to-b from-blue-950 via-purple-900 to-blue-950 flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <div class="bg-blue-950/50 backdrop-blur-md border border-purple-500/30 rounded-lg p-8 shadow-2xl">
          <div class="text-center mb-8">
            <div class="flex items-center justify-center gap-2 mb-4">
              <BookOpen :size="45" class="text-purple-400" />
              <span class="text-xl font-bold text-white">Iniciar sesión</span>
            </div>
          </div>
  
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <label class="block text-purple-300 text-sm mb-2">Correo electrónico</label>
              <input
                v-model="formData.email"
                type="email"
                placeholder="tucorreo@gmail.com"
                class="w-full bg-purple-900/30 border border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition"
                required
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
              />
              <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-[39px] text-purple-300 hover:text-purple-100 transition"
                >
                  <component :is="showPassword ? EyeOff : Eye" :size="20" />
                </button>
              
            </div>
  
            <button
              type="submit"
              class="w-full bg-white text-purple-900 font-semibold py-3 rounded-lg hover:bg-purple-100 transition flex items-center justify-center gap-2"
            >
              → Iniciar sesión
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
  
          <RouterLink
            to="/"
            class="w-full mt-6 border border-purple-500/50 text-purple-300 hover:text-white hover:border-purple-400 py-3 rounded-lg transition block text-center"
          >
            Volver al inicio
          </RouterLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { RouterLink, useRouter } from 'vue-router'
  import { BookOpen, EyeOff, Eye } from 'lucide-vue-next'
  
  const router = useRouter()
  const formData = ref({
    email: '',
    password: ''
  })
  
  const showPassword = ref(false)
  
  const handleLogin = () => {
    console.log('Login:', formData.value)
    alert(`Bienvenido ${formData.value.email}`)
    // Aquí irá la lógica de autenticación real
    // router.push('/dashboard')
  }
  </script>