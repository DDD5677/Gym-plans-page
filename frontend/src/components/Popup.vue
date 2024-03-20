<template>
	<div class="modal">
		<div class="popup">
			<div class="popup_header">
				<div class="label">горящее предложение</div>
				<button @click="featureStore.closePopupDiscount" class="close"></button>
			</div>
			<div class="popup_body">
				<h2 class="title">Не упусти свой <span>последний шанс</span></h2>
				<div class="text_sale">
					<h3>
						Мы знаем, как трудно начать.. <b>Поэтому!</b>
					</h3>
					<div class="sale">
						Дарим скидку для <span>лёгкого старта 🏃‍♂️</span>
					</div>
				</div>
				<div class="carts">
					<div class="carts_title">Посмотри, что мы для тебя приготовили 🔥</div>
					<div class="carts_body">
						<div v-for="(cart, index) in carts" :key="cart.id" @click="choose(cart.id)" class="cart"
							:class="{ 'choosed': choosedPlan === cart.id }">
							<div class="name">
								<span>{{ cart.name }}</span>
								<span class="checkbox"></span>
							</div>
							<div class="old_price">
								<div class="old_price-inner">
									{{ Math.ceil(cart.price / (100 - disCounts[index] - 10) * 100) }}<span>&#8381;</span></div>
							</div>
							<div class="new_price">{{ cart.price }}<span>&#8381;</span></div>
							<div class="star">-{{ disCounts[index] + 10 }}%</div>
						</div>
					</div>
				</div>
			</div>
			<div class="popup_footer">
				<button class="btn">Начать тренироваться</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useFeatureStore } from '@/stores/features';
import type { Plan } from '@/types';
import { ref, type PropType, } from 'vue';

const featureStore = useFeatureStore()
const choosedPlan = ref('')
const props = defineProps({
	carts: {
		type: Array as PropType<Plan[] | null>,
		required: true
	},
	disCounts: {
		type: Array as PropType<number[]>,
		requiered: true,
		default: []
	}

})
const choose = (id: string) => {
	choosedPlan.value = id
}

if (props.carts) choosedPlan.value = props.carts[1].id

</script>

<style lang="scss" scoped>
.modal {
	position: absolute;
	left: 0;
	top: 0;
	z-index: 1;
	min-height: 100%;
	width: 100vw;
	background-color: rgba(0, 0, 0, 0.5);
}

