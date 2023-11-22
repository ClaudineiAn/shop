<script setup>
import TrolleyIcon from './icons/IconTrolley.vue'
import FavoriteIcon from './icons/IconFavorite.vue'
</script>

<template>
    <RouterLink to="/trolley" class="trolley"><TrolleyIcon /></RouterLink>
    <RouterLink to="/favorite" class="favorite"><FavoriteIcon /></RouterLink>
</template>
<style>
.trolley{
  margin-left: calc(1vw + 5px);
}
.favorite{
  margin-left: calc(2vw + 5px);
}
@media (orientation: portrait) {

}
</style>
<script>
</script>