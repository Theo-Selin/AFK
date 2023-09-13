import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    is_authenticated: false
  }),
  actions: {
    async login(data: LoginData) {
      try {
        const response = await axios.post(
          '/api/auth/login',
          {
            email: data.email,
            password: data.password
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        this.router.push('/');

        this.user = response.data.user;
      } catch (e) {
        console.error(e);
      }
    },
    logout() {},
    async register(data: RegistrationData) {
      try {
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
      } catch (e) {
        console.error(e);
      }
    }
  }
});
