<template>
    <CrudTable :tableTitle="'warehouses'" :tableColumns="warehouseColumns" :createDialogFields="warehouseCreateFields"
        :tableData="warehouseData" />
</template>

<script>
import CrudTable from '@/components/CrudTable.vue';
import { warehouseColumns, warehouseCreateFields, tableTitle } from '@/utils/warehouseCrudTable.js';
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
            tableTitle: tableTitle,
            warehouseData: [],
        };
    },
    created() {
        this.fetchWarehouseData();
    },
    methods: {
        async fetchWarehouseData() {
            try {
                const token = localStorage.getItem('token'); // Obtén el token de autorización desde localStorage
                const response = await axios.get('http://localhost:8000/show-warehouses/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.warehouseData = response.data;
            } catch (error) {
                console.error('Error fetching warehouse data:', error);
            }
        }
    }
}
</script>

<style scoped>
/* Estilos opcionales */
</style>
