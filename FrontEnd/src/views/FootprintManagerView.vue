<template>
    <CrudTable 
        :tableTitle="tableTitles.footprints" 
        :tableColumns="footprintColumns" 
        :createDialogFields="footprintCreateFields"
        :tableData="footprintData" 
        :deleteItem="deleteFootprint"
        :confirmDeleteDialog="confirmDeleteDialog"
    />
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import CrudTable from '@/components/CrudTable.vue';
import { footprintColumns, footprintCreateFields, tableTitles } from '@/utils/footprintCrudTable.js';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const footprintData = ref([]);
const toast = useToast();

const fetchFootprintData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found, redirecting to login.');
        router.push('/login');
        return;
    }
    try {
        const response = await axios.get('http://localhost:8000/show-footprints/', {
        headers: {
            'Authorization': `Token ${token}`
        }
        });
        footprintData.value = response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
        console.error('Unauthorized, redirecting to login.');
        router.push('/login');
        } else {
        console.error('Error fetching footprint data:', error);
        }
    }
};

const deleteFootprint = async (footprint) => {
    if (!footprint) {
        console.error('No footprint object provided.');
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found, redirecting to login.');
        router.push('/login');
        return;
    }

    try {
        const response = await axios.delete(`http://localhost:8000/delete-footprint/${footprint.footprint_id}/`, {
        headers: {
            'Authorization': `Token ${token}`
        }
        });
        if (response.status === 204) {
            footprintData.value = footprintData.value.filter(item => item.footprint_id !== footprint.footprint_id);
        showToast('success', 'Éxito', 'Huella eliminada correctamente');
        } else {
        showToast('error', 'Error', 'Error al eliminar la huella');
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
        console.error('Unauthorized, redirecting to login.');
        router.push('/login');
        } else if (error.response && error.response.status === 404) {
        showToast('error', 'Error', 'Huella no encontrada');
        } else {
        console.error('Error deleting footprint:', error);
        showToast('error', 'Error', 'Error al eliminar la huella');
        }
    }
};

const showToast = (severity, summary, detail) => {
    toast.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
};

const confirmDeleteDialog = (data) => {
    console.log('Confirm delete:', data);
};


fetchFootprintData();
</script>

<style scoped>
/* Estilos opcionales */
</style>
