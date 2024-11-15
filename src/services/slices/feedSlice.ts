import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '../../utils/types';
import { getFeedsApi, getOrderByNumberApi } from '@api';

interface TFeedState {
  data: TOrdersData;
  loading: boolean;
}

const initialState: TFeedState = {
  data: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  loading: false
};

export const getFeed = createAsyncThunk(
  'feed/getFeed',
  async () => await getFeedsApi()
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFeed.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getFeed.rejected, (state) => {
        state.loading = false;
      });
  },
  selectors: {
    ordersSelector: (state) => state.data.orders,
    totalSelector: (state) => state.data.total,
    totalTodaySelector: (state) => state.data.totalToday,
    loadingSelector: (state) => state.loading
  }
});

export default feedSlice.reducer;
export const {
  ordersSelector,
  totalSelector,
  totalTodaySelector,
  loadingSelector
} = feedSlice.selectors;
