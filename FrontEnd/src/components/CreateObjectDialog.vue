<!-- CreateObjectDialog.vue -->
<template>
    <Dialog v-model:visible="visible" :style="{ width: '450px' }" :header="title" :modal="true" class="p-fluid">
        <div v-for="(field, key) in fields" :key="key" class="field">
            <label :for="key">{{ field.label }}</label>
            <InputText
                v-model="formData[key]"
                :id="key"
                :maxlength="field.maxLength"
                :required="field.required"
                :readonly="field.readonly"
                :class="{ 'p-invalid': submitted && field.required && !formData[key] }"
            />
            <small v-if="submitted && field.required && !formData[key]" class="p-invalid">{{ field.label }} es requerido.</small>
        </div>
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="onCancel" />
            <Button label="Crear" icon="pi pi-check" class="p-button-text" @click="onCreate" />
        </template>
    </Dialog>
</template>

<script setup>
import { ref } from 'vue';
import { warehouseCreateFields } from '@/data/warehouseFields'; // Cambia la ruta según corresponda

const props = defineProps({
    visible: Boolean,
    title: String,
    fields: Object,
});

const emit = defineEmits(['close', 'create']);

const formData = ref({});
const submitted = ref(false);

const onCreate = () => {
    submitted.value = true;
    const allValid = Object.keys(props.fields).every(key => {
        return !props.fields[key].required || formData.value[key];
    });

    if (allValid) {
        emit('create', formData.value);
        resetForm();
    }
};

const onCancel = () => {
    emit('close');
    resetForm();
};

const resetForm = () => {
    formData.value = {};
    submitted.value = false;
};

onMounted(() => {
    formData.value = Object.keys(props.fields).reduce((obj, key) => {
        obj[key] = '';
        return obj;
    }, {});
});
</script>

<style scoped>
/* Añade estilos personalizados si es necesario */
</style>
