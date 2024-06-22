import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                //AppMenu
                {
                    path: '/users_manager',
                    name: 'users_manager',
                    component: () => import('@/views/Users_manager.vue')
                },
                {
                    path: '/warehouse_manager',
                    name: 'warehouse_manager',
                    component: () => import('@/views/Warehouse_manager.vue')
                },
                {
                    path: '/warehousemanager',
                    name: 'warehousemanager',
                    component: () => import('@/views/WarehouseManagerView.vue')
                },
                {
                    path: '/inventory_manager',
                    name: 'inventory_manager',
                    component: () => import('@/views/Inventory_manager.vue')
                },
                {
                    path: '/client_manager',
                    name: 'client_manager',
                    component: () => import('@/views/Client_manager.vue')
                },
                {
                    path: '/carrier_manager',
                    name: 'carrier_manager',
                    component: () => import('@/views/Carrier_manager.vue')
                },
                {
                    path: '/crud_prueba',
                    name: 'crud_prueba',
                    component: () => import('@/views/Crud_pruebaView.vue')
                },
                {
                    path: '/productmanager',
                    name: 'productmanager',
                    component: () => import('@/views/ProductManagerView.vue')
                }
            ]
        },
        //login
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/access',
            name: 'access',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
    ]
});

export default router;