.popup {
	padding: 60px 40px 40px;
	background-color: #fff;
	max-width: 750px;
	margin: 225px auto 0;
	position: relative;

	&_header {
		.label {
			position: absolute;
			top: 0;
			left: 40px;
			background-color: #01B9C5;
			color: #fff;
			font-size: 16px;
			line-height: 20px;
			padding: 5px 10px;
		}

		.close {
			cursor: pointer;
			position: absolute;
			right: 20px;
			top: 20px;
			height: 40px;
			width: 40px;
			background-image: url('@/assets/images/close.svg');
			background-repeat: no-repeat;
			background-position: center;
			background-size: auto;
			border: none;
			background-color: transparent;
		}
	}

	&_body {
		.title {
			font-size: 30px;
			line-height: 39px;
			font-family: "Rubik", sans-serif;
			text-align: center;
			margin-bottom: 30px;
			color: #000;
			text-transform: uppercase;

			span {
				color: #01B9C5;
			}
		}

		.text_sale {
			text-align: center;

			font-size: 24px;
			line-height: 32px;

			h3 {
				font-weight: 400;
				margin-bottom: 8px;
			}

			.sale {
				padding: 15px 30px;
				font-weight: 700;
				border: 1.5px solid #01B9C5;
				display: inline-block;
				border-radius: 30px;
				margin-bottom: 40px;

				span {
					color: #01B9C5;
				}
			}
		}

		.carts {
			margin-bottom: 40px;

			&_title {
				font-size: 24px;
				line-height: 31px;
				font-weight: 500;
				margin-bottom: 20px;
			}

			&_body {
				display: flex;
				justify-content: space-between;
				gap: 20px;

				.cart {
					background-color: #fff;
					flex-grow: 1;
					border-radius: 20px;
					border: 2px solid #E7EAF1;
					padding: 25px;
					cursor: pointer;
					position: relative;

					&.choosed {
						border-color: #01B9C5;
						background-color: rgba(1, 185, 197, 0.05);

						.name {
							.checkbox {
								border-color: #01B9C5;

								&::after {
									background-color: #01B9C5;
								}
							}
						}
					}

					.name {
						font-family: 'Bebas Neue', sans-serif;
						margin-bottom: 12px;
						text-transform: uppercase;
						font-size: 26px;
						line-height: 1;
						display: flex;
						justify-content: space-between;
						align-items: center;
						border-bottom: 1px solid #E7EAF1;
						padding-bottom: 50px;

						.checkbox {
							border: 1.5px solid #555965;
							border-radius: 50%;
							width: 22px;
							height: 22px;
							position: relative;

							&::after {
								content: '';
								display: inline-block;
								width: 12px;
								height: 12px;
								border-radius: 50%;
								position: absolute;
								left: 4px;
								top: 4px;
							}
						}
					}

					.old_price {
						position: absolute;
						top: 64px;

						.old_price-inner {
							font-size: 20px;
							line-height: 22px;
							position: relative;
							font-weight: 500;

							&:before,
							&:after {
								content: '';
								display: inline-block;
								width: 50px;
								height: 2px;
								position: absolute;
								background-color: #FD4D35;
								top: 10px;
								left: 0px;
							}

							&::before {
								transform: rotate(18deg);
							}

							&::after {
								transform: rotate(-18deg);
							}
						}
					}

					.new_price {
						margin-top: 24px;
						font-size: 46px;
						line-height: 50px;
						font-weight: 700;
					}

					.star {
						width: 50px;
						height: 50px;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 13px;
						line-height: 17px;
						font-weight: 500;
						color: white;
						position: absolute;
						bottom: 40px;
						right: 10px;
						background-image: url('@/assets/images/Star.png');
						background-position: center;
						background-size: contain;
						background-repeat: no-repeat;
					}
				}

			}
		}


	}

	&_footer {
		display: flex;
		justify-content: center;

		.btn {
			border: none;
			color: #fff;
			font-family: "Rubik", sans-serif;
			font-size: 20px;
			font-weight: 500;
			border-radius: 60px;
			padding: 20px 42px;
			background: rgba(253, 77, 53, 1);
			cursor: pointer;
			transition: all 0.3s ease;
			margin: 0 auto;

			&:hover {
				background: rgb(246, 59, 34);

			}
		}
	}
}

@media(max-width:785px) {
	.popup {
		max-width: max(60%, 335px);
		padding: 50px 20px 20px;
		margin-top: 70px;

		&_header {
			.label {
				left: 0;
				font-size: 14px;
			}

			.close {
				top: 10px;
				right: 10px;
			}
		}

		&_body {
			.title {
				font-size: 24px;
				line-height: 30px;
				margin-bottom: 22px;
			}

			.text_sale {
				font-size: 15px;
				line-height: 19px;

				.sale {
					margin-bottom: 26px;
					padding: 12px 22px;
				}
			}

			.carts {
				margin-bottom: 20px;
			}

			.carts_body {
				flex-direction: column;
				gap: 6px;

				.cart {
					padding: 20px;

					.name {
						font-size: 24px;
						padding-bottom: 15px;
						border-bottom: none;
					}

					.old_price {
						top: 100px;
						right: 25px
					}

					.star {
						width: 40px;
						height: 40px;
						left: 150px;
					}
				}
			}

			.carts_title {
				font-size: 15px;
				line-height: 19px;
				margin-bottom: 14px;
			}
		}

		&_footer {
			.btn {
				padding: 20px 34px;
			}
		}
	}
}
</style>