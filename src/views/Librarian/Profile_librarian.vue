<template>
    <div class="min-h-screen flex bg-[#f2f2f2]">
      <aside class="w-20 bg-[#000037] flex flex-col items-center py-5 gap-4">
        <div
          class="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center text-white text-lg font-bold"
        >
          🎓
        </div>
  
        <button
          class="w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-white transition"
          aria-label="Contraer"
        >
          <ChevronLeft :size="20" />
        </button>
  
        <router-link to="/login"
          class="w-10 h-10 rounded-xl flex items-center justify-center text-white/85 hover:bg-white/10 transition"
          aria-label="Inicio"
        >
          <Home :size="24" />
        </router-link>
  
        <router-link to="/bibliotecario/gestion-libros"
          class="w-10 h-10 rounded-xl flex items-center justify-center text-white/80 hover:bg-white/10 transition"
          aria-label="Libros"
        >
          <BookOpen :size="24" />
        </router-link>
  
        <router-link to="/bibliotecario/alquileres"
          class="w-10 h-10 rounded-xl flex items-center justify-center text-white/80 hover:bg-white/10 transition"
          aria-label="Archivos"
        >
          <FileText :size="24" />
        </router-link>
  
        <div class="flex-1"></div>
  
        <router-link to="/bibliotecario/profile"
          class="w-10 h-10 rounded-xl flex items-center justify-center bg-[#4626d0] text-white shadow-md transition"
          aria-label="Perfil"
        >
          <UserCircle :size="24" />
        </router-link>
      </aside>
  
      <div class="flex-1 flex flex-col">
        <header class="h-14 bg-white flex items-center justify-between px-6 border-b">
          <p class="text-sm text-gray-500">
            Gestor / <span class="text-gray-900 font-medium">Perfil</span>
          </p>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-[#000037]"></div>
            <div class="text-right leading-tight">
              <p class="text-sm font-medium text-gray-900">Juan Carlos</p>
              <p class="text-xs text-gray-400">Ejecutivo - I.E. José Faustino Sánchez Carrión</p>
            </div>
          </div>
        </header>
  
        <div
          class="h-24 bg-gradient-to-r from-[#4626d0] via-[#341caa] to-[#231383] text-white px-6 flex flex-col justify-center"
        >
          <h1 class="text-xl font-semibold">Mi Perfil</h1>
          <p class="text-sm text-white/90">Revisa y actualiza tus datos personales.</p>
        </div>
  
        <main class="flex-1 bg-[#f2f2f2] px-6 py-8 flex justify-center">
          <div
            class="bg-white rounded-2xl shadow-sm w-full max-w-5xl p-8 flex gap-10 items-center justify-center"
          >
            <div class="flex flex-col items-center gap-5">
              <h2 class="text-2xl font-semibold text-gray-900">Foto de perfil</h2>
              <div
                class="w-44 h-44 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden"
              >
                <img
                  :src="profileImage"
                  alt="Foto de perfil"
                  class="w-full h-full object-cover"
                />
              </div>
              <label
                class="px-6 py-2 rounded-xl bg-[#231383] text-white text-sm font-semibold cursor-pointer hover:bg-[#11095d] transition"
              >
                Cambiar foto de perfil
                <input type="file" class="hidden" @change="onImageChange" accept="image/*" />
              </label>
            </div>
  
            <div class="w-full max-w-md space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nombres:</label>
                <input
                  v-model="firstName"
                  type="text"
                  class="w-full border border-gray-200 rounded-md bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4626d0]"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Apellidos:</label>
                <input
                  v-model="lastName"
                  type="text"
                  class="w-full border border-gray-200 rounded-md bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#4626d0]"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico:</label>
                <input
                  type="email"
                  value="juan@bibliotecario.com"
                  disabled
                  class="w-full border border-gray-200 rounded-md bg-gray-100 px-3 py-2 text-gray-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Rol:</label>
                <input
                  type="text"
                  value="Bibliotecario"
                  disabled
                  class="w-full border border-gray-200 rounded-md bg-gray-100 px-3 py-2 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  // MODIFICACIÓN: Importamos los iconos directamente de lucide-vue-next
  // en lugar de usar un componente intermedio que no existía.
  import { 
    ChevronLeft, 
    Home, 
    BookOpen, 
    FileText, 
    UserCircle 
  } from 'lucide-vue-next'
  
  const firstName = ref('Juan')
  const lastName = ref('')
  const profileImage = ref('https://via.placeholder.com/300x300.png?text=Perfil')
  
  const onImageChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      profileImage.value = ev.target.result
    }
    reader.readAsDataURL(file)
  }
  </script>