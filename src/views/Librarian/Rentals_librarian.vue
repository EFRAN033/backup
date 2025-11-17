<template>
    <div class="min-h-screen flex bg-[#f2f2f2]">
      <SidebarLibrarian />
  
      <div class="flex-1 flex flex-col">
        <header class="h-14 bg-white flex items-center justify-between px-6 border-b">
          <p class="text-sm text-gray-500">
            Gestor / <span class="text-gray-900 font-medium">Alquileres</span>
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
          <h1 class="text-xl font-semibold">Alquileres</h1>
          <p class="text-sm text-white/90">Registra préstamos y devoluciones. Controla fechas y estado.</p>
        </div>
  
        <main class="flex-1 bg-[#f2f2f2] px-6 py-8">
          <div class="flex justify-between items-center mb-6">
            <button
              class="px-6 py-2 rounded-lg bg-[#4626d0] text-white text-sm font-semibold hover:bg-[#341caa] transition"
            >
              + Nuevo Alquiler
            </button>
            <div class="flex gap-4">
              <select class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4626d0]">
                <option>Estado</option>
                <option>Activo</option>
                <option>Devuelto</option>
              </select>
              <input
                type="text"
                placeholder="Buscar por usuario o email"
                class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4626d0]"
              />
            </div>
          </div>
  
          <div class="overflow-x-auto bg-white shadow-sm rounded-xl">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-100 text-left">
                <tr>
                  <th class="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">Usuario</th>
                  <th class="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
                  <th class="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">Título</th>
                  <th class="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">Inicio</th>
                  <th class="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">Fin</th>
                  <th class="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">Estado</th>
                  <th class="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500">Acción</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr>
                  <td class="px-6 py-4 text-sm text-gray-900">cris7294</td>
                  <td class="px-6 py-4 text-sm text-gray-500">cris_6_2012@hotmail.com</td>
                  <td class="px-6 py-4 text-sm text-gray-500">Matemática 3° Secundaria</td>
                  <td class="px-6 py-4 text-sm text-gray-500">2025-10-31</td>
                  <td class="px-6 py-4 text-sm text-gray-500">2025-11-31</td>
                  <td class="px-6 py-4">
                    <span class="bg-green-100 text-green-800 text-xs rounded-full px-3 py-1">Activo</span>
                  </td>
                  <td class="px-6 py-4 flex gap-2">
                    <button class="px-4 py-2 text-xs font-semibold text-white bg-[#4626d0] rounded-lg hover:bg-[#341caa] transition">Devolver</button>
                    <button class="px-4 py-2 text-xs font-semibold text-white bg-[#11095d] rounded-lg hover:bg-[#11095d] transition">Extender</button>
                    <button class="px-4 py-2 text-xs font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition">Cancelar</button>
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 text-sm text-gray-900">gus7294</td>
                  <td class="px-6 py-4 text-sm text-gray-500">cris21pachas@gmail.com</td>
                  <td class="px-6 py-4 text-sm text-gray-500">Diccionario de Ciencias</td>
                  <td class="px-6 py-4 text-sm text-gray-500">2025-10-31</td>
                  <td class="px-6 py-4 text-sm text-gray-500">2025-11-15</td>
                  <td class="px-6 py-4">
                    <span class="bg-red-100 text-red-800 text-xs rounded-full px-3 py-1">Devuelto</span>
                  </td>
                  <td class="px-6 py-4 flex gap-2">
                    <button class="px-4 py-2 text-xs font-semibold text-white bg-[#4626d0] rounded-lg hover:bg-[#341caa] transition">Devolver</button>
                    <button class="px-4 py-2 text-xs font-semibold text-white bg-[#11095d] rounded-lg hover:bg-[#11095d] transition">Extender</button>
                    <button class="px-4 py-2 text-xs font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition">Cancelar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import SidebarLibrarian from './Sidebar_librarian.vue'
  </script>