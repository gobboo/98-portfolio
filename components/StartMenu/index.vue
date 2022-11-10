<template>
	<div v-show="isOpen" class="window h-fit w-48" @mouseleave="isOpen = false">
		<div class="window-body m-0 flex pl-0">
			<div class="bar min-h-full w-7"></div>

			<div class="flex flex-col w-full">
				<div v-for="(option, index) in options" :key="index"
					class="option flex items-center py-1 px-2 text-xs font-medium" @click="option.onClick">
					<img class="w-7 h-7 mr-4" :src="`/img/icons/applications/${option.icon}.png`" />

					<span class="underline">
						{{ option.name.charAt(0) }}
					</span>
					{{ option.name.slice(1) }}

					<div v-show="option.submenu.length > 0" class="ml-auto">
						►
					</div>

					<div v-if="option.submenu.length > 0" class="submenu absolute window h-fit w-48 top-0">
						<div class="window-body m-0 flex pl-0">
							<div class="flex flex-col w-full">
								<div v-for="(subOption, index) in option.submenu" :key="index"
									class="option flex items-center py-1 px-1 text-xs font-medium" @click="subOption.onClick">
									<img class="w-4 h-4 mr-2" :src="`/img/icons/applications/${subOption.icon}.png`" />

									<span class="underline">
										{{ subOption.name.charAt(0) }}
									</span>
									{{ subOption.name.slice(1) }}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { Ref } from 'vue';
import { useOS } from '~~/store/app';
import { useAuth } from '~~/store/auth';

const auth = useAuth();
const OS = useOS();

interface SubmenuItem {
	name: string;
	icon: string;
	onClick: () => void;
}

const isOpen = ref(false);

const options = [
	{
		name: 'Documents',
		icon: 'directory_open_file_mydocs-4',
		submenu: [
			{
				name: 'my_cv.pdf',
				icon: 'file_lines-0',
				onClick: () => openDocument('my_cv.docx')
			},
			{
				name: 'NHS Recommendation.pdf',
				icon: 'certificate_2-0',
				onClick: () => openDocument('nhs_recommendation.pdf')
			},
		],
		onClick: () => { },
	},
	{
		name: 'Log Off',
		icon: 'key_win-4',
		submenu: [],
		onClick: () => {
			auth.logout();
			navigateTo('/auth');
		},
	},
]

function openDocument(documentName: string) {
	console.log('test')
	OS.openApplication('documentview', { documentName });
}

// Can use for a better hover, CSS for now :)
// function showSubmenu(index) {
// 	const option = options[index];

// 	if (option && option.submenu.length > 0) {
// 		currentSubmenu.value = option.submenu;
// 	}

// 	// Position Submenu based on the position of the option
// 	// If the submenu is too far down the screen, move it up

// 	const submenu: HTMLElement = document.querySelector('.submenu.window.absolute');
// 	const optionElement = document.querySelectorAll('.option')[index];

// 	const optionRect = optionElement.getBoundingClientRect();

// 	submenu.style.top = `0px`;
// 	submenu.style.left = `${optionRect.left + optionRect.width}px`;

// 	// If the submenu is too far down the screen, move it up
// 	const submenuRect = submenu.getBoundingClientRect();

// 	if (submenuRect.bottom > window.innerHeight) {
// 		submenu.style.top = `${optionRect.top - (submenuRect.bottom - window.innerHeight)}px`;
// 	}
// }

function toggleMenu () {
	isOpen.value = !isOpen.value;
}

defineExpose({
	toggleMenu
});
</script>

<style scoped>
.bar {
	background: linear-gradient(to top, #7977ff, #7977ff 10%, rgb(0, 0, 255), rgb(0, 0, 255) 100%);
}

.option:hover {
	background: rgb(0, 0, 255);
	color: white;
}

.submenu {
	display: none;
	color: black;
	left: calc(100% - 3px);
	z-index: 1;
}

.option:hover .submenu {
	display: block;
}
</style>