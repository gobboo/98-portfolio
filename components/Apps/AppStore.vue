<template>
	<App name="My Work" icon="accesibility_window_abc" @close="emit('close')" @maximize="emit('maximize')"
		@minimize="emit('minimize')">
		<div v-for="(project, index) in portfolio" :key="index" class="flex gap-12 my-4">
			<div class="flex flex-1">
				<ul class="tree-view mr-2 w-48 p-0">
					<img class="w-full h-full" :src="`/img/previews/${project.preview}.png`" />
				</ul>

				<div class="max-w-sm">
					<h1 class="text-lg font-bold">{{ project.name }}</h1>
					<p class="text-xs">{{ project.description }}</p>

					<div class="flex gap-2 mt-4">
						<img v-for="(tech, index) in project.tech" :key="index" class="h-5" style="image-rendering: pixelated;"
							:alt="tech" :src="`/img/icons/software/${tech}.png`" />
					</div>
				</div>
			</div>

			<div class="flex-none flex flex-col gap-2">
				<a v-show="project.link !== ''" class="min-w-0 text-black" target="_blank" :href="project.link">
					<button class="flex gap-1 items-center px-1 w-full">
						<img src="/img/icons/entire_network_globe-0.png" class="w-4 h-4" />
						View Online
					</button>
				</a>

				<a v-show="project.source !== ''" class="min-w-0 text-black" target="_blank" :href="project.source">
					<button class="flex gap-1 items-center px-1 w-full">
						<img src="/img/icons/software/github.png" class="w-4 h-4" />
						View Source
					</button>
				</a>
			</div>
		</div>
	</App>
</template>

<script lang="ts" setup>
import App from '@/components/Apps/App.vue';

const emit = defineEmits(['close', 'minimize', 'maximize']);

const portfolio = [
	{
		name: 'Epoch.bet | Full-Stack',
		description: 'A Cryptocurrency casino built upon the Cardano Blockchain. Provably Fair algorithms and multiple unique games.',
		tech: ['vue', 'nuxt', 'typescript', 'mongodb', 'tailwind'],
		preview: 'epoch-bet',
		link: 'https://epoch-frontend-v2.vercel.app',
		source: '',
	},
	{
		name: 'PlanetPalz | Full-Stack',
		description: 'An NFT Project built on the Cardano Blockchain. PlanetPalz are collectible NFTs that can be used to play games and earn rewards. The project itself is a website in which users can view their NFTs, play the game, and earn rewards.',
		tech: ['vue', 'javascript', 'mongodb', 'postgresql'],
		preview: 'planetpalz',
		link: 'https://planetpalz.io',
		source: '',
	},
	{
		name: '98 Portfolio | Full-Stack',
		description: 'A Portfolio website built with Vue 3 and TailwindCSS. The website is designed around the Windows 98 UI, including a Login section so that I can add to new projects.',
		tech: ['vue', 'nuxt', 'typescript', 'mongodb', 'tailwind'],
		preview: 'portfolio',
		link: 'https://portfolio.gobbo.gg',
		source: 'https://github.com/gobboo/98-portfolio',
	}
]
</script>