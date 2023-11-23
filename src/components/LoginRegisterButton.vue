<script setup>
</script>

<template>
    <RouterLink to="/login">
        <v-btn class="ml-auto" variant="flat">
        Login
        </v-btn>
    </RouterLink>
    <RouterLink to="/register">
        <v-btn
        :rounded="0"
        color="primary"
        >
        Register
        </v-btn>
    </RouterLink>
</template>
<style>
header > nav > a:nth-child(8) > button {
    background: transparent;
    color: #F8EB6B;
}
header > nav > a:nth-child(8) > button:hover {
    background: #453100;
}
header > nav > a:last-child > button {
    background: transparent !important;
    color: #F8EB6B !important;
    border: 1px solid;
    margin-right: 10px;
}
header > nav > a:last-child > button:hover {
    background: #453100 !important;
}
</style>
<script>
</script>