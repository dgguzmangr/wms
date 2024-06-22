<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed } from 'vue';

const { layoutConfig } = useLayout();

const logoUrl = computed(() => {
    return `layout/images/logo.png`;
});
</script>

<template>
    <div class="layout-footer">
        <img :src="logoUrl" alt="Logo" height="60" class="mr-2" />
        by
        <span class="font-medium ml-2">DGGUZMANGR ® 2024</span>
    </div>
</template>
<style lang="scss" scoped></style>
