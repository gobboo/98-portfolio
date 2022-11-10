import { defineStore } from 'pinia'

export interface Application {
	id: string;
	name: string;
	icon: string;
	metadata: Record<string, any>;
}

export const applications = [
	{
		id: 'documentview',
		name: 'Document Viewer',
		icon: 'document-0',
		metadata: {}
	},
	{
		id: 'mywork',
		name: 'My Work',
		icon: 'directory_open_file_mydocs-4',
		metadata: {}
	},
];

export const useOS = defineStore('os', {
	// arrow function recommended for full type inference
	state: () => {
		return {
			openApplications: [] as Application[],
			activeApplication: null as Application | null,
		}
	},
	actions: {
		async openApplication(id: string, metadata: Record<string, any> = {}) {
			const application = applications.find(app => app.id === id);

			if (!application) { return; } // TODO Show Error box

			application.metadata = metadata;
			
			this.activeApplication = application
			this.openApplications.push(application)
		},

		async minimizeApplication() {
			this.activeApplication = null
		},

		async closeApplication(id: string) {
			this.openApplications = this.openApplications.filter(app => app.id !== id)
		}
	}
})