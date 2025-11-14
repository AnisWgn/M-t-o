// ==========================================
// CONFIGURATION API
// ==========================================
const API_KEY = '47e081eda40161d90db0fdf3191b1a44'; 
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const GEO_API_URL = 'https://api.openweathermap.org/geo/1.0/direct';

// ==========================================
// LISTE DE VILLES POUR L'AUTOCOMPLÉTION
// ==========================================
const baseCities = [
    // France
    'Paris, FR', 'Lyon, FR', 'Marseille, FR', 'Toulouse, FR', 'Nice, FR',
    'Nantes, FR', 'Strasbourg, FR', 'Montpellier, FR', 'Bordeaux, FR', 'Lille, FR',
    'Rennes, FR', 'Reims, FR', 'Saint-Étienne, FR', 'Toulon, FR', 'Le Havre, FR',
    'Grenoble, FR', 'Dijon, FR', 'Angers, FR', 'Villeurbanne, FR', 'Nîmes, FR',
    'Nancy, FR', 'Clermont-Ferrand, FR', 'Brest, FR', 'Biarritz, FR', 'La Rochelle, FR',
    'Metz, FR', 'Aix-en-Provence, FR', 'Perpignan, FR', 'Avignon, FR', 'Cannes, FR',
    // Belgique
    'Bruxelles, BE', 'Anvers, BE', 'Gand, BE', 'Charleroi, BE', 'Liège, BE',
    // Suisse
    'Zurich, CH', 'Genève, CH', 'Bâle, CH', 'Lausanne, CH', 'Berne, CH',
    // Europe
    'London, GB', 'Manchester, GB', 'Edinburgh, GB', 'Dublin, IE',
    'Madrid, ES', 'Barcelona, ES', 'Valencia, ES', 'Lisbon, PT', 'Porto, PT',
    'Rome, IT', 'Milan, IT', 'Naples, IT', 'Berlin, DE', 'Munich, DE',
    'Frankfurt, DE', 'Hamburg, DE', 'Zurich, CH', 'Geneva, CH', 'Vienna, AT',
    'Prague, CZ', 'Warsaw, PL', 'Budapest, HU', 'Athens, GR', 'Istanbul, TR',
    'Oslo, NO', 'Stockholm, SE', 'Copenhagen, DK', 'Helsinki, FI',
    'Brussels, BE', 'Amsterdam, NL', 'Reykjavik, IS',
    // Amériques
    'New York, US', 'Washington, US', 'Boston, US', 'Chicago, US', 'Miami, US',
    'Atlanta, US', 'Houston, US', 'Dallas, US', 'Denver, US', 'Seattle, US',
    'San Francisco, US', 'Los Angeles, US', 'San Diego, US', 'Las Vegas, US',
    'Montreal, CA', 'Toronto, CA', 'Vancouver, CA', 'Calgary, CA', 'Quebec City, CA',
    'Mexico City, MX', 'Guadalajara, MX', 'Cancun, MX',
    'Buenos Aires, AR', 'Santiago, CL', 'Bogota, CO', 'Lima, PE',
    'Rio de Janeiro, BR', 'São Paulo, BR',
    // Afrique & Moyen-Orient
    'Cape Town, ZA', 'Johannesburg, ZA', 'Nairobi, KE', 'Casablanca, MA',
    'Marrakesh, MA', 'Cairo, EG', 'Abidjan, CI',
    'Dubai, AE', 'Abu Dhabi, AE', 'Doha, QA', 'Riyadh, SA', 'Tel Aviv, IL',
    // Asie & Océanie
    'Mumbai, IN', 'Delhi, IN', 'Bengaluru, IN', 'Chennai, IN',
    'Bangkok, TH', 'Singapore, SG', 'Kuala Lumpur, MY', 'Jakarta, ID', 'Manila, PH',
    'Tokyo, JP', 'Osaka, JP', 'Seoul, KR', 'Busan, KR',
    'Beijing, CN', 'Shanghai, CN', 'Shenzhen, CN', 'Hong Kong, HK', 'Taipei, TW',
    'Sydney, AU', 'Melbourne, AU', 'Brisbane, AU', 'Perth, AU',
    'Auckland, NZ', 'Wellington, NZ'
];

