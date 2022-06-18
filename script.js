// Constantes - DOM
const cartSection = document.querySelector('.cart__items');
const itemSection = document.querySelector('.items');
const buttonClean = document.querySelector('.empty-cart');
const totalSection = document.querySelector('.total-price');

// Função que criar a funcionalidade da imagem
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

// Função genérica que cria elementos
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// Não utilizei (Obs: Função já criada pela Trybe)
// function getSkuFromProductItem(item) {
//   return item.querySelector('span.item__sku').innerText;
// }

// Função que soma item do carrinho de compras e atribui na página a soma
const calcPrice = async () => { 
  // Não necessariamente necessito ter um combinado de async e await, posso atribuir uma função assíncrona para não bloquear as demais funcionalidade, tenho uma resolução dentro da própria função (independente) 
  // A aplicação do spread operator juntamente com reduce foi proveniente da explicação do instrutor Tiago Quadros
  // A finalidade é porque um nodeList é diferente de um array, e existe formas diferentes de manipulação de cada uma. Uma forma de manipular nodeList mais facilmente e transforma-la em um array (explicando a nessecidade da linha inferior utilizando o spread operator)
  // Diferença entre nodeList e Array (Link: https://attacomsian.com/blog/javascript-nodelist-vs-array)
  const [...child] = cartSection.childNodes;
  const childPrice = child.map((item) => {
    const index = item.innerText.indexOf('$') + 1;
    return item.innerText.slice(index);
  });
  const total = childPrice.reduce((acc, item) => (acc + (parseFloat(item))), 0);
  totalSection.innerText = total;
};

// Função que remove item do carrinho ao clicar
function cartItemClickListener(event) {
  const child = event.target; // encontrar qual li foi clicada
  cartSection.removeChild(child); // remove a li clicada
  saveCartItems(cartSection.innerHTML); // salva a nova lista
  calcPrice(); // calcula o novo total 
}

// Função que cria os produtos desejados no carrinho de compras
function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Função que criar os produtos a serem vendidos (formato) 
function createProductItemElement({ id: sku, title: name, thumbnail: image, price }) {
  const section = document.createElement('section');
  section.className = 'item';
  const button = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__price', price));
  section.appendChild(button);
  button.addEventListener('click', async () => {
    const item = createCartItemElement(await fetchItem(sku));
    cartSection.appendChild(item);
    saveCartItems(cartSection.innerHTML);
    calcPrice();
  });
  return section;
}

// Função que adiciona os produtos a serem vendidos (provenientes da API) a seção
const addItensSection = async () => {
  const loading = createCustomElement('p', 'loading', 'Carregando...');
  itemSection.appendChild(loading);
  const products = (await fetchProducts('computador')).results;
  const loadingParagraph = document.querySelector('.loading');
  products.forEach((product) => {
    const section = createProductItemElement(product);
    itemSection.appendChild(section);
  });
  itemSection.removeChild(loadingParagraph);
};

// Função que carrega as informações do localStorage e reatribui as funcionalidades
const loadPageWithShoppingCart = () => {
  getSavedCartItems();
  const listCart = document.querySelector('.cart__items').childNodes;
  listCart.forEach((li) => {
    li.addEventListener('click', cartItemClickListener);
  });
};

// Função que remove todos os itens do carrinho de compras e zera o somatório
const cleanCart = () => {
  buttonClean.addEventListener('click', () => {
    // Utilização do while para melhorar a condição da lógica proveniente do JavaScript Tutorial
    // source: https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
    // Documentação .hasChildNodes() (link: https://developer.mozilla.org/en-US/docs/Web/API/Node/hasChildNodes)
    while (cartSection.hasChildNodes()) {
      cartSection.removeChild(cartSection.firstChild);
    }
    saveCartItems(cartSection.innerHTML);
    calcPrice();
  });
};

window.onload = async () => { 
  addItensSection();
  loadPageWithShoppingCart();
  cleanCart();
  calcPrice(); // Necessário iniciar com 0 o total com nenhum produto
};
