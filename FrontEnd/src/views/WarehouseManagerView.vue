<template>
    <CrudTable 
        :tableTitle="tableTitle" 
        :tableColumns="warehouseColumns" 
        :createDialogFields="warehouseCreateFields"
        :tableData="warehouseData" 
    />
</template>

<script>
import CrudTable from '@/components/CrudTable.vue';
import { warehouseColumns, warehouseCreateFields, tableTitles } from '@/utils/warehouseCrudTable.js';
import axios from 'axios';

export default {
    name: 'WarehouseManagerView',
    components: {
        CrudTable,
    },
    data() {
        return {
            warehouseColumns: warehouseColumns,
            warehouseCreateFields: warehouseCreateFields,
            tableTitle: tableTitles.warehouses,
            warehouseData: [],
        };
    },
    created() {
        this.fetchWarehouseData();
    },
    methods: {
        async fetchWarehouseData() {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found, redirecting to login.');
                this.$router.push('/login');
                return;
            }
            try {
                const response = await axios.get('http://localhost:8000/show-warehouses/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                console.log('Warehouse data:', response.data);
                this.warehouseData = response.data;
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error('Unauthorized, redirecting to login.');
                    this.$router.push('/login');
                } else {
                    console.error('Error fetching warehouse data:', error);
                }
            }
        }
    }
}
</script>

<style scoped>
/* Estilos opcionales */
</style>
