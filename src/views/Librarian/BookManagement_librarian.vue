<template>
  <div class="min-h-screen flex bg-[#FAFAFA] font-sans text-slate-600">
    
    <Sidebar_librarian />

    <div class="flex-1 flex flex-col h-screen overflow-hidden">
      
      <header class="h-20 flex items-center justify-between px-8 bg-white border-b border-slate-200">
        <div>
          <h1 class="text-2xl font-bold text-slate-800">Inventario de Libros</h1>
          <p class="text-sm text-slate-400">Administra el catálogo de la biblioteca</p>
        </div>
        
        <button 
          @click="openCreateModal"
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-200 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
        >
          <Plus :size="20" />
          Nuevo Libro
        </button>
      </header>

      <main class="flex-1 overflow-y-auto p-8">
        
        <div class="mb-6 flex gap-4">
          <div class="relative flex-1 max-w-lg">
            <Search :size="20" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar por título, autor o ISBN..." 
              class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
            />
          </div>
        </div>

        <div v-if="loading" class="flex justify-center py-20">
          <Loader2 :size="40" class="animate-spin text-indigo-600" />
        </div>

        <div v-else class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table class="w-full text-left border-collapse">
            <thead class="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider">
              <tr>
                <th class="px-6 py-4">Título / Autor</th>
                <th class="px-6 py-4">ISBN</th>
                <th class="px-6 py-4">Categoría</th>
                <th class="px-6 py-4 text-center">Ubicación</th>
                <th class="px-6 py-4 text-center">Stock</th>
                <th class="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="libro in libros" :key="libro.id" class="hover:bg-slate-50/80 transition-colors group">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                      <Book :size="20" />
                    </div>
                    <div>
                      <p class="font-bold text-slate-800">{{ libro.titulo }}</p>
                      <p class="text-xs text-slate-400">{{ libro.autor }} ({{ libro.ano_publicacion || 'N/A' }})</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 font-mono text-sm text-slate-500">{{ libro.isbn || '-' }}</td>
                <td class="px-6 py-4">
                  <span class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                    {{ libro.categoria || 'General' }}
                  </span>
                </td>
                <td class="px-6 py-4 text-center text-sm text-slate-600">
                  {{ libro.ubicacion || '-' }}
                </td>
                <td class="px-6 py-4 text-center">
                  <div class="flex flex-col items-center">
                    <span class="font-bold text-slate-700">{{ libro.ejemplares_disponibles }} / {{ libro.ejemplares_totales }}</span>
                    <span class="text-[10px] text-slate-400 uppercase">Disponibles</span>
                  </div>
                </td>
                <td class="px-6 py-4 text-right flex justify-end gap-2">
                  <button @click="openEditModal(libro)" class="text-slate-400 hover:text-indigo-600 p-2 hover:bg-indigo-50 rounded-lg transition-colors" title="Editar">
                    <Edit :size="18" />
                  </button>
                  <button @click="deleteBook(libro.id)" class="text-slate-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar">
                    <Trash2 :size="18" />
                  </button>
                </td>
              </tr>
              <tr v-if="libros.length === 0">
                <td colspan="6" class="px-6 py-12 text-center text-slate-400">
                  No hay libros registrados en el sistema.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </main>

      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in-up">
          
          <div class="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 class="text-xl font-bold text-slate-800">{{ isEditing ? 'Editar Libro' : 'Registrar Nuevo Libro' }}</h2>
            <button @click="closeModal" class="text-slate-400 hover:text-slate-600 transition-colors">
              <X :size="24" />
            </button>
          </div>

          <form @submit.prevent="handleSubmit" class="p-8 space-y-6">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="group col-span-2">
                <label class="label-form">Título del Libro <span class="text-red-500">*</span></label>
                <input v-model="form.titulo" type="text" required class="input-form" placeholder="Ej: Cien años de soledad" />
              </div>
              
              <div class="group">
                <label class="label-form">Autor <span class="text-red-500">*</span></label>
                <input v-model="form.autor" type="text" required class="input-form" placeholder="Ej: Gabriel García Márquez" />
              </div>
              
              <div class="group">
                <label class="label-form">ISBN</label>
                <input v-model="form.isbn" type="text" class="input-form" placeholder="Ej: 978-3-16-148410-0" />
              </div>

              <div class="group">
                <label class="label-form">Editorial</label>
                <input v-model="form.editorial" type="text" class="input-form" placeholder="Ej: Editorial Sudamericana" />
              </div>

              <div class="group">
                <label class="label-form">Año de Publicación</label>
                <input v-model.number="form.ano_publicacion" type="number" class="input-form" placeholder="Ej: 1967" />
              </div>

              <div class="group">
                <label class="label-form">Categoría</label>
                <select v-model="form.categoria" class="input-form">
                  <option value="">Seleccionar...</option>
                  <option value="Novela">Novela</option>
                  <option value="Ciencia">Ciencia</option>
                  <option value="Historia">Historia</option>
                  <option value="Tecnología">Tecnología</option>
                  <option value="Educación">Educación</option>
                </select>
              </div>

              <div class="group">
                <label class="label-form">Ubicación Física</label>
                <input v-model="form.ubicacion" type="text" class="input-form" placeholder="Ej: Pasillo A, Estante 3" />
              </div>

              <div class="group col-span-2">
                <label class="label-form">Cantidad de Ejemplares <span class="text-red-500">*</span></label>
                <input 
                  v-model.number="form.ejemplares_totales" 
                  type="number" 
                  min="1" 
                  required 
                  class="input-form" 
                />
                <p v-if="!isEditing" class="text-xs text-slate-400 mt-1">Se establecerá automáticamente el mismo número como disponibles al crear.</p>
                <p v-else class="text-xs text-slate-400 mt-1">Si el stock total es modificado, el stock disponible debe ser ajustado en la base de datos (no en este formulario).</p>
              </div>
            </div>

            <div class="pt-4 flex justify-end gap-3">
              <button type="button" @click="closeModal" class="btn-secondary">Cancelar</button>
              <button type="submit" :disabled="submitting" class="btn-primary">
                <Loader2 v-if="submitting" class="animate-spin mr-2" :size="18" />
                <span>{{ isEditing ? 'Guardar Cambios' : 'Registrar Libro' }}</span>
              </button>
            </div>

          </form>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Sidebar_librarian from './Sidebar_librarian.vue';
