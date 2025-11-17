<template>
  <div class="bg-[#231383] text-white min-h-screen flex flex-col font-sans selection:bg-purple-500 selection:text-white">
    <Header />

    <main class="flex-grow">
      <HeroSection />

      <section class="relative py-24 px-6 lg:px-8 max-w-7xl mx-auto">
        
        <div class="mb-16 max-w-2xl">
          <h2 class="text-blue-200 font-medium tracking-widest text-xs uppercase mb-3">Descubre el ecosistema</h2>
          <h3 class="text-3xl md:text-5xl font-bold leading-tight">
            Todo lo que necesitas para <br />
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">aprender sin pausas.</span>
          </h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-6 grid-rows-2 gap-6 h-auto md:h-[550px]">
          
          <div class="group md:col-span-4 relative overflow-hidden rounded-3xl bg-[#1a105c]/80 backdrop-blur-sm border border-white/10 hover:border-blue-400/50 transition-all duration-500">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div class="relative z-10 p-8 flex flex-col justify-between h-full">
              <div>
                <div class="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-5 text-blue-300">
                  <BookOpen :size="24" />
                </div>
                <h4 class="text-2xl font-bold mb-3">Biblioteca Universal</h4>
                <p class="text-blue-100/70 max-w-md text-base leading-relaxed">Accede a millones de recursos. Desde papers académicos hasta best-sellers, todo indexado para ti.</p>
              </div>
              <div class="absolute -bottom-10 -right-10 w-56 h-56 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors"></div>
            </div>
          </div>

          <div class="group md:col-span-2 md:row-span-2 relative overflow-hidden rounded-3xl bg-[#2a1b6e]/80 backdrop-blur-sm border border-white/10 hover:border-purple-400/50 transition-all duration-500 flex flex-col">
             <div class="absolute inset-0 bg-[url('/noise.png')] opacity-5"></div>
             
             <div class="p-8 flex-grow">
                <div class="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-5 text-purple-300">
                  <Users :size="24" />
                </div>
                <h4 class="text-xl font-bold mb-3">Comunidad</h4>
                <p class="text-purple-100/70 text-sm leading-relaxed">Conecta con mentores y estudiantes. El aprendizaje es mejor compartido.</p>
             </div>

             <div class="relative h-40 w-full bg-black/20 mt-auto border-t border-white/10 p-4 space-y-3 overflow-hidden">
                <div class="flex items-center gap-3 bg-white/10 p-2.5 rounded-lg w-3/4 opacity-80">
                  <div class="w-5 h-5 rounded-full bg-purple-400/50"></div>
                  <div class="h-2 bg-white/30 rounded w-1/2"></div>
                </div>
                <div class="flex items-center gap-3 bg-white/10 p-2.5 rounded-lg w-3/4 ml-auto opacity-80">
                   <div class="h-2 bg-white/30 rounded w-1/2"></div>
                   <div class="w-5 h-5 rounded-full bg-blue-400/50"></div>
                </div>
             </div>
          </div>

          <div class="group md:col-span-2 relative overflow-hidden rounded-3xl bg-[#150f36]/60 backdrop-blur-sm border border-white/10 hover:border-green-400/50 transition-all duration-500">
            <div class="p-8 h-full flex flex-col justify-between">
              <div class="flex items-start justify-between">
                <div>
                  <h4 class="text-lg font-bold mb-1">Certificación</h4>
                  <p class="text-xs text-blue-100/60">Valida tus habilidades.</p>
                </div>
                <GraduationCap :size="28" class="text-green-400 group-hover:rotate-12 transition-transform" />
              </div>
              <div class="mt-4 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-green-500 w-3/4"></div>
              </div>
            </div>
          </div>

          <div class="group md:col-span-2 relative overflow-hidden rounded-3xl bg-[#150f36]/60 backdrop-blur-sm border border-white/10 hover:border-pink-400/50 transition-all duration-500">
             <div class="p-8 flex items-center gap-5 h-full">
                <div class="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400 shrink-0">
                  <Globe :size="24" />
                </div>
                <div>
                  <h4 class="text-lg font-bold">Accesible</h4>
                  <p class="text-xs text-blue-100/60">Desde cualquier lugar.</p>
                </div>
             </div>
          </div>

        </div>
      </section>

    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from './Header.vue'
import HeroSection from './HeroSection.vue'
import Footer from './Footer.vue'
import { BookOpen, Users, GraduationCap, Globe } from 'lucide-vue-next'
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>