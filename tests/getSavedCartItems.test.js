const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  // Primeiro Teste
  it('ao executar a função, localStorage.getItem é chamado', () => {
    expect.assertions(1);
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });

  // Segundo Teste
  it('ao executar a função, localStorage.getItem é chamado contendo \'cartItems\' como parâmento', () => {
    expect.assertions(1);
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems')
  });
});
