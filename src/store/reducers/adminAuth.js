import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    adminToken: null,
    adminUserId: null,
    adminUsername: null,
    adminError: null,
    adminLoading: false,
    adminSignUpSuccess: false,
    Authority:null
};

const authStart = ( state, action ) => {
    return updateObject( state, { adminError: null, adminLoading: true } );
};

const authSuccess = (state, action) => {
    return updateObject( state, {         
        adminToken: action.idToken,
        adminUserId: action.userId,
        adminUsername: action.name,
        Authority: action.Authority,
        adminError: null,
        adminLoading: false,
        adminSignUpSuccess: false
     } );
};

const authFail = (state, action) => {
    return updateObject( state, {
        adminError: action.error,
        adminLoading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { adminToken: null, adminUserId: null, adminUsername: null, Authority:null });
};

const setAuth = (state, action) => {
    return updateObject(state, { 
        adminSignUpSuccess: false,
        adminError: null,
        adminLoading: false,
        Authority:null });
};

const signUpSuccess = (state, action) => {
    return updateObject(state, { 
        adminSignUpSuccess: true,
        adminError: null,
        adminLoading: false });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADMIN_AUTH_START: return authStart(state, action);
        case actionTypes.ADMIN_AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.ADMIN_AUTH_FAIL: return authFail(state, action);
        case actionTypes.ADMIN_AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.ADMIN_SET_AUTH: return setAuth(state,action);
        case actionTypes.ADMIN_SIGNUP_SUCCESS: return signUpSuccess(state,action);
        
        default:
            return state;
    }
};

export default reducer;