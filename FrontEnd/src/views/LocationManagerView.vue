<template>
    <CrudTable 
        :tableTitle="tableTitles.locations" 
        :tableColumns="locationColumns" 
        :createDialogFields="locationCreateFields"
        :tableData="locationData" 
        :deleteItem="deleteLocation"
        :confirmDeleteDialog="confirmDeleteDialog"
    />
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import CrudTable from '@/components/CrudTable.vue';
import { locationColumns, locationCreateFields, tableTitles } from '@/utils/locationCrudTable.js';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const locationData = ref([]);
const toast = useToast();

const fetchLocationData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found, redirecting to login.');
        router.push('/login');
        return;
    }
    try {
        const response = await axios.get('http://localhost:8000/show-locations/', {
        headers: {
            'Authorization': `Token ${token}`
        }
        });
        locationData.value = response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
        console.error('Unauthorized, redirecting to login.');
        router.push('/login');
        } else {
        console.error('Error fetching location data:', error);
        }
    }
};

const deleteLocation = async (location) => {
    if (!location) {
        console.error('No location object provided.');
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found, redirecting to login.');
        router.push('/login');
        return;
    }

    try {
        const response = await axios.delete(`http://localhost:8000/delete-location/${location.location_id}/`, {
        headers: {
            'Authorization': `Token ${token}`
        }
        });
        if (response.status === 204) {
            locationData.value = locationData.value.filter(item => item.location_id !== location.location_id);
        showToast('success', 'Éxito', 'Ubicación eliminada correctamente');
        } else {
        showToast('error', 'Error', 'Error al eliminar la ubicación');
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
        console.error('Unauthorized, redirecting to login.');
        router.push('/login');
        } else if (error.response && error.response.status === 404) {
        showToast('error', 'Error', 'Ubicación no encontrada');
        } else {
        console.error('Error deleting location:', error);
        showToast('error', 'Error', 'Error al eliminar la ubicación');
        }
    }
};

const showToast = (severity, summary, detail) => {
    toast.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
};

const confirmDeleteDialog = (data) => {
    console.log('Confirm delete:', data);
};


fetchLocationData();
</script>

<style scoped>
/* Estilos opcionales */
</style>
