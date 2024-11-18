import userSlice, {
  initialState,
  authChecked,
  userApi,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getUserOrders
} from './userSlice';
import { TOrder, TUser } from '@utils-types';

const userData: TUser = { email: 'john@example.com', name: 'John' };

describe('userSlice actions', () => {
  it('should set isAuthChecked to true', () => {
    const state = userSlice.reducer(initialState, authChecked());
    expect(state.isAuthChecked).toBe(true);
  });
  it('should handle userApi pending', () => {
    const action = { type: userApi.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.user).toBeNull();
    expect(state.isAuth).toBe(false);
  });
  it('should handle userApi fulfilled', () => {
    const action = {
      type: userApi.fulfilled.type,
      payload: { user: userData }
    };

    const state = userSlice.reducer(initialState, action);
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toEqual(userData);
    expect(state.isAuth).toBe(true);
  });
  it('should handle userApi rejected', () => {
    const action = { type: userApi.rejected.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.user).toBeNull();
    expect(state.isAuth).toBe(false);
    expect(state.isAuthChecked).toBe(true);
  });
  it('should handle registerUser pending', () => {
    const action = { type: registerUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.user).toBeNull();
    expect(state.errorText).toBe('');
  });
  it('should handle registerUser fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: {
        user: userData,
        accessToken: 'accessToken',
        refreshToken: 'refreshToken'
      }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toEqual(userData);
  });
  it('should handle registerUser rejected', () => {
    const errorData = 'test error';
    const action = {
      type: registerUser.rejected.type,
      payload: errorData
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.errorText).toBe(errorData);
  });
  it('should handle loginUser pending', () => {
    const errorData = '';
    const action = {
      type: loginUser.rejected.type,
      payload: errorData
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.errorText).toBe(errorData);
  });
  it('should handle loginUser fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: {
        user: userData,
        accessToken: 'accessToken',
        refreshToken: 'refreshToken'
      }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isAuth).toBe(true);
    expect(state.user).toEqual(userData);
  });
  it('should handle loginUser rejected', () => {
    const errorData = 'test error';
    const action = {
      type: loginUser.rejected.type,
      payload: errorData
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.errorText).toBe(errorData);
  });
  it('should handle logoutUser pending', () => {
    const action = { type: logoutUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.isAuth).toBe(true);
  });
  it('should handle logoutUser fulfilled', () => {
    const action = { type: logoutUser.fulfilled.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.user).toBeNull();
    expect(state.isAuth).toBe(false);
  });
  it('should handle logoutUser rejected', () => {
    const action = { type: logoutUser.rejected.type };
    const state = userSlice.reducer(initialState, action);
    expect(state.isAuth).toBe(false);
  });
  it('should handle updateUser fulfilled', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: { user: userData }
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.user).toEqual(userData);
  });
  it('should handle getUserOrders fulfilled', () => {
    const ordersData: TOrder[] = [
      {
        _id: '123',
        status: 'in process',
        name: 'Happy Meal',
        createdAt: '24.10.2024',
        updatedAt: '24.10.2024',
        number: 123,
        ingredients: ['123', '456']
      }
    ];
    const action = {
      type: getUserOrders.fulfilled.type,
      payload: ordersData
    };
    const state = userSlice.reducer(initialState, action);
    expect(state.orders).toEqual(ordersData);
  });
});
