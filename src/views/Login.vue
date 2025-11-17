<template>
  <div class="min-h-screen bg-header-bg flex flex-col items-center justify-center p-4 relative">
    
    <div class="absolute top-6 left-6 sm:top-8 sm:left-8 z-10">
      <RouterLink 
        to="/"
        class="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200"
        aria-label="Volver al inicio"
      >
        <ArrowLeft :size="20" />
        <span class="text-sm hidden sm:block">Volver</span>
      </RouterLink>
    </div>

    <div 
      class="w-full max-w-md animate-fade-in-up" 
      style="animation-delay: 100ms;"
    >
      <div class="bg-blue-950/50 backdrop-blur-md border border-purple-500/30 rounded-lg p-8 shadow-2xl">
        
        <div class="text-center mb-8">
          <RouterLink to="/" class="flex items-center justify-center gap-3 text-white/80 hover:text-white transition-colors duration-300 mb-4">
            <GraduationCap :size="36" class="text-blue-400" />
            <span class="text-3xl font-bold">LibroHub</span>
          </RouterLink>
          <h2 class="text-2xl font-semibold text-white">
            Iniciar Sesión
          </h2>
        </div>

        <form @submit.prevent="loginUser" class="space-y-6">
          
          <div 
            v-if="errorMessage" 
            class="bg-red-900/50 text-red-300 p-3 rounded-md border border-red-700 text-sm"
          >
            <span class="font-semibold">Error:</span> {{ errorMessage }}
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
                class="w-full pl-10 bg-purple-900/30 border border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition"
              />
              <Mail class="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" :size="18" />
            </div>
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-purple-300 mb-2">
              Contraseña
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                type="password"
                placeholder="********"
                required
                :disabled="isLoading"
                class="w-full pl-10 bg-purple-900/30 border border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition"
              />
              <Lock class="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" :size="18" />
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
              Iniciando sesión...
            </template>
            <template v-else>
              Acceder
            </template>
          </button>
        </form>
        
        <div class="mt-6 text-center text-sm">
          <p class="text-white/70">
            ¿No tienes cuenta? 
            <RouterLink to="/register" class="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200">
              Regístrate aquí
            </RouterLink>
          </p>
        </div>

      </div>
    </div>

    <div class="absolute inset-0 pointer-events-none">
      <div class="w-64 h-64 bg-purple-500/10 rounded-full blur-3xl absolute top-10 left-10 animate-pulse"></div>
      <div class="w-80 h-80 bg-blue-500/10 rounded-full blur-3xl absolute bottom-10 right-10 animate-pulse animation-delay-2000"></div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { useUserStore } from '../stores/user'; 
import { Mail, Lock, Loader2, ArrowLeft, GraduationCap } from 'lucide-vue-next'; 

const decodeJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Error decoding JWT:", e);
    return null;
  }
};

const API_URL = import.meta.env.VITE_APP_API_URL;
const router = useRouter();
const userStore = useUserStore();

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const loadUserFromToken = (token) => {
    const payload = decodeJwt(token);
    if (payload) {
        userStore.setToken(token);
        userStore.setUser({ 
          id: payload.sub, 
          email: payload.email, 
          rol: payload.rol 
        });
    }
};

const loginUser = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  
  if (!email.value || !password.value) {
    errorMessage.value = 'Por favor, ingresa tu correo y contraseña.';
    isLoading.value = false;
    return;
  }

  try {
    const payload = {
      email: email.value,
      password: password.value,
    };

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || 'Error al iniciar sesión. Verifica tus credenciales.')
    }

    const data = await response.json() 
    
    // 1. Guardar token
    loadUserFromToken(data.access_token); 
    
    // 2. Leer Rol
    const tokenPayload = decodeJwt(data.access_token)

    // 3. Redirigir
    if (tokenPayload && tokenPayload.rol === 'estudiante') {
      console.log('Login Exitoso (Estudiante) -> /market');
      router.push('/market'); 

    } else if (tokenPayload && tokenPayload.rol === 'bibliotecario') {
      // --- CAMBIO PRINCIPAL AQUÍ ---
      console.log('Login Exitoso (Bibliotecario) -> /bibliotecario/dashboard');
      router.push('/bibliotecario/dashboard'); 

    } else if (tokenPayload && (tokenPayload.rol === 'admin' || tokenPayload.rol === 'revisor')) {
      console.log('Login Exitoso (Admin) -> /dashboard');
      router.push('/dashboard'); 

    } else {
      console.log('Rol desconocido -> /');
      router.push('/') 
    }

  } catch (error) {
    console.error("Error de login:", error.message);
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
</style>