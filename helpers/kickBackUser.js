import { getCookie } from './cookieHandler';
import Router from 'next/router';

export default function kickBackUser() {
  // CHECK USER LOGIN
  let user = getCookie('user');
  if (user == undefined) {
    Router.push('/');
  }
}
