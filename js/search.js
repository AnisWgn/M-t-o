let debounceTimer;
    const searchInput = document.getElementById('citySearch');
    const suggestionsDiv = document.getElementById('suggestions');

    // Fonction de recherche avec debounce
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      const query = e.target.value;
      
      if (query.length < 2) {
        suggestionsDiv.style.display = 'none';
        return;
      }
      
      debounceTimer = setTimeout(() => {
        searchCities(query);
      }, 300); // Attendre 300ms après que l'utilisateur arrête de taper
    });

    async function searchCities(query) {
      // Utiliser GeoDB Cities (version gratuite)
      const url = `http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=${query}&limit=10&minPopulation=5000`;
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        displaySuggestions(data.data);
      } catch (error) {
        console.error('Erreur:', error);
      }
    }

    function displaySuggestions(cities) {
      if (!cities || cities.length === 0) {
        suggestionsDiv.style.display = 'none';
        return;
      }
      
      suggestionsDiv.innerHTML = '';
      suggestionsDiv.style.display = 'block';
      
      cities.forEach(city => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.textContent = `${city.name}, ${city.country}`;
        div.addEventListener('click', () => {
          searchInput.value = city.name;
          suggestionsDiv.style.display = 'none';
          // Récupérer la météo pour cette ville
          getWeather(city.latitude, city.longitude, city.name);
        });
        suggestionsDiv.appendChild(div);
      });
    }

    function getWeather(lat, lon, cityName) {
      console.log(`Récupération météo pour ${cityName}: ${lat}, ${lon}`);
      // Appeler votre API météo ici
    }

    // Fermer les suggestions si on clique ailleurs
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-container')) {
        suggestionsDiv.style.display = 'none';
      }
    });