import { useUserStore } from '@/stores/user';
import { Plus, Search, Book, Edit, Trash2, Loader2, X } from 'lucide-vue-next';

const userStore = useUserStore();
const libros = ref([]);
const loading = ref(true);
const showModal = ref(false);
const submitting = ref(false);
const isEditing = ref(false); // Bandera para saber si editamos o creamos
const currentId = ref(null);  // ID del libro que se edita

// Modelo del formulario basado en tu DTO (LibroCrearDTO/LibroUpdateDTO)
const form = ref({
  id: null,
  titulo: '',
  autor: '',
  isbn: '',
  editorial: '',
  ano_publicacion: null,
  categoria: '',
  ubicacion: '',
  ejemplares_totales: 1,
  ejemplares_disponibles: 1, // Se incluye para edición, pero solo se usa en la creación
});

const API_URL = import.meta.env.VITE_APP_API_URL;

// --- 1. CARGAR LIBROS DESDE LA BASE DE DATOS ---
const fetchLibros = async () => {
  loading.value = true;
  try {
    const response = await fetch(`${API_URL}/libros/`);
    if (response.ok) {
      libros.value = await response.json();
    } else {
      console.error("Error al obtener libros");
    }
  } catch (error) {
    console.error('Error de red al cargar libros:', error);
  } finally {
    loading.value = false;
  }
};

// --- 2. GESTIONAR ENVÍO (CREAR / EDITAR) ---
const handleSubmit = async () => {
  submitting.value = true;
  try {
    const method = isEditing.value ? 'PUT' : 'POST';
    const url = isEditing.value ? `${API_URL}/libros/${currentId.value}` : `${API_URL}/libros/`;
    
    let payload = { ...form.value };

    // Lógica para CREAR: Aseguramos que disponibles = totales
    if (!isEditing.value) {
      payload.ejemplares_disponibles = payload.ejemplares_totales;
    } 
    // Lógica para EDITAR: Eliminamos campos que no deberíamos mandar en PUT si están vacíos o son redundantes.
    else {
        // En tu backend (LibroUpdateDTO), los campos son opcionales. Pydantic los manejará.
        delete payload.ejemplares_disponibles; 
    }

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userStore.token}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Error al guardar el libro');
    }

    await fetchLibros(); // Recargar la tabla
    closeModal();
    alert(isEditing.value ? 'Libro actualizado correctamente' : 'Libro registrado correctamente');

  } catch (error) {
    console.error('Error en handleSubmit:', error);
    alert('Operación fallida: ' + error.message);
  } finally {
    submitting.value = false;
  }
};

// --- 3. ELIMINAR LIBRO ---
const deleteBook = async (id) => {
  if (!confirm('¿Estás seguro de eliminar este libro? Esta acción es irreversible y fallará si hay préstamos activos.')) return;

  try {
    const response = await fetch(`${API_URL}/libros/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${userStore.token}`
      }
    });

    if (response.status === 404) throw new Error('El libro ya no existe.');
    if (!response.ok) throw new Error('Error al eliminar (Puede tener préstamos pendientes).');
    
    await fetchLibros(); // Recargar la lista para que se actualice la tabla
    alert('Libro eliminado correctamente');

  } catch (error) {
    console.error('Error al eliminar:', error);
    alert('No se pudo eliminar: ' + error.message);
  }
};


// --- Utilidades del Modal ---
const openCreateModal = () => {
  isEditing.value = false;
  currentId.value = null;
  // Resetear formulario
  form.value = {
    id: null,
    titulo: '', autor: '', isbn: '', editorial: '', ano_publicacion: null, categoria: '', ubicacion: '', ejemplares_totales: 1, ejemplares_disponibles: 1
  };
  showModal.value = true;
};

const openEditModal = (libro) => {
  isEditing.value = true;
  currentId.value = libro.id;
  // Copia profunda para no mutar el objeto original en la tabla
  form.value = { ...libro }; 
  showModal.value = true;
};

const closeModal = () => showModal.value = false;

onMounted(() => {
  fetchLibros();
});
</script>

<style scoped>
.label-form {
  @apply block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2;
}
.input-form {
  @apply w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-medium focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all;
}
.btn-primary {
  @apply px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all flex items-center shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed;
}
.btn-secondary {
  @apply px-6 py-3 text-slate-500 font-bold hover:bg-slate-100 rounded-xl transition-all;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.4s ease-out forwards;
}
</style>