<template>
	<App id="documentview" name="Document Viewer" icon="accesibility_window_abc">
		
		<iframe v-if="documentName" :src="documentUrl" width="800px" height="700px" frameborder="0" />

	</App>
</template>

<script lang="ts" setup>
import App from '@/components/Apps/App.vue';

const props = defineProps<{
	documentName: string;
}>();

const documentUrl = computed(() => {
	if (props.documentName) {
		return `https://docs.google.com/gview?url=${window.location.href}documents/${props.documentName}&embedded=true`;
	}
});



</script>