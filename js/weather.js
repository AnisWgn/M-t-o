// ==========================================
// CONFIGURATION API
// ==========================================
const API_KEY = '47e081eda40161d90db0fdf3191b1a44'; // Remplacez par votre clé API
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const GEO_API_URL = 'https://api.openweathermap.org/geo/1.0/direct';

// ==========================================
// LISTE DE VILLES POUR L'AUTOCOMPLÉTION
// ==========================================
const cities = [
    'Paris, FR', 'Lyon, FR', 'Marseille, FR', 'Toulouse, FR', 'Nice, FR',
    'Nantes, FR', 'Strasbourg, FR', 'Montpellier, FR', 'Bordeaux, FR', 'Lille, FR',
    'Rennes, FR', 'Reims, FR', 'Saint-Étienne, FR', 'Toulon, FR', 'Le Havre, FR',
    'Grenoble, FR', 'Dijon, FR', 'Angers, FR', 'Villeurbanne, FR', 'Nîmes, FR',
    'London, GB', 'New York, US', 'Tokyo, JP', 'Berlin, DE', 'Madrid, ES',
    'Rome, IT', 'Amsterdam, NL', 'Brussels, BE', 'Vienna, AT', 'Prague, CZ',
    'Stockholm, SE', 'Copenhagen, DK', 'Oslo, NO', 'Helsinki, FI', 'Warsaw, PL',
    'Budapest, HU', 'Lisbon, PT', 'Athens, GR', 'Dublin, IE', 'Edinburgh, GB',
    'Barcelona, ES', 'Milan, IT', 'Munich, DE', 'Frankfurt, DE', 'Zurich, CH',
    'Geneva, CH', 'Montreal, CA', 'Toronto, CA', 'Vancouver, CA', 'Sydney, AU',
    'Melbourne, AU', 'Moscow, RU', 'Beijing, CN', 'Shanghai, CN', 'Hong Kong, HK',
    'Singapore, SG', 'Dubai, AE', 'Cairo, EG', 'Istanbul, TR', 'Mumbai, IN',
    'Delhi, IN', 'Bangkok, TH', 'Seoul, KR', 'Buenos Aires, AR', 'Rio de Janeiro, BR',
    'São Paulo, BR', 'Mexico City, MX', 'Los Angeles, US', 'Chicago, US', 'Miami, US'
];

// ==========================================
// ÉLÉMENTS DOM
// ==========================================
const elements = {
    citySearch: document.getElementById('citySearch'),
    searchBtn: document.getElementById('searchBtn'),
    autocompleteList: document.getElementById('autocompleteList'),
    weatherDisplay: document.getElementById('weatherDisplay'),
    loading: document.getElementById('loading'),
    errorMessage: document.getElementById('errorMessage'),
    weatherParticles: document.getElementById('weatherParticles')
};

// ==========================================
// FONCTION D'AUTOCOMPLÉTION
// ==========================================
function setupAutocomplete() {
    elements.citySearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm.length < 2) {
            elements.autocompleteList.classList.add('hidden');
            return;
        }
        
        const filteredCities = cities.filter(city => 
            city.toLowerCase().includes(searchTerm)
        ).slice(0, 10);
        
        if (filteredCities.length > 0) {
            elements.autocompleteList.innerHTML = '';
            elements.autocompleteList.classList.remove('hidden');
            
            filteredCities.forEach(city => {
                const div = document.createElement('div');
                div.className = 'autocomplete-item';
                div.textContent = city;
                div.addEventListener('click', function() {
                    elements.citySearch.value = city;
                    elements.autocompleteList.classList.add('hidden');
                    searchWeather(city);
                });
                elements.autocompleteList.appendChild(div);
            });
        } else {
            elements.autocompleteList.classList.add('hidden');
        }
    });
    
    // Fermer la liste au clic en dehors
    document.addEventListener('click', function(e) {
        if (!elements.citySearch.contains(e.target) && 
            !elements.autocompleteList.contains(e.target)) {
            elements.autocompleteList.classList.add('hidden');
        }
    });
}

// ==========================================
// FONCTION POUR CHANGER LE BACKGROUND SELON LA MÉTÉO
// ==========================================
function updateWeatherBackground(weatherData) {
    const body = document.body;
    const particlesContainer = elements.weatherParticles;
    const weatherMain = weatherData.weather[0].main.toLowerCase();
    const iconCode = weatherData.weather[0].icon;
    const isNight = iconCode.includes('n');
    
    // Supprimer toutes les classes météo précédentes
    body.className = '';
    particlesContainer.innerHTML = '';
    
    // Ajouter la classe appropriée selon la météo
    switch(weatherMain) {
        case 'clear':
            body.classList.add(isNight ? 'clear-night' : 'clear-day');
            if (isNight) {
                // Ajouter la lune et des étoiles
                particlesContainer.innerHTML = '<div class="moon"></div>';
                createStars(80);
            } else {
                // Ajouter le soleil
                particlesContainer.innerHTML = '<div class="sun"></div>';
            }
            break;
            
        case 'clouds':
            body.classList.add('clouds');
            createClouds(6);
            break;
            
        case 'rain':
        case 'drizzle':
            body.classList.add('rain');
            createRain(120);
            break;
            
        case 'thunderstorm':
            body.classList.add('thunderstorm');
            createRain(180);
            break;
            
        case 'snow':
            body.classList.add('snow');
            createSnow(60);
            break;
            
        case 'mist':
        case 'fog':
        case 'haze':
            body.classList.add('mist');
            createClouds(4, true);
            break;
            
        default:
            body.classList.add('clouds');
            createClouds(5);
    }
}

