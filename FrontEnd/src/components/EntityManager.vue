<template>
    <Dialog 
        :visible="visible" 
        @update:visible="(newValue) => emit('update:visible', newValue)" 
        :style="{ width: '450px' }" 
        :header="'DETALLES DE ' + tableTitle" 
        :modal="true" 
        class="p-fluid" 
    >
        <template v-slot:header>
            <div class="d-flex justify-content-between text-center">
                <h5 class="">{{ 'DETALLES DE ' + tableTitle }}</h5>
            </div>
        </template>
        <!--form data-->
        <div v-for="(value, key) in createDialogFields" :key="key" class="pb-2">
            <!-- Country Dropdown -->
            <label v-if="key === 'country'" :for="key">{{ value.label }}</label>
            <Dropdown 
                v-if="key === 'country'" 
                :id="key" 
                v-model="item.country" 
                :options="countries" 
                optionLabel="name" 
                :class="{ 'p-invalid': submitted && !item.country }" 
                @change="onCountryChange"
                placeholder="Seleccione un país"
            />
            <small class="p-error" v-if="submitted && !item.country">Campo requerido.</small>
            <!-- Department Dropdown -->
            <label v-if="key === 'department'" :for="key">{{ value.label }}</label>
            <Dropdown 
                v-if="key === 'department'" 
                :id="key" 
                v-model="item.department" 
                :options="departments" 
                optionLabel="name" 
                :class="{ 'p-invalid': submitted && !item.department }" 
                placeholder="Seleccione un departamento"
            />
            <small class="p-error" v-if="submitted && !item.department">Campo requerido.</small>
            <template v-if="key !== 'country' && key !== 'department'">
                <label :for="key">{{ typeof value === 'string' ? value : value.label }}</label>
                <InputText 
                    :id="key" 
                    v-model.trim="item[key]" 
                    :class="{ 'p-invalid': submitted && !item[key] }"
                    :required="isRequired(key)" 
                    autofocus
                />
                <small class="p-error" v-if="submitted && !item[key]">Campo requerido.</small>
            </template>
        </div>
        <div class="flex d-flex justify-content-between">
            <Button label="Ubicación" icon="pi pi-map-marker" severity="primary" class="mx-1" @click="selectLocation" />
        </div>
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
            <Button label="Crear" icon="pi pi-check" text @click="createItem" />
        </template>
    </Dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue';
import axios from 'axios';

const item = ref({});
const submitted = ref(false);
const countries = ref([]);
const departments = ref([]);

const props = defineProps({
    visible: {
        type: Boolean,
        required: true
    },
    tableTitle: {
        type: String,
        required: true
    },
    createDialogFields: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['update:visible', 'create-item']);

const hideDialog = () => {
    emit('update:visible', false);
    resetForm();
};

const resetForm = () => {
    item.value = {};
    submitted.value = false;
};

const isRequired = (key) => {
    return typeof props.createDialogFields[key] === 'object' && props.createDialogFields[key].required;
};

const createItem = () => {
    submitted.value = true;
    
    const isValid = Object.keys(props.createDialogFields).every((key) => {
        if (isRequired(key)) {
            return !!item.value[key];
        }
        return true;
    });

    if (isValid) {
        emit('create-item', { ...item.value });
        hideDialog();
    }
};

const selectLocation = () => {
    // Lógica para seleccionar la ubicación
};

const fetchCountries = async () => {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        countries.value = response.data.map(country => ({
            name: country.name.common,
            code: country.cca2
        }));
    } catch (error) {
        console.error('Error al cargar los países:', error);
    }
};

const onCountryChange = async () => {
    try {
        const country = item.value.country;
        if (country) {
            // Aquí puedes cambiar la URL según la API que estés utilizando para obtener los departamentos
            const response = await axios.get(`https://api-ejemplo.com/departments?country=${country.code}`);
            departments.value = response.data.map(department => ({
                name: department.name,
                code: department.code
            }));
        } else {
            departments.value = [];
        }
    } catch (error) {
        console.error('Error al cargar los departamentos:', error);
    }
};

onMounted(() => {
    fetchCountries();
});
</script>

<style scoped>
/* Estilos opcionales */
</style>
