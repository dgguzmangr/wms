<!--
<template>
    <h2 class="text-center">ADMINISTRACIÓN DE USUARIOS</h2>
    <div class="card">
        <DataTable :value="users" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 50rem"
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}">
            <template #paginatorstart>
                <Button type="button" icon="pi pi-refresh" text />
            </template>
            <template #paginatorend>
                <Button type="button" icon="pi pi-download" text />
            </template>
            <Column field="user" header="Usuario" sortable style="width: 25%"></Column>
            <Column field="email" header="Correo electrónico" sortable style="width: 25%"></Column>
            <Column field="name" header="Nombres" sortable style="width: 25%"></Column>
            <Column field="last_name" header="Apellidos" sortable style="width: 25%"></Column>
            <Column field="country" header="País" sortable style="width: 25%"></Column>
            <Column field="City" header="Ciudad" sortable style="width: 25%"></Column>
        </DataTable>
    </div>
</template>
-->


<template>
    <div>
        <h2 class="text-center">ADMINISTRACIÓN DE USUARIOS</h2>
        <div class="card">
            <!--Barra de botones-->
            <Toolbar class="mb-4">
                <template #start>
                    <Button label="Crear" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
                    <Button label="Eliminar" icon="pi pi-trash" severity="danger" @click="confirmDeleteUser"
                        :disabled="!selectedUsers || !selectedUsers.length" />
                </template>
                <template #end>
                    <Button label="Exportar CSV" icon="pi pi-upload" severity="help" @click="exportCSV($event)" />
                </template>
            </Toolbar>
            <!--Tabla-->
            <DataTable ref="dt" :value="users" v-model:selection="selectedUsers" dataKey="id" :paginator="true" :rows="10" :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5,10,25,50,75,100]"
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} usuarios">
                <!--Selector de columnas-->
                <template #header>
                    <!---->
                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between pb-3">
                        <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                    </div>
                    <!---->
                    <div style="text-align:left" class="overflow-auto">
                        <MultiSelect :modelValue="selectedColumns" :options="columns" optionLabel="header" @update:modelValue="onToggle"
                            display="chip" placeholder="Select Columns"/>   
                    </div>
                </template>
                <Column selectionMode="multiple" style="width: 3rem" :exportable="false" :headerCheckboxSelection="selectAll" @click.stop="selectAllRows"></Column>
                <!--<Column field="code" header="Código" />-->
                <Column v-for="(col, index) of selectedColumns" :field="col.field" :header="col.header" :key="col.field + '_' + index"></Column>
                <Column :exportable="false" style="min-width:9rem">
                    <template #body="slotProps" class="flex d-flex justify-content-between">
                        <Button icon="pi pi-pencil" outlined rounded style="background-color: #22C55E; color: #f7f7f7" shape="circle" @click="editObject(slotProps.data)" class="mr-1"/>
                        <Button icon="pi pi-trash" outlined rounded style="background-color: #EF4444; color: #f7f7f7" shape="circle" @click="ConfirmDeleteDialog(slotProps.data)"/>
                    </template>
                </Column>
            </DataTable>
        </div>
        <!--Dialogo para crear nuevos usuarios-->
        <Dialog v-model:visible="userDialog" :style="{width: '450px'}" header="Detalles de usuario"
            :modal="true" class="p-fluid">
            <div class="field">
                <label for="type" class="mb-3">Tipo</label>
                <Dropdown id="type" v-model="user.type" :options="types" optionLabel="label" placeholder="Seleccione un tipo" required="true">
                    <template>
                        <div v-if="slotProps.value && slotProps.value.value">
                            <Tag :value="slotProps.value.value" :severity="getTypeLabel(slotProps.value.label)"/>
                        </div>
                        <div v-else-if="slotProps.value && !slotProps.value.value">
                            <Tag :value="slotProps.value" :severity="getTypeLabel(slotProps.value)"/>
                        </div>
                        <span v-else>
                            {{slotProps.placeholder}}
                        </span>
                    </template>
                </Dropdown>
            </div>
            <div class="field">
                <label for="company_name">Razón social</label>
                <InputText id="company_name" v-model.trim="user.company_name" required="true" autofocus
                    :class="{'p-invalid': submitted && !user.company_name}" />
                <small class="p-error" v-if="submitted && !user.company_name">Campo requerido.</small>
            </div>
            <div class="field">
                <label for="name">Nombres</label>
                <InputText id="name" v-model.trim="user.name" required="true" autofocus
                    :class="{'p-invalid': submitted && !user.name}" />
                <small class="p-error" v-if="submitted && !user.name">Campo requerido.</small>
            </div>
            <div class="field">
                <label for="last_name">Apellidos</label>
                <InputText id="last_name" v-model.trim="user.last_name" required="true" autofocus
                    :class="{'p-invalid': submitted && !user.last_name}" />
                <small class="p-error" v-if="submitted && !user.last_name">Campo requerido.</small>
            </div>
            <div class="field">
                <label for="document">Documento</label>
                <InputText id="document" v-model.trim="user.document" required="true" autofocus
                    :class="{'p-invalid': submitted && !user.document}" />
                <small class="p-error" v-if="submitted && !user.document">Campo requerido.</small>
            </div>
            <div class="field">
                <label for="nit">NIT</label>
                <InputText id="nit" v-model.trim="user.nit" required="true" autofocus
                    :class="{'p-invalid': submitted && !user.name}" />
                <small class="p-error" v-if="submitted && !user.nit">Campo requerido.</small>
            </div>
            <div class="field">
                <label for="email">Correo electrónico</label>
                <InputText id="email" v-model.trim="user.email" required="true" autofocus
                    :class="{'p-invalid': submitted && !user.email}" />
                <small class="p-error" v-if="submitted && !user.email">Campo requerido.</small>
            </div>
            <div class="field">
                <label for="status" class="mb-3">Estado</label>
                <Dropdown id="status" v-model="user.status" :options="statuses" optionLabel="label" placeholder="Seleccione un estado" required="true">
                    <template>
                        <div v-if="slotProps.value && slotProps.value.value">
                            <Tag :value="slotProps.value.value" :severity="getStatusLabel(slotProps.value.label)"/>
                        </div>
                        <div v-else-if="slotProps.value && !slotProps.value.value">
                            <Tag :value="slotProps.value" :severity="getStatusLabel(slotProps.value)"/>
                        </div>
                        <span v-else>
                            {{slotProps.placeholder}}
                        </span>
                    </template>
                </Dropdown>
            </div>
            <div class="flex d-flex justify-content-between">
                <Button label="Email de respaldo" icon="pi pi-inbox" severity="primary" class="mx-1" @click="editBackUpEmail" />
                <Button label="Teléfono" icon="pi pi-phone" severity="primary" class="mx-1" @click="" />
                <Button label="Ubicación" icon="pi pi-map-marker" severity="primary" class="mx-1" @click="" />
            </div>
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Guardar" icon="pi pi-check" text @click="saveUser" />
            </template>
        </Dialog>


                    <!--
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
            -->
        
        
        <!--Dialogo creación de email de respaldo-->
        <Dialog v-model:visible="backUpEmailDialog" :style="{width: '450px'}" :modal="true" class="p-fluid">
            <div class="field">
                <label for="type" class="mb-3">Tipo</label>
                <Dropdown id="type" v-model="user.type" :options="types" optionLabel="label" placeholder="Seleccione un tipo" required="true">
                    <template>
                        <div v-if="slotProps.value && slotProps.value.value">
                            <Tag :value="slotProps.value.value" :severity="getTypeLabel(slotProps.value.label)"/>
                        </div>
                        <div v-else-if="slotProps.value && !slotProps.value.value">
                            <Tag :value="slotProps.value" :severity="getTypeLabel(slotProps.value)"/>
                        </div>
                        <span v-else>
                            {{slotProps.placeholder}}
                        </span>
                    </template>
                </Dropdown>
                <small class="p-error" v-if="submitted && !user.type">Campo requerido.</small>
            </div>
            <div class="field">
                <label for="company_name">Razón social</label>
                <InputText id="company_name" v-model.trim="user.company_name" required="true" autofocus
                    :class="{'p-invalid': submitted && !user.company_name}" />
                <small class="p-error" v-if="submitted && !user.company_name">Campo requerido.</small>
            </div>
            <div class="field">
                <label for="name">Nombres</label>
                <InputText id="name" v-model.trim="user.name" required="true" autofocus
                    :class="{'p-invalid': submitted && !user.name}" />
                <small class="p-error" v-if="submitted && !user.name">Campo requerido.</small>
            </div>
            <div class="field">
                <label for="last_name">Apellidos</label>
                <InputText id="last_name" v-model.trim="user.last_name" required="true" autofocus
                    :class="{'p-invalid': submitted && !user.last_name}" />
                <small class="p-error" v-if="submitted && !user.last_name">Campo requerido.</small>
            </div>
            <div class="field">
                <label for="document">Documento</label>
                <InputText id="document" v-model.trim="user.document" required="true" autofocus
                    :class="{'p-invalid': submitted && !user.document}" />
                <small class="p-error" v-if="submitted && !user.document">Campo requerido.</small>
            </div>
            <div class="field">
                <label for="nit">NIT</label>
                <InputText id="nit" v-model.trim="user.nit" required="true" autofocus
                    :class="{'p-invalid': submitted && !user.nit}" />
                <small class="p-error" v-if="submitted && !user.nit">Campo requerido.</small>
            </div>
            <div class="field">
                <label for="email">Correo electrónico</label>
                <InputText id="email" v-model.trim="user.email" required="true" autofocus
                    :class="{'p-invalid': submitted && !user.email}" />
                <small class="p-error" v-if="submitted && !user.email">Campo requerido.</small>
            </div>
            <div class="field">
                <label for="status" class="mb-3">Estado</label>
                <Dropdown id="status" v-model="user.status" :options="statuses" optionLabel="label" placeholder="Seleccione un estado" required="true">
                    <template>
                        <div v-if="slotProps.value && slotProps.value.value">
                            <Tag :value="slotProps.value.value" :severity="getTypeLabel(slotProps.value.label)"/>
                        </div>
                        <div v-else-if="slotProps.value && !slotProps.value.value">
                            <Tag :value="slotProps.value" :severity="getTypeLabel(slotProps.value)"/>
                        </div>
                        <span v-else>
                            {{slotProps.placeholder}}
                        </span>
                    </template>
                </Dropdown>
            </div>
            <div class="flex d-flex justify-content-between">
                <Button label="Email de respaldo" icon="pi pi-inbox" severity="primary" class="mx-1" @click="editBackUpEmail" />
                <Button label="Teléfono" icon="pi pi-phone" severity="primary" class="mx-1" @click="" />
                <Button label="Ubicación" icon="pi pi-map-marker" severity="primary" class="mx-1" @click="" />
            </div>
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Guardar" icon="pi pi-check" text @click="saveCarrier" />
            </template>
        </Dialog>

        <!--Diálogo confirmación eliminación un usuario-->
        <Dialog v-model:visible="deleteUserDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product">¿Está seguro que desea eliminar a <b>{{user.name}}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteUserDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteUser" />
            </template>
        </Dialog>

        <!--Diálogo confirmación eliminación múltiples usuarios-->
        <Dialog v-model:visible="deleteusersDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product">Esta seguro que desea eliminar a los usuarios seleccionados?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteusersDialog = false" />
                <Button label="Yes" icon="pi pi-check" text @click="deleteselectedUsers" />
            </template>
        </Dialog>
        <!--Diálogo confirmación eliminación múltiples usuarios-->
        <ConfirmDeleteDialog group="headless">
            <template #container="{ message, acceptCallback, rejectCallback }">
                <div class="flex flex-column align-items-center p-5 surface-overlay border-round">
                    <div class="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
                        <i class="pi pi-exclamation-triangle text-5xl" severity="danger"></i>
                    </div>
                    <span class="font-bold text-2xl block mb-2 mt-4">{{ message.header }}</span>
                    <p class="mb-0">{{ message.message }}</p>
                    <div class="flex align-items-center gap-2 mt-4">
                        <Button label="Eliminar" @click="acceptCallback"></Button>
                        <Button label="Cancelar" outlined @click="rejectCallback"></Button>
                    </div>
                </div>
            </template>
        </ConfirmDeleteDialog>
        <div class="card flex justify-content-center">
            <Button @click="requireDeleteConfirmation()" label="Eliminar"></Button>
        </div>
        <Toast />
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast';
//import axios from 'axios';

