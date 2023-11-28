const searchForm = document.getElementById('search-form');
const searchInput = document.querySelector('.searchtxt');
const searchButton = document.getElementById('search-button');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Evita o envio padrão do formulário
    const searchTerm = searchInput.value;
    fetchPokemonData(searchTerm);
});

searchButton.addEventListener('click', (event) => {
    event.preventDefault(); // Impede o comportamento padrão do link

    const searchTerm = searchInput.value;
    fetchPokemonData(searchTerm);
});

async function fetchPokemonData(searchTerm) {
    const url = `https://pokeapi.co/api/v2/pokemon/${searchTerm}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro na solicitação da API');
        }

        const data = await response.json();

        // Redireciona o usuário para a página de resultados com os parâmetros da pesquisa
        const queryParams = new URLSearchParams();
        queryParams.set('name', data.name);
        queryParams.set('height', data.height);
        queryParams.set('weight', data.weight);
        queryParams.set('sprite', data.sprites.front_default); // Adiciona o sprite

        // Redireciona para a página de resultados com os parâmetros na URL
        window.location.href = `results.html?${queryParams.toString()}`;
    } catch (error) {
        console.error(error);
    }
}


// Função para buscar os parâmetros da URL
function getQueryParams() {
    const queryParams = new URLSearchParams(window.location.search);
    const name = queryParams.get('name');
    const height = queryParams.get('height');
    const weight = queryParams.get('weight');
    return { name, height, weight };
}

// Função para exibir os detalhes do Pokémon na página de resultados
function displayPokemonDetails(data) {
    const pokemonDetails = document.getElementById('pokemon-details');

    if (data) {
        const details = document.createElement('p');
        details.textContent = `Nome: ${data.name}, Altura: ${data.height}, Peso: ${data.weight}`;
        pokemonDetails.appendChild(details);
    } else {
        const errorDetails = document.createElement('p');
        errorDetails.textContent = 'Pokémon não encontrado';
        pokemonDetails.appendChild(errorDetails);
    }
}

// Função principal
function main() {
    const queryParams = getQueryParams();

    if (queryParams.name) {
        // Use os parâmetros para exibir os detalhes do Pokémon
        const { name, height, weight } = queryParams;
        displayPokemonDetails({ name, height, weight });
    } else {
        displayPokemonDetails(null);
    }
}

// Chama a função principal quando a página for carregada
document.addEventListener('DOMContentLoaded', main);
// Função para exibir os detalhes do Pokémon na página de resultados
function displayPokemonDetails(data) {
    const pokemonDetails = document.getElementById('pokemon-details');
    const pokemonImage = document.getElementById('pokemon-image'); // Seleciona o elemento de imagem

    if (data) {
        const details = document.createElement('p');
        details.textContent = `Nome: ${data.name}, Altura: ${data.height}, Peso: ${data.weight}`;
        pokemonDetails.appendChild(details);

        // Construa a URL da imagem do Pokémon com base no número do Pokémon (data.id)
        const imageUrl = data.sprites.front_default; 
        // Criar um elemento img
        const imgElement = document.createElement('img');

// Definir o atributo src para a URL da imagem
        imgElement.src = imageUrl;

// Adicionar a imagem à página onde você deseja que ela seja exibida
        const pokemonDetails = document.getElementById('pokemon-details');
        pokemonDetails.appendChild(imgElement);

        // Defina o atributo src da imagem com a URL da imagem do Pokémon
        pokemonImage.src = imageUrl;
    } else {
        const errorDetails = document.createElement('p');
        errorDetails.textContent = 'Pokémon não encontrado';
        pokemonDetails.appendChild(errorDetails);
    }
}
