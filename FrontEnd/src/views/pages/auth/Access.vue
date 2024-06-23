<script setup>
import AppConfig from '@/layout/AppConfig.vue';
import { ref, computed } from 'vue';

const logoUrl = computed(() => {
    return `layout/images/logo.png`;
});
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <div class="md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static mb-3 pb-3">
                <img :src="logoUrl" alt="DGG WMS Logo Logo" height="50" class="mr-0 lg:mr-2" />
                <span class="text-center text-900 font-medium text-2xl line-height-2 ml-2">DGG <br> WMS</span>
            </div>
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, rgba(247, 149, 48, 0.4) 10%, rgba(247, 149, 48, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center" style="border-radius: 53px">
                    <div class="grid flex flex-column align-items-center">
                        <div class="flex justify-content-center align-items-center bg-orange-500 border-circle" style="width: 3.2rem; height: 3.2rem">
                            <i class="text-50 pi pi-fw pi-lock text-2xl"></i>
                        </div>
                        <h1 class="text-900 font-bold text-4xl lg:text-5xl mb-2">Acceso Denegado</h1>
                        <span class="text-600 mb-5">No tienes los permisos necesarios. Por favor contacta con los administradores.</span>
                        <img src="/demo/images/access/asset-access.svg" alt="Access denied" class="mb-5" width="80%" />
                        <div class="col-12 mt-5 text-center">
                            <i class="pi pi-fw pi-arrow-left text-blue-500 mr-2" style="vertical-align: center"></i>
                            <router-link to="/landing" class="text-blue-500">Inicio</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>
