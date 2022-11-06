<template>
	<div class="w-full min-h-screen flex items-center justify-center">
		<error-popup ref="errorPopupRef" :title="loginError.title" :message="loginError.message" :icon="loginError.icon" />
		<div class="window" style="width: 440px">
			<div class="title-bar">
				<div class="title-bar-text select-none">Authenticate with Network</div>
				<div class="title-bar-controls">
					<button aria-label="Help"></button>
				</div>
			</div>
			<div class="window-body select-none flex flex-row justify-between pb-4 pt-1">
				<img class="ml-3 w-12 h-12" src="/img/icons/key_win_alt-2.png" draggable="false" />
				<div class="flex flex-col">
					<p class="mb-6">Please login below or continue with a Guest account:</p>

					<div class="field-row mb-1">
						<label for="username" class="w-20">Username: </label>
						<input v-model="username" class="w-full" id="username" type="text" />
					</div>

					<div class="field-row mb-1">
						<label for="password" class="w-20">Password: </label>
						<input v-model="password" class="w-full" id="password" type="password" />
					</div>
					<div class="field-row">
						<label for="domain" class="w-20">Domain: </label>
						<input value="net.samuelstubbings.com" class="w-full" id="domain" type="text" readonly />
					</div>
				</div>

				<div class="flex flex-col gap-2">
					<button @click="authenticateUser">
						OK
					</button>
					<button disabled>
						Cancel
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { Ref } from 'vue';
import { useAuth } from '~~/store/auth';

const username: Ref<string> = ref('Guest');
const password: Ref<string> = ref('');

const auth = useAuth();
const router = useRouter();

const errorPopupRef = ref(null)

const loginError = ref({
	title: 'Could not Authenticate',
	message: 'The Username or Password you typed is incorrect.',
	icon: '/img/icons/msg_error-0.png'
});

async function authenticateUser() {
	const isGuest = username.value === 'Guest';

	auth.login(username.value, password.value, isGuest)
		.then(() => {
			router.push('/');
		})
		.catch((err) => {
			loginError.value.message = err.value.data.data;
			console.log(errorPopupRef.value)
			errorPopupRef.value.showModal();
		})
}
</script>