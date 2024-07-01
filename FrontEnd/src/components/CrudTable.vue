<template>
    <div>
        <h2 class="text-center p-2">ADMINISTRACIÓN DE {{ tableTitle }}</h2>
        <div class="card">
            <!--Top toolbar-->
            <Toolbar class="mb-3">
                <template #start>
                    <Button label="Crear" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
                    <!--<Button label="Eliminar" icon="pi pi-trash" severity="danger" @click="confirmDeleteItems"
                        :disabled="!selectedItems || !selectedItems.length" />-->
                </template>
                
                <template #end>
                    <Button label="Exportar CSV" icon="pi pi-upload" severity="help" @click="exportCSV($event)" />
                </template>
            </Toolbar>
            <!--DataTable-->
            <DataTable ref="dt" :value="tableData" v-model:selection="selectedItems" dataKey="id" :paginator="true"
                :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5, 10, 25, 50, 75, 100]"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} items">
                <!--Column selector-->
                <template #header>
                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between pb-3">
                        <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                    </div>
                </template>
                <!--<Column selectionMode="multiple" style="width: 3rem" :exportable="false"
                    :headerCheckboxSelection="true" @change="selectAllRows">
                </Column>-->
                <Column v-for="(col, index) of selectedColumns" :field="col.field" :header="col.header"
                    :key="col.field + '_' + index">
                </Column>

                <Column :exportable="false" style="min-width:9rem">
                    <template #body="slotProps" class="flex d-flex justify-content-between">
                        <Button icon="pi pi-pencil" outlined rounded style="background-color: #22C55E; color: #f7f7f7"
                            shape="circle" @click="editItem(slotProps.data)" class="mr-1" />
                        <Button icon="pi pi-trash" outlined rounded style="background-color: #EF4444; color: #f7f7f7"
                            shape="circle" @click="confirmDeleteItem(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
            <!--Create items dialog-->
            <!--<EntityManager :visible="entityManagerVisible" @update:visible="entityManagerVisible = $event" />-->
            <!--Item deletion confirmation dialog-->
            <Dialog v-model:visible="deleteItemDialog" :style="{ width: '450px' }" header="Confirmación" :modal="true">
                <div class="confirmation-content">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                    <span v-if="item">¿Está seguro que desea eliminar este item?</span>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" text @click="deleteItemDialog = false" />
                    <Button label="Si" icon="pi pi-check" text @click="deleteItem" />
                </template>
            </Dialog>
            <!--Multiple item deletion confirmation dialog-->
            <Dialog v-model:visible="deleteItemsDialog" :style="{ width: '450px' }" header="Confirmar eliminación"
                :modal="true">
                <div class="confirmation-content">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                    <span>¿Está seguro que desea eliminar los items seleccionados?</span>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" text @click="deleteItemsDialog = false" />
                    <Button label="Sí" icon="pi pi-check" text @click="deleteSelectedItems" />
                </template>
            </Dialog>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast';
//import EntityManager from '@/components/EntityManager.vue';

const props = defineProps({
    tableTitle: {
        type: String,
        required: true
    },
    tableColumns: {
        type: Object,
        required: true
    },
    createDialogFields: {
        type: Object,
        required: true
    },
    tableData: {
        type: Array,
        required: true
    },
    deleteItem: {
        type: Function,
        required: true
    },
    confirmDeleteDialog: {
        type: Function,
        required: true
    }
});
const confirm = useConfirm();
const toast = useToast();
const dt = ref();
const item = ref({});
const itemDialog = ref(false);
const deleteItemDialog = ref(false);
const deleteItemsDialog = ref(false);
//const entityManagerVisible = ref(false);
const selectedItems = ref([]);
const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const submitted = ref(false);
let selectedColumns = ref([]);

onMounted(() => {
    selectedColumns.value = Object.keys(props.tableColumns).map(field => ({ field, header: props.tableColumns[field] }));
});

const openNew = () => {
    //entityManagerVisible.value = true;
};

const isRequired = (key) => {
    return typeof props.createDialogFields[key] === 'object' && props.createDialogFields[key].required;
};

const hideDialog = () => {
    itemDialog.value = false;
    submitted.value = false;
};

const confirmDeleteItem = (data) => {
    item.value = data;
    deleteItemDialog.value = true;
};

const deleteItem = async () => {
    try {
        await props.deleteItem(item.value);
        item.value = {};
        deleteItemDialog.value = false;
        showToast('success', 'Éxito', 'Elemento eliminado correctamente');
    } catch (error) {
        console.error('Error eliminando el elemento:', error);
        showToast('error', 'Error', 'Error al eliminar el elemento');
    }
};

const showToast = (severity, summary, detail) => {
    toast.add({ severity: severity, summary: summary, detail: detail, life: 3000 });
};

const confirmDeleteItems = () => {
    deleteItemsDialog.value = true;
};

const deleteSelectedItems = async () => {
    try {
        const deletedItems = await Promise.all(selectedItems.value.map(item => props.deleteItem(item)));
        selectedItems.value = [];
        deleteItemsDialog.value = false;
        showToast('success', 'Éxito', 'Elementos seleccionados eliminados correctamente');
    } catch (error) {
        console.error('Error eliminando elementos seleccionados:', error);
        showToast('error', 'Error', 'Error al eliminar elementos seleccionados');
    }
};

const exportCSV = () => {
    dt.value.exportCSV();
};

const editItem = (item) => {
    // Implementa la lógica para editar un elemento
};

const selectAllRows = (event) => {
    if (event.checked) {
        selectedItems.value = [...props.tableData];
    } else {
        selectedItems.value = [];
    }
};

</script>

<style scoped>
/* Estilos opcionales */
</style>
