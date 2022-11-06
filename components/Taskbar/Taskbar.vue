<template>
	<div class="window min-w-max w-full">
	  <div class="window-body m-0 flex">
			<button class="flex gap-1 items-center font-black min-w-0 px-1 text-xs">
				<img src="/img/icons/windows-4.png" class="w-5 h-5" />
				Start
			</button>

			<div class="flex items-center gap-2 ml-1">
				<button v-for="(application, index) in openApplications" :ref="buttonsUnwrap.el" :class="`flex-grow flex gap-1 items-center ${IsActive(application) ? 'font-black active' : 'font-normal'} w-48`" @click="ApplicationClick(index)">
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
	</div>
</template>

<script lang="ts" setup>
import moment from 'moment'
import { Ref } from 'vue';

interface Application {
	name: string;
	icon: string;
	ref: Ref<HTMLElement> | undefined;
}

var buttonsUnwrap = { el: ref([]) }
let buttons = computed(() => buttonsUnwrap.el.value);

const openApplications: Ref<Application[]> = ref([]);
const currentFocus: Ref<Application> = ref(null);

function ApplicationClick (index) {
	const application: Application = openApplications.value[index];

	if (!application) return;

	if (application == currentFocus.value) {
		MinimizeApplication(application);
	} else {
		if (currentFocus.value) {
			MinimizeApplication(currentFocus.value);
		}

		OpenApplication(application);
	}
}

function OpenApplication (app: Application) {
	if (openApplications.value.includes(app)) {
		// Focus on the application
		currentFocus.value = app;
	} else {
		// Open the application
		openApplications.value.push(app);
	}

	// Focus on the application
	currentFocus.value = app;
}

function CloseApplication (app: Application) {
	if (openApplications.value.includes(app)) {
		// Close the application
		openApplications.value.splice(openApplications.value.indexOf(app), 1);
	}
}

function MinimizeApplication (app: Application) {
	if (openApplications.value.includes(app) && currentFocus.value === app) {
		// Minimize the application
		currentFocus.value = null;
	}
}

function IsActive (app: Application) {
	return currentFocus.value === app;
}

defineExpose({
	openApplications,
	currentFocus,
	ApplicationClick,
	OpenApplication,
	CloseApplication,
	MinimizeApplication,
	IsActive,
});

</script>

<style scoped>
	button.active {
    box-shadow: inset -1px -1px #ffffff, inset 1px 1px #0a0a0a,
    inset -2px -2px #dfdfdf, inset 2px 2px #808080;
	}
</style>