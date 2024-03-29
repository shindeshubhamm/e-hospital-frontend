import ls from 'local-storage';

import {
  AUTH_ERROR,
  AUTH_LOADING,
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  PROFILE_PIC_REMOVE,
  PROFILE_PIC_UPLOAD,
  UPDATE_USER,
} from '../actions/types';

const initialState = {
  userInfo: null,
  isAuthenticated: false,
  token: ls.get('token'),
  error: null,
  loading: true,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case AUTH_SUCCESS:
      ls.set('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        error: null,
        loading: false,
      };
    case AUTH_ERROR:
      ls.remove('token');
      return {
        ...state,
        ...action.payload,
        userInfo: null,
        isAuthenticated: false,
        token: null,
        loading: false,
      };
    case AUTH_LOGOUT:
      ls.remove('token');
      return {
        userInfo: null,
        isAuthenticated: false,
        token: null,
        error: null,
        loading: false,
      };

    case UPDATE_USER:
      return {
        ...state,
        userInfo: { ...state.userInfo, ...action.payload },
      };

    case PROFILE_PIC_UPLOAD:
      return {
        ...state,
        userInfo: { ...state.userInfo, profilePhoto: action.payload },
      };

    case PROFILE_PIC_REMOVE:
      return {
        ...state,
        userInfo: { ...state.userInfo, profilePhoto: '' },
      };
    default:
      return state;
  }
};

export default authReducer;
