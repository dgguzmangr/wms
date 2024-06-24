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
        console.log('Response:', response.data);

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
    <div
        class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <div
                class="md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static mb-3 pb-3">
                <img :src="logoUrl" alt="DGG WMS Logo Logo" height="50" class="mr-0 lg:mr-2" />
                <span class="text-center text-900 font-medium text-2xl line-height-2 ml-2">DGG <br> WMS</span>
            </div>
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
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
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
