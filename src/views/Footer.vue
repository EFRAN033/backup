<template>
  <footer class="bg-gray-900 text-gray-400 py-12 px-6">
    <div class="container mx-auto">
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        
        <div>
          <h3 class="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">Navegación</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-white transition-colors duration-300">Inicio</a></li>
            <li><a href="#" class="hover:text-white transition-colors duration-300">Explorar Libros</a></li>
            <li><a href="#" class="hover:text-white transition-colors duration-300">Nosotros</a></li>
            <li><a href="#" class="hover:text-white transition-colors duration-300">Contacto</a></li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">Legal</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-white transition-colors duration-300">Política de Privacidad</a></li>
            <li><a href="#" class="hover:text-white transition-colors duration-300">Términos de Uso</a></li>
            <li><a href="#" class="hover:text-white transition-colors duration-300">Política de Cookies</a></li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">Contacto</h3>
          <p>Av. Principal 123</p>
          <p>Lima, Perú</p>
          <p>info@biblioteca.com</p>
        </div>
        
        <div>
          <h3 class="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">Síguenos</h3>
          <div class="flex space-x-4">
            <a
              href="#"
              aria-label="Facebook"
              class="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <Facebook class="w-6 h-6" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              class="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <Twitter class="w-6 h-6" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              class="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <Instagram class="w-6 h-6" />
            </a>
          </div>
        </div>

      </div>

      <hr class="border-gray-700 my-8" />

      <div class="text-center text-gray-500 text-sm">
        <p>&copy; 2025 Biblioteca Educativa. Todos los derechos reservados.</p>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { Facebook, Twitter, Instagram } from 'lucide-vue-next'
// No se necesita lógica JS para un footer estático
</script>

<style scoped>
/* No se necesitan estilos scoped ya que todo se maneja con 
  clases de utilidad de Tailwind.
*/
</style>