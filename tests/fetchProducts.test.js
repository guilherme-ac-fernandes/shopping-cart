require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // Primeiro Teste
  it('verifica se é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  // Segundo Teste
  it('tendo \'computador\' como parâmetro da função, verifica se fetch foi chamado', async () => {
    await fetchProducts('computador');
    expect.assertions(2);
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  // Terceiro Teste
  it('verifica se a função com \'computador\' como parâmetro, tem o endpoint correto', async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  // Quarto Teste
  it('verifica o retorno da função comparando com a variável computadorSearch', async () => {
    expect.assertions(1);
    const response = await fetchProducts('computador');
    expect(response).toEqual(computadorSearch);
  });

  // Quinto Teste
  it('testa se ao chamar a função sem parâmetro, retorna um erro', async () => {
    expect.assertions(1);
    const response = await fetchProducts();
    expect(response).toEqual(new Error('You must provide an url'));
  })
});
