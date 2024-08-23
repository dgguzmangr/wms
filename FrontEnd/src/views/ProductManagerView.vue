<template>
    <CrudTable 
        :tableTitle="tableTitles.products" 
        :tableColumns="productColumns" 
        :createDialogFields="productCreateFields"
        :tableData="productData" 
        :deleteItem="deleteProduct"
        :confirmDeleteDialog="confirmDeleteDialog"
        />
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import CrudTable from '@/components/CrudTable.vue';
import { productColumns, productCreateFields, tableTitles } from '@/utils/productCrudTable.js';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const productData = ref([]);
const toast = useToast();

const fetchProductData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found, redirecting to login.');
        router.push('/login');
        return;
    }
    try {
        const response = await axios.get('http://localhost:8000/show-products/', {
        headers: {
            'Authorization': `Token ${token}`
        }
        });
        productData.value = response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
        console.error('Unauthorized, redirecting to login.');
        router.push('/login');
        } else {
        console.error('Error fetching product data:', error);
        }
    }
};

const deleteProduct = async (product) => {
    if (!product) {
        console.error('No product object provided.');
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found, redirecting to login.');
        router.push('/login');
        return;
    }

    try {
        const response = await axios.delete(`http://localhost:8000/delete-product/${product.product_id}/`, {
        headers: {
            'Authorization': `Token ${token}`
        }
        });
        if (response.status === 204) {
        productData.value = productData.value.filter(item => item.product_id !== product.product_id);
        showToast('success', 'Éxito', 'Producto eliminado correctamente');
        } else {
        showToast('error', 'Error', 'Error al eliminar el producto');
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
        console.error('Unauthorized, redirecting to login.');
        router.push('/login');
        } else if (error.response && error.response.status === 404) {
        showToast('error', 'Error', 'Almacén no encontrado');
        } else {
        console.error('Error deleting product:', error);
        showToast('error', 'Error', 'Error al eliminar el producto');
        }
    }
};

const showToast = (severity, summary, detail) => {
    toast.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
};

const confirmDeleteDialog = (data) => {
    console.log('Confirm delete:', data);
};

fetchProductData();
</script>

<style scoped>
/* Estilos opcionales */
</style>