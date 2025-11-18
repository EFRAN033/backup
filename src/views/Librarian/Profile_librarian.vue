<template>
  <div class="min-h-screen flex bg-[#FAFAFA] font-sans text-slate-600">
    
    <Sidebar_librarian />

    <div class="flex-1 flex flex-col relative">
      
      <header class="h-24 flex items-center justify-between px-12 bg-transparent">
        <div class="flex flex-col">
          <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Perfil del Colaborador</h1>
          <nav class="flex gap-2 text-sm mt-1">
            <span class="text-slate-400">Gestión Bibliotecaria</span>
            <span class="text-slate-300">/</span>
            <span class="text-indigo-600 font-medium">Mi Cuenta</span>
          </nav>
        </div>
      </header>

      <main class="flex-1 px-12 py-4 max-w-6xl w-full mx-auto">
        
        <div class="flex flex-col lg:flex-row gap-16">
          
          <div class="lg:w-1/3 flex flex-col items-center">
            <div class="relative group">
              <div class="w-48 h-48 rounded-full p-1 border-2 border-dashed border-slate-300 group-hover:border-indigo-500 transition-colors duration-300">
                <div class="w-full h-full rounded-full overflow-hidden bg-indigo-600 flex items-center justify-center text-white text-5xl font-bold uppercase relative">
                   {{ iniciales }}
                  <label class="absolute inset-0 bg-slate-900/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300 backdrop-blur-sm">
                    <Camera :size="32" class="text-white mb-2" />
                    <span class="text-white text-xs font-semibold tracking-wide">CAMBIAR FOTO</span>
                    <input type="file" class="hidden" accept="image/*" />
                  </label>
                </div>
              </div>
            </div>

            <div class="mt-6 text-center">
              <h2 class="text-xl font-bold text-slate-900 capitalize">{{ user.nombres }} {{ user.apellidos }}</h2>
              <p class="text-sm text-slate-400 mt-1 font-medium uppercase">{{ user.rol }}</p>
              
              <div class="mt-4 flex flex-col gap-2 items-center">
                <span class="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold tracking-wide uppercase border border-emerald-100">
                  <ShieldCheck :size="14" class="mr-1" />
                  {{ user.estado || 'Activo' }}
                </span>
              </div>
            </div>
          </div>

          <div class="lg:w-2/3 space-y-10">
            
            <form @submit.prevent="handleUpdateProfile">
              <h3 class="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                <User :size="20" class="text-indigo-500" />
                Datos del Personal
              </h3>
              
              <div v-if="profileMsg" class="mb-4 p-3 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-sm flex items-center gap-2">
                  <CheckCircle :size="16" /> {{ profileMsg }}
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div class="group">
                  <label class="label-text">Nombres</label>
                  <input :value="user.nombres" type="text" class="input-normal bg-slate-50" readonly />
                </div>
                <div class="group">
                  <label class="label-text">Apellidos</label>
                  <input :value="user.apellidos" type="text" class="input-normal bg-slate-50" readonly />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="group">
                  <label class="label-text">DNI / Cédula</label>
                  <div class="relative">
                    <IdCard :size="18" class="input-icon-svg" />
                    <input :value="user.dni || 'No registrado'" type="text" class="input-con-icono bg-slate-50" readonly />
                  </div>
                </div>
                
                <div class="group">
                  <label class="label-text">Teléfono de Contacto</label>
                   <div class="relative">
                    <Phone :size="18" class="input-icon-svg text-indigo-500" />
                    <input 
                      v-model="profileForm.telefono" 
                      type="tel" 
                      class="input-con-icono bg-white border-indigo-200 focus:border-indigo-500" 
                      placeholder="Ingresa tu teléfono"
                    />
                  </div>
                </div>
              </div>

              <div class="mt-6 flex justify-end">
                <button type="submit" :disabled="profileLoading" class="btn-secondary text-indigo-600 bg-indigo-50 hover:bg-indigo-100">
                  <Loader2 v-if="profileLoading" class="animate-spin mr-2" :size="18" />
                  <span v-else>Guardar Cambios</span>
                </button>
              </div>
            </form>

            <hr class="border-slate-100" />

            <div>
              <h3 class="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                <Building2 :size="20" class="text-indigo-500" />
                Afiliación Institucional
              </h3>
              
              <div class="grid grid-cols-1 gap-6">
                  <div class="group">
                  <label class="label-text">Correo Institucional</label>
                  <div class="relative">
                    <Mail :size="18" class="absolute left-4 top-3.5 text-slate-400" />
                    <input :value="user.email" type="email" disabled class="input-disabled-icon" />
                  </div>
                </div>
              </div>
            </div>

            <hr class="border-slate-100" />

            <div>
              <h3 class="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                <Lock :size="20" class="text-indigo-500" />
                Seguridad de la Cuenta
              </h3>

              <form @submit.prevent="handleChangePassword" class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                
                <div v-if="passwordMsg" class="p-3 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-sm flex items-center gap-2">
                  <CheckCircle :size="16" /> {{ passwordMsg }}
                </div>
                <div v-if="passwordError" class="p-3 bg-red-50 text-red-700 border border-red-100 rounded-lg text-sm">
                  {{ passwordError }}
                </div>

                <div class="grid grid-cols-1 gap-6">
                  <div class="group">
                    <label class="label-text">Contraseña Actual</label>
                    <div class="relative">
                      <KeyRound :size="18" class="input-icon-svg" />
                      <input v-model="passForm.current" type="password" required placeholder="Ingresa tu contraseña actual" class="input-con-icono focus:bg-white" />
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="group">
                      <label class="label-text">Nueva Contraseña</label>
                      <div class="relative">
                        <Lock :size="18" class="input-icon-svg" />
                        <input v-model="passForm.new" type="password" required placeholder="Mínimo 6 caracteres" class="input-con-icono focus:bg-white" />
                      </div>
                    </div>
                    <div class="group">
                      <label class="label-text">Confirmar Contraseña</label>
                      <div class="relative">
                        <Lock :size="18" class="input-icon-svg" />
                        <input v-model="passForm.confirm" type="password" required placeholder="Repite la nueva contraseña" class="input-con-icono focus:bg-white" />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex justify-end pt-2">
                  <button type="submit" :disabled="passwordLoading" class="btn-primary">
                    <Loader2 v-if="passwordLoading" class="animate-spin" :size="18" />
                    <span v-else>Actualizar Contraseña</span>
                  </button>
                </div>

              </form>
            </div>

          </div>

        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import Sidebar_librarian from './Sidebar_librarian.vue'
