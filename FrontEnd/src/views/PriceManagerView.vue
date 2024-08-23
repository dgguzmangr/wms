<template>
    <CrudTable 
        :tableTitle="tableTitles.prices" 
        :tableColumns="priceColumns" 
        :createDialogFields="priceCreateFields"
        :tableData="priceData" 
        :deleteItem="deletePrice"
        :confirmDeleteDialog="confirmDeleteDialog"
    />
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import CrudTable from '@/components/CrudTable.vue';
import { priceColumns, priceCreateFields, tableTitles } from '@/utils/priceCrudTable.js';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const priceData = ref([]);
const toast = useToast();

const fetchPriceData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found, redirecting to login.');
        router.push('/login');
        return;
    }
    try {
        const response = await axios.get('http://localhost:8000/show-prices/', {
        headers: {
            'Authorization': `Token ${token}`
        }
        });
        priceData.value = response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
        console.error('Unauthorized, redirecting to login.');
        router.push('/login');
        } else {
        console.error('Error fetching price data:', error);
        }
    }
};

const deletePrice = async (price) => {
    if (!price) {
        console.error('No price object provided.');
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found, redirecting to login.');
        router.push('/login');
        return;
    }

    try {
        const response = await axios.delete(`http://localhost:8000/delete-price/${price.price_id}/`, {
        headers: {
            'Authorization': `Token ${token}`
        }
        });
        if (response.status === 204) {
            priceData.value = priceData.value.filter(item => item.price_id !== price.price_id);
        showToast('success', 'Éxito', 'Precio eliminado correctamente');
        } else {
        showToast('error', 'Error', 'Error al eliminar el precio');
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
        console.error('Unauthorized, redirecting to login.');
        router.push('/login');
        } else if (error.response && error.response.status === 404) {
        showToast('error', 'Error', 'Precio no encontrado');
        } else {
        console.error('Error deleting price:', error);
        showToast('error', 'Error', 'Error al eliminar el precio');
        }
    }
};

const showToast = (severity, summary, detail) => {
    toast.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
};

const confirmDeleteDialog = (data) => {
    console.log('Confirm delete:', data);
};


fetchPriceData();
</script>

<style scoped>
/* Estilos opcionales */
</style>
