import { reactive } from 'vue';
import Cookies from 'js-cookie';

export const cookieData = reactive({
    id: Cookies.get('id'),
    email: Cookies.get('email'),
    name: Cookies.get('name'),
    typeProfile: Cookies.get('typeProfile')
});

export const updateCookie = (cookieName, cookieValue, options) => {
  Cookies.set(cookieName, cookieValue, options);
  cookieData[cookieName] = Cookies.get(cookieName);
};
