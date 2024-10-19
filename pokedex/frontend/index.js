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
      return "bg-yellow-600";
    case "poison":
      return "bg-purple-500";
    case "ground":
      return "bg-gray-500";
    case "fairy":
      return "bg-pink-800";
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
    "bg-card",
    "shadow-lg",
    "rounded-xl",
    "p-6",
    "m-4",
    "w-64",
    "text-center",
    "transform",
    "hover:scale-105",
    "transition-transform",
    "duration-300",
    "border-3.5",
    "border-primary",
    "relative"
  );

  const img = document.createElement("img");
  img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  img.alt = pokemon.name;
  img.classList.add("mx-auto", "w-36", "h-36", "mb-4");

  const name = document.createElement("h2");
  name.textContent = pokemon.name;
  name.classList.add("text-2xl", "font-bold", "capitalize", "text-primary", "p-2");

  const types = document.createElement("div");
  types.classList.add("flex", "justify-center", "flex-wrap", "mt-2");
  pokemon.types.forEach(type => {
    const typeSpan = document.createElement("span");
    typeSpan.textContent = type;
    typeSpan.classList.add("text-xs", "font-semibold", "px-2", "py-1", "m-1", "rounded", "text-white", getColorByType(type));
    types.appendChild(typeSpan);
  });

  const height = document.createElement("p");
  height.textContent = `Height : ${pokemon.height}`;
  height.classList.add("text-gray-700", "mt-1", "p-2");

  const weight = document.createElement("p");
  weight.textContent = `Weight : ${pokemon.weight}`;
  weight.classList.add("text-gray-700", "mt-1", "p-2");

  const abilities = document.createElement("p");
  abilities.textContent = `Abilities : ${pokemon.abilities.join(", ")}`;
  abilities.classList.add("text-gray-700", "mt-1", "p-2");

  const evolution = document.createElement("p");
  evolution.textContent = `Evolution : ${pokemon.evolutionChains.join(" → ")}`;
  evolution.classList.add("text-gray-700", "mt-1", "p-2");

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
    loadingText.classList.add("text-primary", "text-2xl", "font-semibold");
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
    "bg-yellow-200",
    "p-4",
    "text-black",
    "flex",
    "items-center",
    "justify-center",
    "shadow-md",
    "fixed",
    "top-0",
    "left-0",
    "right-0",
    "w-full",
    "z-10"
  );

  const navTitle = document.createElement("h1");
  navTitle.textContent = "Pokedex";
  navTitle.classList.add("text-4xl", "font-bold", "text-primary");
  navbar.appendChild(navTitle);

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