const cities = Array.from(new Set(baseCities));

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
    const windSpeed = weatherData.wind?.speed ?? 0;
    const cloudCover = weatherData.clouds?.all ?? 50;
    const rainIntensity = weatherData.rain?.['1h'] || weatherData.rain?.['3h'] || 0;
    const snowIntensity = weatherData.snow?.['1h'] || weatherData.snow?.['3h'] || 0;
    
    // Supprimer toutes les classes météo précédentes
    body.className = '';
    particlesContainer.innerHTML = '';
    
    const gentleStars = () => {
        particlesContainer.innerHTML = '<div class="moon"></div>';
        createStars(120);
    };
    
    // Ajouter la classe appropriée selon la météo
    switch(weatherMain) {
        case 'clear':
            body.classList.add(isNight ? 'clear-night' : 'clear-day');
            if (isNight) {
                gentleStars();
            } else {
                particlesContainer.innerHTML = '<div class="sun"></div>';
                createHighAltitudeClouds(Math.max(1, Math.round(windSpeed / 5)));
            }
            break;
            
        case 'clouds':
            body.classList.add('clouds');
            createClouds(Math.max(4, Math.round(cloudCover / 15)), { wind: windSpeed });
            break;
            
        case 'rain':
        case 'drizzle':
            body.classList.add('rain');
            createClouds(Math.max(3, Math.round(cloudCover / 20)), { wind: windSpeed });
            createRain({
                count: 90 + Math.round(rainIntensity * 60),
                wind: windSpeed,
                light: weatherMain === 'drizzle'
            });
            break;
            
        case 'thunderstorm':
            body.classList.add('thunderstorm');
            createClouds(Math.max(6, Math.round(cloudCover / 10)), { wind: windSpeed });
            createRain({
                count: 150,
                wind: windSpeed * 1.4,
                heavy: true
            });
            createLightningFlashes(3);
            break;
            
        case 'snow':
            body.classList.add('snow');
            createClouds(Math.max(3, Math.round(cloudCover / 20)), { wind: windSpeed });
            createSnow({
                count: 60 + Math.round(Math.max(1, snowIntensity) * 25),
                wind: windSpeed
            });
            break;
            
        case 'mist':
        case 'fog':
        case 'haze':
            body.classList.add('mist');
            createMistLayers();
            createClouds(Math.max(4, Math.round(cloudCover / 25)), { isFog: true, wind: windSpeed / 2 });
            break;
            
        default:
            body.classList.add('clouds');
            createClouds(Math.max(4, Math.round(cloudCover / 15)), { wind: windSpeed });
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

function createHighAltitudeClouds(count = 2) {
    createClouds(count, { highAltitude: true, wind: 5 });
}

function createClouds(count, options = {}) {
    const { isFog = false, wind = 0, highAltitude = false } = options;
    const container = elements.weatherParticles;
    for (let i = 0; i < count; i++) {
        const cloud = document.createElement('div');
        cloud.className = `cloud${isFog ? ' fog' : ''}`;
        const topRange = isFog ? 80 : highAltitude ? 20 : 60;
        cloud.style.top = (isFog ? (20 + Math.random() * topRange) : Math.random() * topRange) + '%';
        const baseWidth = isFog ? 220 : highAltitude ? 140 : 120;
        const width = baseWidth + Math.random() * (isFog ? 180 : 100);
        cloud.style.width = `${width}px`;
        cloud.style.height = `${width * (isFog ? 0.4 : 0.6)}px`;
        const durationBase = (isFog ? 55 : 28) + Math.random() * (isFog ? 30 : 18) - wind * 1.5;
        const finalDuration = Math.max(18, durationBase);
        cloud.style.setProperty('--cloud-duration', `${finalDuration}s`);
        cloud.style.animationDuration = `${finalDuration}s`;
        cloud.style.animationDelay = `${Math.random() * 15}s`;
        cloud.style.setProperty('--cloud-opacity', isFog ? 0.5 : 0.5 + Math.random() * 0.3);
        cloud.style.setProperty('--cloud-blur', isFog ? '10px' : `${Math.random() * 4}px`);
        const shift = (Math.random() - 0.5) * wind * 15;
        cloud.style.setProperty('--cloud-shift', `${shift}px`);
        cloud.style.animationPlayState = 'running';
        cloud.style.willChange = 'transform';
        container.appendChild(cloud);
    }
}

function createRain(options = {}) {
    const { count = 120, wind = 0, light = false, heavy = false } = options;
    const container = elements.weatherParticles;
    for (let i = 0; i < count; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = Math.random() * 100 + '%';
        const height = light ? (10 + Math.random() * 15) : (15 + Math.random() * 25);
        drop.style.height = `${height}px`;
        const duration = light ? (0.9 + Math.random() * 0.5) : heavy ? (0.5 + Math.random() * 0.3) : (0.7 + Math.random() * 0.4);
        drop.style.setProperty('--fall-duration', `${duration}s`);
        drop.style.animationDuration = `${duration}s`;
        drop.style.animationDelay = `${Math.random() * 1.5}s`;
        const drift = (Math.random() - 0.5) * wind * 8;
        drop.style.setProperty('--drift', `${drift}px`);
        drop.style.opacity = light ? 0.5 : heavy ? 0.85 : 0.7;
        container.appendChild(drop);
    }
}

function createSnow(options = {}) {
    const { count = 60, wind = 0 } = options;
    const container = elements.weatherParticles;
    for (let i = 0; i < count; i++) {
        const flake = document.createElement('div');
        flake.className = 'snow-flake';
        flake.style.left = Math.random() * 100 + '%';
        const duration = (Math.random() * 4 + 5) - wind * 0.2;
        flake.style.setProperty('--snow-duration', `${Math.max(4, duration)}s`);
        flake.style.animationDuration = `${Math.max(4, duration)}s`;
        flake.style.animationDelay = `${Math.random() * 4}s`;
        const size = Math.random() * 6 + 6;
        flake.style.width = `${size}px`;
        flake.style.height = flake.style.width;
        const drift = (Math.random() - 0.5) * (10 + wind * 4);
        flake.style.setProperty('--drift', `${drift}px`);
        container.appendChild(flake);
    }
}

function createMistLayers() {
    const container = elements.weatherParticles;
    for (let i = 0; i < 3; i++) {
        const layer = document.createElement('div');
        layer.className = 'mist-layer';
        layer.style.setProperty('--mist-duration', `${30 + Math.random() * 20}s`);
        container.appendChild(layer);
    }
}

function createLightningFlashes(count = 2) {
    const container = elements.weatherParticles;
    for (let i = 0; i < count; i++) {
        const flash = document.createElement('div');
        flash.className = 'lightning-flash';
        flash.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(flash);
    }
}

// ==========================================
// FONCTION POUR OBTENIR LE FUSEAU HORAIRE
// ==========================================
// Fonction pour obtenir une approximation du fuseau horaire à partir des coordonnées
function getTimezoneFromCoordinates(lat, lon) {
    // Calcul approximatif basé sur la longitude (chaque 15° = 1 heure)
    const offset = Math.round(lon / 15);
    
    // Mapper vers les fuseaux horaires IANA les plus courants
    // Cette fonction retourne un fuseau horaire approximatif
    // Pour une précision maximale, on utilisera l'API WorldTimeAPI
    const timezones = {
        '-12': 'Etc/GMT+12', '-11': 'Pacific/Midway', '-10': 'Pacific/Honolulu',
        '-9': 'America/Anchorage', '-8': 'America/Los_Angeles', '-7': 'America/Denver',
        '-6': 'America/Chicago', '-5': 'America/New_York', '-4': 'America/Caracas',
        '-3': 'America/Sao_Paulo', '-2': 'Atlantic/South_Georgia', '-1': 'Atlantic/Azores',
        '0': 'Europe/London', '1': 'Europe/Paris', '2': 'Europe/Athens',
        '3': 'Europe/Moscow', '4': 'Asia/Dubai', '5': 'Asia/Karachi',
        '6': 'Asia/Dhaka', '7': 'Asia/Bangkok', '8': 'Asia/Shanghai',
        '9': 'Asia/Tokyo', '10': 'Australia/Sydney', '11': 'Pacific/Auckland',
        '12': 'Pacific/Fiji'
    };
    
    return timezones[offset.toString()] || 'UTC';
}

// Fonction améliorée pour obtenir le fuseau horaire via l'API GeoNames (gratuite)
async function getTimezoneFromGeoNames(lat, lon) {
    try {
        // Essayer d'abord avec l'API GeoNames
        const response = await fetch(
            `https://secure.geonames.org/timezoneJSON?lat=${lat}&lng=${lon}&username=demo`
        );
        
        if (response.ok) {
            const data = await response.json();
            if (data.timezoneId && !data.status) {
                return data.timezoneId;
            }
        }
    } catch (error) {
        console.warn('Erreur GeoNames:', error);
    }
    
    // Essayer avec l'API WorldTimeAPI (nécessite d'abord de trouver le fuseau horaire)
    try {
        // Utiliser l'approximation pour obtenir un fuseau horaire proche
        const approxTimezone = getTimezoneFromCoordinates(lat, lon);
        
        // Essayer de récupérer les informations de ce fuseau horaire
        const response = await fetch(
            `https://worldtimeapi.org/api/timezone/${approxTimezone}`
        );
        
        if (response.ok) {
            return approxTimezone;
        }
    } catch (error) {
        console.warn('Erreur WorldTimeAPI:', error);
    }
    
    // Fallback final vers l'approximation
    return getTimezoneFromCoordinates(lat, lon);
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
        
        // Obtenir le fuseau horaire de la ville
        const timezone = await getTimezoneFromGeoNames(data.coord.lat, data.coord.lon);
        data.timezone = timezone;
        
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
    
    // Heures du soleil - utiliser le fuseau horaire de la ville
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);
    
    // Utiliser le fuseau horaire de la ville si disponible, sinon utiliser UTC
    const timezone = data.timezone || 'UTC';
    
    document.getElementById('sunrise').textContent = 
        sunrise.toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit',
            timeZone: timezone
        });
    document.getElementById('sunset').textContent = 
        sunset.toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit',
            timeZone: timezone
        });
    
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
    if (API_KEY !== '47e081eda40161d90db0fdf3191b1a44' || !API_KEY) {
        showError('Veuillez configurer votre clé API OpenWeatherMap');
        return;
    }
    
    // Charger la météo de Paris par défaut
    searchWeather('Nancy, FR');
}

// Démarrer l'application quand le DOM est chargé
document.addEventListener('DOMContentLoaded', init);

