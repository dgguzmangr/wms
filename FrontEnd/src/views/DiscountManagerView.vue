<template>
    <CrudTable 
        :tableTitle="tableTitles.discounts" 
        :tableColumns="discountColumns" 
        :createDialogFields="discountCreateFields"
        :tableData="discountData" 
        :deleteItem="deleteDiscount"
        :confirmDeleteDialog="confirmDeleteDialog"
    />
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import CrudTable from '@/components/CrudTable.vue';
import { discountColumns, discountCreateFields, tableTitles } from '@/utils/discountCrudTable.js';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const discountData = ref([]);
const toast = useToast();

const fetchDiscountData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found, redirecting to login.');
        router.push('/login');
        return;
    }
    try {
        const response = await axios.get('http://localhost:8000/show-discounts/', {
        headers: {
            'Authorization': `Token ${token}`
        }
        });
        discountData.value = response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
        console.error('Unauthorized, redirecting to login.');
        router.push('/login');
        } else {
        console.error('Error fetching discount data:', error);
        }
    }
};

const deleteDiscount = async (discount) => {
    if (!discount) {
        console.error('No discount object provided.');
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found, redirecting to login.');
        router.push('/login');
        return;
    }

    try {
        const response = await axios.delete(`http://localhost:8000/delete-discount/${discount.discount_id}/`, {
        headers: {
            'Authorization': `Token ${token}`
        }
        });
        if (response.status === 204) {
        discountData.value = discountData.value.filter(item => item.discount_id !== discount.discount_id);
        showToast('success', 'Éxito', 'Descuento eliminado correctamente');
        } else {
        showToast('error', 'Error', 'Error al eliminar el descuento');
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
        console.error('Unauthorized, redirecting to login.');
        router.push('/login');
        } else if (error.response && error.response.status === 404) {
        showToast('error', 'Error', 'Almacén no encontrado');
        } else {
        console.error('Error deleting discount:', error);
        showToast('error', 'Error', 'Error al eliminar el descuento');
        }
    }
};

const showToast = (severity, summary, detail) => {
    toast.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
};

const confirmDeleteDialog = (data) => {
    console.log('Confirm delete:', data);
};


fetchDiscountData();
</script>

<style scoped>
/* Estilos opcionales */
</style>
