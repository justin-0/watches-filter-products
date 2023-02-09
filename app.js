const data = [
  {
    id: 1,
    name: "Invicta Men's Pro Diver",
    img: 'https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg',
    price: 74,
    cat: 'Dress',
  },
  {
    id: 11,
    name: "Invicta Men's Pro Diver 2",
    img: 'https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg',
    price: 74,
    cat: 'Dress',
  },
  {
    id: 2,
    name: "Timex Men's Expedition Scout ",
    img: 'https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg',
    price: 40,
    cat: 'Sport',
  },
  {
    id: 3,
    name: 'Breitling Superocean Heritage',
    img: 'https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg',
    price: 200,
    cat: 'Luxury',
  },
  {
    id: 4,
    name: 'Casio Classic Resin Strap ',
    img: 'https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg',
    price: 16,
    cat: 'Sport',
  },
  {
    id: 5,
    name: 'Garmin Venu Smartwatch ',
    img: 'https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg',
    price: 74,
    cat: 'Casual',
  },
];

// Select elements for DOM manipulation
const productsContainer = document.querySelector('.products');
const searchInput = document.querySelector('.search');
const categoriesContainer = document.querySelector('.cats');
const priceRange = document.querySelector('.priceRange');
const priceValue = document.querySelector('.priceValue');

// Display Products to page
const displayProducts = (filteredProducts) => {
  productsContainer.innerHTML = filteredProducts
    .map(
      (product) =>
        `
    <div class="product">
      <img src="${product.img}" />
      <span class="name">${product.name}</span>
      <span class="priceText">£${product.price}</span>
    </div>
    `
    )
    .join('');
};

// Show All items on load
displayProducts(data);

searchInput.addEventListener('keyup', (event) => {
  const searchTerm = event.target.value.toLowerCase();
  // Condition to either show products by search term or all if empty
  if (searchTerm) {
    // Filter our data based on the items name matching the search term
    const searchFilter = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    displayProducts(searchFilter);
  } else {
    displayProducts(data);
  }
});

const setCategories = () => {
  const allCategories = data.map((item) => item.cat);
  // Add All at beginning of Array with spread operator
  const categories = [
    'All',
    ...allCategories.filter((item, index) => {
      return allCategories.indexOf(item) === index;
    }),
  ];
  // Add categories to parent
  categoriesContainer.innerHTML = categories
    .map((cat) => {
      return `<span class="cat">${cat}</span>`;
    })
    .join('');

  // Event listener to parent for event delegation
  categoriesContainer.addEventListener('click', (event) => {
    const selectedCategory = event.target.textContent;

    selectedCategory === 'All'
      ? displayProducts(data)
      : displayProducts(data.filter((item) => item.cat === selectedCategory));
  });
};

const setRange = () => {
  // Return array of all prices
  const priceList = data.map((item) => item.price);
  // Get min and max price by copying array and removing brackets with spread
  const minPrice = Math.min(...priceList);
  const maxPrice = Math.max(...priceList);

  // Set input attributes
  priceRange.min = minPrice;
  priceRange.max = maxPrice;
  priceRange.value = maxPrice;

  priceValue.textContent = '£' + maxPrice;

  // Changes to range input
  priceRange.addEventListener('input', (event) => {
    const value = event.target.value;
    priceValue.textContent = '£' + value;
    displayProducts(data.filter((item) => item.price <= value));
  });
};

setCategories();
setRange();
