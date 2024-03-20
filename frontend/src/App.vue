<template>
	<RouterView class="routerview" />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
<style lang="scss" scoped>
.routerview {
	flex-grow: 1;
}
</style>
