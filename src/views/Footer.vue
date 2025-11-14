<template>
  <footer class="bg-gray-900 text-gray-400 py-4 px-6">
    <div class="container mx-auto">
      
      <div class="mb-8">
        <RouterLink to="/" class="flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-300 w-fit">
          <GraduationCap :size="30" class="text-blue-400" />
          <span class="text-2xl font-bold text-white">LibroHub</span>
        </RouterLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        
        <div>
          <h3 class="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">Navegación</h3>
          <ul class="space-y-2">
            <li><RouterLink to="/" class="hover:text-white transition-colors duration-300">Inicio</RouterLink></li>
            <li><RouterLink to="/explore" class="hover:text-white transition-colors duration-300">Explorar Libros</RouterLink></li>
            <li><RouterLink to="/about" class="hover:text-white transition-colors duration-300">Nosotros</RouterLink></li>
            <li><RouterLink to="/contact" class="hover:text-white transition-colors duration-300">Contacto</RouterLink></li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">Legal</h3>
          <ul class="space-y-2">
            <li><RouterLink to="/privacy" class="hover:text-white transition-colors duration-300">Política de Privacidad</RouterLink></li>
            <li><RouterLink to="/terms" class="hover:text-white transition-colors duration-300">Términos de Uso</RouterLink></li>
            <li><RouterLink to="/cookies" class="hover:text-white transition-colors duration-300">Política de Cookies</RouterLink></li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">Contacto</h3>
          <ul class="space-y-2">
            <li>
              <a 
                href="https://maps.google.com/?q=Av.+Principal+123+Lima+Perú" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="hover:text-white transition-colors duration-300"
              >
                Av. Principal 123<br>Lima, Perú
              </a>
            </li>
            <li>
              <a 
                href="mailto:info@librohub.com" 
                class="hover:text-white transition-colors duration-300"
              >
                info@librohub.com
              </a>
            </li>
          </ul>
        </div>
        
      </div>

      <hr class="border-gray-700 my-8" />

      <div class="flex flex-col-reverse sm:flex-row items-center justify-between text-sm">
        <p class="text-gray-400 mt-4 sm:mt-0">
          © 2025 LibroHub. Todos los derechos reservados.
        </p>
        
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
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { Facebook, Twitter, Instagram, GraduationCap } from 'lucide-vue-next'
</script>