import { useUserStore } from '@/stores/user'
import { 
  Camera, User, Mail, Building2, ShieldCheck, Save, 
  IdCard, Phone, Lock, KeyRound, Loader2, CheckCircle 
} from 'lucide-vue-next'

const userStore = useUserStore()
const user = computed(() => userStore.user || {})

const iniciales = computed(() => {
  const n = user.value.nombres ? user.value.nombres.charAt(0) : ''
  const a = user.value.apellidos ? user.value.apellidos.charAt(0) : ''
  return (n + a).toUpperCase() || 'B'
})

// --- LÓGICA ACTUALIZAR PERFIL (TELÉFONO) ---
const profileForm = ref({ telefono: '' })
const profileLoading = ref(false)
const profileMsg = ref('')

// Inicializar el formulario con el teléfono actual del usuario
watch(user, (newUser) => {
    if (newUser && newUser.telefono) {
        profileForm.value.telefono = newUser.telefono
    }
}, { immediate: true })

const handleUpdateProfile = async () => {
    profileLoading.value = true
    profileMsg.value = ''
    
    try {
        const API_URL = import.meta.env.VITE_APP_API_URL
        const response = await fetch(`${API_URL}/auth/me/profile`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userStore.token}`
            },
            body: JSON.stringify({ telefono: profileForm.value.telefono })
        })

        if (!response.ok) throw new Error('Error al actualizar perfil')
        
        const data = await response.json()
        
        // Actualizar el store con los nuevos datos
        userStore.setUser(data) 
        
        profileMsg.value = 'Información actualizada correctamente'
    } catch (e) {
        console.error(e)
        alert('Error al actualizar la información')
    } finally {
        profileLoading.value = false
    }
}

// --- LÓGICA DE CAMBIO DE CONTRASEÑA ---
const passForm = ref({ current: '', new: '', confirm: '' })
const passwordLoading = ref(false)
const passwordMsg = ref('')
const passwordError = ref('')

const handleChangePassword = async () => {
  passwordMsg.value = ''
  passwordError.value = ''

  if (passForm.value.new !== passForm.value.confirm) {
    passwordError.value = 'Las nuevas contraseñas no coinciden.'
    return
  }
  if (passForm.value.new.length < 6) {
    passwordError.value = 'La nueva contraseña debe tener al menos 6 caracteres.'
    return
  }

  passwordLoading.value = true
  
  try {
    const API_URL = import.meta.env.VITE_APP_API_URL
    const response = await fetch(`${API_URL}/auth/me/password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userStore.token}`
      },
      body: JSON.stringify({
        password_actual: passForm.value.current,
        password_nueva: passForm.value.new
      })
    })

    if (!response.ok) {
       const err = await response.json()
       throw new Error(err.detail || 'Error al actualizar')
    }

    passwordMsg.value = '¡Contraseña actualizada correctamente!'
    passForm.value = { current: '', new: '', confirm: '' }

  } catch (error) {
    passwordError.value = error.message
  } finally {
    passwordLoading.value = false
  }
}
</script>

<style scoped>
.label-text {
  @apply block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1;
}

.input-icon-svg {
  @apply absolute left-4 top-3.5 text-slate-400 transition-colors;
}

.group:focus-within .input-icon-svg {
  @apply text-indigo-500;
}

.input-normal {
  @apply w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300;
}

.input-con-icono {
  @apply w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-slate-700 font-medium focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300;
}

input[readonly], input[disabled] {
  @apply bg-slate-50 text-slate-600 border-slate-200 cursor-default;
}

.input-disabled-icon {
  @apply w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-slate-500 font-medium cursor-not-allowed select-none;
}

.btn-primary {
  @apply px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-secondary {
  @apply px-6 py-2 text-slate-500 font-bold hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-300 flex items-center gap-2 disabled:opacity-50;
}
</style>