const fetchProducts = async (product) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  const result = await fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
  return result;
}; // Ao utilizar o try/catch no fetchProduct o erro não estava sendo passado para o teste após ser capturado pelo catch, resultando em problemas com a função (% lines coverage abaixo de 100%), deste modo, uma das soluções propostas pela instrutura Fernanda Carvalho foi a substituição por .then().

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
