<template>
  <footer class="bg-gray-800 text-gray-300 py-12 px-6">
    <div class="container mx-auto">
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        
        <div>
          <h3 class="text-lg font-semibold text-white mb-4">Navegación</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-white transition-colors">Inicio</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Explorar Libros</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Nosotros</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Contacto</a></li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold text-white mb-4">Legal</h3>
          <ul class="space-y-2">
            <li><a href="#" class="hover:text-white transition-colors">Política de Privacidad</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Términos de Uso</a></li>
            <li><a href="#" class="hover:text-white transition-colors">Política de Cookies</a></li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold text-white mb-4">Contacto</h3>
          <p>Av. Principal 123</p>
          <p>Lima, Perú</p>
          <p>info@biblioteca.com</p>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold text-white mb-4">Síguenos</h3>
          <div class="flex space-x-4">
            <a
              href="#"
              aria-label="Facebook"
              class="text-purple-300 hover:text-white transition-colors"
            >
              <Facebook class="w-6 h-6" />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              class="text-purple-300 hover:text-white transition-colors"
            >
              <Twitter class="w-6 h-6" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              class="text-purple-300 hover:text-white transition-colors"
            >
              <Instagram class="w-6 h-6" />
            </a>
          </div>
        </div>

      </div>

      <hr class="border-gray-700 my-8" />

      <div class="text-center text-gray-400">
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
</style>1