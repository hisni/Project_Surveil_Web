import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId, username, phone) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        name:username,
        phoneNo:phone
    };
};

export const authFail = (error) => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const signUpSuccess = () => {
    return {
        type: actionTypes.SIGNUP_SUCCESS,
    };
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authSignIn = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=APIKEY';
        var dbURL = '';

        axios.post(url, authData)
        .then(response => {
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dbURL = 'https://co321project-e273b.firebaseio.com/userInfo/'+response.data.localId+'.json?auth=' + response.data.idToken; 
            dispatch(loadSigninData( dbURL, response.data.idToken, response.data.localId ));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        });
    };
};


export const authSignUp = ( data ) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: data.Email,
            password: data.Password,
            displayName: data.Username,
            returnSecureToken: true
        };

        const dbData = {
            Email: data.Email,
            Username: data.Username,
        };

        console.log(dbData);
        const URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=APIKEY';
        var dbURL = '';

        axios.post(URL, authData)
        .then(response => {
            dbURL = 'https://co321project-e273b.firebaseio.com/webUsers/'+response.data.localId+'.json'; 
            dispatch(storeSignupData( dbURL, dbData ));
    
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        });
    };
};

export const storeSignupData = ( dbURL, dbData ) => {
    return dispatch => {
        axios.post(dbURL, dbData)
        .then(response => {
            console.log(dbData);
            console.log(response);
            dispatch(signUpSuccess());
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        });
    }
}

export const loadSigninData = ( dbURL, idToken, localId ) => {
    
    return dispatch => {
        var username = '';
        var phone = '';
        
        axios.get(dbURL)
        .then(response => {
            username = response.data.name;
            phone = response.data.phone;

            localStorage.setItem('username', username);
            localStorage.setItem('phone', phone);
            dispatch(authSuccess(idToken, localId, username, phone));
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        });
    }
}

export const setAuth = () => {
    return {
        type: actionTypes.SET_AUTH,
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                const username = localStorage.getItem('username');
                const phone = localStorage.getItem('phone');

                dispatch(authSuccess(token, userId, username, phone ));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};