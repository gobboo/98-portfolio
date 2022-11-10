<template>
	<div>
		<div class="p-8">
			<AppIcon v-for="(app, index) in applications" :key="index" :id="app.id" :name="app.name" :icon="app.icon"/>

			<MyWork v-if="isOpen('mywork')" />
			<DocumentApp v-if="isOpen('documentview')" :document-name="applicationData('documentview').metadata.documentName" />
		</div>

		<Taskbar class="absolute bottom-0" />
	</div>
</template>

<script lang="ts" setup>
import AppIcon from '~/components/Apps/Icons/AppIcon.vue';
import MyWork from '~/components/Apps/MyWork.vue';
import DocumentApp from '~/components/Apps/DocumentApp.vue';

import { useOS, applications } from '~~/store/app';

const OS = useOS();

const isOpen = (id) => OS.openApplications.some((app) => app.id === id);

const applicationData = (id) => OS.openApplications.find((app) => app.id === id);

definePageMeta({
	title: 'My Computer',
	middleware: ['is-authenticated'],
});
</script>