import {
  registerUserApi,
  loginUserApi,
  TRegisterData,
  TLoginData,
  getUserApi,
  logoutApi,
  updateUserApi,
  getOrdersApi
} from '../../utils/burger-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';

interface TUserState {
  user: TUser | null;
  isAuthChecked: boolean;
  isAuth: boolean;
  errorText: string;
  orders: TOrder[];
}

export const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isAuth: false,
  errorText: '',
  orders: []
};

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(userApi()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

export const userApi = createAsyncThunk('user/userApi', getUserApi);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  registerUserApi
);

export const loginUser = createAsyncThunk('user/loginUser', loginUserApi);

export const logoutUser = createAsyncThunk('user/logoutUser', logoutApi);

export const updateUser = createAsyncThunk('user/updateUser', updateUserApi);

export const getUserOrders = createAsyncThunk(
  'user/getUserOrders',
  getOrdersApi
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userApi.pending, (state) => {
        state.user = null;
        state.isAuth = false;
      })
      .addCase(userApi.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(userApi.rejected, (state) => {
        state.isAuthChecked = true;
        state.user = null;
        state.isAuth = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.user = null;
        state.errorText = '';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.errorText = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.errorText = '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.isAuth = true;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.errorText = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isAuth = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.user = null;
        state.isAuth = false;
        deleteCookie('accessToken');
        localStorage.clear();
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isAuth = false;
      })
      .addCase(updateUser.pending, (state) => {})
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state) => {})
      .addCase(getUserOrders.pending, (state) => {})
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state) => {});
  },
  selectors: {
    isAuthCheckedSelector: (state) => state.isAuthChecked,
    isAuthSelector: (state) => state.isAuth,
    userDataSelector: (state) => state.user,
    errorTextSelector: (state) => state.errorText,
    userOrdersSelector: (state) => state.orders
  }
});

export const { authChecked } = userSlice.actions;

export const {
  isAuthCheckedSelector,
  userDataSelector,
  isAuthSelector,
  errorTextSelector,
  userOrdersSelector
} = userSlice.selectors;

export default userSlice;
