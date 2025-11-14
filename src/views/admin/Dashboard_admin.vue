<template>
    <div class="min-h-screen flex bg-[#f2f2f2]">
      <!-- SIDEBAR -->
      <aside class="w-20 bg-[#000037] flex flex-col items-center py-5 gap-4">
        <!-- logo -->
        <div
          class="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center text-white text-lg font-bold"
        >
          🎓
        </div>
  
        <!-- flecha lateral -->
        <button
          class="w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-white transition"
          aria-label="Contraer"
        >
          <Icon name="chevron-left" size="20" />
        </button>
  
        <!-- icono: casa -->
        <button
          class="w-10 h-10 rounded-xl flex items-center justify-center text-white/85 hover:bg-white/10 transition"
          aria-label="Inicio"
        >
          <Icon name="home" size="24" />
        </button>
  
        <!-- icono: libro -->
        <button
          class="w-10 h-10 rounded-xl flex items-center justify-center text-white/80 hover:bg-white/10 transition"
          aria-label="Libros"
        >
          <Icon name="book-open" size="24" />
        </button>
  
        <!-- icono: archivo -->
        <button
          class="w-10 h-10 rounded-xl flex items-center justify-center text-white/80 hover:bg-white/10 transition"
          aria-label="Archivos"
        >
          <Icon name="file-text" size="24" />
        </button>
  
        <!-- espacio flexible -->
        <div class="flex-1"></div>
  
        <!-- icono: perfil (activo) -->
        <button
          class="w-10 h-10 rounded-xl flex items-center justify-center bg-[#4626d0] text-white shadow-md transition"
          aria-label="Perfil"
        >
          <Icon name="user-circle" size="24" />
        </button>
      </aside>
  
      <!-- MAIN -->
      <div class="flex-1 flex flex-col">
        <!-- top bar -->
        <header class="h-14 bg-white flex items-center justify-between px-6 border-b">
          <p class="text-sm text-gray-500">
            Gestor / <span class="text-gray-900 font-medium">Usuarios</span>
          </p>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-[#000037]"></div>
            <div class="text-right leading-tight">
              <p class="text-sm font-medium text-gray-900">Juan Carlos</p>
              <p class="text-xs text-gray-400">Administrador</p>
            </div>
          </div>
        </header>
  
        <!-- franja superior -->
        <div
          class="h-24 bg-gradient-to-r from-[#4626d0] via-[#341caa] to-[#231383] text-white px-6 flex flex-col justify-center"
        >
          <h1 class="text-xl font-semibold">Gestión de Usuarios</h1>
          <p class="text-sm text-white/90">Administra los usuarios de la biblioteca: estudiantes y bibliotecarios.</p>
        </div>
  
        <!-- contenido centrado -->
        <main class="flex-1 bg-[#f2f2f2] px-6 py-8">
          <div class="grid grid-cols-1 gap-4">
            <!-- Botón Agregar Usuario -->
            <div class="flex justify-start mb-4">
              <button
                class="px-6 py-2 rounded-lg bg-[#4626d0] text-white text-sm font-semibold hover:bg-[#341caa] transition"
              >
                + Agregar usuario
              </button>
            </div>
  
            <!-- Tabla de Usuarios -->
            <div class="overflow-x-auto bg-white shadow-sm rounded-2xl">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">NOMBRE</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">EMAIL</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">ROL</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">FECHA CREACIÓN</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">ACCIONES</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  <tr>
                    <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">cris7294</td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">cris_6_2012@hotmail.com</td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Estudiante</td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">2025-11-31</td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      <button class="px-4 py-2 bg-[#4626d0] text-white text-xs rounded-lg hover:bg-[#341caa] transition">Editar</button>
                      <button class="px-4 py-2 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition ml-2">Eliminar</button>
                    </td>
                  </tr>
                  <tr>
                    <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">gus7294</td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">cris21pachas@gmail.com</td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Bibliotecario</td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">2025-11-15</td>
                    <td class="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      <button class="px-4 py-2 bg-[#4626d0] text-white text-xs rounded-lg hover:bg-[#341caa] transition">Editar</button>
                      <button class="px-4 py-2 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition ml-2">Eliminar</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  </script>