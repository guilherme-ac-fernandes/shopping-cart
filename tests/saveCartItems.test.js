const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  // Primeiro Teste
  it('ao executar a função com <ol><li>Item</li></ol>, localStorage.setItem é chamado', () => {
    expect.assertions(1);
    const list = '<ol><li>Item</li></ol>';
    saveCartItems(list)
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  
  // Segundo Teste
  it('ao executar a função com <ol><li>Item</li></ol>, localStorage.setItem é chamado contendo \'cartItems\' como primeiro parâmento e <ol><li>Item</li></ol> como segungo', () => {
    expect.assertions(1);
    const list = '<ol><li>Item</li></ol>';
    saveCartItems(list)
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', list);

  })
});
