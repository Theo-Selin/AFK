import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    is_authenticated: false
  }),
  actions: {
    async login() {},
    logout() {},
    async register(data: RegistrationData) {
      console.log('VIA STORE');

      const response = await axios.post(
        '/api/auth/register',
        {
          username: data.username,
          email: data.email,
          password: data.password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      this.user = response.data.user;

      this.router.push('/login');
    }
  }
});
