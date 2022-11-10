<template>
	<div class="window min-w-max w-full">
		<div class="window-body m-0 flex">
			<button class="flex gap-1 items-center font-black min-w-0 px-1 text-xs" @click="startMenu.toggleMenu()">
				<img src="/img/icons/windows-4.png" class="w-5 h-5" />
				Start
			</button>

			<div class="flex items-center gap-2 ml-1">
				<button v-for="(application, index) in OS.openApplications" :ref="buttonsUnwrap.el"
					:class="`flex-grow flex gap-1 items-center ${isActive(application) ? 'font-black active' : 'font-normal'} w-48`"
					@click="onClick(index)">
					<img :src="`/img/icons/applications/${application.icon}.png`" class="w-4 h-4" />
					{{ application.name }}
				</button>
			</div>

			<div class="status-bar ml-auto">
				<p class="status-bar-field px-3">
					{{ moment().format('h:mm A') }}
				</p>
			</div>
		</div>

		<StartMenu ref="startMenu" class="absolute bottom-7 left-0" />
	</div>
</template>

<script lang="ts" setup>
import StartMenu from '~/components/StartMenu/index.vue';
import moment from 'moment'
import { Application, useOS } from '~~/store/app';


const OS = useOS();

const startMenu = ref(null);
var buttonsUnwrap = { el: ref([]) }

function onClick(index) {
	if (OS.activeApplication) {
		OS.minimizeApplication();
	}

	OS.activeApplication = OS.openApplications[index];
}

function isActive(app: Application) {
	if (!OS.activeApplication) return false;

	return OS.activeApplication.id === app.id;
}
</script>

<style scoped>
button.active {
	box-shadow: inset -1px -1px #ffffff, inset 1px 1px #0a0a0a,
		inset -2px -2px #dfdfdf, inset 2px 2px #808080;
}
</style>