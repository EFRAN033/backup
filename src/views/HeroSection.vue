<template>
  <section class="bg-[#231383] w-full">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-36 md:py-56">
      <div class="text-center">
        <h1 
          class="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-white via-purple-300 to-blue-300 bg-clip-text text-transparent leading-tight animate-fade-in-up"
          style="animation-delay: 100ms;"
        >
          Tu plataforma digital de conocimiento
        </h1>
        
        <p 
          class="text-lg md:text-xl text-purple-200 mb-16 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
          style="animation-delay: 200ms;"
        >
          Descubre miles de libros, artículos y recursos educativos. 
          Tu viaje al conocimiento comienza aquí.
        </p>
        
        <div 
          class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
          style="animation-delay: 300ms;"
        >
          <RouterLink 
            to="/register"
            class="bg-white text-header-bg px-8 py-3 rounded-lg font-semibold shadow-lg transform-gpu transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:shadow-none active:translate-y-px inline-flex items-center justify-center gap-2"
          >
            Comienza ahora →
          </RouterLink>
          
          <RouterLink 
            to="/explore"
            class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold shadow-lg transform-gpu transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:shadow-none active:translate-y-px hover:bg-white/5 inline-flex items-center justify-center gap-2"
          >
            Explorar libros
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
// No se necesita lógica adicional para este componente
</script>