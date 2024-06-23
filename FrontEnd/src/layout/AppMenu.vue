<script setup>
import { ref, computed } from 'vue';
import AppMenuItem from './AppMenuItem.vue';

const getPermissionsFromLocalStorage = () => {
    try {
        return localStorage.getItem('permissions') ? JSON.parse(localStorage.getItem('permissions')) : [];
    } catch (e) {
        console.error('Error parsing permissions:', e);
        localStorage.removeItem('permissions');
        return [];
    }
};

const model = ref([
    {
        label: 'Inicio',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        label: 'Módulos',
        items: [
            { label: 'Usuarios1', icon: 'pi pi-fw pi-users', to: '/users_manager', requiredPermissions: ['show_users'] },
            { label: 'Bodegas1', icon: 'pi pi-fw pi-home', to: '/warehouse_manager', requiredPermissions: [
                'authApp.show_warehouses', 
                'authApp.create_warehouses',
                'authApp.update_warehouses', 
                'authApp.partial_update_warehouses',
                'authApp.delete_warehouses',
                'authApp.show_warehouse_buildings',
            ] },
            { label: 'Bodegas', icon: 'pi pi-fw pi-home', to: '/warehousemanager', requiredPermissions: [
                'authApp.show_warehouses', 
                'authApp.create_warehouses',
                'authApp.update_warehouses', 
                'authApp.partial_update_warehouses',
                'authApp.delete_warehouses',
                'authApp.show_warehouse_buildings',
            ] },
            { label: 'Inventario1', icon: 'pi pi-fw pi-check-circle', to: '/inventory_manager', requiredPermissions: ['edit_inventory'] },
            { label: 'Clientes1', icon: 'pi pi-fw pi-shopping-bag', to: '/client_manager', requiredPermissions: ['view_clients'] },
            { label: 'Transportadoras1', icon: 'pi pi-fw pi-truck', to: '/carrier_manager', requiredPermissions: ['view_carriers'] },
            { label: 'CRUD_PRUEBA', icon: 'pi pi-fw pi-truck', to: '/crud_prueba', requiredPermissions: ['crud_prueba'] },
            { label: 'Productos', icon: 'pi pi-fw pi-box', to: '/productmanager', requiredPermissions: ['manage_products'] },
        ]
    },
]);

const permissions = getPermissionsFromLocalStorage();

const filteredModel = computed(() => {
    return model.value.map(section => {
        return {
            ...section,
            items: section.items.filter(item => {
                if (item.requiredPermissions) {
                    return item.requiredPermissions.every(permission => permissions.includes(permission));
                }
                return true;
            })
        };
    }).filter(section => section.items.length > 0);
});
</script>


<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in filteredModel" :key="i">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>


<style lang="scss" scoped></style>
