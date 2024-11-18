import { rootReducer } from './store';
import userSlice from './slices/userSlice';
import ingredientsSlice from './slices/ingredientsSlice';
import feedSlice from './slices/feedSlice';

describe('rootReducer', () => {
  it('should initialize with the correct initial state', () => {
    // Получаем начальное состояние всех редьюсеров
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    // Проверяем, что начальное состояние содержит необходимые свойства
    expect(initialState).toHaveProperty(userSlice.name);
    expect(initialState).toHaveProperty(ingredientsSlice.name);
    expect(initialState).toHaveProperty(feedSlice.name);
  });
});
