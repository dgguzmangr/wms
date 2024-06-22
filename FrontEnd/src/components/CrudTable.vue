<template>
    <div>
        <h2 class="text-center p-2">{{ tableTitle }}</h2>
        <div class="card">
            <!--Top toolbar-->
            <Toolbar class="mb-3">
                <template #start>
                    <Button label="Crear" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
                    <Button label="Eliminar" icon="pi pi-trash" severity="danger" @click="confirmDeleteItems"
                        :disabled="!selectedItems || !selectedItems.length" />
                </template>
                <template #end>
                    <Button label="Exportar CSV" icon="pi pi-upload" severity="help" @click="exportCSV($event)" />
                </template>
            </Toolbar>
            <!--DataTable-->
            <DataTable 
                ref="dt" :value="items" 
                v-model:selection="selectedItems" 
                dataKey="id" 
                :paginator="true" 
                :rows="10" 
                :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5,10,25,50,75,100]"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} items">
                    <!--Column selector-->
                    <template #header>
                        <div class="flex flex-wrap gap-2 align-items-center justify-content-between pb-3">
                            <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                        </div>
                        <div style="text-align:left" class="overflow-auto">
                            <!--<MultiSelect 
                                        :modelValue="selectedColumns" 
                                        :options="userColumns" 
                                        optionLabel="label"
                                        @update:modelValue="onToggle"
                                        display="default"
                                        placeholder="Select Columns"/>-->
                        </div>
                    </template>
                    <Column 
                            selectionMode="multiple"
                            style="width: 3rem" 
                            :exportable="false" 
                            :headerCheckboxSelection="selectAll" 
                            @click.stop="selectAllRows">
                    </Column>
                    <!--<Column field="code" header="Código" />-->
                    <Column v-for="(col, index) of selectedColumns" :field="col.field" :header="col.header" :key="col.field + '_' + index">
                    </Column>
                    <Column :exportable="false" style="min-width:9rem">
                        <template #body="slotProps" class="flex d-flex justify-content-between">
                            <Button icon="pi pi-pencil" outlined rounded style="background-color: #22C55E; color: #f7f7f7" shape="circle" @click="editObject(slotProps.data)" class="mr-1"/>
                            <Button icon="pi pi-trash" outlined rounded style="background-color: #EF4444; color: #f7f7f7" shape="circle" @click="ConfirmDeleteDialog(slotProps.data)"/>
                        </template>
                    </Column>
            </DataTable>
            <!--Create items dialog-->
            <Dialog 
                v-model:visible="itemDialog" 
                :style="{ width: '450px' }" 
                :header="'DETALLES DE ' + tableTitle" 
                :modal="true" 
                class="p-fluid">
                <template v-slot:header>
                    <h5 style="text-align: center">{{ 'DETALLES DE ' + tableTitle }}</h5>
                </template>
                <div v-for="(value, key) in createDialogFields" :key="key">
                    <div v-if="typeof value === 'string'">
                        <label :for="key">{{ value }}</label>
                        <InputText 
                        :id="key" 
                        v-model.trim="item[key]" 
                        :class="{ 'p-invalid': submitted && !item[key] }"
                        :required="isRequired(key)"
                        autofocus 
                        />
                        <small class="p-error" v-if="submitted && !item[key]">Campo requerido.</small>
                    </div>
                    <div v-else>
                        <label :for="key" class="mb-3">{{ value.label }}</label>
                        <Dropdown
                            :id="key"
                            v-model="item[key]"
                            :options="value.options"
                            optionLabel="label"
                            :placeholder="'Seleccione ' + value.label"
                            :required="isRequired(key)">
                        </Dropdown>
                    </div>
                </div>
                    <div class="flex d-flex justify-content-between">
                    <Button label="Ubicación" icon="pi pi-map-marker" severity="primary" class="mx-1" @click="" />
                </div>
                <template #footer>
                    <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
                    <Button label="Guardar" icon="pi pi-check" text @click="saveUser" />
                </template>
            </Dialog>
            <!--Item deletion confirmation dialog-->
            <Dialog v-model:visible="deleteItemDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
                <div class="confirmation-content">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                    <span v-if="product">¿Está seguro que desea eliminar este item?</span>
                </div>
                <template #footer>
                    <Button label="No" icon="pi pi-times" text @click="deleteItemDialog = false" />
                    <Button label="Yes" icon="pi pi-check" text @click="deleteItem" />
                </template>
            </Dialog>
            <!--Multiple item deletion confirmation dialog-->
            <!---->
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast';
import { tableTitles } from '@/utils/crudTables.js';

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
    }
});
const confirm = useConfirm();
const toast = useToast();
const dt = ref();
const items = ref([]);
const item = ref();
const itemDialog = ref(false);
const deleteItemDialog = ref(false);
const selectAll = ref(false);
const deleteItemsDialog = ref(false);
const selectedItems = ref();
const filters = ref({
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});
const submitted = ref(false);
let selectedColumns;
const onToggle = (val) => {
    selectedColumns.value = val.map(field => ({ field, header: props.tableColumns[field] }));
};
const tableTitle = `ADMINISTRACIÓN DE ${tableTitles[props.tableTitle]}`;
selectedColumns = ref(Object.keys(props.tableColumns).map(field => ({ field, header: props.tableColumns[field] })));

onMounted(() => {
});

const openNew = () => {
    item.value = {};
    submitted.value = false;
    itemDialog.value = true;
};

const isRequired = (key) => {
  return typeof props.createDialogFields[key] === 'object' && props.createDialogFields[key].required;
};

const hideDialog = () => {
    itemDialog.value = false;
    submitted.value = false;
};

const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < items.value.length; i++) {
        if (items.value[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
};

const exportCSV = () => {
    dt.value.exportCSV();
};

const editItem = (prod) => {
    item.value = {...prod};
    itemDialog.value = true;
};

const confirmDeleteItem = (prod) => {
    item.value = prod;
    deleteItemDialog.value = true;
};

const requireDeleteConfirmation = () => {
    confirm.require({
        group: 'headless',
        header: '¿Está seguro que desea eliminar este item?',
        message: 'Eliminar.',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Item eliminado', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'Eliminación cancelada', life: 3000 });
        }
    });
};

const deleteItem = () => {
    items.value = items.value.filter(val => val.id !== item.value.id);
    deleteItemDialog.value = false;
    item.value = {};
    toast.add({severity:'success', summary: 'Successful', detail: 'Item eliminado', life: 3000});
};

const confirmDeleteSelected = () => {
    selectAll.value = true;
    deleteitemsDialog.value = true;
};

const deleteselectedItems = () => {
    if (selectAll.value) {
        items.value = [];
    } else {
        items.value = items.value.filter(val => !selectedItems.value.includes(val));
    }
    deleteitemsDialog.value = false;
    selectedItems.value = null;
    selectAll.value = false;
    toast.add({severity:'success', summary: 'Successful', detail: 'Items eliminados', life: 3000});
};

</script>

<style>
.icon-small .pi {
    font-size: 50%; /* Ajusta el tamaño del icono según sea necesario */
}
</style>