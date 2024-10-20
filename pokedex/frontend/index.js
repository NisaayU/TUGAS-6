let pokemonData = [];

// Function to get color based on Pokemon type
function getColorByType(type) {
  switch (type) {
    case "fire":
      return "bg-red-500";
    case "water":
      return "bg-blue-600";
    case "grass":
      return "bg-green-500";
    case "electric":
      return "bg-yellow-500";
    case "poison":
      return "bg-purple-500";
    case "ground":
      return "bg-gray-500";
    case "fairy":
      return "bg-pink-500";
    case "flying":
      return "bg-blue-400";
    case "bug":
      return "bg-orange-500";
    case "fighting":
      return "bg-red-700";
    case "psychic":
      return "bg-green-800";
    case "rock":
      return "bg-red-900";
    case "ice":
      return "bg-blue-400";
    case "ghost":
      return "bg-gray-700";
    case "normal":
      return "bg-gray-400";
    case "steel":
      return "bg-gray-600";
  }
}

// Fetch data from mock server
async function fetchPokemon() {
  try {
    const response = await fetch("http://localhost:3000/pokemon");
    if (!response.ok) {
      throw new Error("HTTP call failed");
    }
    const data = await response.json();
    pokemonData = data;
    renderApp();
  } catch (error) {
    console.error("Failed to fetch Pokemon data:", error);
    renderApp();
  }
}


// Function to create a Pokemon card
function createPokemonCard(pokemon) {
  const cardDiv = document.createElement("div");
  cardDiv.classList.add(
    "shadow-md",
    "shadow-[#A04747]",
    "rounded-xl",
    "p-6",
    "m-4",
    "w-64",
    "text-center",
    "transform",
    "hover:scale-105",
    "transition-transform",
    "duration-200",
    "border-2",
    "border-[#EB8317]",
    "relative"
  );

  const img = document.createElement("img");
  img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  img.alt = pokemon.name;
  img.classList.add("mx-auto", "w-36", "h-36", "mb-4", "transition-transform", "duration-300", "ease-in-out", "hover:scale-110", "hover:rotate-6");

  const name = document.createElement("h2");
  name.textContent = pokemon.name;
  name.classList.add("text-2xl", "font-bold", "capitalize", "text-yellow-100", "p-1", "transition", "duration-300", "hover:brightness-125");

  const types = document.createElement("div");
  types.classList.add("flex", "justify-center", "flex-wrap", "mt-2");
  pokemon.types.forEach(type => {
    const typeSpan = document.createElement("span");
    typeSpan.textContent = type;
    typeSpan.classList.add("text-xs", "font-semibold", "px-3", "py-1", "m-1", "rounded", "text-white", "transition-opacity", "duration-300", "hover:opacity-50", getColorByType(type));
    types.appendChild(typeSpan);
  });

  const height = document.createElement("p");
  height.textContent = `Height : ${pokemon.height}`;
  height.classList.add("text-yellow-200", "mt-1", "p-1", "transition-transform", "duration-300", "hover:translate-x-2");

  const weight = document.createElement("p");
  weight.textContent = `Weight : ${pokemon.weight}`;
  weight.classList.add("text-yellow-600", "mt-1", "p-1", "transition-transform", "duration-300", "hover:-translate-x-4");

  const abilities = document.createElement("p");
  abilities.textContent = `Abilities : ${pokemon.abilities.join(", ")}`;
  abilities.classList.add("text-yellow-400", "mt-1", "p-1", "transition-transform", "duration-300", "hover:translate-x-2");

  const evolution = document.createElement("p");
  evolution.textContent = `Evolution : ${pokemon.evolutionChains.join(" → ")}`;
  evolution.classList.add("text-orange-200", "mt-1", "p-1", "transition-transform", "duration-300", "hover:-translate-x-4");


  cardDiv.appendChild(img);
  cardDiv.appendChild(name);
  cardDiv.appendChild(types);
  cardDiv.appendChild(height);
  cardDiv.appendChild(weight);
  cardDiv.appendChild(abilities);
  cardDiv.appendChild(evolution);

  return cardDiv;
}

// Function to render the list of Pokemon
function renderPokemonList() {
  const container = document.createElement("div");
  container.classList.add("flex", "flex-wrap", "justify-center", "mt-4");

  if (pokemonData.length === 0) {
    const loadingText = document.createElement("p");
    loadingText.textContent = "Loading Pokemon data...";
    loadingText.classList.add("text-[#8D6E63]", "text-2xl", "font-semibold");
    container.appendChild(loadingText);
  } else {
    pokemonData.forEach((pokemon) => {
      const pokemonCard = createPokemonCard(pokemon);
      container.appendChild(pokemonCard);
    });
  }

  return container;
}

// Function to render the entire app
function renderApp() {
  const root = document.getElementById("root");
  root.innerHTML = ""; // Clear previous content

  // Navbar
  const navbar = document.createElement("nav");
  navbar.classList.add(
    "bg-[#F3C623]",
    "p-4",
    "text-black",
    "flex",
    "items-center",
    "justify-center",
    "shadow-md",
    "transition", 
    "duration-300", 
    "hover:brightness-125",
    "fixed",
    "top-0",
    "left-0",
    "right-0",
    "w-full",
    "z-10"
  );

   const logo1 = document.createElement("img");
   logo1.src = "https://th.bing.com/th/id/R.118957c3e5661b4da47131e2df672ddb?rik=dwgmeahxqUUljA&riu=http%3a%2f%2fpixelartmaker.com%2fart%2f797ff81281c7a32.png&ehk=Ur8VGHkDs7k4WPW4vmVu%2bGg4wrGBd1wZ7citoEskhVs%3d&risl=&pid=ImgRaw&r=0"; // Same logo URL
   logo1.alt = "Pokedex Logo 1";
   logo1.classList.add("w-9", "h-9", "mr-4", "transition-transform", "duration-300", "hover:translate-x-5"); 
   navbar.appendChild(logo1); 
   
   const navTitle = document.createElement("h1");
   navTitle.textContent = "Pokedex";
   navTitle.classList.add("text-3xl", "font-bold", "transition-opacity", "duration-300", "opacity-100", "hover:opacity-50");
   navbar.appendChild(navTitle);
   
   const logo2 = document.createElement("img");
   logo2.src = logo1.src;
   logo2.alt = "Pokedex Logo 2";
   logo2.classList.add("w-9", "h-9", "ml-3", "transition-transform", "duration-300", "hover:-translate-x-5"); 
   navbar.appendChild(logo2);

  // Container for content
  const contentWrapper = document.createElement("div");
  contentWrapper.classList.add("mt-20");

  // Pokemon List
  const pokemonList = renderPokemonList();

  // Append elements to root
  root.appendChild(navbar);  // Add navbar
  contentWrapper.appendChild(pokemonList);  // Add pokemon list
  root.appendChild(contentWrapper);  // Append content to root
}

// Initial render
renderApp();

// Fetch and display the Pokemon data
fetchPokemon();
