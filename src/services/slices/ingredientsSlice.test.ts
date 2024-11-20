import ingredientsSlice, {
  initialState,
  addIngredient,
  addBuns,
  removeIngredient,
  swapDown,
  swapUp,
  clearConstructor,
  getIngredients,
  orderBurger
} from './ingredientsSlice';
import { TIngredient, TConstructorIngredient } from '@utils-types';

const ingredientMainData: TConstructorIngredient = {
  _id: '123',
  id: '456',
  name: 'Сыр с астероидной плесенью',
  type: 'main',
  proteins: 84,
  fat: 48,
  carbohydrates: 420,
  calories: 3377,
  price: 4142,
  image: 'medium',
  image_large: 'large',
  image_mobile: 'mobile'
};

const ingredientSauceData: TConstructorIngredient = {
  _id: '777',
  id: '999',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'medium',
  image_large: 'large',
  image_mobile: 'mobile'
};

const ingredientBunData: TIngredient = {
  _id: '111',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 123,
  price: 988,
  image: 'medium',
  image_large: 'large',
  image_mobile: 'mobile'
};

const stateWithIngredients = {
  ...initialState,
  constructorItems: {
    bun: null,
    ingredients: [ingredientMainData, ingredientSauceData]
  }
};

describe('ingredientsSlice actions', () => {
  it('should handle addIngredient', () => {
    const action = addIngredient(ingredientMainData);
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.constructorItems.ingredients.length).toBe(1);
    expect(state.constructorItems.ingredients[0].name).toBe(
      'Сыр с астероидной плесенью'
    );
  });
  it('should handle addBuns', () => {
    const action = addBuns(ingredientBunData);
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.constructorItems.bun).toEqual(ingredientBunData);
  });
  it('should handle removeIngredient', () => {
    const action = removeIngredient({ id: '456' });
    const state = ingredientsSlice.reducer(stateWithIngredients, action);
    expect(state.constructorItems.ingredients.length).toBe(1);
  });
  it('should handle swapDown', () => {
    const action = swapDown(0);
    const state = ingredientsSlice.reducer(stateWithIngredients, action);
    expect(state.constructorItems.ingredients[0]).toEqual(ingredientSauceData);
    expect(state.constructorItems.ingredients[1]).toEqual(ingredientMainData);
  });
  it('should handle swapUp', () => {
    const action = swapUp(1);
    const state = ingredientsSlice.reducer(stateWithIngredients, action);
    expect(state.constructorItems.ingredients[0]).toEqual(ingredientSauceData);
    expect(state.constructorItems.ingredients[1]).toEqual(ingredientMainData);
  });
  it('should handle clearConstructor', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: ingredientBunData,
        ingredients: [ingredientMainData, ingredientSauceData]
      },
      orderModalData: {
        _id: '123',
        status: 'in process',
        name: 'Happy Meal',
        createdAt: '24.10.2024',
        updatedAt: '24.10.2024',
        number: 123,
        ingredients: ['111', '123', '777', '111']
      }
    };
    const action = clearConstructor();
    const state = ingredientsSlice.reducer(stateWithIngredients, action);
    expect(state.constructorItems.bun).toBeNull();
    expect(state.constructorItems.ingredients.length).toBe(0);
    expect(state.orderModalData).toBeNull();
    expect(state.orderRequest).toBe(false);
  });
  it('should handle getIngredients pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(true);
  });
  it('should handle getIngredients fulfilled', () => {
    const ingredients: TIngredient[] = [ingredientBunData];
    const action = {
      type: getIngredients.fulfilled.type,
      payload: ingredients
    };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.ingredients).toEqual(ingredients);
    expect(state.isLoading).toBe(false);
  });
  it('should handle getIngredients rejected', () => {
    const action = { type: getIngredients.rejected.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
  });
  it('should handle orderBurger pending', () => {
    const action = { type: orderBurger.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.orderRequest).toBe(true);
  });
  it('should handle orderBurger fulfilled', () => {
    const orderData = {
      order: {
        _id: '123',
        status: 'in process',
        name: 'Happy Meal',
        createdAt: '24.10.2024',
        updatedAt: '24.10.2024',
        number: 123,
        ingredients: ['123', '456']
      }
    };
    const action = { type: orderBurger.fulfilled.type, payload: orderData };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(orderData.order);
    expect(state.constructorItems.bun).toBeNull();
    expect(state.constructorItems.ingredients).toEqual([]);
  });
  it('should handle orderBurger rejected', () => {
    const action = { type: orderBurger.rejected.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state.orderRequest).toBe(false);
  });
});
