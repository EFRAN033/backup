<template>
    <div class="min-h-screen bg-header-bg flex flex-col items-center justify-center p-4 relative">
      
      <div class="absolute top-6 left-6 sm:top-8 sm:left-8 z-10">
        <RouterLink 
          to="/login"
          class="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft :size="20" />
          <span class="text-sm hidden sm:block">Volver al Login</span>
        </RouterLink>
      </div>
  
      <div 
        class="w-full max-w-md animate-fade-in-up" 
        style="animation-delay: 100ms;"
      >
        <div class="bg-blue-950/50 backdrop-blur-md border border-purple-500/30 rounded-lg p-8 shadow-2xl relative overflow-hidden">
          
          <div v-if="isSuccess" class="text-center py-8 animate-fade-in">
            <div class="flex justify-center mb-4">
              <div class="bg-green-500/20 p-4 rounded-full">
                <CheckCircle :size="48" class="text-green-400" />
              </div>
            </div>
            <h2 class="text-2xl font-bold text-white mb-2">¡Correo Enviado!</h2>
            <p class="text-purple-200 mb-6">
              Hemos enviado las instrucciones para restablecer tu contraseña a 
              <span class="font-semibold text-white">{{ email }}</span>.
            </p>
            <p class="text-sm text-white/60 mb-6">
              Revisa tu bandeja de entrada (y spam) en los próximos minutos.
            </p>
            <RouterLink 
              to="/login"
              class="inline-block bg-white text-purple-900 font-semibold px-6 py-2 rounded-lg hover:bg-purple-100 transition"
            >
              Volver a Iniciar Sesión
            </RouterLink>
          </div>
  
          <div v-else>
            <div class="text-center mb-8">
              <div class="flex justify-center mb-4">
                <div class="bg-purple-500/20 p-3 rounded-full">
                  <KeyRound :size="32" class="text-purple-300" />
                </div>
              </div>
              <h2 class="text-2xl font-semibold text-white mb-2">
                Recuperar Contraseña
              </h2>
              <p class="text-white/70 text-sm">
                Ingresa tu correo electrónico y te enviaremos un enlace para que puedas crear una nueva contraseña.
              </p>
            </div>
  
            <form @submit.prevent="handleRecover" class="space-y-6">
              
              <div 
                v-if="errorMessage" 
                class="bg-red-900/50 text-red-300 p-3 rounded-md border border-red-700 text-sm flex items-start gap-2"
              >
                <span class="mt-0.5">⚠️</span>
                <span>{{ errorMessage }}</span>
              </div>
  
              <div>
                <label for="email" class="block text-sm font-medium text-purple-300 mb-2">
                  Correo Electrónico
                </label>
                <div class="relative">
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    required
                    :disabled="isLoading"
                    class="w-full pl-10 bg-purple-900/30 border border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition disabled:opacity-50"
                  />
                  <Mail class="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" :size="18" />
                </div>
              </div>
              
              <button 
                type="submit" 
                :disabled="isLoading"
                class="w-full bg-white text-purple-900 font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2
                       hover:bg-purple-100
                       disabled:bg-purple-200 disabled:text-purple-600 disabled:cursor-not-allowed"
              >
                <template v-if="isLoading">
                  <Loader2 :size="20" class="animate-spin" />
                  Enviando...
                </template>
                <template v-else>
                  Enviar enlace de recuperación
                </template>
              </button>
            </form>
          </div>
  
        </div>
      </div>
  
      <div class="absolute inset-0 pointer-events-none">
        <div class="w-64 h-64 bg-purple-500/10 rounded-full blur-3xl absolute top-10 right-10 animate-pulse"></div>
        <div class="w-80 h-80 bg-blue-500/10 rounded-full blur-3xl absolute bottom-10 left-10 animate-pulse animation-delay-2000"></div>
      </div>
  
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import { Mail, ArrowLeft, Loader2, KeyRound, CheckCircle } from 'lucide-vue-next'; 
  
  const API_URL = import.meta.env.VITE_APP_API_URL;
  
  const email = ref('');
  const isLoading = ref(false);
  const errorMessage = ref('');
  const isSuccess = ref(false);
  
  const handleRecover = async () => {
    isLoading.value = true;
    errorMessage.value = '';
    
    if (!email.value) {
      errorMessage.value = 'Por favor ingresa un correo válido.';
      isLoading.value = false;
      return;
    }
  
    try {
      // NOTA: Ajusta la ruta '/auth/forgot-password' según la ruta real de tu Backend
      // Algunos backends usan: /auth/reset-password-request, /auth/recover, etc.
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.value }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'No pudimos procesar tu solicitud. Verifica el correo.');
      }
  
      // Si todo sale bien:
      isSuccess.value = true;
  
    } catch (error) {
      console.error("Error de recuperación:", error.message);
      errorMessage.value = error.message;
    } finally {
      isLoading.value = false;
    }
  };
  </script>
  
  <style scoped>
  .bg-header-bg {
    background-color: #11095d; 
  }
  
  /* Animaciones simples para entrada suave */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0; /* Comienza invisible */
  }
  
  .animate-fade-in {
    animation: fadeInUp 0.4s ease-out forwards;
  }
  </style>