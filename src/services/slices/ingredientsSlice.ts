import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TOrder, TConstructorIngredient } from '@utils-types';
import { getIngredientsApi, orderBurgerApi } from '../../utils/burger-api';

interface TIngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

export const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

export const orderBurger = createAsyncThunk(
  'ingredients/orderBurger',
  orderBurgerApi
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.constructorItems.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => {
        const id = String(Date.now());
        return { payload: { ...ingredient, id: id } };
      }
    },
    addBuns: (state, action) => {
      state.constructorItems.bun = action.payload;
    },
    removeIngredient: (state, action) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
    },
    swapDown: (state, action) => {
      const index = action.payload;
      const ingredients = state.constructorItems.ingredients;
      [ingredients[index + 1], ingredients[index]] = [
        ingredients[index],
        ingredients[index + 1]
      ];
    },
    swapUp: (state, action) => {
      const index = action.payload;
      const ingredients = state.constructorItems.ingredients;
      [ingredients[index - 1], ingredients[index]] = [
        ingredients[index],
        ingredients[index - 1]
      ];
    },
    clearConstructor: (state) => {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
      state.orderModalData = null;
      state.orderRequest = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.constructorItems.bun = null;
        state.constructorItems.ingredients = [];
      })
      .addCase(orderBurger.rejected, (state) => {
        state.orderRequest = false;
      });
  },
  selectors: {
    getIngredientsSelector: (state) => state.ingredients,
    isLoadingSelector: (state) => state.isLoading,
    getConstructorItems: (state) => state.constructorItems,
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  }
});

export const {
  getIngredientsSelector,
  isLoadingSelector,
  getConstructorItems,
  getOrderRequest,
  getOrderModalData
} = ingredientsSlice.selectors;

export const {
  addIngredient,
  addBuns,
  removeIngredient,
  clearConstructor,
  swapDown,
  swapUp
} = ingredientsSlice.actions;

export default ingredientsSlice;
