import { ingredients, modal, order } from '../support/testData';

describe('Ingredient Management and Order Creation', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('POST', '/api/orders', { fixture: 'order.json' });
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' });
    cy.setCookie('accessToken', 'accessToken');
    localStorage.setItem('refreshToken', 'refreshToken');
    cy.visit('/');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('should add ingredient to the constructor', () => {
    cy.get(ingredients.mains.data).contains('Добавить').click();
    cy.get(ingredients.mains.constructor).should(
      'contain',
      ingredients.mains.name
    );
    cy.get(ingredients.buns.data).contains('Добавить').click();
    cy.get(ingredients.buns.constructor).should(
      'contain',
      ingredients.buns.name
    );
    cy.get(ingredients.sauses.data).contains('Добавить').click();
    cy.get(ingredients.sauses.constructor).should(
      'contain',
      ingredients.sauses.name
    );
  });

  it('should open and close modal window correctly', () => {
    cy.contains(ingredients.mains.name).click();
    cy.contains(modal.title).should('exist');

    cy.get(modal.closeButton).click();
    cy.contains(modal.title).should('not.exist');

    cy.contains(ingredients.buns.name).click();
    cy.contains(modal.title).should('exist');
    cy.get(modal.overlay).click({ force: true });
    cy.contains(modal.title).should('not.exist');
  });

  it('should create an order successfully', () => {
    cy.get(ingredients.buns.data).contains('Добавить').click();
    cy.get(ingredients.buns.constructor).should(
      'contain',
      ingredients.buns.name
    );
    cy.get(ingredients.mains.data).contains('Добавить').click();
    cy.get(ingredients.mains.constructor).should(
      'contain',
      ingredients.mains.name
    );
    cy.get(order.createButton).click();
    cy.contains(order.number).should('exist');
    cy.get(modal.overlay).click({ force: true });
    cy.contains(order.number).should('not.exist');
    cy.get(ingredients.buns.constructor).should(
      'not.contain',
      ingredients.buns.name
    );
    cy.get(ingredients.mains.constructor).should(
      'not.contain',
      ingredients.mains.name
    );
  });
});
