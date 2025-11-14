<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-950 via-purple-900 to-blue-950 text-white">
    <!-- Header -->
    <Header />

    <!-- Hero Section -->
    <HeroSection />

    <!-- Stats Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-y border-purple-500/20">
      <div class="hover:transform hover:scale-105 transition">
        <div class="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">10K+</div>
        <p class="text-purple-200">Libros disponibles</p>
      </div>
      <div class="hover:transform hover:scale-105 transition">
        <div class="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">5K+</div>
        <p class="text-purple-200">Repositorios disponibles</p>
      </div>
      <div class="hover:transform hover:scale-105 transition">
        <div class="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">50K+</div>
        <p class="text-purple-200">Usuarios activos</p>
      </div>
      <div class="hover:transform hover:scale-105 transition">
        <div class="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">100+</div>
        <p class="text-purple-200">Categorías</p>
      </div>
    </section>

    <!-- Features Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-16">
        ¿Por qué elegir LibroHub?
      </h2>
      
      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-purple-800/40 backdrop-blur-sm p-8 rounded-lg border border-purple-500/30 hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/20 transition text-center">
          <BookOpen :size="48" class="text-purple-400 mb-4 mx-auto" />
          <h3 class="text-xl font-bold mb-2 text-white">Biblioteca Completa</h3>
          <p class="text-purple-200">Accede a miles de libros en diferentes categorías y formatos.</p>
        </div>

        <div class="bg-purple-800/40 backdrop-blur-sm p-8 rounded-lg border border-purple-500/30 hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/20 transition text-center">
          <Users :size="48" class="text-purple-400 mb-4 mx-auto" />
          <h3 class="text-xl font-bold mb-2 text-white">Comunidad Activa</h3>
          <p class="text-purple-200">Conecta con otros estudiantes y comparte experiencias.</p>
        </div>

        <div class="bg-purple-800/40 backdrop-blur-sm p-8 rounded-lg border border-purple-500/30 hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/20 transition text-center">
          <GraduationCap :size="48" class="text-purple-400 mb-4 mx-auto" />
          <h3 class="text-xl font-bold mb-2 text-white">Certificación</h3>
          <p class="text-purple-200">Obtén certificados al completar tus lecturas.</p>
        </div>

        <div class="bg-purple-800/40 backdrop-blur-sm p-8 rounded-lg border border-purple-500/30 hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/20 transition text-center">
          <Globe :size="48" class="text-purple-400 mb-4 mx-auto" />
          <h3 class="text-xl font-bold mb-2 text-white">Alcance Global</h3>
          <p class="text-purple-200">Accede a miles de libros en diferentes categorías y formatos.</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">
        Comienza tu viaje en el conocimiento hoy
      </h2>
      <p class="text-purple-200 mb-8">
        Únete a miles de estudiantes que ya están aprendiendo en LibroHub
      </p>
      <RouterLink 
        to="/register"
        class="bg-white text-purple-900 px-8 py-3 rounded-full font-semibold hover:bg-purple-100 transition inline-block"
      >
        Regístrate gratis
      </RouterLink>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import Header from './Header.vue'
import HeroSection from './HeroSection.vue'
import Footer from './Footer.vue'
import { RouterLink } from 'vue-router'
import { BookOpen, Users, GraduationCap, Globe } from 'lucide-vue-next'
</script>