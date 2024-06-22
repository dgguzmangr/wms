<template>
    <CrudTable 
                :tableTitle="'products'" 
                :tableColumns="productColumns" 
                :createDialogFields="productCreateFields"
                />
</template>

<script>

import CrudTable from '@/components/CrudTable.vue';
import { productColumns } from '@/utils/crudTables.js';
import { productCreateFields } from '@/utils/crudTables.js';

export default {
    name: 'Prueba',
    components: {
        CrudTable,
    },
    data() {
        return {
            productColumns: productColumns,
            productCreateFields: productCreateFields,
        };
    }
}

</script>