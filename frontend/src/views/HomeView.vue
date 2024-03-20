<template>
	<main class="home">
		<Header />
		<div class="container">
			<h1 class="title">
				Выберите подходящий тарифный план
			</h1>
			<div class="main">
				<div class="img_box">
					<img src="@/assets/images/man.png" alt="">
				</div>
				<div class="left">

					<div v-show="!isloading" class="plans" ref="plansElement">
						<div v-for="(plan, index) in popularPlans" :key="plan.id" @click="choose(plan.id)" class="plans_item"
							:class="{ 'choosed': choosedPlan === plan.id }">

							<div class="star" ref="item">-{{ disCounts[index] }}%</div>
							<div class="name">{{ plan.name }}</div>
							<div class="price">

								<div class="price-new">
									{{ !featureStore.timeOver ? plan.price : Math.ceil(plan.price / (100 - disCounts[index]) *
						100) }}<span>&#8381;</span>
									<div class="price-new-old">
										{{ Math.ceil(plan.price / (100 - disCounts[index]) * 100) }}<span>&#8381;</span>
									</div>
								</div>

							</div>
							<p class="text">
								{{ quotes[index] }}
							</p>
						</div>
					</div>
					<p class="subtitle">Следуя плану на 3 месяца, люди получают в 2 раза лучший результат, чем за 1 месяц</p>
					<div class="privasy">
						<div class="checkbox-wrapper-46">
							<input class="inp-cbx" id="cbx-46" type="checkbox" />
							<label class="cbx" for="cbx-46"><span>
									<svg width="18px" height="14px" viewbox="0 0 12 10">
										<polyline points="1.5 6 4.5 9 10.5 1"></polyline>
									</svg></span><span class="label">Я соглашаюсь с <a href="#">Правилами сервиса</a> и условиями
									<a href="#">Публичной оферты</a>. </span>
							</label>
						</div>
					</div>
					<button @click.prevent="tl.play" class="btn">Купить</button>
					<p class="text_low">
						Нажимая «Купить», Пользователь соглашается на автоматическое списание денежных средств по истечению
						купленного периода. Дальнейшие списания по тарифам участвующим в акции осуществляются по полной
						стоимости согласно оферте.
					</p>
				</div>
			</div>
		</div>
		<Transition name="modal-fade" appear>
			<Popup v-if="featureStore.popupDiscount" :carts="discountPlans ? discountPlans : []" :disCounts="disCounts" />
		</Transition>
	</main>
</template>
<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from '@/components/Header.vue';
import Popup from '@/components/Popup.vue';
import { useFeatureStore } from '@/stores/features';
import type { Plan } from '@/types';
import { onMounted, ref, watch } from 'vue';
const featureStore = useFeatureStore()
const choosedPlan = ref('')
const plans = ref<Plan[] | null>(null)
const popularPlans = ref<Plan[] | null>(null)
const discountPlans = ref<Plan[] | null>(null)
const isloading = ref(true)
const disCounts = [30, 40, 50, 60]
const quotes = ['Чтобы просто начать 👍🏻', 'Привести тело впорядок 💪🏻', 'Изменить образ жизни 🔥', 'Всегда быть в форме и поддерживать своё здоровье ⭐️']
gsap.registerPlugin(ScrollTrigger);



const plansElement = ref(null)
const item = ref([])
const choose = (id: string) => {
	choosedPlan.value = id
}


async function getPlans() {
	isloading.value = true
	try {
		const response = await fetch("https://t-pay.iqfit.app/subscribe/list");
		plans.value = await response.json();
		if (plans.value) {
			popularPlans.value = plans.value.filter((plan: any) => !plan.isDiscount)
			discountPlans.value = plans.value.filter((plan: any) => plan.isDiscount && plan.name !== 'Навсегда')
			choosedPlan.value = popularPlans.value[0].id
		}
	} catch (error) {
		console.log(error)
	} finally {
		isloading.value = false
	}
}






//animations
let tl = gsap.timeline({ paused: true, stagger: 0.1 })

watch(
	() => featureStore.timeOver,
	() => {
		tl.play()
	},
)



onMounted(async () => {
	//get plans
	await getPlans()
	//animation plans
	tl
		.to('.star', {
			rotation: 360,
			duration: 0.5,
			ease: 'circ.in'
		})
		.to('.star', {
			opacity: 0,
			x: 100,
			duration: 0.3,
			ease: 'circ.in'
		}, 0.2)
		.to('.price-new', {
			y: -30,
			duration: 0.2,
			repeat: 1,
			yoyo: true,
			ease: 'power1.out'
		}, 0)
		.to('.price-new-old', {
			opacity: 0,
			duration: 0.1,
		}, '<')
	//animation button
	gsap.from('.btn', {
		scrollTrigger: '.btn',
		duration: 1,
		scale: 1.1,
		opacity: 0,
		repeat: -1,
		ease: 'power2.out'
	})
})

</script>

<style lang="scss" scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
	transition: all 0.5s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
	opacity: 0;
}

