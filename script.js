const nftsFromDB = [
  {creator_id: 1, name: 'Galactic Phoenix', description: 'A fiery bird rising from cosmic ashes.', price: 2.5, category: 'Digital Art', image_url: 'img/galactic.jpg'},
  {creator_id: 4, name: 'Neon Samurai', description: 'Cyberpunk warrior with glowing katana.', price: 3.8, category: 'Collectibles', image_url: 'img/neon.jpg'},
  {creator_id: 18, name: 'Echoes of Eternity', description: 'Ambient soundscape to soothe your mind.', price: 1.9, category: 'Music', image_url: 'img/echoes.jpg'},
  {creator_id: 1, name: 'Shadow Racer', description: 'Sleek hovercar ready for futuristic races.', price: 4.2, category: 'Gaming', image_url: 'img/shadow.jpg'},
  {creator_id: 19, name: 'Pixel Gladiator', description: 'Retro-style pixel hero in battle stance.', price: 5.5, category: 'Collectibles', image_url: 'img/pixel.jpg'},
  {creator_id: 9, name: 'Sonic Pulse', description: 'High-energy electronic beat for your mix.', price: 2.1, category: 'Music', image_url: 'img/sonic.jpg'},
  {creator_id: 4, name: 'Bassline Surge', description: 'Deep bass track to energize any party.', price: 3.3, category: 'Music', image_url: 'img/bassline.jpg'},
  {creator_id: 18, name: 'Virtual Skater', description: 'Agile avatar for the urban metaverse.', price: 2.8, category: 'Gaming', image_url: 'img/virtual.jpg'},
  {creator_id: 47, name: 'Crystal Caverns', description: 'Gem-filled caves sparkling with magic.', price: 1.5, category: 'Digital Art', image_url: 'img/crystal.jpg'},
  {creator_id: 45, name: 'Digital Nomad', description: 'Explorer avatar roaming virtual worlds.', price: 2.7, category: 'Collectibles', image_url: 'img/digital.jpg'},
  {creator_id: 62, name: 'Oceanic Dreamscape', description: 'Peaceful underwater digital painting.', price: 3.4, category: 'Digital Art', image_url: 'img/oceanic.jpg'},
  {creator_id: 62, name: 'Retro Synthwave', description: 'Nostalgic 80’s synth music track.', price: 1.1, category: 'Music', image_url: 'img/retro.jpg'}
];

const container = document.getElementById('nftsContainer');
const popup = document.getElementById('nftPopup');
const popupTitle = document.getElementById('popupTitle');
const popupCategory = document.getElementById('popupCategory');
const popupDescription = document.getElementById('popupDescription');
const popupPrice = document.getElementById('popupPrice');
const popupImg = document.getElementById('popupImage');
const closeBtn = popup.querySelector('.close');

// Elementele pentru Filtrare
const filterButtonDiv = document.getElementById('filterButton');
const filterBox = document.getElementById('filterBox'); 
const bgElement = document.querySelector('.bg');
const categoryFilterSelect = document.getElementById('categoryFilter');
const priceRangeFilterSelect = document.getElementById('priceRangeFilter'); // NOU: Price Range ca dropdown
const sortBySelect = document.getElementById('sortBy');

let currentNFTs = [...nftsFromDB]; 

// Functie pentru a genera optiile de categorii in box
function populateCategories() {
  const categories = [...new Set(nftsFromDB.map(nft => nft.category))].sort();
  // Ne asigurăm că există măcar o categorie "All"
  if (categoryFilterSelect.options.length === 1 && categoryFilterSelect.options[0].value === "") {
    // Dacă elementul "All Categories" există, nu-l adăugăm din nou
  } else {
    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "All Categories";
    categoryFilterSelect.appendChild(defaultOption);
  }
  
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilterSelect.appendChild(option);
  });
}

// Functie pentru a randa NFT-urile
function renderNFTs(nftsToRender) {
  container.innerHTML = ''; 
  nftsToRender.forEach(nft => {
    const div = document.createElement('div');
    div.className = 'nft';
    div.innerHTML = `
      <div class="nft_image">
        <img src="${nft.image_url}" alt="${nft.name}">
      </div>
      <div class="nft_footer">
        <div class="nft_name_cat">
          <span class="nft_name">${nft.name}</span>
          <span class="nft_category">${nft.category}</span>
          <span class="nft_textprice">Current Price</span>
          <span class="nft_price">${nft.price} ETH</span>
        </div>
      </div>
    `;
    
    div.addEventListener('click', () => {
      popupTitle.textContent = nft.name;
      popupCategory.textContent = nft.category;
      popupDescription.textContent = nft.description;
      popupPrice.textContent = "Current Price: " + nft.price + " ETH";
      popupImg.src = nft.image_url;
      popup.classList.add('show');
    });
    
    container.appendChild(div);
  });
}

// Functie de filtrare si sortare (Filtrare Automata)
function applyFiltersAndSort() {
  const category = categoryFilterSelect.value;
  const priceRange = priceRangeFilterSelect.value;
  const sortBy = sortBySelect.value;
  
  // Parsarea intervalului de preț (Price Range Dropdown Logic)
  let minPrice = 0;
  let maxPrice = Infinity;
  if (priceRange !== '0-max') {
    const parts = priceRange.split('-');
    minPrice = parseFloat(parts[0]);
    // Verificăm dacă partea a doua este 'max' sau un număr
    maxPrice = parts[1] === 'max' ? Infinity : parseFloat(parts[1]);
  }
  
  // 1. Filtrare
  let filteredNFTs = nftsFromDB.filter(nft => {
    const matchesCategory = !category || nft.category === category;
    const matchesPrice = nft.price >= minPrice && nft.price <= maxPrice;
    return matchesCategory && matchesPrice;
  });
  
  // 2. Sortare
  filteredNFTs.sort((a, b) => {
    switch (sortBy) {
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'name_asc':
        return a.name.localeCompare(b.name);
      case 'creator_id_asc':
        return a.creator_id - b.creator_id;
      default:
        return 0; 
    }
  });

  currentNFTs = filteredNFTs;
  renderNFTs(currentNFTs);
}

// Initializare
populateCategories();
renderNFTs(nftsFromDB);

// Setăm evenimentele de 'change' pentru filtrare automată
categoryFilterSelect.addEventListener('change', applyFiltersAndSort);
priceRangeFilterSelect.addEventListener('change', applyFiltersAndSort);
sortBySelect.addEventListener('change', applyFiltersAndSort);


// Event Listener pentru butonul de filtre (afisare/ascundere box)
filterButtonDiv.addEventListener('click', (e) => {
    e.preventDefault(); 
    const isShown = filterBox.classList.toggle('show');
    bgElement.classList.toggle('active', isShown); 
});


// LOGICA POPUP-ULUI 
closeBtn.addEventListener('click', () => popup.classList.remove('show'));
popup.addEventListener('click', e => {
  if(e.target === popup) popup.classList.remove('show');
});