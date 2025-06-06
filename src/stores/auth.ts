import { defineStore } from 'pinia';
import { Cookies } from 'quasar';
import { IUser } from 'src/Interfaces/User';
import { authDataServices } from 'src/services/AuthDataService';

export interface AuthState {
  counter: number;
  user: IUser;
  token: string;
  initLoader: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: () =>
    ({
      user: {},
      token: '',
      initLoader: false,
    } as AuthState),

  getters: {
    isAuth: (state) => state.token !== '',
    getUser: (state) => state.user,
    getLoader: (state) => state.initLoader,
  },
  actions: {
    setLoader(payload: boolean) {
      this.initLoader = payload;
    },
    setUser(payload: any) {
      this.user = payload.user;
      this.token = payload.token;
    },
    setLocalStorage(payload: any) {
      /* Cookies */
      Cookies.set('user', payload.user);
      Cookies.set('access_token', payload.token);
      localStorage.setItem('token', payload.token);
    },
    setLocalStorageWithTime(payload: any) {
      localStorage.setItem('token', payload.token);

      /* Cookies */
      Cookies.set('user', payload.user, {
        expires: 100,
      });
      Cookies.set('access_token', payload.token, {
        expires: 100,
      });
    },
    login(payload: any) {
      this.setUser(payload);
      this.setLocalStorage(payload);
      this.router.push('/inicio');
    },
    loginWithCookies(payload: any) {
      this.setUser(payload);
      this.setLocalStorageWithTime(payload);
      this.router.push('/inicio');
    },
    async logout() {
      try {
        await authDataServices.logout();
        // this.deleteLocalStorage();

        this.user = {
          id: null,
          name: '',
          first_lastname: '',
          last_lastname: '',
          apellidos: '',
          email: '',
          telefono: '',
          codigo_area: '',
        };

        this.token = '';
        /* Cookies */
        Cookies.remove('user');
        Cookies.remove('access_token');
        localStorage.removeItem('token');
        this.router.push('/login');
      } catch (error) {
        console.log(error);
      }
    },
    deleteLocalStorage() {
      // this.user = {};
      // this.token = '';
      // /* Cookies */
      // Cookies.remove('user');
      // Cookies.remove('access_token');
      // this.router.push('/login');
    },
  },
});
