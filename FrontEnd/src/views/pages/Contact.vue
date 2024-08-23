<template>
    <div
        class="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static mb-3">
        <img :src="logoUrl" alt="DGG WMS Logo" height="50" class="mr-0 lg:mr-2" />
        <span class="text-center text-900 font-medium text-2xl line-height-2 mr-8">DGG WMS</span>
        <a class="cursor-pointer block lg:hidden text-700 p-ripple" v-ripple
            v-styleclass="{ selector: '@next', enterClass: 'hidden', leaveToClass: 'hidden', hideOnOutsideClick: true }">
            <i class="pi pi-bars text-4xl"></i>
        </a>
        <div class="align-items-center surface-0 flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2"
            style="top: 120px">
            <ul class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row cursor-pointer">
                <li>
                    <RouterLink to="/landing">
                        <a class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                            <span>Inicio</span>
                        </a>
                    </RouterLink>
                </li>
            </ul>
            <div
                class="flex justify-content-between lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
                <router-link to="/register">
                    <Button label="Registro"
                        class="p-button-rounded border-none ml-5 font-light text-white line-height-2 bg-blue-500"></Button>
                </router-link>
            </div>
        </div>
    </div>
    <div class="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-center relative lg:static mb-3">
        <h2 class="text-center w-full lg:w-2/3">Formulario de Contacto</h2>
        <form @submit.prevent="handleSubmit" class="d-flex flex-wrap w-full lg:w-2/3 justify-content-between align-items-center">
            <div class="d-flex flex-column w-full md:w-1/2 px-2 mb-4">
                <label for="name">Nombre:</label>
                <input type="text" v-model="form.name" id="name" class="w-full" required />
            </div>
            <div class="d-flex flex-column w-full md:w-1/2 px-2 mb-4">
                <label for="company">Empresa:</label>
                <input type="text" v-model="form.company" id="company" class="w-full" required />
            </div>
            <div class="d-flex flex-column w-full md:w-1/2 px-2 mb-4">
                <label for="email">Correo Electrónico:</label>
                <input type="email" v-model="form.email" id="email" class="w-full" required />
            </div>
            <div class="d-flex flex-column w-full md:w-1/2 px-2 mb-4">
                <label for="phone">Teléfono:</label>
                <input type="tel" v-model="form.phone" id="phone" class="w-full" required />
            </div>
            <div class="d-flex flex-column w-full px-2 mb-4">
                <label for="message">Mensaje:</label>
                <textarea v-model="form.message" id="message" class="w-full" required></textarea>
            </div>
            <div class="d-flex justify-content-center w-full px-2">
                <Button type="submit" class="p-button-rounded border-none font-bold text-white line-height-2 bg-blue-500">Enviar</Button>
            </div>
        </form>
    </div>

    <div class="py-4 px-4 mx-0 mt-8 lg:mx-8">
        <div class="grid justify-content-between">
            <div class="col-12 md:col-2" style="margin-top: -1.5rem">
                <a @click="smoothScroll('#home')"
                    class="flex flex-wrap align-items-center justify-content-center md:justify-content-start md:mb-0 mb-3 cursor-pointer">
                    <img :src="logoUrl" alt="DGG WMS Logo" height="50" class="mr-0 lg:mr-2" />
                    <span class="text-center text-900 font-medium text-2xl line-height-2 mr-8">DGG WMS</span>
                </a>
            </div>
            <div class="col-12 md:col-10 lg:col-7">
                <div class="grid text-center md:text-left">
                    <div class="col-12 md:col-3">
                        <h4 class="font-medium text-2xl line-height-3 mb-3 text-900">Empresa</h4>
                        <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Acerca de nosotros</a>
                        <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Noticias</a>
                    </div>
                    <div class="col-12 md:col-3 mt-4 md:mt-0">
                        <h4 class="font-medium text-2xl line-height-3 mb-3 text-900">Recursos</h4>
                        <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Comience a trabajar</a>
                        <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Aprenda</a>
                    </div>
                    <div class="col-12 md:col-3 mt-4 md:mt-0">
                        <h4 class="font-medium text-2xl line-height-3 mb-3 text-900">Comunidad</h4>
                        <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Discord</a>
                        <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Eventos</a>
                        <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">FAQ</a>
                        <a class="line-height-3 text-xl block cursor-pointer text-700">Blog</a>
                    </div>
                    <div class="col-12 md:col-3 mt-4 md:mt-0">
                        <h4 class="font-medium text-2xl line-height-3 mb-3 text-900">Legal</h4>
                        <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Política de marca</a>
                        <a class="line-height-3 text-xl block cursor-pointer mb-2 text-700">Política de privacidad</a>
                        <a class="line-height-3 text-xl block cursor-pointer text-700">Términos de servicio</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="layout-wrapper" style="min-height: auto;">
        <AppConfig simple />
    </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';

const form = reactive({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
});

const logoUrl = computed(() => 'layout/images/logo.png');

const handleSubmit = () => {
    const emailBody = `
    Nombre: ${form.name}\n
    Empresa: ${form.company}\n
    Correo Electrónico: ${form.email}\n
    Teléfono: ${form.phone}\n
    Mensaje: ${form.message}
    `;
    const mailtoLink = `mailto:dfrf@gmail.com?subject=Formulario de Contacto&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;
};
</script>

<style scoped>
</style>
