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
          class="w-10 h-10 rounded-xl flex items-center justify-center text-white/85 bg-white/10 transition"
          aria-label="Inicio"
        >
          <Icon name="home" size="24" />
        </router-link>
  
        <!-- icono: libro -->
        <router-link to="/bibliotecario/gestion-libros"
          class="w-10 h-10 rounded-xl flex items-center justify-center text-white/80 hover:bg-white/10 transition"
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
          <h1 class="text-xl font-semibold">Bienvenido al Dashboard</h1>
          <p class="text-sm text-white/90">Aquí encontrarás estadísticas clave sobre los libros y los alquileres.</p>
        </div>
  
        <!-- contenido centrado -->
        <main class="flex-1 bg-[#f2f2f2] px-6 py-8">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
            <!-- Total de Libros -->
            <div class="rounded-xl border bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Total de Libros</h3>
                <Icon name="book-open" size="24" class="text-purple-500" />
              </div>
              <p class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{{ totalLibros }}</p>
            </div>
  
            <!-- Libros Alquilados -->
            <div class="rounded-xl border bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Libros Alquilados</h3>
                <Icon name="shopping-cart" size="24" class="text-blue-500" />
              </div>
              <p class="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{{ librosAlquilados }}</p>
            </div>
  
            <!-- Libros más alquilados -->
            <div class="rounded-xl border bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Libros más alquilados</h3>
              </div>
              <ul class="mt-4 text-sm text-gray-700 dark:text-gray-400">
                <li>1. Matemática 3° Secundaria</li>
                <li>2. Diccionario de Ciencias</li>
                <li>3. Física para Todos</li>
              </ul>
            </div>
          </div>
  
          <!-- Gráfico -->
          <div class="mt-8 bg-white p-5 rounded-xl shadow-sm dark:bg-gray-800">
            <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Libros Alquilados por Mes</h3>
            <div class="mt-4 h-64">
              <!-- Aquí agregamos el gráfico (puede ser cualquier librería de gráficos, ejemplo: Chart.js) -->
              <Bar :data="chartData" :options="chartOptions" />
            </div>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  import Icon from '@/components/Icon.vue'
  
  // Registrar las partes de Chart.js
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  const totalLibros = ref(3)
  const librosAlquilados = ref(2)
  
  const chartData = computed(() => ({
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Libros Alquilados',
        backgroundColor: '#4626d0',
        data: [1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0], // Datos estáticos
      },
    ],
  }))
  
  const chartOptions = computed(() => ({
    responsive: true,
    maintainAspectRatio: false,
  }))
  </script>