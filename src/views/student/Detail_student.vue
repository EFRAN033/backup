<template>
    <div class="bg-gray-100 flex min-h-screen">
      
      <Sidebar_student />
  
      <div class="flex-1 h-screen overflow-y-auto">
        
        <main class="container mx-auto max-w-7xl p-4 md:p-8">
          
          <RouterLink 
            to="/market" 
            class="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors mb-6 group"
          >
            <ArrowLeft :size="20" class="group-hover:-translate-x-1 transition-transform" />
            <span class="font-semibold">Volver al Marketplace</span>
          </RouterLink>
    
          <div v-if="!book" class="text-center text-gray-500 py-24">
            <LoaderCircle :size="48" class="mx-auto mb-4 animate-spin" />
            <h3 class="text-xl font-semibold">Cargando libro...</h3>
          </div>
    
          <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
            
            <div class="lg:col-span-4">
              <div class="bg-white rounded-lg flex items-center justify-center p-4 border border-gray-200">
                <img 
                  :src="book.imgUrl" 
                  :alt="`Portada de ${book.title}`" 
                  class="w-full h-auto max-h-[28rem] object-contain rounded-md"
                >
              </div>
            </div>
        
            <div class="lg:col-span-5 flex flex-col lg:border-l lg:border-r border-gray-200 lg:px-8">
              
              <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{{ book.title }}</h1>
              
              <div class="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-gray-700 mb-8">
                <span class="font-semibold text-gray-900 col-span-1">Autor:</span>
                <span class="text-gray-600 col-span-1">{{ book.author }}</span>
                
                <span class="font-semibold text-gray-900 col-span-1">ISBN:</span>
                <span class="text-gray-600 col-span-1">{{ book.isbn }}</span>
  
                <span class="font-semibold text-gray-900 col-span-1">Editorial:</span>
                <span class="text-gray-600 col-span-1">{{ book.editorial }}</span>
                
                <span class="font-semibold text-gray-900 col-span-1">Año:</span>
                <span class="text-gray-600 col-span-1">{{ book.year }}</span>
                
                <span class="font-semibold text-gray-900 col-span-1">Categoría:</span>
                <span class="text-gray-600 col-span-1">{{ book.categoryDisplay }}</span>
              </div>
  
              <div class="mt-auto border-t border-gray-200 pt-8">
                <h2 class="text-xl font-semibold text-gray-800 mb-3">Descripción</h2>
                <p class="text-gray-700 leading-relaxed text-left">
                  {{ book.description }}
                </p>
              </div>
            </div>
    
            <div class="lg:col-span-3">
              <div class="sticky top-8 space-y-6">
                
                <div>
                  <p class="text-sm text-gray-600">Precio de Alquiler</p>
                  <p class="text-4xl font-bold text-indigo-700">S/ {{ book.price.toFixed(2) }}</p>
                </div>
                
                <div>
                  <p class="text-sm font-medium text-gray-800 mb-2">Condición</p>
                  <span 
                    class="inline-block text-xs font-semibold px-3 py-1 rounded-full"
                    :class="book.condition === 'nuevo' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'"
                  >
                    {{ book.condition === 'nuevo' ? 'Nuevo' : 'Usado' }}
                  </span>
                </div>
  
                <div>
                  <p class="text-sm font-medium text-gray-800">Disponibilidad</p>
                  <p class="text-lg font-semibold" :class="book.available > 0 ? 'text-green-700' : 'text-red-700'">
                    {{ book.available }} en stock
                  </p>
                  <p class="text-sm text-gray-600">({{ book.totalStock }} totales)</p>
                </div>
                
                <button 
                  class="w-full p-3 rounded-lg bg-indigo-600 text-white font-semibold shadow-md hover:shadow-lg shadow-indigo-500/50 transition-all duration-300 transform hover:-translate-y-0.5"
                  :disabled="book.available === 0"
                  :class="{'opacity-50 cursor-not-allowed hover:shadow-md hover:-translate-y-0': book.available === 0}"
                >
                  {{ book.available > 0 ? 'Alquilar' : 'No Disponible' }}
                </button>
              </div>
            </div>
    
          </div>
        </main>
      </div>
      
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { RouterLink } from 'vue-router'
  import { ArrowLeft, LoaderCircle } from 'lucide-vue-next'
  // --- IMPORTACIÓN DEL SIDEBAR ---
  import Sidebar_student from './Sidebar_student.vue' // Ajusta la ruta si es necesario
  
  // --- IMÁGENES (Asegúrate de que estas rutas son correctas) ---
  import imgLibro1 from '@/assets/imagenes/libro1.png'
  import imgLibro2 from '@/assets/imagenes/libro2.png'
  import imgLibro3 from '@/assets/imagenes/libro3.png'
  import imgLibro4 from '@/assets/imagenes/libro4.png'
  
  // --- PROPS ---
  const props = defineProps({
    id: {
      type: String,
      required: true
    }
  })
  
  // --- BASE DE DATOS FICTICIA (Mock data) ---
  const mockDatabase = [
    {
      id: 1,
      title: 'Crítica de la razón pura',
      author: 'Immanuel Kant',
      isbn: '978-84-306-0594-1',
      editorial: 'TAURUS',    
      available: 6,
      totalStock: 24,         
      category: 'filosofia',
      categoryDisplay: 'Filosofía',
      year: 2012,             
      imgUrl: imgLibro1,
      price: 45.00,
      condition: 'usado',
      description: 'Se trata de una indagación trascendental (acerca de las condiciones epistémicas del conocer humano) cuyo objetivo central es lograr una respuesta definitiva sobre si la metafísica puede ser considerada una ciencia, así como fundamentar la validez tanto de la experiencia ordinaria como de las ciencias matemáticas y físicas. Tanto la fundamentación de la metafísica como la del resto de los conocimientos exige, para que sea decidida su posibilidad, que se determine en cada caso si son posibles juicios que sean a priori (es decir, independientes de la experiencia, lo que implica para Kant que sean necesarios y universales, absolutamente ciertos).'
    },
    {
      id: 2,
      title: 'El origen de las especies',
      author: 'Charles Darwin',
      isbn: '978-84-206-8344-2',
      editorial: 'Alianza Editorial',
      available: 3,
      totalStock: 15,
      category: 'ciencia',
      categoryDisplay: 'Ciencia',
      year: 1859,
      imgUrl: imgLibro2,
      price: 55.00,
      condition: 'nuevo',
      description: 'El libro que introdujo la teoría científica de la evolución por selección natural. Darwin presenta una vasta cantidad de evidencia recogida durante su viaje en el Beagle, desafiando las concepciones previas sobre el origen de la vida y la diversidad de las especies.'
    },
    {
      id: 3,
      title: 'Economía y sociedad: Esbozo...',
      author: 'Max Weber',
      isbn: '978-84-375-0810-0',
      editorial: 'Fondo de Cultura Económica',
      available: 0,
      totalStock: 10,
      category: 'historia',
      categoryDisplay: 'Historia',
      year: 1922,
      imgUrl: imgLibro3,
      price: 30.00,
      condition: 'usado',
      description: 'Una de las obras más influyentes de la sociología. Weber analiza las relaciones entre la economía, la política, la religión y la estructura social, desarrollando conceptos clave como la acción social, la dominación y la burocracia.'
    },
    {
      id: 4,
      title: 'Principios de Marketing',
      author: 'Philip Kotler',
      isbn: '978-607-32-1558-8',
      editorial: 'Pearson Educación',
      available: 8,
      totalStock: 20,
      category: 'administracion',
      categoryDisplay: 'Administración',
      year: 1997,
      imgUrl: imgLibro4,
      price: 80.00,
      condition: 'nuevo',
      description: 'Considerado por muchos como la biblia del marketing. Kotler establece los conceptos fundamentales, estrategias y prácticas del marketing moderno, desde la investigación de mercados hasta la comunicación y distribución de productos.'
    }
  ]
  
  // --- ESTADO ---
  const book = ref(null)
  
  // --- LÓGICA ---
  onMounted(() => {
    // Simula una llamada a la API con un pequeño retraso
    setTimeout(() => {
      const bookId = parseInt(props.id)
      book.value = mockDatabase.find(b => b.id === bookId)
      if (!book.value) {
        console.warn(`Libro con ID ${props.id} no encontrado.`)
      }
    }, 300) 
  })
  </script>
  
  <style scoped>
  /* No se necesitan estilos 'scoped' adicionales. 
    Toda la estructura se gestiona con las clases de Tailwind.
  */
  </style>