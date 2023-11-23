<script setup>
</script>

<template>
    <div class="toggleButtons" style="display:none">
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
    </div>
</template>
<style>
header > nav > .toggleButtons > a:nth-child(8) > button {
    background: transparent;
    color: #F8EB6B;
}
header > nav > .toggleButtons > a:nth-child(8) > button:hover {
    background: #453100;
}
header > nav > .toggleButtons > a:last-child > button {
    background: transparent !important;
    color: #F8EB6B !important;
    border: 1px solid;
    margin-right: 10px;
}
header > nav > .toggleButtons > a:last-child > button:hover {
    background: #453100 !important;
}
</style>
<script>
</script>