const confirm = useConfirm();
const toast = useToast();
const dt = ref();
const users = ref([]);
const user = ref();
const userDialog = ref(false);
const deleteUserDialog = ref(false);
const selectAll = ref(false);
const deleteusersDialog = ref(false);
const backUpEmailDialog = ref(false);
const selectedUsers = ref();
const filters = ref({
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});
const submitted = ref(false);
const types = ref([
    {label: 'Natural', value: 'Natural'},
    {label: 'Jurídica', value: 'Juridica'}
]);
const statuses = ref([
    {label: 'Activo', value: 'Activo'},
    {label: 'Inactivo', value: 'Inactivo'}
]);

onMounted(() => {

});

const columns = ref([
    {field: 'type', header: 'Tipo'},
    {field: 'company_name', header: 'Razón social'},
    {field: 'name', header: 'Nombres'},
    {field: 'last_name', header: 'Apellidos'},
    {field: 'document', header: 'Documento'},
    {field: 'NIT', header: 'NIT'},
    {field: 'email', header: 'Correo electrónico'},
    {field: 'status', header: 'Estado'},
    {field: 'backup_email', header: 'Correo electrónico de respaldo'},
    {field: 'phone', header: 'Teléfono'},
    {field: 'ubication', header: 'Ubicación'}
]);
const selectedColumns = ref(columns.value);
const onToggle = (val) => {
    selectedColumns.value = columns.value.filter(col => val.includes(col));
};
const openNew = () => {
    user.value = {};
    submitted.value = false;
    userDialog.value = true;
};
const hideDialog = () => {
    userDialog.value = false;
    submitted.value = false;
};
const saveUser = () => {
    submitted.value = true;
    if (user.value.company_name && user.value.company_name.trim() && user.value.type && user.value.status) {
        if (user.value.id) {
            user.value.type = user.value.type.value ? user.value.type.value : user.value.type;
            user.value.status = user.value.status.value ? user.value.status.value : user.value.status;
            type.value[findIndexById(user.value.id)] = user.value;
            toast.add({severity:'success', summary: 'Successful', detail: 'Usuario actualizado', life: 3000});
        }
        else {
            users.value.push(user.value);
            toast.add({severity:'success', summary: 'Successful', detail: 'Usuario creado', life: 3000});
        }
        userDialog.value = false;
        user.value = {};
    }
};

