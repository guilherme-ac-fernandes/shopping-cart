require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  // Primeiro Teste
  it('verifica se é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });

  // Segundo Teste
  it('tendo \'MLB1615760527\' como parâmetro da função, verifica se fetch foi chamado', async () => {
    await fetchItem('MLB1615760527');
    expect.assertions(2);
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  
  // Terceiro Teste
  it('verifica se a função com \'MLB1615760527\' como parâmetro, tem o endpoint correto', async () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect.assertions(1);
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  });

  // Quarto Teste
  it('verifica o retorno da função comparando com a variável item', async () => {
    expect.assertions(1);
    const response = await fetchItem('MLB1615760527');
    expect(response).toEqual(item);
  });

  // Quinto Teste
  it('testa se ao chamar a função sem parâmetro, retorna um erro', async () => {
    expect.assertions(1);
    const response = await fetchItem();
    expect(response).toEqual(new Error('You must provide an url'));
  })
});