// ==========================================
// FONCTIONS DE CRÉATION D'EFFETS
// ==========================================
function createStars(count) {
    const container = elements.weatherParticles;
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(star);
    }
}

function createClouds(count, isFog = false) {
    const container = elements.weatherParticles;
    for (let i = 0; i < count; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        cloud.style.top = Math.random() * (isFog ? 100 : 60) + '%';
        cloud.style.width = (Math.random() * (isFog ? 150 : 100) + (isFog ? 120 : 80)) + 'px';
        cloud.style.height = (Math.random() * (isFog ? 60 : 40) + (isFog ? 50 : 30)) + 'px';
        cloud.style.animationDuration = (Math.random() * (isFog ? 40 : 25) + (isFog ? 50 : 35)) + 's';
        cloud.style.animationDelay = Math.random() * 15 + 's';
        if (isFog) {
            cloud.style.opacity = '0.7';
        }
        container.appendChild(cloud);
    }
}

function createRain(count) {
    const container = elements.weatherParticles;
    for (let i = 0; i < count; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's';
        drop.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(drop);
    }
}

function createSnow(count) {
    const container = elements.weatherParticles;
    for (let i = 0; i < count; i++) {
        const flake = document.createElement('div');
        flake.className = 'snow-flake';
        flake.style.left = Math.random() * 100 + '%';
        flake.style.animationDuration = (Math.random() * 3 + 3) + 's';
        flake.style.animationDelay = Math.random() * 5 + 's';
        flake.style.width = (Math.random() * 6 + 8) + 'px';
        flake.style.height = flake.style.width;
        container.appendChild(flake);
    }
}

// ==========================================
// FONCTION POUR RECHERCHER LA MÉTÉO
// ==========================================
async function searchWeather(cityName) {
    // Extraire le nom de la ville sans le code pays
    const city = cityName.split(',')[0].trim();
    
    elements.loading.classList.remove('hidden');
    elements.weatherDisplay.classList.add('hidden');
    elements.errorMessage.classList.add('hidden');
    
    try {
        const response = await fetch(
            `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=fr`
        );
        
        if (!response.ok) {
            throw new Error('Ville non trouvée');
        }
        
        const data = await response.json();
        displayWeather(data);
        
    } catch (error) {
        showError(error.message);
    } finally {
        elements.loading.classList.add('hidden');
    }
}

// ==========================================
// FONCTION POUR AFFICHER LA MÉTÉO
// ==========================================
function displayWeather(data) {
    // Changer le background selon la météo
    updateWeatherBackground(data);
    
    // Informations principales
    document.getElementById('cityName').textContent = data.name;
    document.getElementById('country').textContent = 
        `${data.sys.country} • ${new Date().toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long',
            year: 'numeric'
        })}`;
    document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('feelsLike').textContent = 
        `Ressenti: ${Math.round(data.main.feels_like)}°C`;
    
    // Icône météo
    const iconCode = data.weather[0].icon;
    document.getElementById('weatherIcon').src = 
        `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    document.getElementById('weatherIcon').alt = data.weather[0].description;
    
    // Détails
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('windSpeed').textContent = 
        `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
    document.getElementById('tempMinMax').textContent = 
        `${Math.round(data.main.temp_min)}° / ${Math.round(data.main.temp_max)}°`;
    document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
    document.getElementById('visibility').textContent = 
        `${(data.visibility / 1000).toFixed(1)} km`;
    document.getElementById('clouds').textContent = `${data.clouds.all}%`;
    
    // Heures du soleil
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);
    document.getElementById('sunrise').textContent = 
        sunrise.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('sunset').textContent = 
        sunset.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    
    elements.weatherDisplay.classList.remove('hidden');
}

// ==========================================
// FONCTION POUR AFFICHER LES ERREURS
// ==========================================
function showError(message) {
    elements.errorMessage.textContent = 
        `⚠️ ${message}. Veuillez vérifier le nom de la ville et réessayer.`;
    elements.errorMessage.classList.remove('hidden');
}

// ==========================================
// CONFIGURATION DES ÉVÉNEMENTS
// ==========================================
function setupEventListeners() {
    // Bouton de recherche
    elements.searchBtn.addEventListener('click', function() {
        const city = elements.citySearch.value.trim();
        if (city) {
            searchWeather(city);
            elements.autocompleteList.classList.add('hidden');
        }
    });
    
    // Touche Entrée
    elements.citySearch.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const city = elements.citySearch.value.trim();
            if (city) {
                searchWeather(city);
                elements.autocompleteList.classList.add('hidden');
            }
        }
    });
}

// ==========================================
// INITIALISATION DE L'APPLICATION
// ==========================================
function init() {
    setupAutocomplete();
    setupEventListeners();
    
    // Vérifier la clé API
    if (API_KEY === 'YOUR_API_KEY_HERE' || !API_KEY) {
        showError('Veuillez configurer votre clé API OpenWeatherMap');
        return;
    }
    
    // Charger la météo de Paris par défaut
    searchWeather('Paris, FR');
}

// Démarrer l'application quand le DOM est chargé
document.addEventListener('DOMContentLoaded', init);

