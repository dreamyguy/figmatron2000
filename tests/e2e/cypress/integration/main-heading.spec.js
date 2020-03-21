import config from './../../../../config.mjs';

const {
  portAppReact,
  urlBaseDv,
} = config;

describe('Test generated DOM on page', () => {
  beforeEach(() => {
    cy.visit(`${urlBaseDv}${portAppReact}`);
  });
  it('The "h1" tag was generated with the correct content', () => {
    // https://on.cypress.io/should
    cy.get('.main-heading').should('have.text', 'Legemiddelhåndboka');
  });
});
