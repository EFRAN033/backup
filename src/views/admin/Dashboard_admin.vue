<template>
  <div class="min-h-screen flex bg-[#f2f2f2]">
    <aside class="w-20 bg-[#000037] flex flex-col items-center py-5 gap-4">
      <div
        class="w-11 h-11 rounded-lg bg-white/10 flex items-center justify-center text-white text-lg font-bold"
      >
        🎓
      </div>

      <button
        class="w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-white transition"
        aria-label="Contraer"
      >
        <Icon name="chevron-left" size="20" />
      </button>

      <button
        class="w-10 h-10 rounded-xl flex items-center justify-center text-white/85 hover:bg-white/10 transition"
        aria-label="Inicio"
      >
        <Icon name="home" size="24" />
      </button>

      <button
        class="w-10 h-10 rounded-xl flex items-center justify-center text-white/80 hover:bg-white/10 transition"
        aria-label="Libros"
      >
        <Icon name="book-open" size="24" />
      </button>

      <button
        class="w-10 h-10 rounded-xl flex items-center justify-center text-white/80 hover:bg-white/10 transition"
        aria-label="Archivos"
      >
        <Icon name="file-text" size="24" />
      </button>

      <div class="flex-1"></div>

      <button
        class="w-10 h-10 rounded-xl flex items-center justify-center bg-[#4626d0] text-white shadow-md transition"
        aria-label="Perfil"
      >
        <Icon name="user-circle" size="24" />
      </button>
    </aside>

    <div class="flex-1 flex flex-col">
      <header class="h-14 bg-white flex items-center justify-between px-6 border-b">
        <p class="text-sm text-gray-500">
          Gestor / <span class="text-gray-900 font-medium">Usuarios</span>
        </p>
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-[#000037]"></div>
          <div class="text-right leading-tight">
            <p class="text-sm font-medium text-gray-900">Juan Carlos</p>
            <p class="text-xs text-gray-400">Administrador</p>
          </div>
        </div>
      </header>

      <div
        class="h-24 bg-gradient-to-r from-[#4626d0] via-[#341caa] to-[#231383] text-white px-6 flex flex-col justify-center"
      >
        <h1 class="text-xl font-semibold">Gestión de Usuarios</h1>
        <p class="text-sm text-white/90">Administra los usuarios de la biblioteca: estudiantes y bibliotecarios.</p>
      </div>

      <main class="flex-1 bg-[#f2f2f2] px-6 py-8">
        <div class="grid grid-cols-1 gap-4">
          <div class="flex justify-start mb-4">
            <button
              class="px-6 py-2 rounded-lg bg-[#4626d0] text-white text-sm font-semibold hover:bg-[#341caa] transition"
            >
              + Agregar usuario
            </button>
          </div>

          <div class="overflow-x-auto bg-white shadow-sm rounded-2xl">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">NOMBRE</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">EMAIL</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">ROL</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">ESTADO</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">FECHA CREACIÓN</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">ACCIONES</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                
                <tr v-if="users.length === 0">
                  <td colspan="6" class="text-center text-gray-500 px-6 py-4">Cargando usuarios o no hay datos.</td>
                </tr>

                <tr v-for="user in users" :key="user.id">
                  <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{{ user.username }}</td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{{ user.rol }}</td>
                  
                  <td class="whitespace-nowrap px-6 py-4 text-sm">
                    <span 
                      class="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium"
                      :class="user.estado === 'activo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                    >
                      {{ user.estado === 'activo' ? 'Activo' : 'Pendiente' }}
                    </span>
                  </td>
                  
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{{ user.fecha_creacion }}</td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm font-medium">
                    
                    <button
                      v-if="user.rol !== 'estudiante' && user.estado === 'pendiente'"
                      @click="acceptUser(user.id)"
                      class="px-4 py-2 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition mr-2"
                      title="Aceptar la solicitud de registro de este usuario"
                    >
                      Aceptar
                    </button>

                    <button class="px-4 py-2 bg-[#4626d0] text-white text-xs rounded-lg hover:bg-[#341caa] transition">
                      Editar
                    </button>
                    <button class="px-4 py-2 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition ml-2">
                      Eliminar
                    </button>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// Importa el cliente de Axios que configuraste
import apiClient from '@/axios' 
// Opcional: Importa Toast para notificaciones (si usas vue-toastification)
// import { useToast } from 'vue-toastification' 

// Define un array reactivo para almacenar los usuarios
const users = ref([])
// const toast = useToast()

// --- MOCK DATA (Simula la respuesta del backend) ---
const mockUsers = [
  { id: 'uuid-1', username: 'cris7294', email: 'cris@ejemplo.com', rol: 'estudiante', fecha_creacion: '2025-11-31', estado: 'activo' },
  { id: 'uuid-2', username: 'gus7294', email: 'gus@ejemplo.com', rol: 'bibliotecario', fecha_creacion: '2025-11-15', estado: 'pendiente' },
  { id: 'uuid-3', username: 'ana_revi', email: 'ana@ejemplo.com', rol: 'revisor', fecha_creacion: '2025-10-20', estado: 'pendiente' },
  { id: 'uuid-4', username: 'juli_est', email: 'juli@ejemplo.com', rol: 'estudiante', fecha_creacion: '2025-10-10', estado: 'activo' },
  { id: 'uuid-5', username: 'superadmin', email: 'admin@ejemplo.com', rol: 'admin', fecha_creacion: '2025-09-01', estado: 'activo' },
];

// --- FUNCIÓN PARA CARGAR USUARIOS ---
const fetchUsers = async () => {
  try {
      // Simulación: Si tienes un endpoint real, usa: 
      // const response = await apiClient.get('/users?role=all');
      // users.value = response.data;

      // Usamos datos simulados mientras integras el backend
      users.value = mockUsers;
      
  } catch (error) {
      console.error("Error al cargar usuarios:", error);
      // toast.error("Error al cargar la lista de usuarios.");
  }
}

// --- LÓGICA PARA ACEPTAR EL REGISTRO (activar el usuario) ---
const acceptUser = async (userId) => {
  // Si usas el Mock, primero simula la llamada a la API
  if (userId.startsWith('uuid-')) {
      console.log(`Simulando PATCH /users/${userId} con estado: activo`);
      
      // Simulación de respuesta exitosa de 300ms
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Actualiza el estado en el frontend
      const index = users.value.findIndex(u => u.id === userId);
      if (index !== -1) {
          users.value[index].estado = 'activo';
          alert(`✅ Solicitud de ${users.value[index].username} (ID: ${userId}) aceptada.`);
          // toast.success(`Usuario ${users.value[index].username} aceptado.`);
      }
      return;
  }

  // LÓGICA DE PRODUCCIÓN (Descomentar y ajustar cuando el backend esté listo)
  /*
  try {
    const response = await apiClient.patch(`/users/${userId}/accept`); // O el endpoint que tu API use

    if (response.status === 200) {
      const index = users.value.findIndex(u => u.id === userId);
      if (index !== -1) {
        users.value[index].estado = 'activo';
        // toast.success(`Usuario ${users.value[index].username} aceptado.`);
      }
    }
  } catch (error) {
    console.error("Error al aceptar usuario:", error);
    // toast.error("Fallo al aceptar la solicitud.");
  }
  */
}

// Cargar los usuarios al montar el componente
onMounted(() => {
  fetchUsers()
})

// Exportamos los hooks/componentes usados en la plantilla
import { ref } from 'vue'

</script>