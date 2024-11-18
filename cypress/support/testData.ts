export const ingredients = {
  buns: {
    name: 'Краторная булка N-200i',
    data: '[data-cy="buns"]',
    constructor: '[data-cy="constructorBun"'
  },
  mains: {
    name: 'Биокотлета из марсианской Магнолии',
    data: '[data-cy="mains"]',
    constructor: '[data-cy="constructorMain"]'
  },
  sauses: {
    name: 'Соус с шипами Антарианского плоскоходца',
    data: '[data-cy="sauces"]',
    constructor: '[data-cy="constructorMain"]'
  }
};

export const modal = {
  title: 'Детали ингредиента',
  closeButton: '[data-cy="modalClose"]',
  overlay: '[data-cy="modalCloseOvarlay"]'
};

export const order = {
  createButton: '[data-cy="createOrder"]',
  number: '57673'
};
