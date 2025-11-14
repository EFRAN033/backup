<template>
  <div class="bg-header-bg text-white">
    <Header />

    <HeroSection />

    <section 
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-fade-in-up"
      style="animation-delay: 200ms;"
    >
      <h2 class="text-4xl md:text-5xl font-bold text-center mb-16">
        ¿Por qué elegir LibroHub?
      </h2>
      
      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-purple-800/40 backdrop-blur-sm p-8 rounded-lg border border-purple-500/30 hover:border-purple-400/60 hover:shadow-xl hover:shadow-purple-500/20 transform-gpu transition-all duration-300 hover:-translate-y-1 text-center">
          <BookOpen :size="48" class="text-purple-400 mb-4 mx-auto" />
          <h3 class="text-xl font-bold mb-2 text-white">Biblioteca Completa</h3>
          <p class="text-purple-200">Accede a miles de libros en diferentes categorías y formatos.</p>
        </div>

        <div class="bg-purple-800/40 backdrop-blur-sm p-8 rounded-lg border border-purple-500/30 hover:border-purple-400/60 hover:shadow-xl hover:shadow-purple-500/20 transform-gpu transition-all duration-300 hover:-translate-y-1 text-center">
          <Users :size="48" class="text-purple-400 mb-4 mx-auto" />
          <h3 class="text-xl font-bold mb-2 text-white">Comunidad Activa</h3>
          <p class="text-purple-200">Conecta con otros estudiantes y comparte experiencias.</p>
        </div>

        <div class="bg-purple-800/40 backdrop-blur-sm p-8 rounded-lg border border-purple-500/30 hover:border-purple-400/60 hover:shadow-xl hover:shadow-purple-500/20 transform-gpu transition-all duration-300 hover:-translate-y-1 text-center">
          <GraduationCap :size="48" class="text-purple-400 mb-4 mx-auto" />
          <h3 class="text-xl font-bold mb-2 text-white">Certificación</h3>
          <p class="text-purple-200">Obtén certificados al completar tus lecturas.</p>
        </div>

        <div class="bg-purple-800/40 backdrop-blur-sm p-8 rounded-lg border border-purple-500/30 hover:border-purple-400/60 hover:shadow-xl hover:shadow-purple-500/20 transform-gpu transition-all duration-300 hover:-translate-y-1 text-center">
          <Globe :size="48" class="text-purple-400 mb-4 mx-auto" />
          <h3 class="text-xl font-bold mb-2 text-white">Alcance Global</h3>
          <p class="text-purple-200">Accede a miles de libros en diferentes categorías y formatos.</p>
        </div>
      </div>
    </section>

    <section 
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center animate-fade-in-up"
      style="animation-delay: 400ms;"
    >
      <h2 class="text-4xl md:text-5xl font-bold mb-4">
        Comienza tu viaje en el conocimiento hoy
      </h2>
      <p class="text-purple-200 mb-8">
        Únete a miles de estudiantes que ya están aprendiendo en LibroHub
      </p> <RouterLink 
        to="/register"
        class="bg-white text-header-bg px-8 py-3 rounded-lg font-semibold shadow-lg transform-gpu transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 active:shadow-none active:translate-y-px inline-flex items-center justify-center gap-2"
      >
        Regístrate gratis
      </RouterLink>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import Header from './Header.vue'
import HeroSection from './HeroSection.vue'
import Footer from './Footer.vue'
import { RouterLink } from 'vue-router'
// Asegúrate de tener 'lucide-vue-next' instalado (npm install lucide-vue-next)
import { BookOpen, Users, GraduationCap, Globe } from 'lucide-vue-next'
</script>