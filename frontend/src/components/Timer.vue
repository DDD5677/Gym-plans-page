<template>
	<div class="countdown" :class="{ 'warning': featureStore.warningTimer }">
		<div>
			<div class="minut">{{ minutTwoDigit }}</div>
			<span>минут</span>
		</div>
		<span class="dots" :class="{ 'warning': featureStore.warningTimer }">:</span>
		<div>
			<div class="second">{{ secondTwoDigit }}</div>
			<span>секунд</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useFeatureStore } from '@/stores/features';
import { computed, ref } from 'vue';
const featureStore = useFeatureStore()
const props = defineProps({
	time: {
		type: Number,
		required: true
	}
})
//variables
const minutes = ref(0)
const seconds = ref(0)
const launchDate = ref<number | null>(Date.now() + props.time * 60 * 1000)

let countDown = setInterval(() => {
	const currDate = Date.now()
	if (launchDate.value) {
		const launchTime = launchDate.value - currDate - 200
		if (launchTime < -3000) {
			clearInterval(countDown)
			featureStore.openPopupDiscount()
		} else if (launchTime < 0) {
			featureStore.timeOverHandler()
		} else {
			seconds.value = Math.floor(launchTime / 1000)
			minutes.value = Math.floor(launchTime / (60 * 1000))
			if (seconds.value % 60 <= 30) {
				featureStore.warningTimerHandler()
			}
		}
	}
}, 1000)

const onedigit = (digit: number) => Math.floor(digit / 10) ? digit : '0' + digit;
const minutTwoDigit = computed(() => onedigit(minutes.value % 60))
const secondTwoDigit = computed(() => onedigit(seconds.value % 60))
</script>

<style lang="scss" scoped>
.countdown {
	display: flex;
	align-items: center;
	text-align: center;

	&.warning {

		.minut,
		.second {
			color: #FD4D35;
		}
	}

	.minut,
	.second {
		font-size: 60px;
		font-weight: 400;
		color: #01B9C5;
		line-height: 0.8;
		letter-spacing: 2px;
		font-family: "Bebas Neue", sans-serif;
		padding: 0 5px;
		background-color: white;
		border-radius: 5px;
	}

	div {
		span {
			font-size: 16px;
			color: #818798;
			font-weight: 700;
		}
	}

	.dots {
		&.warning {
			color: #FD4D35;
		}

		color: #01B9C5;
		font-size: 35px;
		margin-bottom: 30px;
	}
}

@media(max-width:490px) {
	.countdown {

		.second,
		.minut {
			font-size: 40px;
			padding: 4px 7px;
		}

		span {
			font-weight: 500;
		}
	}
}
</style>