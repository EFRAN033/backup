<template>
  <div class="min-h-screen flex bg-[#f2f2f2]">
    
    <SidebarAdmin 
        :expanded="isSidebarExpanded" 
        :menu-items="sidebarItems"
        @toggle-sidebar="isSidebarExpanded = !isSidebarExpanded"
    />
    
    <div class="flex-1 flex flex-col">
      <header class="h-14 bg-white flex items-center justify-between px-6 border-b">
        <p class="text-sm text-gray-500">
          Gestor / <span class="text-gray-900 font-medium">Usuarios</span>
        </p>
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-[#000037]">JC</div>
          <div class="text-right leading-tight">
            <p class="text-sm font-medium text-gray-900">Juan Carlos</p>
            <p class="text-xs text-gray-400">Administrador</p>
          </div>
        </div>
      </header>

      <div
        class="h-28 bg-gradient-to-r from-[#4626d0] via-[#341caa] to-[#231383] text-white px-6 flex items-center justify-between"
      >
        <div>
            <h1 class="text-2xl font-semibold">Gestión de Usuarios</h1>
            <p class="text-sm text-white/90 mt-1">Administra los usuarios de la biblioteca: estudiantes, bibliotecarios y administradores. Maximiza la satisfacción del usuario-cliente.</p>
        </div>
        <button
            class="px-6 py-3 rounded-xl bg-white text-[#4626d0] text-sm font-bold shadow-lg hover:bg-gray-100 transition whitespace-nowrap"
        >
            + Agregar Nuevo Usuario
        </button>
      </div>

      <main class="flex-1 bg-[#f2f2f2] px-6 py-8">
        <div class="grid grid-cols-1 gap-6">
          
          <div class="bg-white p-4 rounded-xl shadow-md">
              <div class="flex gap-4 items-center mb-4 flex-wrap">
                  <div class="flex-1 min-w-[200px] relative">
                      <input 
                          v-model="searchQuery" 
                          placeholder="Buscar por nombre o email..." 
                          class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#4626d0] focus:border-[#4626d0]"
                      />
                      <svg class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  
                  <select v-model="filterRol" class="px-4 py-2 border border-gray-300 rounded-lg">
                      <option value="all">Filtrar por Rol</option>
                      <option value="estudiante">Estudiante</option>
                      <option value="bibliotecario">Bibliotecario</option>
                      <option value="admin">Administrador</option>
                      <option value="revisor">Revisor</option>
                  </select>

                  <select v-model="filterEstado" class="px-4 py-2 border border-gray-300 rounded-lg">
                      <option value="all">Filtrar por Estado</option>
                      <option value="activo">Activo</option>
                      <option value="pendiente">Pendiente</option>
                  </select>

              </div>
          </div>
          
          <nav class="flex items-center gap-4 border-b border-gray-300 overflow-x-auto whitespace-nowrap">
              <button 
                  @click="setActiveTab('all')" 
                  :class="['tab-button', { 'active-tab': activeTab === 'all' }]"
              >
                  Todos los Usuarios
              </button>
              <button 
                  @click="setActiveTab('estudiante')" 
                  :class="['tab-button', { 'active-tab': activeTab === 'estudiante' }]"
              >
                  Estudiantes
              </button>
              <button 
                  @click="setActiveTab('bibliotecario')" 
                  :class="['tab-button', { 'active-tab': activeTab === 'bibliotecario' }]"
              >
                  Bibliotecarios
              </button>
              <button 
                  @click="setActiveTab('privilegiado')" 
                  :class="['tab-button', { 'active-tab': activeTab === 'privilegiado' }]"
              >
                  Administradores / Revisores
              </button>
              <button 
                  @click="setActiveTab('pending')" 
                  :class="['tab-button', { 'active-tab-pending': activeTab === 'pending' }]"
              >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.398 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                  Solicitudes Pendientes ({{ pendingCountOther }})
              </button>
          </nav>

          <div class="overflow-x-auto bg-white shadow-lg rounded-2xl">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">NOMBRE</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">EMAIL</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">ROL</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">ESTADO</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">FECHA CREACIÓN</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">ACCIONES</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                
                <tr v-if="filteredUsersForTable.length === 0 && activeTab !== 'bibliotecario'">
                  <td colspan="6" class="text-center text-gray-500 px-6 py-4">No se encontraron usuarios que coincidan con los filtros o la búsqueda.</td>
                </tr>

                <template v-if="activeTab === 'bibliotecario'">
                    <tr>
                        <td colspan="6" class="bg-indigo-50/50 px-6 py-2 text-sm font-bold text-[#4626d0]">
                            Bibliotecarios Activos ({{ activeBibliotecarios.length }})
                        </td>
                    </tr>
                    <tr v-if="activeBibliotecarios.length === 0">
                        <td colspan="6" class="text-center text-gray-500 px-6 py-4">No hay bibliotecarios activos.</td>
                    </tr>
                    <tr v-for="user in activeBibliotecarios" :key="user.id" class="hover:bg-indigo-50/20 transition">
                        <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{{ user.username }}</td>
                        <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{{ user.email }}</td>
                        <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                            <span class="font-semibold capitalize">{{ user.rol }}</span>
                        </td>
                        <td class="whitespace-nowrap px-6 py-4 text-sm">
                            <span 
                              class="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                            >
                              <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                              Activo
                            </span>
                        </td>
                        <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{{ user.fecha_creacion }}</td>
                        <td class="whitespace-nowrap px-6 py-4 text-sm font-medium flex items-center space-x-2">
                            <button class="px-3 py-1 bg-[#4626d0] text-white text-xs rounded-lg hover:bg-[#341caa] transition flex items-center">
                              <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg> Editar
                            </button>
                            <button class="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition flex items-center">
                              <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg> Eliminar
                            </button>
                        </td>
                    </tr>

                    <tr>
                        <td colspan="6" class="bg-yellow-50/50 px-6 py-2 text-sm font-bold text-yellow-800 border-t border-yellow-200">
                            Solicitudes Pendientes ({{ pendingBibliotecarios.length }})
                        </td>
                    </tr>
                    <tr v-if="pendingBibliotecarios.length === 0">
                        <td colspan="6" class="text-center text-gray-500 px-6 py-4">No hay solicitudes pendientes de bibliotecarios.</td>
                    </tr>
                    <tr v-for="user in pendingBibliotecarios" :key="user.id" class="hover:bg-yellow-50/20 transition">
                        <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{{ user.username }}</td>
                        <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{{ user.email }}</td>
                        <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                            <span class="font-semibold capitalize">{{ user.rol }}</span>
                        </td>
                        <td class="whitespace-nowrap px-6 py-4 text-sm">
                            <span 
                              class="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                            >
                              <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                              Pendiente
                            </span>
                        </td>
                        <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{{ user.fecha_creacion }}</td>
                        <td class="whitespace-nowrap px-6 py-4 text-sm font-medium flex items-center space-x-2">
                            <button
                              @click="acceptUser(user.id)"
                              class="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition flex items-center"
                              title="Aceptar la solicitud de registro de este usuario"
                            >
                              <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Aceptar
                            </button>
                            <button class="px-3 py-1 bg-[#4626d0] text-white text-xs rounded-lg hover:bg-[#341caa] transition flex items-center">
                              <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg> Editar
                            </button>
                            <button class="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition flex items-center">
                              <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg> Eliminar
                            </button>
                        </td>
                    </tr>
                </template>

                <template v-else>
                    <tr v-for="user in filteredUsersForTable" :key="user.id" class="hover:bg-indigo-50/20 transition">
                        <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{{ user.username }}</td>
                        <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{{ user.email }}</td>
                        <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                            <span class="font-semibold capitalize">{{ user.rol }}</span>
                        </td>
                        <td class="whitespace-nowrap px-6 py-4 text-sm">
                            <span 
                              class="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium"
                              :class="user.estado === 'activo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                            >
                              <svg v-if="user.estado === 'activo'" class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                              <svg v-else class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                              {{ user.estado === 'activo' ? 'Activo' : 'Pendiente' }}
                            </span>
                        </td>
                        <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{{ user.fecha_creacion }}</td>
                        <td class="whitespace-nowrap px-6 py-4 text-sm font-medium flex items-center space-x-2">
                            <button
                              v-if="user.estado === 'pendiente' && activeTab === 'pending'"
                              @click="acceptUser(user.id)"
                              class="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition flex items-center"
                              title="Aceptar la solicitud de registro de este usuario"
                            >
                              <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Aceptar
                            </button>

                            <button class="px-3 py-1 bg-[#4626d0] text-white text-xs rounded-lg hover:bg-[#341caa] transition flex items-center">
                              <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg> Editar
                            </button>
                            <button class="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition flex items-center">
                              <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg> Eliminar
                            </button>
                        </td>
                    </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
// IMPORTACIÓN DEL COMPONENTE SidebarAdmin
import SidebarAdmin from '@/views/admin/Sidebar_admin.vue'

// --- CONFIGURACIÓN DEL SIDEBAR (Se mueve aquí para ser pasado como prop) ---
const isSidebarExpanded = ref(false) 

const sidebarItems = [
    { label: 'Inicio', active: true, dPath: 'M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3m10-10v10a1 1 0 01-1 1h-3' }, 
    { label: 'Libros', active: false, dPath: 'M12 6.253v13M3.461 6.253a6.84 6.84 0 00-.51 1.76l-.169.83H12V6.253zM20.539 6.253v13M12 6.253V19M2.5 19h19' },
    { label: 'Archivos', active: false, dPath: 'M9 12h6m-3-3v6m-4-6h-4a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-8m-12 4h.01' }
];
// -------------------------------------------------------------------------

// --- ESTADOS DE LA TABLA ---
const users = ref([])
const activeTab = ref('all') 
const searchQuery = ref('') 
const filterRol = ref('all') 
const filterEstado = ref('all') 

const mockUsers = [
  { id: 'uuid-1', username: 'cris7294', email: 'cris@ejemplo.com', rol: 'estudiante', fecha_creacion: '2025-11-31', estado: 'activo' },
  { id: 'uuid-2', username: 'gus7294', email: 'gus@ejemplo.com', rol: 'bibliotecario', fecha_creacion: '2025-11-15', estado: 'pendiente' },
  { id: 'uuid-3', username: 'ana_revi', email: 'ana@ejemplo.com', rol: 'revisor', fecha_creacion: '2025-10-20', estado: 'pendiente' },
  { id: 'uuid-4', username: 'juli_est', email: 'juli@ejemplo.com', rol: 'estudiante', fecha_creacion: '2025-10-10', estado: 'activo' },
  { id: 'uuid-5', username: 'superadmin', email: 'admin@ejemplo.com', rol: 'admin', fecha_creacion: '2025-09-01', estado: 'activo' },
  { id: 'uuid-6', username: 'otro_bibliotecario', email: 'otro@ejemplo.com', rol: 'bibliotecario', fecha_creacion: '2025-10-01', estado: 'activo' },
];

const fetchUsers = async () => {
  users.value = mockUsers;
}

// --- LOGIC FUNCTIONS ---
const setActiveTab = (tab) => {
    activeTab.value = tab;
    searchQuery.value = '';
    filterRol.value = 'all';
    filterEstado.value = 'all';
}

const acceptUser = async (userId) => {
  if (userId.startsWith('uuid-')) {
      console.log(`Simulando aceptación de usuario ${userId}`);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const index = users.value.findIndex(u => u.id === userId);
      if (index !== -1) {
          users.value[index].estado = 'activo';
          alert(`Solicitud de ${users.value[index].username} aceptada.`);
          activeTab.value = 'all'; 
      }
      return;
  }
}

// --- PROPIEDADES COMPUTADAS ---

// 1. Conteo de Pendientes (Sólo Admin y Revisor)
const pendingCountOther = computed(() => {
    return users.value.filter(user => 
        user.estado === 'pendiente' && user.rol !== 'estudiante' && user.rol !== 'bibliotecario'
    ).length;
});

// 2. Filtro principal por Pestaña
const filteredByTab = computed(() => {
    const tab = activeTab.value;
    
    if (tab === 'all') {
        return users.value;
    }
    
    if (tab === 'bibliotecario') {
        // Devuelve TODOS los bibliotecarios (activos y pendientes)
        return users.value.filter(user => user.rol === 'bibliotecario');
    }

    if (tab === 'pending') {
        // Solicitudes Pendientes (Admin y Revisor)
        return users.value.filter(user => 
            user.estado === 'pendiente' && user.rol !== 'estudiante' && user.rol !== 'bibliotecario'
        );
    }
    
    if (tab === 'privilegiado') {
        // Administradores y Revisores
        return users.value.filter(user => user.rol === 'admin' || user.rol === 'revisor');
    }
    
    // Estudiantes
    return users.value.filter(user => user.rol === tab);
});

// 3. Filtro Final que aplica búsqueda y selectores
const filteredUsersForTable = computed(() => {
    let filteredList = filteredByTab.value;

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filteredList = filteredList.filter(user => 
            user.username.toLowerCase().includes(query) || 
            user.email.toLowerCase().includes(query)
        );
    }

    if (filterRol.value !== 'all') {
        filteredList = filteredList.filter(user => user.rol === filterRol.value);
    }

    if (filterEstado.value !== 'all') {
        filteredList = filteredList.filter(user => user.estado === filterEstado.value);
    }
    
    return filteredList;
});

// 4. Listas específicas para la agrupación en la pestaña 'bibliotecario'
const activeBibliotecarios = computed(() => {
    const list = activeTab.value === 'bibliotecario' ? filteredUsersForTable.value : [];
    return list.filter(user => user.estado === 'activo');
});

const pendingBibliotecarios = computed(() => {
    const list = activeTab.value === 'bibliotecario' ? filteredUsersForTable.value : [];
    return list.filter(user => user.estado === 'pendiente');
});


onMounted(() => {
  fetchUsers()
})

</script>

<style scoped>
/* ESTILOS PARA LAS PESTAÑAS (TABS) */
.tab-button {
  @apply flex items-center px-4 py-3 font-semibold text-gray-500 border-b-2 border-transparent -mb-px;
  @apply transition-colors duration-200 hover:text-indigo-600 hover:border-indigo-300;
}

.active-tab {
  @apply text-[#4626d0] border-[#4626d0]; 
}

.active-tab-pending {
  @apply text-yellow-800 border-yellow-600 bg-yellow-50/50 rounded-t-lg;
}
</style>