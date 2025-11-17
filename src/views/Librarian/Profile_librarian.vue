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
                <div class="w-full h-full rounded-full overflow-hidden bg-slate-100 relative">
                  <img
                    :src="profileImage"
                    alt="Foto de perfil"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  <label class="absolute inset-0 bg-slate-900/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300 backdrop-blur-sm">
                    <Camera :size="32" class="text-white mb-2" />
                    <span class="text-white text-xs font-semibold tracking-wide">CAMBIAR FOTO</span>
                    <input type="file" class="hidden" @change="onImageChange" accept="image/*" />
                  </label>
                </div>
              </div>
            </div>

            <div class="mt-6 text-center">
              <h2 class="text-xl font-bold text-slate-900">{{ firstName }} {{ lastName }}</h2>
              <p class="text-sm text-slate-400 mt-1 font-medium">Coordinador de Recursos Digitales</p>
              
              <div class="mt-4 flex flex-col gap-2 items-center">
                <span class="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold tracking-wide uppercase border border-emerald-100">
                  <ShieldCheck :size="14" class="mr-1" />
                  Personal Activo
                </span>
              </div>
            </div>
          </div>

          <div class="lg:w-2/3">
            <form @submit.prevent="saveProfile" class="space-y-8">
              
              <div>
                <h3 class="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                  <User :size="20" class="text-indigo-500" />
                  Datos del Personal
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div class="group">
                    <label class="label-text">Nombres</label>
                    <input v-model="firstName" type="text" class="input-normal" />
                  </div>
                  <div class="group">
                    <label class="label-text">Apellidos</label>
                    <input v-model="lastName" type="text" class="input-normal" />
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="group">
                    <label class="label-text">DNI / Cédula</label>
                    <div class="relative">
                      <IdCard :size="18" class="input-icon-svg" />
                      <input v-model="dni" type="text" class="input-con-icono" />
                    </div>
                  </div>
                  <div class="group">
                    <label class="label-text">Teléfono de Contacto</label>
                     <div class="relative">
                      <Phone :size="18" class="input-icon-svg" />
                      <input v-model="phone" type="tel" class="input-con-icono" />
                    </div>
                  </div>
                </div>
              </div>

              <hr class="border-slate-100" />

              <div>
                <h3 class="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                  <Building2 :size="20" class="text-indigo-500" />
                  Afiliación Institucional
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label class="label-text">Código de Personal</label>
                    <div class="relative">
                      <Badge :size="18" class="absolute left-4 top-3.5 text-slate-400" />
                      <input type="text" value="BIB-2024-8842" disabled class="input-disabled-icon" />
                    </div>
                  </div>
                  
                  <div>
                    <label class="label-text">Área Asignada</label>
                    <div class="relative">
                      <Library :size="18" class="absolute left-4 top-3.5 text-slate-400" />
                      <input type="text" value="Biblioteca Central - Humanidades" disabled class="input-disabled-icon" />
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-6">
                   <div>
                    <label class="label-text">Correo Institucional</label>
                    <div class="relative">
                      <Mail :size="18" class="absolute left-4 top-3.5 text-slate-400" />
                      <input type="email" value="j.carlos@institucion.edu.pe" disabled class="input-disabled-icon" />
                    </div>
                  </div>

                   <div>
                    <label class="label-text">Permisos de Sistema</label>
                    <div class="relative">
                      <Lock :size="18" class="absolute left-4 top-3.5 text-slate-400" />
                      <input type="text" value="Gestión de Préstamos & Repositorio Digital (Nivel 2)" disabled class="input-disabled-icon" />
                    </div>
                  </div>
                </div>

              </div>

              <div class="pt-6 flex items-center gap-4">
                <button type="submit" class="btn-primary">
                  <Save :size="18" />
                  Guardar Cambios
                </button>
                <button type="button" class="btn-secondary">
                  Cancelar
                </button>
              </div>

            </form>
          </div>

        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar_librarian from './Sidebar_librarian.vue'
import { 
  Camera, User, Mail, Building2, ShieldCheck, Save, 
  IdCard, Phone, Badge, Library, Lock 
} from 'lucide-vue-next'

const firstName = ref('Juan Carlos')
const lastName = ref('Pérez Gómez')
const dni = ref('45892301')
const phone = ref('987 654 321')
const profileImage = ref('https://api.dicebear.com/7.x/avataaars/svg?seed=Juan')

const onImageChange = (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => { profileImage.value = ev.target.result }
  reader.readAsDataURL(file)
}

const saveProfile = () => {
  alert('Perfil actualizado correctamente')
}
</script>

<style scoped>
/* ESTILOS CORREGIDOS */

/* Label común para no repetir */
.label-text {
  @apply block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2;
}

/* Icono SVG dentro del input */
.input-icon-svg {
  @apply absolute left-4 top-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors;
}

/* 1. Input NORMAL (Sin icono) */
.input-normal {
  @apply w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300;
}

/* 2. Input CON ICONO (Con Padding Left Grande) */
.input-con-icono {
  @apply w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-slate-700 font-medium focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300;
  /* pl-12 equivale a 3rem (48px), espacio suficiente para el icono */
}

/* 3. Input DESHABILITADO CON ICONO */
.input-disabled-icon {
  @apply w-full bg-slate-50 border border-transparent rounded-xl pl-12 pr-4 py-3 text-slate-500 font-medium cursor-not-allowed select-none;
}

/* Botones */
.btn-primary {
  @apply px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2;
}
.btn-secondary {
  @apply px-6 py-3 text-slate-500 font-bold hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-300;
}
</style>