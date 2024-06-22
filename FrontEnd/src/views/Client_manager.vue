<template>
    <h2 class="text-center">ADMINISTRACIÓN DE CLIENTES</h2>
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
            <Column field="NIT" header="NIT" sortable style="width: 25%"></Column>
            <Column field="name" header="Nombres" sortable style="width: 25%"></Column>
            <Column field="country" header="País" sortable style="width: 25%"></Column>
            <Column field="City" header="Ciudad" sortable style="width: 25%"></Column>
            <Column field="neighborhood" header="Barrio" sortable style="width: 25%"></Column>
            <Column field="address" header="Direcciòn" sortable style="width: 25%"></Column>
            <Column field="phone" header="Teléfono" sortable style="width: 25%"></Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
</script>
