<template>
	<div>
		<div class="p-8">
			<AppIcon v-for="(app, index) in applications" :key="index" :name="app.name" :icon="app.icon"
				@dblclick="taskbar.OpenApplication(app)" />

			<AppStore v-if="taskbar && taskbar.openApplications && taskbar.openApplications.includes(applications[0])"
				@close="taskbar.CloseApplication(applications[0])" @minimize="taskbar.MinimizeApplication(applications[0])" />
		</div>

		<Taskbar ref="taskbar" class="absolute bottom-0" />
	</div>
</template>

<script lang="ts" setup>
import AppIcon from '@/components/Apps/AppIcon.vue';
import AppStore from '@/components/Apps/AppStore.vue';

const taskbar = ref(null);

const applications = [
	{
		name: 'My Work',
		icon: 'directory_open_file_mydocs-4',
		ref: ref(null),
	},
]

definePageMeta({
	title: 'My Computer',
	middleware: ['is-authenticated'],
});
</script>