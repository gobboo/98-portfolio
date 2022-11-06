import { defineStore } from 'pinia'

export const useAuth = defineStore('auth', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      user: {},
      isAuthed: false,
      token: '',
      isGuest: false
    }
  },
  actions: {
    async fetchUser () {
      const { data: user } = await useFetch('/api/auth/user', {  });

      this.user = user;
    },

    async login (username: string, password: string, guest?: boolean) {
      if (guest) {
        this.isGuest = true

        this.user = {
          username: 'Guest'
        }

        this.isAuthed = true
        return
      }

      const { data: accessToken, error } = await useFetch('/api/auth', { method: 'POST', body: { username, password } });
      
      if (error) {
        throw error
      }

      this.accessToken = accessToken;

      await this.fetchUser();
    }
  }
})