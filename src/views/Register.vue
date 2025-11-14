<template>
    <div class="min-h-screen bg-gradient-to-b from-blue-950 via-purple-900 to-blue-950 flex items-center justify-center p-4">
      <div class="w-full max-w-2xl">
        <div class="bg-blue-950/50 backdrop-blur-md border border-purple-500/30 rounded-lg p-8 shadow-2xl">
          <div class="text-center mb-8">
            <div class="flex items-center justify-center gap-2 mb-4">
              <BookOpen :size="45" class="text-purple-400" />
              <span class="text-xl font-bold text-white">Registrarse</span>
            </div>
          </div>
  
          <form @submit.prevent="handleRegister" class="grid grid-cols-2 gap-6">
            <!-- Nombres -->
            <div>
              <label class="block text-purple-300 text-sm mb-2">Nombres</label>
              <input
                v-model="formData.nombres"
                type="text"
                placeholder="Juan"
                class="w-full bg-purple-900/30 border border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition"
                required
              />
            </div>
  
            <!-- Apellidos -->
            <div>
              <label class="block text-purple-300 text-sm mb-2">Apellidos</label>
              <input
                v-model="formData.apellidos"
                type="text"
                placeholder="Pérez"
                class="w-full bg-purple-900/30 border border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition"
                required
              />
            </div>
  
            <!-- Rol -->
            <div>
              <label class="block text-purple-300 text-sm mb-2">Rol</label>
              <select
                v-model="formData.rol"
                @change="formData.password = ''; formData.passwordConfirm = ''"
                class="w-full bg-purple-900/30 border border-purple-500/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400 transition"
              >
                <option value="Estudiante">Estudiante</option>
                <option value="Docente">Docente</option>
              </select>
            </div>
  
            <!-- Correo -->
            <div>
              <label class="block text-purple-300 text-sm mb-2">Correo electrónico</label>
              <input
                v-model="formData.correo"
                type="email"
                placeholder="tucorreo@gmail.com"
                class="w-full bg-purple-900/30 border border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition"
                required
              />
            </div>
  
            <!-- Contraseña (solo estudiante) -->
            <template v-if="formData.rol === 'Estudiante'">
              <div class="relative">
                <label class="block text-purple-300 text-sm mb-2">Contraseña</label>
                <input
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••••"
                  class="w-full bg-purple-900/30 border border-purple-500/50 rounded-lg px-4 py-3 pr-10 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition"
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
  
              <div class="relative">
                <label class="block text-purple-300 text-sm mb-2">Repetir Contraseña</label>
                <input
                  v-model="formData.passwordConfirm"
                  :type="showPasswordConfirm ? 'text' : 'password'"
                  placeholder="••••••••••"
                  class="w-full bg-purple-900/30 border border-purple-500/50 rounded-lg px-4 py-3 pr-10 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition"
                  required
                />
                <button
                  type="button"
                  @click="showPasswordConfirm = !showPasswordConfirm"
                  class="absolute right-3 top-[39px] text-purple-300 hover:text-purple-100 transition"
                >
                  <component :is="showPasswordConfirm ? EyeOff : Eye" :size="20" />
                </button>
  
                <p v-if="passwordError" class="text-red-400 text-sm mt-2">
                  {{ passwordError }}
                </p>
              </div>
            </template>
  
            <!-- Botón -->
            <div class="col-span-2">
              <button
                type="submit"
                class="w-full bg-white text-purple-900 font-semibold py-3 rounded-lg hover:bg-purple-100 transition flex items-center justify-center gap-2"
              >
                <span v-if="formData.rol === 'Estudiante'">→ Registrarse</span>
                <span v-else>→ Enviar Solicitud</span>
              </button>
            </div>
  
            <!-- Enlaces -->
            <div class="col-span-2 text-center">
              <p class="text-purple-300 text-sm mt-2">
                ¿Ya tienes cuenta?
                <RouterLink
                  to="/login"
                  class="text-white font-semibold hover:text-purple-200 transition"
                >
                  Inicia sesión aquí
                </RouterLink>
              </p>
  
              <RouterLink
                to="/"
                class="w-full mt-4 border border-purple-500/50 text-purple-300 hover:text-white hover:border-purple-400 py-3 rounded-lg transition block text-center"
              >
                Volver al inicio
              </RouterLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { RouterLink, useRouter } from 'vue-router'
  import { BookOpen, Eye, EyeOff } from 'lucide-vue-next'
  
  const router = useRouter()
  const formData = ref({
    nombres: '',
    apellidos: '',
    rol: 'Estudiante',
    correo: '',
    password: '',
    passwordConfirm: ''
  })
  
  const showPassword = ref(false)
  const showPasswordConfirm = ref(false)
  
  const passwordError = computed(() => {
    if (formData.value.rol === 'Estudiante') {
      if (formData.value.password && formData.value.passwordConfirm) {
        if (formData.value.password !== formData.value.passwordConfirm) {
          return 'Las contraseñas no coinciden'
        }
      }
    }
    return ''
  })
  
  const handleRegister = () => {
    if (formData.value.rol === 'Estudiante') {
      if (formData.value.password !== formData.value.passwordConfirm) {
        alert('Las contraseñas no coinciden')
        return
      }
      if (formData.value.password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres')
        return
      }
    }
  
    console.log('Register:', { ...formData.value })
  
    if (formData.value.rol === 'Estudiante') {
      alert('¡Cuenta creada exitosamente!')
    } else {
      alert('¡Solicitud enviada! Espera la confirmación del administrador.')
    }
  }
  </script>