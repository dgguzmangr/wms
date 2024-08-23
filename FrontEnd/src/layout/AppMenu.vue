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
            { label: 'Bodegas', icon: 'pi pi-fw pi-home', to: '/warehousemanager', requiredPermissions: [
                'authApp.show_warehouses', 
                'authApp.create_warehouses',
                'authApp.update_warehouses', 
                'authApp.partial_update_warehouses',
                'authApp.delete_warehouses',
                'authApp.show_warehouse_buildings',
            ] },
            { label: 'Productos', icon: 'pi pi-fw pi-box', to: '/productmanager', requiredPermissions: [
                'authApp.show_products', 
                'authApp.create_products',
                'authApp.update_products', 
                'authApp.partial_update_products',
                'authApp.delete_products',
                'authApp.show_product_discounts',
                'authApp.show_product_footprints',
                'authApp.show_product_prices',
                'authApp.show_product_taxes',
                'authApp.show_product_details'
            ] },
            { label: 'Descuentos', icon: 'pi pi-fw pi-box', to: '/discountmanager', requiredPermissions: [
                'authApp.show_discounts', 
                'authApp.create_discounts',
                'authApp.update_discounts', 
                'authApp.partial_update_discounts',
                'authApp.delete_discounts',
            ] },
            { label: 'Huellas', icon: 'pi pi-fw pi-box', to: '/footprintmanager', requiredPermissions: [
                'authApp.show_footprints', 
                'authApp.create_footprints',
                'authApp.update_footprints', 
                'authApp.partial_update_footprints',
                'authApp.delete_footprints',
            ] },
            { label: 'Precios', icon: 'pi pi-fw pi-box', to: '/pricemanager', requiredPermissions: [
                'authApp.show_prices', 
                'authApp.create_prices',
                'authApp.update_prices', 
                'authApp.partial_update_prices',
                'authApp.delete_prices',
            ] },

            { label: 'Inventario1', icon: 'pi pi-fw pi-check-circle', to: '/inventory_manager', requiredPermissions: ['edit_inventory'] },
            { label: 'Clientes1', icon: 'pi pi-fw pi-shopping-bag', to: '/client_manager', requiredPermissions: ['view_clients'] },
            { label: 'Transportadoras1', icon: 'pi pi-fw pi-truck', to: '/carrier_manager', requiredPermissions: ['view_carriers'] },
            { label: 'CRUD_PRUEBA', icon: 'pi pi-fw pi-truck', to: '/crud_prueba', requiredPermissions: ['crud_prueba'] },
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
