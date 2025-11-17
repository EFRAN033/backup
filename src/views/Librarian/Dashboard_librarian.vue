<template>
    <div class="min-h-screen flex bg-[#FAFAFA] font-sans text-slate-600">
      
      <SidebarLibrarian />
  
      <div class="flex-1 flex flex-col relative">
        
        <header class="h-24 flex items-end justify-between px-12 pb-4 bg-transparent">
          <div>
            <h1 class="text-3xl font-bold text-slate-900 tracking-tight">Hola, Juan Carlos</h1>
            <p class="text-base text-slate-400 mt-1">Aquí está el resumen de la biblioteca hoy.</p>
          </div>
          
          <div class="flex items-center gap-6 mb-2">
            <button class="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors group">
              <Bell :size="22" />
              <span class="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#FAFAFA]"></span>
            </button>
            
            <div 
              @click="goToProfile"
              class="w-11 h-11 rounded-full overflow-hidden ring-2 ring-transparent hover:ring-indigo-100 transition-all cursor-pointer"
              title="Ver Perfil"
            >
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Juan" alt="User">
            </div>
          </div>
        </header>
  
        <main class="flex-1 px-12 py-8 max-w-[1600px] w-full">
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20 border-b border-slate-100 pb-12">
            
            <div class="flex flex-col group cursor-default">
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-indigo-50 rounded-lg text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <BookOpen :size="20" stroke-width="2.5" />
                </div>
                <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Inventario</span>
              </div>
              <div class="flex items-baseline gap-4">
                <p class="text-6xl font-bold text-slate-900 tracking-tighter">{{ totalLibros }}</p>
                <span class="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">+12 nuevos</span>
              </div>
            </div>
  
            <div class="flex flex-col md:border-l md:border-slate-100 md:pl-12 group cursor-default">
              <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-violet-50 rounded-lg text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
                  <ShoppingCart :size="20" stroke-width="2.5" />
                </div>
                <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">En Circulación</span>
              </div>
              <div class="flex items-baseline gap-4">
                <p class="text-6xl font-bold text-slate-900 tracking-tighter">{{ librosAlquilados }}</p>
                <span class="text-sm font-medium text-slate-400">libros activos</span>
              </div>
            </div>
  
            <div class="flex flex-col md:border-l md:border-slate-100 md:pl-12 group cursor-default">
               <div class="flex items-center gap-3 mb-3">
                <div class="p-2 bg-rose-50 rounded-lg text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
                  <Clock :size="20" stroke-width="2.5" />
                </div>
                <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Retrasos</span>
              </div>
               <div class="flex items-baseline gap-4">
                <p class="text-6xl font-bold text-slate-900 tracking-tighter">5</p>
                <span class="text-sm font-semibold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">Atención requerida</span>
              </div>
            </div>
          </div>
  
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            <div class="lg:col-span-8 flex flex-col">
              <div class="flex items-center justify-between mb-10">
                <div>
                  <h3 class="text-xl font-bold text-slate-900">Actividad de Préstamos</h3>
                  <p class="text-sm text-slate-400 mt-1">Comparativa mensual del año lectivo</p>
                </div>
                <select class="bg-transparent text-sm font-semibold text-indigo-600 border-none focus:ring-0 cursor-pointer hover:text-indigo-800 transition-colors py-0 pl-0 pr-8">
                  <option>Este año</option>
                  <option>Año anterior</option>
                </select>
              </div>
              <div class="flex-1 min-h-[300px]">
                <Bar :data="chartData" :options="chartOptions" />
              </div>
            </div>
  
            <div class="lg:col-span-4 flex flex-col justify-between">
              <div>
                <h3 class="text-xl font-bold text-slate-900 mb-8">Más Solicitados</h3>
                <div class="flex flex-col gap-8">
                  <div v-for="(libro, index) in topLibros" :key="index" class="flex items-start gap-5 group cursor-pointer">
                    <span class="text-3xl font-black text-slate-200 group-hover:text-indigo-600 transition-colors duration-300">
                      0{{ index + 1 }}
                    </span>
                    <div class="pt-1">
                      <p class="text-base font-bold text-slate-800 group-hover:text-indigo-900 transition-colors leading-tight mb-1">
                        {{ libro.titulo }}
                      </p>
                      <p class="text-xs font-medium text-slate-400 uppercase tracking-wide">{{ libro.categoria }}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <button 
                @click="goToRentals"
                class="mt-10 w-full py-4 flex items-center justify-center gap-2 text-sm font-bold text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300 group"
              >
                Ver catálogo completo
                <ArrowRight :size="18" class="group-hover:translate-x-1 transition-transform"/>
              </button>
            </div>
  
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  // 1. Importar useRouter
  import { useRouter } from 'vue-router'
  import SidebarLibrarian from './Sidebar_librarian.vue'
  import { Bar } from 'vue-chartjs'
  import { 
    Chart as ChartJS, 
    Title, 
    Tooltip, 
    Legend, 
    BarElement, 
    CategoryScale, 
    LinearScale 
  } from 'chart.js'
  import { BookOpen, ShoppingCart, Clock, Bell, ArrowRight } from 'lucide-vue-next'
  
  // 2. Inicializar el router
  const router = useRouter()
  
  // 3. Definir las funciones de navegación
  const goToProfile = () => {
    // Opción A: Si usas nombres de ruta (recomendado)
    router.push({ name: 'Profile_librarian' }) 
    
    // Opción B: Si usas rutas directas (descomentar si prefieres esta)
    // router.push('/profile-librarian') 
  }
  
  const goToRentals = () => {
    // Opción A: Si usas nombres de ruta
    router.push({ name: 'Rentals_librarian' })
  
    // Opción B: Si usas rutas directas
    // router.push('/rentals-librarian') 
  }
  
  // --- Resto de la lógica del Dashboard ---
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  const totalLibros = ref(1240)
  const librosAlquilados = ref(85)
  
  const topLibros = ref([
    { titulo: 'Matemática 3° Secundaria', categoria: 'Educación' },
    { titulo: 'Diccionario de Ciencias', categoria: 'Referencia' },
    { titulo: 'Física para Todos', categoria: 'Ciencias Naturales' },
    { titulo: 'Historia del Perú', categoria: 'Humanidades' }
  ])
  
  const chartData = computed(() => ({
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: [
      {
        label: 'Préstamos',
        backgroundColor: '#4f46e5', 
        hoverBackgroundColor: '#4338ca',
        borderRadius: 4,
        barThickness: 24, 
        data: [45, 59, 80, 51, 56, 55, 40, 45, 60, 75, 85, 60],
      },
    ],
  }))
  
  const chartOptions = computed(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, 
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#ffffff',
        bodyColor: '#cbd5e1',
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        titleFont: { size: 13, family: 'sans-serif' },
        bodyFont: { size: 13, family: 'sans-serif' }
      }
    },
    scales: {
      y: {
        display: true,
        grid: { 
          display: true, 
          color: '#f1f5f9', 
          drawBorder: false,
          tickLength: 0 
        },
        border: { display: false },
        ticks: { color: '#94a3b8', font: { size: 11 }, padding: 10 }
      },
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: '#94a3b8', font: { size: 11 } }
      }
    }
  }))
  </script>