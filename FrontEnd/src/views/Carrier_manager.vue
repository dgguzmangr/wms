<template>
    <div>
        <h2 class="text-center">ADMINISTRACIÓN DE TRANSPORTADORAS</h2>
        <div class="card">
            <Toolbar class="mb-4">
                <template #start>
                    <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="openNew" />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected"
                        :disabled="!selectedCarriers || !selectedCarriers.length" />
                </template>
                <template #end>
                    <Button label="Export" icon="pi pi-upload" severity="help" @click="exportCSV($event)" />
                </template>
            </Toolbar>
            <DataTable ref="dt" :value="carriers" v-model:selection="selectedCarriers" dataKey="id" :paginator="true"
                :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :rowsPerPageOptions="[5,10,25]"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} carriers">
                <template #header>
                    <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
                        <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                    </div>
                </template>
                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="nit" header="NIT" sortable style="min-width:12rem"></Column>
                <Column field="name" header="Nombre" sortable style="min-width:16rem"></Column>
                <Column field="country" header="País" sortable style="min-width:16rem"></Column>
                <Column field="department" header="Departamento" sortable style="min-width:16rem"></Column>
                <Column field="city" header="Ciudad" sortable style="min-width:16rem"></Column>
                <Column field="neighborhood" header="Barrio" sortable style="min-width:16rem"></Column>
                <Column field="address" header="Dirección" sortable style="min-width:16rem"></Column>
                <Column field="phone" header="Teléfono" sortable style="min-width:16rem"></Column>
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" outlined rounded class="mr-2"
                            @click="editCarrier(slotProps.data)" />
                        <Button icon="pi pi-trash" outlined rounded severity="danger"
                            @click="confirmDeleteCarrier(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>
        <Dialog v-model:visible="carrierDialog" :style="{width: '450px'}" header="Detalles del transportador"
            :modal="true" class="p-fluid">
            <div class="field">
                <label for="nit">NIT</label>
                <InputText id="nit" v-model.trim="carrier.nit" required="true" autofocus
                    :class="{'p-invalid': submitted && !carrier.nit}" />
                <small class="p-error" v-if="submitted && !carrier.nit">El NIT es requerido.</small>
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
import { ref, onMounted, watch } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';

const toast = useToast();
const dt = ref();
const carriers = ref();
const countries = ref([]);
const departments = ref([]);
const filteredDepartments = ref([]);
const cities = ref([]);
const filteredCities = ref([]);
const carrier = ref({ country: '', city: '' });
const carrierDialog = ref(false);
const deleteCarrierDialog = ref(false);
const deletecarriersDialog = ref(false);
const selectedCarriers = ref();
const filters = ref({
    'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
});
const submitted = ref(false);

onMounted(async () => {
    try {
        // Obtener token de autenticación
        const authToken = await fetchAuthToken();
        
        // Obtener lista de países
        const countriesResponse = await fetchCountries(authToken);
        countries.value = countriesResponse.data;

        // Obtener lista de ciudades
        const citiesResponse = await fetchCities(authToken);
        cities.value = citiesResponse.data;
    } catch (error) {
        console.error('Error fetching countries and cities:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error al cargar países y ciudades' });
    }
});

const fetchAuthToken = () => {
    return axios.get("https://www.universal-tutorial.com/api/getaccesstoken", {
        headers: {
            "Accept": "application/json",
            "api-token": "lLQt6gapkTsu8CCjcTUK9ew_LiZZuV47rVJ_GlsQTDE3xq9sm4Os_67WNiX3jD1Lv8",
            "user-email": "dgguzmangr@gmail.com"
        }
    }).then(response => response.data.auth_token);
};

const fetchCountries = (authToken) => {
    return axios.get("https://www.universal-tutorial.com/api/countries/", {
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Accept": "application/json"
        }
    });
};

const fetchCities = (authToken) => {
    // Aquí debes ajustar la URL para obtener las ciudades de un país específico si es necesario
    return axios.get("https://www.universal-tutorial.com/api/countries/", {
        headers: {
            "Authorization": `Bearer ${authToken}`,
            "Accept": "application/json"
        }
    });
};

/*
onMounted(async () => {
    try {
        const response = await axios.get('https://restcountries.com/v3/all');
        countries.value = response.data.map(country => ({ name: country.name.common, code: country.cca2 }));
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
});


watch(countries, async (newCountries) => {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        countries.value = response.data.map(country => country.name.common);
        cities.value = response.data.map(city => ({}));
    } catch (error) {
        console.error('Error fetching cities:', error);
    }
});
*/
const onCountryChange = () => {
    filteredCities.value = cities.value.filter(city => city.country === carrier.value.country).map(city => city.name);
    console.log('País seleccionado:', carrier.value.country);
};


const openNew = () => {
    carrier.value = {};
    submitted.value = false;
    carrierDialog.value = true;
};
const hideDialog = () => {
    carrierDialog.value = false;
    submitted.value = false;
};
const saveCarrier = () => {
    submitted.value = true;
};
const editCarrier = (prod) => {
    carrier.value = {...prod};
    carrierDialog.value = true;
};
const confirmDeleteCarrier = (prod) => {
    carrier.value = prod;
    deleteCarrierDialog.value = true;
};
const deleteCarrier = () => {
    carriers.value = carriers.value.filter(val => val.id !== carrier.value.id);
    deleteCarrierDialog.value = false;
    carrier.value = {};
    toast.add({severity:'success', summary: 'Successful', detail: 'Transportadora eliminada', life: 3000});
};
const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < carriers.value.length; i++) {
        if (carriers.value[i].id === id) {
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
    deletecarriersDialog.value = true;
};
const deleteselectedCarriers = () => {
    carriers.value = carriers.value.filter(val => !selectedCarriers.value.includes(val));
    deletecarriersDialog.value = false;
    selectedCarriers.value = null;
    toast.add({severity:'success', summary: 'Successful', detail: 'products Deleted', life: 3000});
};

</script>

