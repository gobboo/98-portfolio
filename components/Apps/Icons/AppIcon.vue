<template>
	<div class="px-1 flex flex-col items-center w-fit h-fit text-white select-none active:outline-dotted active:outline-1 active:outline-black" @dblclick="OS.openApplication(id)" >
		<img :src="`/img/icons/applications/${icon}.png`" class="w-9 h-9" />

		<p class="text-xs mt-1">
			{{ name }}
		</p>
	</div>

</template>

<script lang="ts" setup>
import { useOS } from '~~/store/app';

const OS = useOS();

defineProps({
	id: String,
	name: String,
	icon: String,
});
</script>