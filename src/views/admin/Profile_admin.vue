<template>
  <div class="flex min-h-screen bg-[#f2f2f2] font-sans">
    
    <SidebarAdmin 
      :expanded="isSidebarExpanded" 
      @toggle-sidebar="isSidebarExpanded = !isSidebarExpanded"
      @logout="handleLogout"
    />
    
    <div class="flex-grow px-6 py-8 overflow-x-hidden transition-all duration-300 ease-in-out flex flex-col items-center">
      
      <div class="w-full max-w-5xl">
          
          <header class="mb-8 flex items-center justify-between">
              <div>
                  <h1 class="text-2xl font-bold text-gray-900">Configuración de Cuenta</h1>
                  <p class="text-sm text-gray-500 mt-1">Gestiona tu perfil de administrador y credenciales de acceso.</p>
              </div>
          </header>
  
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div class="lg:col-span-1 space-y-6">
                  <div class="bg-white shadow-sm rounded-2xl border border-gray-200 overflow-hidden">
                      
                      <div class="h-32 bg-gradient-to-r from-[#000037] to-[#1a1a50] relative">
                          <div class="absolute inset-0 bg-white/5 pattern-dots"></div> 
                      </div>
                      
                      <div class="px-6 pb-8 relative text-center">
                          <div class="relative -mt-16 mb-4 inline-block">
                              <div class="w-32 h-32 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center shadow-md text-4xl font-bold text-gray-400">
                                  <span v-if="userInitial" class="text-[#000037]">{{ userInitial }}</span>
                                  <svg v-else class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                              </div>
                              <div class="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full" title="Online"></div>
                          </div>
                          
                          <h2 class="text-xl font-bold text-gray-900">
                             {{ userData.nombres || 'Admin' }} {{ userData.apellidos || '' }}
                          </h2>
                          <p class="text-sm text-gray-500 mb-4 font-medium">{{ userData.email }}</p>
                          
                          <div class="flex justify-center gap-2 mb-6">
                              <span class="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#000037] border border-blue-100 uppercase tracking-wide">
                                  {{ userData.rol || 'ADMIN' }}
                              </span>
                          </div>
                      </div>
                  </div>
              </div>

              <div class="lg:col-span-2">
                  <div class="bg-white shadow-sm rounded-2xl border border-gray-200 overflow-hidden">
                      <div class="px-8 py-6 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
                          <div class="p-2 bg-white border border-gray-200 rounded-lg text-[#000037] shadow-sm">
                              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                          </div>
                          <div>
                              <h3 class="text-lg font-bold text-gray-900">Seguridad y Acceso</h3>
                              <p class="text-xs text-gray-500">Actualiza tu contraseña periódicamente.</p>
                          </div>
                      </div>

                      <div class="p-8 space-y-8">
                          
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div class="group">
                                  <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">Usuario (Login)</label>
                                  <div class="relative">
                                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                      </div>
                                      <input 
                                          :value="userData.email" 
                                          disabled 
                                          class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 font-medium cursor-not-allowed focus:ring-0 focus:border-gray-200 transition-colors"
                                      />
                                  </div>
                              </div>

                              <div class="group">
                                  <label class="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">ID Sistema</label>
                                  <div class="relative">
                                      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                                      </div>
                                      <input 
                                          :value="userData.id || '---'" 
                                          disabled 
                                          class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 font-mono cursor-not-allowed focus:ring-0 focus:border-gray-200"
                                      />
                                  </div>
                              </div>
                          </div>

                          <div class="border-t border-gray-100"></div>

                          <div class="space-y-5">
                              <div>
                                  <label class="block text-sm font-semibold text-gray-700 mb-2 ml-1">Contraseña Actual</label>
                                  <input 
                                      v-model="passwordForm.actual"
                                      type="password" 
                                      class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000037]/20 focus:border-[#000037] text-sm transition-all shadow-sm placeholder-gray-300" 
                                      placeholder="Ingresa tu clave actual para confirmar" 
                                  />
                              </div>

                              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                  <div>
                                      <label class="block text-sm font-semibold text-gray-700 mb-2 ml-1">Nueva Contraseña</label>
                                      <input 
                                          v-model="passwordForm.nueva"
                                          type="password" 
                                          class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000037]/20 focus:border-[#000037] text-sm transition-all shadow-sm placeholder-gray-300" 
                                          placeholder="Mínimo 8 caracteres" 
                                      />
                                  </div>
                                  <div>
                                      <label class="block text-sm font-semibold text-gray-700 mb-2 ml-1">Confirmar Nueva</label>
                                      <input 
                                          v-model="passwordForm.confirmar"
                                          type="password" 
                                          class="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#000037]/20 focus:border-[#000037] text-sm transition-all shadow-sm placeholder-gray-300" 
                                          placeholder="Repite la nueva clave" 
                                      />
                                  </div>
                              </div>
                          </div>

                          <div class="pt-2 flex justify-end">
                              <button 
                                  @click="updatePassword" 
                                  :disabled="isSaving"
                                  class="px-8 py-3 bg-[#000037] text-white text-sm font-bold rounded-xl shadow-lg hover:bg-[#1a1a50] hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 disabled:opacity-70 disabled:transform-none disabled:shadow-none"
                              >
                                  <svg v-if="isSaving" class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                  {{ isSaving ? 'Guardando...' : 'Actualizar Contraseña' }}
                              </button>
                          </div>

                      </div>
                  </div>
              </div>

          </div>
      </div>
      
    </div> 
  </div> 
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import Swal from 'sweetalert2';
import axios from 'axios';
import SidebarAdmin from './Sidebar_admin.vue'; 

const router = useRouter();
const userStore = useUserStore();
const isSidebarExpanded = ref(false);
const isSaving = ref(false);
const API_URL = import.meta.env.VITE_APP_API_URL;

// Estado local para el formulario
const passwordForm = ref({
    actual: '',
    nueva: '',
    confirmar: ''
});

const userData = computed(() => userStore.user || {});

const userInitial = computed(() => {
    return userData.value.nombres ? userData.value.nombres.charAt(0).toUpperCase() : 'A';
});

// --- Acciones ---

const updatePassword = async () => {
    // 1. Validaciones Locales
    if (!passwordForm.value.actual || !passwordForm.value.nueva || !passwordForm.value.confirmar) {
        Swal.fire('Campos vacíos', 'Por favor, completa todos los campos de contraseña.', 'warning');
        return;
    }

    if (passwordForm.value.nueva !== passwordForm.value.confirmar) {
        Swal.fire('Error', 'La nueva contraseña y su confirmación no coinciden.', 'error');
        return;
    }

    if (passwordForm.value.nueva.length < 8) {
        Swal.fire('Seguridad', 'La contraseña nueva debe tener al menos 8 caracteres.', 'warning');
        return;
    }

    isSaving.value = true;

    try {
        // 2. Llamada a la API Real
        const token = userStore.token || localStorage.getItem('token');
        
        await axios.put(`${API_URL}/auth/me/password`, {
            password_actual: passwordForm.value.actual,
            password_nueva: passwordForm.value.nueva
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        // 3. Mensaje de Éxito
        Swal.fire({
            title: '¡Contraseña Actualizada!',
            text: 'Tu clave ha sido cambiada correctamente. Úsala en tu próximo inicio de sesión.',
            icon: 'success',
            confirmButtonColor: '#000037',
            timer: 3000
        });

        // Limpiar el formulario
        passwordForm.value = { actual: '', nueva: '', confirmar: '' };

    } catch (error) {
        console.error('Error cambiando contraseña:', error);
        // Mostrar mensaje del backend si existe (ej: "La contraseña actual es incorrecta")
        const mensajeError = error.response?.data?.detail || 'Hubo un error al actualizar la contraseña.';
        Swal.fire('Error', mensajeError, 'error');
    } finally {
        isSaving.value = false;
    }
};

const handleLogout = () => {
    Swal.fire({
        title: '¿Cerrar Sesión?',
        text: "Saldrás del panel de administración.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Salir',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            userStore.clearUser();
            router.push('/login'); // Usamos la ruta correcta a tu login
        }
    });
};
</script>