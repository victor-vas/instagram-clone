import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  LOADING_USER,
  USER_LOADED,
} from './actionTypes';
import axios from 'axios';

import {setMessage} from './message';

const authBaseURL =
  'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
const API_KEY = 'AIzaSyAXPnORv8fyelCwy-lQQp0zpebjIsYMTTU';

export const userLogged = user => {
  return {
    type: USER_LOGGED_IN,
    payload: user,
  };
};

export const logout = () => {
  return {
    type: USER_LOGGED_OUT,
  };
};

export const createUser = user => {
  return dispatch => {
    dispatch(loadingUser());

    axios
      .post(`${authBaseURL}/signupNewUser?key=${API_KEY}`, {
        email: user.email,
        password: user.password,
        returnSecureToken: true,
      })
      .then(res => {
        if (res.data.localId) {
          axios
            .put(`/users/${res.data.localId}.json`, {
              name: user.name,
            })
            .then(res => {
              dispatch(login(user));
            })
            .catch(error => {
              dispatch(
                setMessage({
                  title: 'Erro',
                  text: 'Ocorreu um erro inesperado',
                }),
              );
            });
        }
      })
      .catch(error => {
        dispatch(
          setMessage({
            title: 'Erro',
            text: 'Ocorreu um erro inesperado',
          }),
        );
      });
  };
};

export const loadingUser = () => {
  return {
    type: LOADING_USER,
  };
};

export const userLoaded = () => {
  return {
    type: USER_LOADED,
  };
};

export const login = user => {
  return dispatch => {
    dispatch(loadingUser());

    axios
      .post(`${authBaseURL}/verifyPassword?key=${API_KEY}`, {
        email: user.email,
        password: user.password,
        returnSecureToken: true,
      })
      .then(res => {
        if (res.data.localId) {
          user.token = res.data.idToken;

          axios
            .get(`/users/${res.data.localId}.json`)
            .then(res => {
              delete user.password;
              user.name = res.data.name;

              dispatch(userLogged(user));
              dispatch(userLoaded());
            })
            .catch(error => {
              dispatch(
                setMessage({
                  title: 'Erro',
                  text: 'Ocorreu um erro inesperado',
                }),
              );
            });
        }
      })
      .catch(error => {
        dispatch(
          setMessage({
            title: 'Erro',
            text: 'Ocorreu um erro inesperado',
          }),
        );
      });
  };
};
