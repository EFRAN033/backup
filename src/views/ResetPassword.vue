<template>
    <div class="min-h-screen bg-header-bg flex flex-col items-center justify-center p-4 relative">
      
      <div class="w-full max-w-md animate-fade-in-up">
        <div class="bg-blue-950/50 backdrop-blur-md border border-purple-500/30 rounded-lg p-8 shadow-2xl">
          
          <div v-if="isSuccess" class="text-center">
            <div class="bg-green-500/20 p-4 rounded-full inline-block mb-4">
              <CheckCircle :size="48" class="text-green-400" />
            </div>
            <h2 class="text-2xl font-bold text-white mb-2">¡Contraseña Actualizada!</h2>
            <p class="text-purple-200 mb-6">Ya puedes ingresar con tu nueva clave.</p>
            <RouterLink to="/login" class="bg-white text-purple-900 font-bold py-2 px-6 rounded-lg hover:bg-purple-100 transition">
              Ir al Login
            </RouterLink>
          </div>
  
          <div v-else>
            <h2 class="text-2xl font-semibold text-white mb-6 text-center">Nueva Contraseña</h2>
            
            <form @submit.prevent="handleReset" class="space-y-6">
              <div v-if="errorMessage" class="bg-red-900/50 text-red-300 p-3 rounded text-sm">
                {{ errorMessage }}
              </div>
  
              <div>
                <label class="block text-sm font-medium text-purple-300 mb-2">Nueva Contraseña</label>
                <div class="relative">
                  <input v-model="password" type="password" required class="w-full pl-10 bg-purple-900/30 border border-purple-500/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400" placeholder="********" />
                  <Lock class="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" :size="18" />
                </div>
              </div>
  
              <div>
                <label class="block text-sm font-medium text-purple-300 mb-2">Confirmar Contraseña</label>
                <div class="relative">
                  <input v-model="confirmPassword" type="password" required class="w-full pl-10 bg-purple-900/30 border border-purple-500/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-400" placeholder="********" />
                  <Lock class="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" :size="18" />
                </div>
              </div>
  
              <button type="submit" :disabled="isLoading" class="w-full bg-white text-purple-900 font-semibold py-3 rounded-lg hover:bg-purple-100 disabled:opacity-70 transition flex justify-center items-center gap-2">
                <Loader2 v-if="isLoading" class="animate-spin" :size="20" />
                <span v-else>Cambiar Contraseña</span>
              </button>
            </form>
          </div>
  
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { Lock, Loader2, CheckCircle } from 'lucide-vue-next';
  
  const API_URL = import.meta.env.VITE_APP_API_URL;
  const route = useRoute();
  const router = useRouter();
  
  const password = ref('');
  const confirmPassword = ref('');
  const token = ref('');
  const isLoading = ref(false);
  const isSuccess = ref(false);
  const errorMessage = ref('');
  
  onMounted(() => {
    token.value = route.query.token;
    if (!token.value) {
      errorMessage.value = 'Token no válido o ausente. Solicita un nuevo enlace.';
    }
  });
  
  const handleReset = async () => {
    if (password.value !== confirmPassword.value) {
      errorMessage.value = 'Las contraseñas no coinciden.';
      return;
    }
    
    isLoading.value = true;
    errorMessage.value = '';
  
    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token.value, nueva_password: password.value }),
      });
  
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Error al restablecer contraseña.');
      }
  
      isSuccess.value = true;
    } catch (error) {
      errorMessage.value = error.message;
    } finally {
      isLoading.value = false;
    }
  };
  </script>
  
  <style scoped>
  .bg-header-bg { background-color: #11095d; }
  </style>