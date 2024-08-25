<template>
    <CrudTable 
        :tableTitle="tableTitles.taxes" 
        :tableColumns="taxColumns" 
        :createDialogFields="taxCreateFields"
        :tableData="taxData" 
        :deleteItem="deleteTax"
        :confirmDeleteDialog="confirmDeleteDialog"
    />
    <CreateObjectDialog 
        :visible="createDialogVisible" 
        title="Crear Impuesto" 
        :fields="taxCreateFields" 
        @close="createDialogVisible = false"
        @create="createTax" />
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import CrudTable from '@/components/CrudTable.vue';
//import CreateObjectDialog from '@/components/CreateObjectDialog.vue'; //comentar esto para regresar sin errores
import { taxColumns, taxCreateFields, tableTitles } from '@/utils/taxCrudTable.js';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const taxData = ref([]);
const toast = useToast();
const createDialogVisible = ref(false);

const fetchTaxData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found, redirecting to login.');
        router.push('/login');
        return;
    }
    try {
        const response = await axios.get('http://localhost:8000/show-taxes/', {
        headers: {
            'Authorization': `Token ${token}`
        }
        });
        taxData.value = response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
        console.error('Unauthorized, redirecting to login.');
        router.push('/login');
        } else {
        console.error('Error fetching tax data:', error);
        }
    }
};

const createTax = async (newTaxData) => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found, redirecting to login.');
        router.push('/login');
        return;
    }

    try {
        const response = await axios.post('http://localhost:8000/create-tax/', newTaxData, {
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 201) {
            // Añadir el nuevo impuesto a la lista
            taxData.value.push(response.data);
            showToast('success', 'Éxito', 'Impuesto creado correctamente');
        } else {
            showToast('error', 'Error', 'Error al crear el impuesto');
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized, redirecting to login.');
            router.push('/login');
        } else {
            console.error('Error creating tax:', error);
            showToast('error', 'Error', 'Error al crear el impuesto');
        }
    }
};

const deleteTax = async (tax) => {
    if (!tax) {
        console.error('No tax object provided.');
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found, redirecting to login.');
        router.push('/login');
        return;
    }

    try {
        const response = await axios.delete(`http://localhost:8000/delete-tax/${tax.tax_id}/`, {
        headers: {
            'Authorization': `Token ${token}`
        }
        });
        if (response.status === 204) {
            taxData.value = taxData.value.filter(item => item.tax_id !== tax.tax_id);
        showToast('success', 'Éxito', 'Impuesto eliminado correctamente');
        } else {
        showToast('error', 'Error', 'Error al eliminar el impuesto');
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
        console.error('Unauthorized, redirecting to login.');
        router.push('/login');
        } else if (error.response && error.response.status === 404) {
        showToast('error', 'Error', 'Impuesto no encontrado');
        } else {
        console.error('Error deleting tax:', error);
        showToast('error', 'Error', 'Error al eliminar el impuesto');
        }
    }
};

const showToast = (severity, summary, detail) => {
    toast.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
};

const confirmDeleteDialog = (data) => {
    console.log('Confirm delete:', data);
};


fetchTaxData();
</script>

<style scoped>
/* Estilos opcionales */
</style>
