<!--
<template>
    <h2 class="text-center">ADMINISTRACIÓN DE BODEGAS</h2>
    <div class="card">
        <DataTable :value="warehouse" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}">
            <template #paginatorstart>
                <Button type="button" icon="pi pi-refresh" text />
            </template>
            <template #paginatorend>
                <Button type="button" icon="pi pi-download" text />
            </template>
            <Column field="name" header="Nombre" sortable style="width: 25%"></Column>
            <Column field="country" header="País" sortable style="width: 25%"></Column>
            <Column field="City" header="Ciudad" sortable style="width: 25%"></Column>
            <Column field="neighborhood" header="Barrio" sortable style="width: 25%"></Column>
            <Column field="address" header="Direcciòn" sortable style="width: 25%"></Column>
            <Column field="phone" header="Teléfono" sortable style="width: 25%"></Column>
        </DataTable>
    </div>
</template>
-->









<template>
    <div>
        <h2 class="text-center">ADMINISTRACIÓN DE BODEGAS</h2>
        <div class="card">
            <Toolbar class="mb-4">
                <template #start>
                    <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected"
                        :disabled="!selectedObjects || !selectedObjects.length" />
                </template>
                <template #end>
                    <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV($event)" />
                </template>
            </Toolbar>
            
            
            
            <DataTable ref="dt" :value="objects" v-model:selection="selectedObjects" dataKey="id" :paginator="true" :rows="10" :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5,10,25,50,75,100]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} carriers">
                <template #header>
                    <!--
                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                        <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                    </div>
                    -->
                    <div style="text-align:left" class="overflow-auto">
                        <MultiSelect :modelValue="selectedColumns" :options="columns" optionLabel="header" @update:modelValue="onToggle"
                            display="chip" placeholder="Select Columns"/>
                    </div>
                </template>
                <Column field="code" header="Code" />
                <Column v-for="(col, index) of selectedColumns" :field="col.field" :header="col.header" :key="col.field + '_' + index"></Column>
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2"
                            @click="editObject(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                            @click="confirmDeleteObject(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>
        <Dialog v-model:visible="objectDialog" :style="{width: '450px'}" header="Detalles del inventario"
            :modal="true" class="p-fluid">
            <div class="field">
                <label for="name">Nombre</label>
                <InputText id="name" v-model.trim="object.name" required="true" autofocus
                    :class="{'p-invalid': submitted && !object.name}" />
                <small class="p-error" v-if="submitted && !object.name">El nombre es requerido.</small>
            </div>
            <div class="field">
                <label for="name">Nombre</label>
                <InputText id="name" v-model.trim="carrier.name" required="true" autofocus
                    :class="{'p-invalid': submitted && !carrier.name}" />
                <small class="p-error" v-if="submitted && !carrier.name">El nombre es requerido.</small>
            </div>
            <div class="field">
                <label for="country" class="mb-3">País</label>
                <Dropdown id="country" v-model="carrier.country" :options="countries" placeholder="Seleccione un país" @change="onCountryChange">
                    <template>
                        <div v-if="slotProps.value && slotProps.value.value">
                            <Tag :value="slotProps.value.value"/>
                        </div>
                        <div v-else-if="slotProps.value && !slotProps.value.value">
                            <Tag :value="slotProps.value"/>
                        </div>
                        <span v-else>
                            {{slotProps.placeholder}}
                        </span>
                    </template>
                </Dropdown>
            </div>
            <div class="field">
                <label for="city" class="mb-3">Departamento</label>
                <Dropdown id="city" v-model="carrier.department" :options="filteredCities" placeholder="Seleccione un departamento">
                    <template>
                        <div v-if="slotProps.value && slotProps.value.value">
                            <Tag :value="slotProps.value.value"/>
                        </div>
                        <div v-else-if="slotProps.value && !slotProps.value.value">
                            <Tag :value="slotProps.value"/>
                        </div>
                        <span v-else>
                            {{slotProps.placeholder}}
                        </span>
                    </template>
                </Dropdown>
            </div>
            <div class="field">
                <label for="city" class="mb-3">Ciudad</label>
                <Dropdown id="city" v-model="carrier.city" :options="filteredCities" placeholder="Seleccione una ciudad">
                    <template>
                        <div v-if="slotProps.value && slotProps.value.value">
                            <Tag :value="slotProps.value.value"/>
                        </div>
                        <div v-else-if="slotProps.value && !slotProps.value.value">
                            <Tag :value="slotProps.value"/>
                        </div>
                        <span v-else>
                            {{slotProps.placeholder}}
                        </span>
                    </template>
                </Dropdown>
            </div>
            <div class="field">
                <label for="neighborhood">Barrio</label>
                <InputText id="neighborhood" v-model.trim="carrier.neighborhood" required="true" autofocus
                    :class="{'p-invalid': submitted && !carrier.neighborhood}" />
                <small class="p-error" v-if="submitted && !carrier.neighborhood">El barrio es requerido.</small>
            </div>
            <div class="field">
                <label for="address">Dirección</label>
                <InputText id="address" v-model.trim="carrier.address" required="true" autofocus
                    :class="{'p-invalid': submitted && !carrier.address}" />
                <small class="p-error" v-if="submitted && !carrier.address">La dirección es requerida.</small>
            </div>
            <div class="field">
                <label for="phone">Teléfono</label>
                <InputText id="phone" v-model.trim="carrier.phone" required="true" autofocus
                    :class="{'p-invalid': submitted && !carrier.phone}" />
                <small class="p-error" v-if="submitted && !carrier.phone">El teléfono es requerido.</small>
            </div>
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Guardar" icon="pi pi-check" text @click="saveCarrier" />
            </template>
        </Dialog>
        <Dialog v-model:visible="deleteCarrierDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product">Está seguro que desea eliminar <b>{{carrier.name}}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteCarrierDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteCarrier" />
            </template>
        </Dialog>
        <Dialog v-model:visible="deletecarriersDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product">Esta seguro que desea eliminar los transportadores seleccionados?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deletecarriersDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteselectedCarriers" />
            </template>
        </Dialog>



    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';


onMounted(() => {
//    ProductService.getProductsMini().then((data) => (products.value = data));
});

const columns = ref([
    {field: 'name', header: 'Nombre'},
    {field: 'SKU', header: 'SKU'},
    {field: 'long_desc', header: 'Descripción larga'},
    {field: 'short_desc', header: 'Descripción corta'},
    {field: 'long_desc', header: 'Descripción larga'},
    {field: 'long', header: 'Largo'},
    {field: 'high', header: 'Alto'},
    {field: 'width', header: 'Ancho'},
    {field: 'weight', header: 'Peso'},
    {field: 'volume', header: 'Volumen'}
]);
const selectedColumns = ref(columns.value);
const products = ref();
const onToggle = (val) => {
    selectedColumns.value = columns.value.filter(col => val.includes(col));
};

</script>
