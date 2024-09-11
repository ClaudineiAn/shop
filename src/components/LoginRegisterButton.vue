<script setup>
</script>

<template>
    <RouterLink to="/access">
        <v-btn
        :rounded="0"
        color="primary"
        >
        Access
        </v-btn>
    </RouterLink>
</template>
<style>
header > nav > a:nth-child(8) > button {
    background: transparent;
    color: var(--color1);
}
header > nav > a:nth-child(8) > button:hover {
    background: var(--color2);
}
header > nav > a:last-child > button {
    background: transparent !important;
    color: var(--color1) !important;
    border: 1px solid;
    margin-right: 10px;
}
header > nav > a:last-child > button:hover {
    background: var(--color2) !important;
}
</style>
<script>
</script>