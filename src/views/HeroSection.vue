<template>
  <section 
    class="relative w-full bg-[#231383] overflow-hidden min-h-[85vh] flex items-center"
    aria-labelledby="hero-heading"
  >
    <div class="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

    <div class="container mx-auto px-6 md:px-12 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center overflow-hidden py-4">
        
        <div class="text-left space-y-8 animate-snap-left opacity-0 lg:-mt-24">
          
          <h1 
            id="hero-heading"
            class="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight"
          >
            Expande tu mente <br />
            <span class="text-white">
              sin límites.
            </span>
          </h1>
          
          <p class="text-lg text-blue-100/80 max-w-lg leading-relaxed">
            La biblioteca que se adapta a tu ritmo de aprendizaje. 
            Únete a la comunidad educativa del futuro hoy mismo.
          </p>
          
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <RouterLink 
              to="/register"
              class="group relative bg-white text-[#231383] px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-900/40 
                     transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:bg-blue-50 overflow-hidden"
            >
              <span class="relative z-10 flex items-center gap-2">
                Únete ahora
                <svg class="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </span>
            </RouterLink>

            <RouterLink 
              to="/explore"
              class="text-white/90 font-medium hover:text-white underline decoration-blue-400/50 hover:decoration-blue-400 decoration-2 underline-offset-4 transition-all"
            >
              Ver el catálogo completo
            </RouterLink>
          </div>
          
        </div>

        <div class="hidden lg:flex justify-center relative z-10 animate-snap-right opacity-0">
           <img 
             src="@/assets/imagenes/libreria.svg" 
             alt="Ilustración de una librería digital" 
             class="w-full h-auto object-contain max-w-3xl" 
           />
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
/* ANIMACIÓN IZQUIERDA (Texto) */
@keyframes snapLeft {
  0% {
    opacity: 0;
    transform: translateX(-120%);
  }
  70% {
    opacity: 1;
    transform: translateX(20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* ANIMACIÓN DERECHA (Imagen) */
@keyframes snapRight {
  0% {
    opacity: 0;
    transform: translateX(120%);
  }
  70% {
    opacity: 1;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Clases de utilidad */
.animate-snap-left {
  animation: snapLeft 1s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

.animate-snap-right {
  animation: snapRight 1s cubic-bezier(0.25, 1, 0.5, 1) forwards;
  animation-delay: 0.1s; 
}
</style>