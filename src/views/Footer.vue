<template>
  <footer class="bg-[#1e1266] text-white border-t border-white/10 pt-12 pb-8 font-sans relative z-10">
    
    <div class="container mx-auto px-6 lg:px-8">
      
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
        
        <div class="md:col-span-6 lg:col-span-5">
          <RouterLink to="/" class="flex items-center gap-3 group w-fit mb-4">
            <div class="w-10 h-10 bg-[#150a40] rounded-lg flex items-center justify-center text-blue-300 group-hover:bg-[#231383] transition-colors">
               <GraduationCap :size="20" />
            </div>
            <span class="text-xl font-bold tracking-tight text-white">LibroHub</span>
          </RouterLink>
          
          <p class="text-blue-100/80 text-sm leading-relaxed mb-6 max-w-sm">
            Plataforma digital de conocimiento. Democratizando el aprendizaje global.
          </p>
          
          <div class="flex gap-2">
            <a href="#" aria-label="Facebook" class="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center text-blue-100 hover:bg-[#1877F2] hover:text-white transition-colors">
              <Facebook :size="16" />
            </a>
            <a href="#" aria-label="Twitter" class="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center text-blue-100 hover:bg-[#1DA1F2] hover:text-white transition-colors">
              <Twitter :size="16" />
            </a>
            <a href="#" aria-label="Instagram" class="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center text-blue-100 hover:bg-[#E1306C] hover:text-white transition-colors">
              <Instagram :size="16" />
            </a>
          </div>
        </div>

        <div class="md:col-span-3 lg:col-span-3">
          <h3 class="font-bold text-white mb-3 text-sm uppercase tracking-wider">Legal</h3>
          <ul class="space-y-2">
            <li><RouterLink to="/privacy" class="text-blue-200/70 hover:text-white transition-colors text-sm">Privacidad</RouterLink></li>
            <li><RouterLink to="/terms" class="text-blue-200/70 hover:text-white transition-colors text-sm">Términos</RouterLink></li>
            <li><RouterLink to="/cookies" class="text-blue-200/70 hover:text-white transition-colors text-sm">Cookies</RouterLink></li>
          </ul>
        </div>

         <div class="md:col-span-3 lg:col-span-4">
          <h3 class="font-bold text-white mb-3 text-sm uppercase tracking-wider">Contacto</h3>
          <ul class="space-y-2">
            <li class="flex items-center gap-2 text-sm text-blue-200/70 hover:text-white transition-colors">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              <a href="mailto:info@librohub.com">info@librohub.com</a>
            </li>
            <li class="flex items-center gap-2 text-sm text-blue-200/70">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              <span>Lima, Perú</span>
            </li>
          </ul>
        </div>
        
      </div>

      <div class="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-blue-200/40 text-xs text-center md:text-left">
          © 2025 LibroHub Inc.
        </p>
        
        <div class="flex gap-6">
            <span class="text-blue-200/40 text-xs hover:text-white cursor-pointer transition-colors">Ayuda</span>
            <span class="text-blue-200/40 text-xs hover:text-white cursor-pointer transition-colors">Estado</span>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { Facebook, Twitter, Instagram, GraduationCap } from 'lucide-vue-next'
</script>