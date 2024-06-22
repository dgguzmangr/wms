<template>
    <CrudTable 
                :tableTitle="'warehouses'" 
                :tableColumns="userColumns" 
                :createDialogFields="userCreateFields"
                />
</template>

<script>

import CrudTable from '@/components/CrudTable.vue';
import { userColumns } from '@/utils/crudTables.js';
import { userCreateFields } from '@/utils/crudTables.js';

export default {
    name: 'Prueba',
    components: {
        CrudTable,
    },
    data() {
        return {
            userColumns: userColumns,
            userCreateFields: userCreateFields,
        };
    }
}

</script>