<template>
	<div v-show="isShown" class="window absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" style="width: 300px">
		<div class="title-bar">
			<div class="title-bar-text">{{ title }}</div>
			<div class="title-bar-controls">
				<button aria-label="Close" @click="hideModal"></button>
			</div>
		</div>
		<div class="window-body py-1 text-center">
			<div class="flex items-center">
				<img :src="icon" class="w-8 h-8 mr-4" />

				<p class="text-xs">
					{{ message }}
				</p>
			</div>

			<button class="mt-2" @click="hideModal">
				OK
			</button>
		</div>
	</div>
</template>

<script setup>
import { defineExpose, defineProps } from 'vue';

defineProps({
	title: {
		type: String,
		default: 'Error'
	},
	message: {
		type: String,
		default: 'An error has occurred'
	},
	icon: {
		type: String,
		default: '/img/icons/msg_error-0.png'
	}
});

const isShown = ref(false);

function showModal() {
	isShown.value = true;
}

function hideModal() {
	isShown.value = false;
}

defineExpose({
	showModal,
	hideModal
});


</script>