import feedSlice, { initialState, getFeed } from './feedSlice';
import { TOrdersData } from '../../utils/types';

describe('feedSlice actions', () => {
  it('should handle getFeed pending', () => {
    const action = { type: getFeed.pending.type };
    const state = feedSlice.reducer(initialState, action);
    expect(state.loading).toBe(true);
  });
  it('should handle getFeed fulfilled', () => {
    const ordersData: TOrdersData = {
      orders: [
        {
          _id: '123',
          status: 'in process',
          name: 'Happy Meal',
          createdAt: '24.10.2024',
          updatedAt: '24.10.2024',
          number: 123,
          ingredients: ['123', '456']
        }
      ],
      total: 100,
      totalToday: 20
    };
    const action = { type: getFeed.fulfilled.type, payload: ordersData };
    const state = feedSlice.reducer(initialState, action);
    expect(state.data).toEqual(ordersData);
    expect(state.loading).toBe(false);
  });
  it('should handle getFeed rejected', () => {
    const action = { type: getFeed.rejected.type };
    const state = feedSlice.reducer(initialState, action);
    expect(state.loading).toBe(false);
  });
});
