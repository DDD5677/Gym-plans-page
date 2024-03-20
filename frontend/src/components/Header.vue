<template>
	<header class="header">
		<h3>Скидка действует:</h3>
		<Timer :time="2" />
	</header>
</template>

<script setup lang="ts">
import Timer from './Timer.vue';
</script>

<style lang="scss" scoped>
.header {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px;
	background-color: #fff;
	position: sticky;
	top: 0;
	z-index: 999;

	h3 {
		font-size: 30px;
		line-height: 39px;
		font-weight: 700;
		margin-bottom: 15px;
		margin-right: 15px;
	}
}

@media(max-width:490px) {
	.header {
		padding: 8px 10px;

		h3 {
			font-size: 16px;
			margin-right: 30px;
		}
	}
}
</style>