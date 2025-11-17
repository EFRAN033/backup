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
        <router-link to="/login"
          class="w-10 h-10 rounded-xl flex items-center justify-center text-white/85 hover:bg-white/10 transition"
          aria-label="Inicio"
        >
          <Icon name="home" size="24" />
        </router-link>
  
        <!-- icono: libro -->
        <router-link to="/bibliotecario/gestion-libros"
          class="w-10 h-10 rounded-xl flex items-center justify-center bg-white/10 text-white transition"
          aria-label="Libros"
        >
          <Icon name="book-open" size="24" />
        </router-link>
  
        <!-- icono: archivo -->
        <router-link to="/bibliotecario/alquileres"
          class="w-10 h-10 rounded-xl flex items-center justify-center text-white/80 hover:bg-white/10 transition"
          aria-label="Archivos"
        >
          <Icon name="file-text" size="24" />
        </router-link>
  
        <!-- espacio flexible -->
        <div class="flex-1"></div>
  
        <!-- icono: perfil -->
        <router-link to="/bibliotecario/profile"
          class="w-10 h-10 rounded-xl flex items-center justify-center text-white/80 hover:bg-white/10 transition"
          aria-label="Perfil"
        >
          <Icon name="user-circle" size="24" />
        </router-link>
      </aside>
  
      <!-- MAIN -->
      <div class="flex-1 flex flex-col">
        <!-- top bar -->
        <header class="h-14 bg-white flex items-center justify-between px-6 border-b">
          <p class="text-sm text-gray-500">
            Gestor / <span class="text-gray-900 font-medium">Libros</span>
          </p>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-[#000037]"></div>
            <div class="text-right leading-tight">
              <p class="text-sm font-medium text-gray-900">Juan Carlos</p>
              <p class="text-xs text-gray-400">Ejecutivo - I.E. José Faustino Sánchez Carrión</p>
            </div>
          </div>
        </header>
  
        <!-- franja superior -->
        <div
          class="h-24 bg-gradient-to-r from-[#4626d0] via-[#341caa] to-[#231383] text-white px-6 flex flex-col justify-center"
        >
          <h1 class="text-xl font-semibold">Gestión de Libros</h1>
          <p class="text-sm text-white/90">Inventario para préstamos: ubicación, stock y datos bibliográficos.</p>
        </div>
  
        <!-- contenido centrado -->
        <main class="flex-1 bg-[#f2f2f2] px-6 py-8">
          <!-- Filtros y Búsqueda -->
          <div class="flex justify-between items-center mb-6">
            <button
              class="px-6 py-2 rounded-lg bg-[#4626d0] text-white text-sm font-semibold hover:bg-[#341caa] transition"
            >
              + Agregar libro
            </button>
            <div class="flex gap-4">
              <select class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4626d0]">
                <option>Categoria</option>
                <option>Textos escolares</option>
                <option>Referencias</option>
              </select>
              <select class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4626d0]">
                <option>Disponibilidad</option>
                <option>Disponibles</option>
                <option>No disponibles</option>
              </select>
              <input
                type="text"
                placeholder="Buscar por título, autor o editorial"
                class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4626d0]"
              />
            </div>
          </div>
  
          <!-- Tarjetas de libros -->
          <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
            <!-- Tarjeta de libro -->
            <div class="bg-white rounded-2xl shadow-sm p-5">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-gray-700">Matemática 3° Secundaria</h3>
                <span class="bg-[#4626d0] text-white px-4 py-1 rounded-full text-xs font-semibold">2023</span>
              </div>
              <div class="text-sm text-gray-500">Editorial: MINEDU</div>
              <div class="text-sm text-gray-500">Autor: Ministerio de Educación del Perú</div>
              <div class="text-sm text-gray-500">ISBN: 978-612-00-0001</div>
              <div class="mt-4">
                <div class="flex gap-2">
                  <span class="bg-[#4626d0] text-white text-xs rounded-full px-3 py-1">Textos escolares</span>
                  <span class="bg-[#4626d0] text-white text-xs rounded-full px-3 py-1">A3-12</span>
                </div>
                <div class="flex gap-2 mt-2">
                  <span class="bg-[#4626d0] text-white text-xs rounded-full px-3 py-1">Disponibles: 12</span>
                  <span class="bg-[#4626d0] text-white text-xs rounded-full px-3 py-1">Total: 20</span>
                </div>
              </div>
              <div class="mt-4 flex justify-between gap-2">
                <!-- Botones con bordes de colores -->
                <button
                  class="px-4 py-2 border-2 border-[#4626d0] text-[#4626d0] text-xs rounded-lg hover:bg-[#4626d0] hover:text-white transition"
                >
                  Editar
                </button>
                <button
                  class="px-4 py-2 border-2 border-red-500 text-red-500 text-xs rounded-lg hover:bg-red-500 hover:text-white transition"
                >
                  Eliminar
                </button>
                <button
                  class="px-4 py-2 border-2 border-green-500 text-green-500 text-xs rounded-lg hover:bg-green-500 hover:text-white transition"
                >
                  Prestar
                </button>
              </div>
            </div>
  
            <!-- Tarjeta de libro -->
            <div class="bg-white rounded-2xl shadow-sm p-5">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-gray-700">Diccionario de Ciencias</h3>
                <span class="bg-[#4626d0] text-white px-4 py-1 rounded-full text-xs font-semibold">2021</span>
              </div>
              <div class="text-sm text-gray-500">Editorial: Alfa</div>
              <div class="text-sm text-gray-500">Autor: A. Salazar</div>
              <div class="text-sm text-gray-500">ISBN: 978-612-00-0001</div>
              <div class="mt-4">
                <div class="flex gap-2">
                  <span class="bg-[#4626d0] text-white text-xs rounded-full px-3 py-1">Referencia</span>
                  <span class="bg-[#4626d0] text-white text-xs rounded-full px-3 py-1">B1-04</span>
                </div>
                <div class="flex gap-2 mt-2">
                  <span class="bg-[#4626d0] text-white text-xs rounded-full px-3 py-1">Disponibles: 12</span>
                  <span class="bg-[#4626d0] text-white text-xs rounded-full px-3 py-1">Total: 20</span>
                </div>
              </div>
              <div class="mt-4 flex justify-between gap-2">
                <!-- Botones con bordes de colores -->
                <button
                  class="px-4 py-2 border-2 border-[#4626d0] text-[#4626d0] text-xs rounded-lg hover:bg-[#4626d0] hover:text-white transition"
                >
                  Editar
                </button>
                <button
                  class="px-4 py-2 border-2 border-red-500 text-red-500 text-xs rounded-lg hover:bg-red-500 hover:text-white transition"
                >
                  Eliminar
                </button>
                <button
                  class="px-4 py-2 border-2 border-green-500 text-green-500 text-xs rounded-lg hover:bg-green-500 hover:text-white transition"
                >
                  Prestar
                </button>
              </div>
            </div>
  
            <!-- Tarjeta de libro -->
            <div class="bg-white rounded-2xl shadow-sm p-5">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold text-gray-700">Historia del Perú</h3>
                <span class="bg-[#4626d0] text-white px-4 py-1 rounded-full text-xs font-semibold">2023</span>
              </div>
              <div class="text-sm text-gray-500">Editorial: Andina</div>
              <div class="text-sm text-gray-500">Autor: V. Rossi</div>
              <div class="text-sm text-gray-500">ISBN: 978-612-00-0001</div>
              <div class="mt-4">
                <div class="flex gap-2">
                  <span class="bg-[#4626d0] text-white text-xs rounded-full px-3 py-1">Historia</span>
                  <span class="bg-[#4626d0] text-white text-xs rounded-full px-3 py-1">A3-12</span>
                </div>
                <div class="flex gap-2 mt-2">
                  <span class="bg-[#4626d0] text-white text-xs rounded-full px-3 py-1">Disponibles: 12</span>
                  <span class="bg-[#4626d0] text-white text-xs rounded-full px-3 py-1">Total: 20</span>
                </div>
              </div>
              <div class="mt-4 flex justify-between gap-2">
                <!-- Botones con bordes de colores -->
                <button
                  class="px-4 py-2 border-2 border-[#4626d0] text-[#4626d0] text-xs rounded-lg hover:bg-[#4626d0] hover:text-white transition"
                >
                  Editar
                </button>
                <button
                  class="px-4 py-2 border-2 border-red-500 text-red-500 text-xs rounded-lg hover:bg-red-500 hover:text-white transition"
                >
                  Eliminar
                </button>
                <button
                  class="px-4 py-2 border-2 border-green-500 text-green-500 text-xs rounded-lg hover:bg-green-500 hover:text-white transition"
                >
                  Prestar
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import Icon from '@/components/Icon.vue'
  </script>