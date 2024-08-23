<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import AppConfig from '@/layout/AppConfig.vue';
import axios from 'axios';

const { layoutConfig } = useLayout();
const username = ref('');
const password = ref('');
const checked = ref(false);
const router = useRouter();

const logoUrl = computed(() => {
    return `layout/images/logo.png`;
});

const signIn = async () => {
    try {
        const response = await axios.post('http://localhost:8000/login/', {
            username: username.value,
            password: password.value,
        });
        //console.log('Response:', response.data);

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('permissions', JSON.stringify(response.data.permissions));

        router.push('/');
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        router.push('/access');
    }
};
</script>

<template>
    <div class="py-4 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static mb-3">
        <img :src="logoUrl" alt="DGG WMS Logo Logo" height="50" class="mr-0 lg:mr-2" /><span class="text-center text-900 font-medium text-2xl line-height-2 mr-8 ">DGG WMS</span>
        <a class="cursor-pointer block lg:hidden text-700 p-ripple" v-ripple v-styleclass="{ selector: '@next', enterClass: 'hidden', leaveToClass: 'hidden', hideOnOutsideClick: true }">
            <i class="pi pi-bars text-4xl"></i>
        </a>
        <div class="align-items-center surface-0 flex-grow-1 justify-content-between hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2" style="top: 120px">
            <ul class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row cursor-pointer">
                <li>
                    <RouterLink to="/landing">
                        <a class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 p-ripple" v-ripple>
                            <span>Inicio</span>
                        </a>
                    </RouterLink>
                    
                </li>
            </ul>
            <div class="flex justify-content-between lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
                <router-link to="/register">
                    <Button label="Registro" class="p-button-rounded border-none ml-5 font-light text-white line-height-2 bg-blue-500"></Button>
                </router-link>
            </div>
        </div>
    </div>
    <div
        class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <!--
            <div
                class="md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static mb-3 pb-3">
                <img :src="logoUrl" alt="DGG WMS Logo Logo" height="50" class="mr-0 lg:mr-2" />
                <span class="text-center text-900 font-medium text-2xl line-height-2 ml-2">DGG <br> WMS</span>
            </div>
            -->
            <div
                style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <span class="text-600 font-medium">Inicia sesión para continuar</span>
                    </div>

                    <div>
                        <label for="username1" class="block text-900 text-xl font-medium mb-2">Correo
                            electrónico</label>
                        <InputText id="username1" type="text" placeholder="Correo electrónico"
                            class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="username" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Contraseña</label>
                        <Password id="password1" v-model="password" placeholder="Contraseña" :toggleMask="true"
                            class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Recuérdame</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer"
                                style="color: var(--primary-color)">¿Olvidaste tu contraseña?</a>
                        </div>
                        <Button label="Sign In" class="w-full p-3 text-xl" @click="signIn"></Button>
                        <router-link to="/register">
                            <Button label="Sign Up" class="w-full mt-2 p-3 text-xl"></Button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="py-4 px-4 mx-0 mt-8 lg:mx-8">
        <div class="grid justify-content-between">
            <div class="col-12 md:col-2" style="margin-top: -1.5rem">
                <a @click="smoothScroll('#home')" class="flex flex-wrap align-items-center justify-content-center md:justify-content-start md:mb-0 mb-3 cursor-pointer">
                    <img :src="logoUrl" alt="DGG WMS Logo Logo" height="50" class="mr-0 lg:mr-2" /><span class="text-center text-900 font-medium text-2xl line-height-2 mr-8 ">DGG WMS</span>
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

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
