const nftsFromDB = [
{"creator_id": 1, "name": "Cyber Dreams #001", "description": "This unique digital artwork presents a captivating vision of a futuristic cyberpunk landscape. Every detail is meticulously handcrafted by talented artists, and the piece is fully secured on the blockchain, ensuring an unalterable proof of authenticity and complete digital ownership.", "price": 2.5, "category": "Digital Art", "image_url": "img/galactic.jpg"},
{"creator_id": 4, "name": "Giga Cats #001", "description": "A futuristic feline collectible from the first Giga Cats series, designed with a high level of visual complexity. This piece is highly valuable for collectors, representing a high-resolution digital avatar ready for use across various emerging metaverse platforms.", "price": 1.2, "category": "Collectibles", "image_url": "img/neon.jpg"},
{"creator_id": 18, "name": "Genesis Token #008", "description": "This is one of the original Genesis tokens, granting its holder guaranteed exclusive access to future projects, private events, and high-value airdrops. The token represents a core membership key in our ecosystem, which is essential for long-term community involvement and benefits.", "price": 5.0, "category": "Utility", "image_url": "img/echoes.jpg"},
{"creator_id": 1, "name": "Cyber Dreams #002", "description": "Another mesmerizing piece from the Cyber Dreams collection, exploring the theme of neon cities and advanced technology. The composition focuses on a sense of digital reverie, created using an electric color palette and impressive architectural detailing.", "price": 2.8, "category": "Digital Art", "image_url": "img/shadow.jpg"},
{"creator_id": 19, "name": "Abstract Echo #1", "description": "A dynamic generative art piece, rendered in 3D, that examines the complex interaction between light, motion, and texture. The artwork utilizes a sophisticated algorithm to create an abstract visual echo, making it perfect for high-performance digital displays.", "price": 10.5, "category": "3D Render", "image_url": "img/pixel.jpg"},
{"creator_id": 9, "name": "Soundscape Clip #10", "description": "A unique visual representation of a rare and unpublished audio clip. This NFT is a complete audio-visual piece, combining sound art with a dynamic visualization of the waveforms. It offers both aesthetic and historical value for blockchain music collectors.", "price": 0.8, "category": "Music/Audio", "image_url": "img/sonic.jpg"},
{"creator_id": 4, "name": "Giga Cats #002", "description": "The second feline collectible from the Giga Cats series, distinguished by a particularly rare color attribute that sets it apart from common pieces. It is a high-value digital asset for the collecting community, ideal for use as a personal avatar.", "price": 1.5, "category": "Collectibles", "image_url": "img/bassline.jpg"},
{"creator_id": 18, "name": "Genesis Token #009", "description": "The third Genesis token issued, which grants voting power and governance rights to the holder within the Decentralized Autonomous Organization (DAO). The token ensures continuous access to exclusive utilities and major decision-making within our digital ecosystem.", "price": 3.2, "category": "Utility", "image_url": "img/virtual.jpg"},
{"creator_id": 47, "name": "Rogue Vest #01", "description": "A wearable digital clothing item (wearable NFT) in the form of a stylized vest, compatible with a wide range of metaverse platforms. It combines high-fashion aesthetics with the practical utility of a distinctive digital accessory.", "price": 4.0, "category": "Fashion/Wearables", "image_url": "img/crystal.jpg"},
{"creator_id": 45, "name": "Deep Space View", "description": "A high-resolution digital painting that captures a spectacular cosmic scene, featuring a vibrant nebula in the foreground. This work evokes the mystery and vastness of the universe, making it an ideal centerpiece for any space-themed digital art collection.", "price": 3.0, "category": "Digital Art", "image_url": "img/digital.jpg"},
{"creator_id": 62, "name": "Crypto-Key #A1", "description": "An extremely limited access key (Utility NFT) that permits entry to an exclusive platform or a premium digital service. This key is essential for unlocking advanced functionalities and is the first in a short series of emissions.", "price": 7.5, "category": "Utility/Access", "image_url": "img/oceanic.jpg"},
{"creator_id": 62, "name": "Crypto-Key #A2", "description": "The second access key issued by the same creator, offering the exact same platform access privileges. Owning both keys may provide additional loyalty bonuses or discounts on future services offered by the ecosystem.", "price": 7.5, "category": "Utility/Access", "image_url": "img/retro.jpg"}
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
          <span class="nft_price">${nft.price} ETH</span>
        </div>
      </div>
    `;
    
    div.addEventListener('click', () => {
      popupTitle.textContent = nft.name;
      popupCategory.textContent = nft.category;
      popupDescription.textContent = nft.description;
      popupPrice.textContent = nft.price + " ETH";
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