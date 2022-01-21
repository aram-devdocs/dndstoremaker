// import cookieCutter from 'cookie-cutter';
let cookie = require('cookie-cutter');
import Cookies from 'cookies';

// Send data in the form of Javascript objects, parsing will be done by handler
// to send and delivery usable objects

export function setCookie(id, data) {
  cookie.set(id, JSON.stringify(data));
}

export function setExpirableCookie(id, data, date) {
  cookie.set(id, JSON.stringify(data), date);
}

export function getCookie(id) {
  try {
    // console.log(cookie.get(id));
    return JSON.parse(cookie.get(id));
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export function deleteCookie(id) {
  cookie.set(id, '', { expires: new Date(0) });
}

export function setServerSideCookie({ req, res }, id, data) {
  const cookies = new Cookies(req, res);

  cookies.set(id, JSON.stringify(data));
}

export function deleteServerSideCookie({ req, res }, id) {
  const cookies = new Cookies(req, res);

  cookies.set(id);
}

export function getServerSideCookie({ req, res }, id) {
  const cookies = new Cookies(req, res);

  let data = cookies.get(id);
  data = JSON.parse(decodeURIComponent(data));

  return data;
}
