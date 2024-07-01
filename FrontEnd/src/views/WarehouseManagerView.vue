<template>
    <CrudTable 
        :tableTitle="tableTitles.warehouses" 
        :tableColumns="warehouseColumns" 
        :createDialogFields="warehouseCreateFields"
        :tableData="warehouseData" 
        :deleteItem="deleteWarehouse"
        :confirmDeleteDialog="confirmDeleteDialog"
    />
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import CrudTable from '@/components/CrudTable.vue';
import { warehouseColumns, warehouseCreateFields, tableTitles } from '@/utils/warehouseCrudTable.js';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const warehouseData = ref([]);
const toast = useToast();

const fetchWarehouseData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found, redirecting to login.');
        router.push('/login');
        return;
    }
    try {
        const response = await axios.get('http://localhost:8000/show-warehouses/', {
        headers: {
            'Authorization': `Token ${token}`
        }
        });
        warehouseData.value = response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
        console.error('Unauthorized, redirecting to login.');
        router.push('/login');
        } else {
        console.error('Error fetching warehouse data:', error);
        }
    }
};

const deleteWarehouse = async (warehouse) => {
    if (!warehouse) {
        console.error('No warehouse object provided.');
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found, redirecting to login.');
        router.push('/login');
        return;
    }

    try {
        const response = await axios.delete(`http://localhost:8000/delete-warehouse/${warehouse.warehouse_id}/`, {
        headers: {
            'Authorization': `Token ${token}`
        }
        });
        if (response.status === 204) {
        warehouseData.value = warehouseData.value.filter(item => item.warehouse_id !== warehouse.warehouse_id);
        showToast('success', 'Éxito', 'Almacén eliminado correctamente');
        } else {
        showToast('error', 'Error', 'Error al eliminar el almacén');
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
        console.error('Unauthorized, redirecting to login.');
        router.push('/login');
        } else if (error.response && error.response.status === 404) {
        showToast('error', 'Error', 'Almacén no encontrado');
        } else {
        console.error('Error deleting warehouse:', error);
        showToast('error', 'Error', 'Error al eliminar el almacén');
        }
    }
};

const showToast = (severity, summary, detail) => {
    toast.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
};

const confirmDeleteDialog = (data) => {
    console.log('Confirm delete:', data);
};

// Llamamos a fetchWarehouseData al inicio
fetchWarehouseData();
</script>

<style scoped>
/* Estilos opcionales */
</style>
