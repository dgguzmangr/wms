import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const filterRoutesByPermissions = (routes, permissions) => {
    return routes.filter(route => {
        if (route.children) {
            route.children = filterRoutesByPermissions(route.children, permissions);
        }
        if (route.meta && route.meta.requiredPermissions) {
            return route.meta.requiredPermissions.every(permission => permissions.includes(permission));
        }
        return true;
    });
};

const getPermissionsFromLocalStorage = () => {
    try {
        return localStorage.getItem('permissions') ? JSON.parse(localStorage.getItem('permissions')) : [];
    } catch (e) {
        console.error('Error parsing permissions:', e);
        localStorage.removeItem('permissions');
        return [];
    }
};

const routes = [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '/users_manager',
                name: 'users_manager',
                component: () => import('@/views/Users_manager.vue'),
                meta: { requiresAuth: true, requiredPermissions: ['show_users'] }
            },
            {
                path: '/warehouse_manager',
                name: 'warehouse_manager',
                component: () => import('@/views/Warehouse_manager.vue'),
                meta: { requiresAuth: true, requiredPermissions: [
                    'authApp.show_warehouses', 
                    'authApp.create_warehouses',
                    'authApp.update_warehouses', 
                    'authApp.partial_update_warehouses',
                    'authApp.delete_warehouses',
                    'authApp.show_warehouse_buildings',
                ]}
            },
            {
                path: '/warehousemanager',
                name: 'warehousemanager',
                component: () => import('@/views/WarehouseManagerView.vue'),
                meta: { requiresAuth: true, requiredPermissions: [
                    'authApp.show_warehouses', 
                    'authApp.create_warehouses',
                    'authApp.update_warehouses', 
                    'authApp.partial_update_warehouses',
                    'authApp.delete_warehouses',
                    'authApp.show_warehouse_buildings',
                ]}
            },
            {
                path: '/inventory_manager',
                name: 'inventory_manager',
                component: () => import('@/views/Inventory_manager.vue'),
                meta: { requiresAuth: true, requiredPermissions: ['edit_inventory'] }
            },
            {
                path: '/client_manager',
                name: 'client_manager',
                component: () => import('@/views/Client_manager.vue'),
                meta: { requiresAuth: true, requiredPermissions: ['view_clients'] }
            },
            {
                path: '/carrier_manager',
                name: 'carrier_manager',
                component: () => import('@/views/Carrier_manager.vue'),
                meta: { requiresAuth: true, requiredPermissions: ['view_carriers'] }
            },
            {
                path: '/crud_prueba',
                name: 'crud_prueba',
                component: () => import('@/views/Crud_pruebaView.vue'),
                meta: { requiresAuth: true, requiredPermissions: ['crud_prueba'] }
            },
            {
                path: '/productmanager',
                name: 'productmanager',
                component: () => import('@/views/ProductManagerView.vue'),
                meta: { requiresAuth: true, requiredPermissions: ['manage_products'] }
            }
        ]
    },
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
    }
];

// Filtrar las rutas basadas en los permisos del usuario
const permissions = getPermissionsFromLocalStorage();
const filteredRoutes = filterRoutesByPermissions(routes, permissions);

const router = createRouter({
    history: createWebHashHistory(),
    routes: filteredRoutes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');
    let permissions = getPermissionsFromLocalStorage();
    
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next({ name: 'access' });
    } else if (to.meta.requiredPermissions) {
        const hasPermission = to.meta.requiredPermissions.every(permission => permissions.includes(permission));
        if (!hasPermission) {
            next({ name: 'access' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
