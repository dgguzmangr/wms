<template>
    <Dialog v-model:visible="visible" :style="{ width: '450px' }" :header="'DETALLES DE ' + tableTitle" :modal="true" class="p-fluid" @hide="hideDialog">
        <template v-slot:header>
            <h5 style="text-align: center">{{ 'DETALLES DE ' + tableTitle }}</h5>
        </template>
        <div v-for="(value, key) in createDialogFields" :key="key">
            <div v-if="typeof value === 'string'">
                <label :for="key">{{ value }}</label>
                <InputText :id="key" v-model.trim="item[key]" :class="{ 'p-invalid': submitted && !item[key] }"
                    :required="isRequired(key)" autofocus />
                <small class="p-error" v-if="submitted && !item[key]">Campo requerido.</small>
            </div>
            <div v-else>
                <label :for="key" class="mb-3">{{ value.label }}</label>
                <Dropdown :id="key" v-model="item[key]" :options="value.options" optionLabel="label"
                    :placeholder="'Seleccione ' + value.label" :required="isRequired(key)">
                </Dropdown>
            </div>
        </div>
        <div class="flex d-flex justify-content-between">
            <Button label="Ubicación" icon="pi pi-map-marker" severity="primary" class="mx-1" @click="" />
        </div>
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" text @click="closeDialog = false" />
            <Button label="Crear" icon="pi pi-check" text @click="createItem, closeDialog = false" />
        </template>
    </Dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const item = ref({});
const itemDialog = ref(false);
const submitted = ref(false);
const closeDialog = ref(false);

const props = defineProps ({
    itemDialog: {
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
    },
    visible: {
        type: Function,
        required: true
    },
})

const emit = defineEmits(['update:visible']);

const openNew = () => {
    item.value = {};
    submitted.value = false;
    itemDialog.value = true;
};

const isRequired = (key) => {
    return typeof props.createDialogFields[key] === 'object' && props.createDialogFields[key].required;
};

const hide = () => {
    emit('update:visible', false)
};
</script>