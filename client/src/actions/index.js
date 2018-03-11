import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser(values) {

    const { email, password} = values;

    return function(dispatch) {

    // submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
        .then(response => {
            /**
             * update state to indicate user is authenticated
             * save teh JWT token
             * redirect to the route /feature
             *
             **/
            dispatch({ type: AUTH_USER });

            localStorage.setItem('token', response.data.token);

            browserHistory.push('/feature');

        })
        .catch(() => {
            /**
             * if request is bad
             * show an error to theuser
             */
            dispatch(authError('Bad Login Info'));
        });
    }
}

export function signupUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, {email, password})
            .then(response => {
                dispatch({type: AUTH_USER});
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/feature');
            })
            .catch(response => {
                dispatch(authError('Bad email or password'));
            });
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function signoutUser() {
    localStorage.removeItem('token');
    return {
        type: UNAUTH_USER
    }
}

export function fetchMessage() {
    return function(dispatch) {
        axios.get(ROOT_URL, {
            headers: { authorization: localStorage.getItem('token')}
        })
            .then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                });
            });
    }
}