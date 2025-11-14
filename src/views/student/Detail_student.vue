<template>
    <div class="bg-gray-100 flex">
      
      <Sidebar_student />
  
      <div class="flex-1 h-screen overflow-y-auto">
        
        <main class="container mx-auto max-w-6xl p-4 md:p-8">
          
          <RouterLink 
            to="/market" 
            class="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors mb-6 group"
          >
            <ArrowLeft :size="20" class="group-hover:-translate-x-1 transition-transform" />
            <span class="font-semibold">Volver al Marketplace</span>
          </RouterLink>
    
          <div v-if="book" class="bg-white rounded-lg shadow-xl overflow-hidden p-6 md:p-8 flex flex-col md:flex-row gap-8">
            
            <div class="md:w-1/3 flex-shrink-0 flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <img 
                :src="book.imgUrl" 
                :alt="`Portada de ${book.title}`" 
                class="w-full h-auto max-h-96 object-contain shadow-md"
              >
            </div>
    
            <div class="md:w-2/3 flex flex-col">
              <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{{ book.title }}</h1>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mb-8 text-gray-700">
                <div>
                  <p class="font-semibold text-gray-800">Autor: <span class="font-normal">{{ book.author }}</span></p>
                  <p class="font-semibold text-gray-800">ISBN: <span class="font-normal">{{ book.isbn }}</span></p>
                </div>
                <div>
                  <p class="font-semibold text-gray-800">Editorial: <span class="font-normal">{{ book.editorial }}</span></p>
                  <p class="font-semibold text-gray-800">Año: <span class="font-normal">{{ book.year }}</span></p>
                </div>
                <div class="md:col-span-2">
                  <p class="font-semibold text-gray-800">Categoría: <span class="font-normal">{{ book.categoryDisplay }}</span></p>
                </div>
              </div>
    
              <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8 max-w-xs md:max-w-sm">
                <h2 class="text-xl font-bold text-gray-900 mb-4">Libros</h2>
                <p class="text-gray-700 mb-2">Ejemplares Totales: <span class="font-semibold">{{ book.totalStock }}</span></p>
                <p class="text-gray-700 mb-4">Disponibles: <span class="font-semibold text-green-700">{{ book.available }}</span></p>
                
                <button 
                  class="w-full p-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
                  :disabled="book.available === 0"
                  :class="{'opacity-50 cursor-not-allowed': book.available === 0}"
                >
                  {{ book.available > 0 ? 'Alquilar' : 'No Disponible' }}
                </button>
              </div>
    
              <div class="mt-auto border-t border-gray-200 pt-8">
                <p class="text-gray-700 leading-relaxed text-justify">
                  {{ book.description }}
                </p>
              </div>
            </div>
          </div>
    
          <div v-else class="text-center text-gray-500 py-24">
            <LoaderCircle :size="48" class="mx-auto mb-4 animate-spin" />
            <h3 class="text-xl font-semibold">Cargando libro...</h3>
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

// --- BASE DE DATOS FICTICIA (Añadido ISBN, Editorial, totalStock) ---
const mockDatabase = [
  {
    id: 1,
    title: 'Crítica de la razón pura',
    author: 'Immanuel Kant',
    isbn: '978-84-306-0594-1', // Nuevo
    editorial: 'TAURUS',    // Nuevo
    available: 6,
    totalStock: 24,         // Nuevo
    category: 'filosofia',
    categoryDisplay: 'Filosofía',
    year: 2012,             // Actualizado para el ejemplo
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
      // Opcional: Redirigir a una página 404 o al mercado si el libro no existe
      console.warn(`Libro con ID ${props.id} no encontrado.`)
      // router.push('/market') // Si usas Vue Router, puedes redirigir
    }
  }, 300) 
})
</script>

<style scoped>
/* Puedes añadir estilos específicos si lo necesitas */
</style>