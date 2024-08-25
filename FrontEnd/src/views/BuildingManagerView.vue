<template>
    <CrudTable 
        :tableTitle="tableTitles.buildings" 
        :tableColumns="buildingColumns" 
        :createDialogFields="buildingCreateFields"
        :tableData="buildingData" 
        :deleteItem="deleteBuilding"
        :confirmDeleteDialog="confirmDeleteDialog"
    />
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import CrudTable from '@/components/CrudTable.vue';
import { buildingColumns, buildingCreateFields, tableTitles } from '@/utils/buildingCrudTable.js';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const buildingData = ref([]);
const toast = useToast();

const fetchBuildingData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found, redirecting to login.');
        router.push('/login');
        return;
    }
    try {
        const response = await axios.get('http://localhost:8000/show-buildings/', {
        headers: {
            'Authorization': `Token ${token}`
        }
        });
        buildingData.value = response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
        console.error('Unauthorized, redirecting to login.');
        router.push('/login');
        } else {
        console.error('Error fetching building data:', error);
        }
    }
};

const deleteBuilding = async (building) => {
    if (!building) {
        console.error('No building object provided.');
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found, redirecting to login.');
        router.push('/login');
        return;
    }

    try {
        const response = await axios.delete(`http://localhost:8000/delete-building/${building.building_id}/`, {
        headers: {
            'Authorization': `Token ${token}`
        }
        });
        if (response.status === 204) {
            buildingData.value = buildingData.value.filter(item => item.building_id !== building.building_id);
        showToast('success', 'Éxito', 'Edificio eliminado correctamente');
        } else {
        showToast('error', 'Error', 'Error al eliminar el edificio');
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
        console.error('Unauthorized, redirecting to login.');
        router.push('/login');
        } else if (error.response && error.response.status === 404) {
        showToast('error', 'Error', 'Edificio no encontrado');
        } else {
        console.error('Error deleting building:', error);
        showToast('error', 'Error', 'Error al eliminar el edificio');
        }
    }
};

const showToast = (severity, summary, detail) => {
    toast.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
};

const confirmDeleteDialog = (data) => {
    console.log('Confirm delete:', data);
};


fetchBuildingData();
</script>

<style scoped>
/* Estilos opcionales */
</style>
