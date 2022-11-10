<template>
	<div ref="container" class="window absolute -trans max-h-full" style="left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%); ">
		<div class="title-bar">
			<div class="w-full h-full">
				<div class="title-bar-text flex items-center" @mousedown="onMouseDown">
					<img class="w-4 h-4 mr-1" :src="`/img/icons/applications/${icon}.png`" draggable="false" />
					{{ name }}
				</div>
			</div>

			<div class="title-bar-controls">
				<button aria-label="Minimize" @click="OS.minimizeApplication()"></button>
				<button aria-label="Maximize"></button>
				<button aria-label="Close" @click="OS.closeApplication(id)"></button>
			</div>
		</div>
		<div class="window-body">
			<slot></slot>
		</div>

		<div ref="outlineContainer" class="absolute outline-dotted outline-1"></div>
	</div>
</template>

<script lang="ts" setup>
import { useOS } from '~~/store/app';


const OS = useOS();

const container = ref(null);
const outlineContainer = ref(null);

const clientX = ref(0);
const clientY = ref(0);

defineProps<
	{
		id: string;
		name: string;
		icon: string;
	}
>();

const onMouseDown = (e: MouseEvent) => {
	e.preventDefault();

	clientX.value = e.clientX;
	clientY.value = e.clientY;

	// Set size of outlineContainer to the size of the window
	outlineContainer.value.style.width = container.value.offsetWidth + 'px';
	outlineContainer.value.style.height = container.value.offsetHeight + 'px';

	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
};

const onMouseUp = (e: MouseEvent) => {
	e.preventDefault();

	// Move container to new position
	container.value.style.left = container.value.offsetLeft + e.clientX - clientX.value + 'px';
	container.value.style.top = container.value.offsetTop + e.clientY - clientY.value + 'px';

	// Hide outlineContainer and reset its size and position
	outlineContainer.value.style.width = '0px';
	outlineContainer.value.style.height = '0px';
	outlineContainer.value.style.left = '0px';
	outlineContainer.value.style.top = '0px';

	document.removeEventListener('mousemove', onMouseMove);
	document.removeEventListener('mouseup', onMouseUp);
};

const onMouseMove = (e: MouseEvent) => {
	e.preventDefault();

	// Move outlineContainer
	const x = e.clientX - clientX.value;
	const y = e.clientY - clientY.value;

	outlineContainer.value.style.left = `${x}px`;
	outlineContainer.value.style.top = `${y}px`;
};

</script>