const getTypeLabel = (type) => {
    switch (type) {
        case 'Natural':
            return 'success';

        case 'Jurídica':
            return 'success';

        default:
            return null;
    }
};

const getStatusLabel = (status) => {
    switch (status) {
        case 'Activo':
            return 'success';

        case 'Inactivo':
            return 'danger';

        default:
            return null;
    }
};

const editUser = (prod) => {
    user.value = {...prod};
    userDialog.value = true;
};
const confirmDeleteUser = (prod) => {
    user.value = prod;
    deleteUserDialog.value = true;
};

const requireDeleteConfirmation = () => {
    confirm.require({
        group: 'headless',
        header: '¿Está seguro que desea eliminar este usuario?',
        message: 'Eliminar.',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Usuario eliminado', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'Eliminación cancelada', life: 3000 });
        }
    });
};

const editBackUpEmail = (prod) => {
    user.value = {...prod};
    backUpEmail.value = true;
};

const deleteUser = () => {
    users.value = users.value.filter(val => val.id !== user.value.id);
    deleteUserDialog.value = false;
    user.value = {};
    toast.add({severity:'success', summary: 'Successful', detail: 'Usuario eliminado', life: 3000});
};
const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < users.value.length; i++) {
        if (users.value[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
};
const exportCSV = () => {
    dt.value.exportCSV();
};
const confirmDeleteSelected = () => {
    selectAll.value = true;
    deleteusersDialog.value = true;
};

const deleteselectedUsers = () => {
    if (selectAll.value) {
        users.value = [];
    } else {
        users.value = users.value.filter(val => !selectedUsers.value.includes(val));
    }
    deleteusersDialog.value = false;
    selectedUsers.value = null;
    selectAll.value = false; // Restablecer el estado de selección
    toast.add({severity:'success', summary: 'Successful', detail: 'Usuarios eliminados', life: 3000});
};


</script>

<style>
.icon-small .pi {
    font-size: 50%; /* Ajusta el tamaño del icono según sea necesario */
}
</style>

