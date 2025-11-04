import { defineStore } from 'pinia';


export const useUserStore = defineStore('user', {

  state: () => ({
    token: localStorage.getItem('access_token') || null,
    isDarkMode: localStorage.getItem('theme') === 'dark',
    user: JSON.parse(localStorage.getItem('user')) || {
      id: null,
      fullName: '',
      email: '',
      profilePicture: null, 
      role: 'user',
    },
    loading: false,
    error: null,
  }),

  getters: {

    isLoggedIn: (state) => !!state.token && !!state.user && !!state.user.id,

    isAdmin: (state) => state.user && state.user.role === 'admin',

    userFirstName: (state) => {
      if (!state.user?.fullName) return '';
      return state.user.fullName.split(' ')[0];
    },
  },

  actions: {

    setToken(newToken) {
      this.token = newToken;
      if (newToken) {
        localStorage.setItem('access_token', newToken);
      } else {
        localStorage.removeItem('access_token');
      }
    },

    setUser(newUserData) {
      if (newUserData) {
        this.user = { ...this.user, ...newUserData };
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {

        this.clearUser();
      }
    },


    clearUser() {
      this.token = null;
      this.user = {
        id: null,
        fullName: '',
        email: '',
        profilePicture: null,
        role: 'user',
      };
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    },

    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      const theme = this.isDarkMode ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
      document.documentElement.classList.toggle('dark', this.isDarkMode);
    },
  },
});