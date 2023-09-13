import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    user: null as User | null
  }),
  actions: {
    setUser(user: User) {
      this.user = user;
    }
  }
});
