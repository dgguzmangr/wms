<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Inicio',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        label: 'Módulos',
        items: [
            { label: 'Usuarios1', icon: 'pi pi-fw pi-users', to: '/users_manager' },
            { label: 'Bodegas1', icon: 'pi pi-fw pi-home', to: '/warehouse_manager' },
            { label: 'Bodegas', icon: 'pi pi-fw pi-home', to: '/warehousemanager' },
            { label: 'Inventario1', icon: 'pi pi-fw pi-check-circle', to: '/inventory_manager' },
            { label: 'Clientes1', icon: 'pi pi-fw pi-shopping-bag', to: '/client_manager' },
            { label: 'Transportadoras1', icon: 'pi pi-fw pi-truck', to: '/carrier_manager' },
            { label: 'CRUD_PRUEBA', icon: 'pi pi-fw pi-truck', to: '/crud_prueba' },
            { label: 'Productos', icon: 'pi pi-fw pi-box', to: '/productmanager' },
        ]
    },
    {
        label: 'Pages',
        items: [
            { label: 'Landing', icon: 'pi pi-fw pi-globe', to: '/landing', }
        ]
    },
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
