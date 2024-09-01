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