.home {
	background-color: #F5F7F7;
	position: relative;
	padding-bottom: 100px;

	.title {
		font-family: "Rubik", sans-serif;
		text-align: center;
		font-size: 40px;
		font-weight: 700;
		text-transform: uppercase;
		margin-top: 30px;
	}

	.main {
		display: flex;
		justify-content: space-between;
		margin-top: 100px;
		align-items: start;

		.img_box {
			width: 434px;
			margin-right: 80px;

			img {
				width: 100%;
			}
		}

		.left {
			flex: 1 0 45%;

			.subtitle {
				font-size: 18px;
				line-height: 24px;
				font-weight: 500;
				margin: 12px 0 26px;
			}

			.privasy {
				font-size: 16px;
				margin-bottom: 50px;

				label {
					display: flex;
					align-items: center;
				}

				.label {
					max-width: 418px;
				}
			}

			.btn {
				border: none;
				text-transform: uppercase;
				color: #fff;
				font-family: "Rubik", sans-serif;
				font-size: 20px;
				font-weight: 500;
				border-radius: 60px;
				padding: 28px 100px;
				background: rgba(253, 77, 53, 1);
				cursor: pointer;
				transition: all 0.3s ease;

				&:hover {
					background: rgb(246, 59, 34);

				}
			}

			.text_low {
				margin-top: 30px;
				font-size: 14px;
				color: rgba(129, 135, 152, 1);
				line-height: 20px;
			}
		}

		.plans {
			display: flex;
			flex-wrap: wrap;
			column-gap: 12px;
			row-gap: 30px;

			.plans_item {
				padding: 45px 30px 25px;
				flex: 1 0 25%;
				border-radius: 20px;
				border: 2px solid #D3D6DD;
				background-color: #fff;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				column-gap: 30px;
				cursor: pointer;
				position: relative;

				.star {
					width: 70px;
					height: 70px;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 18px;
					line-height: 24px;
					font-weight: 500;
					color: white;
					position: absolute;
					top: -30px;
					right: 10px;
					background-image: url('@/assets/images/star.png');
					background-position: center;
					background-size: contain;
					background-repeat: no-repeat;
				}

				&.choosed {
					border-color: #01B9C5;
					background-color: rgba(1, 185, 197, 0.05);
				}

				&:last-child {
					.name {
						color: #2F4353;
						font-size: 38px;
					}

					.price {
						margin-bottom: 0;
						text-align: center;
					}

					.text {
						text-align: start;
					}
				}

				.name {
					flex-grow: 1;
					max-width: 160px;
					font-family: "Bebas Neue", sans-serif;
					font-size: 30px;
					line-height: 1;
					text-transform: uppercase;
					color: #687078;
					font-weight: 400;
					text-align: start;
					margin-bottom: 20px;
				}

				.price {
					margin-bottom: 20px;
					flex-grow: 1;
					text-align: end;

					&-new {
						padding-bottom: 25px;
						position: relative;
						font-size: 50px;
						font-weight: 700;
						display: inline-block;

						&-old {
							position: absolute;
							bottom: 0;
							right: 0;
							font-size: 24px;
							color: #95979F;
							text-decoration: line-through;
						}
					}


				}

				.text {
					flex-grow: 1;
					text-align: center;
					font-size: 16px;
					color: #2F4353;
					max-width: 160px;
				}
			}
		}
	}
}


@media(max-width:1050px) {
	.home {
		.main {
			flex-direction: column;

			.img_box {
				width: 100%;
			}
		}
	}
}

@media(max-width:490px) {
	.home {
		.title {
			font-size: 24px;
			text-align: start;
			margin-top: 20px;
		}

		.main {
			margin-top: 20px;

			.left {
				.plans {
					flex-direction: column;
					gap: 10px;

					&_item,
					&_item:last-child {
						.star {
							width: 50px;
							height: 50px;
							font-size: 13px;
							top: 10px;
						}

						.name {
							font-size: 24px;
						}

						.price {
							text-align: start;

							&-new {
								font-size: 44px;

								&-old {
									font-size: 20px;
								}
							}
						}
					}

					.text {
						font-size: 14px;
						text-align: start;
					}
				}

				.subtitle {
					font-size: 14px;
					line-height: 18px;
				}

				.btn {
					width: 100%;
				}

				.text_low {
					display: none;
				}
			}
		}
	}
}


.checkbox-wrapper-46 input[type="checkbox"] {
	display: none;
	visibility: hidden;
}

.checkbox-wrapper-46 .cbx {
	margin: auto;
	-webkit-user-select: none;
	user-select: none;
	cursor: pointer;
}

.checkbox-wrapper-46 .cbx span {
	display: inline-block;
	vertical-align: middle;
	transform: translate3d(0, 0, 0);
}

.checkbox-wrapper-46 .cbx span:first-child {
	position: relative;
	min-width: 24px;
	height: 24px;
	border-radius: 3px;
	transform: scale(1);
	vertical-align: middle;
	border: 1px solid #9098A9;
	transition: all 0.2s ease;
}

.checkbox-wrapper-46 .cbx span:first-child svg {
	position: absolute;
	top: 5px;
	left: 5px;
	fill: none;
	stroke: #FFFFFF;
	stroke-width: 2;
	stroke-linecap: round;
	stroke-linejoin: round;
	stroke-dasharray: 16px;
	stroke-dashoffset: 16px;
	transition: all 0.3s ease;
	transition-delay: 0.1s;
	transform: translate3d(0, 0, 0);
}

.checkbox-wrapper-46 .cbx span:first-child:before {
	content: "";
	width: 100%;
	height: 100%;
	background: #01B9C5;
	display: block;
	transform: scale(0);
	opacity: 1;
	border-radius: 50%;
}

.checkbox-wrapper-46 .cbx span:last-child {
	padding-left: 12px;
}

.checkbox-wrapper-46 .cbx:hover span:first-child {
	border-color: #01B9C5;
}

.checkbox-wrapper-46 .inp-cbx:checked+.cbx span:first-child {
	background: #01B9C5;
	border-color: #01B9C5;
	animation: wave-46 0.4s ease;
}

.checkbox-wrapper-46 .inp-cbx:checked+.cbx span:first-child svg {
	stroke-dashoffset: 0;
}

.checkbox-wrapper-46 .inp-cbx:checked+.cbx span:first-child:before {
	transform: scale(3.5);
	opacity: 0;
	transition: all 0.6s ease;
}

@keyframes wave-46 {
	50% {
		transform: scale(0.9);
	}
}
</style>
