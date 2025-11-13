<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Application Météo - Prévisions en temps réel</title>
    <meta name="description" content="Application météo moderne avec des animations dynamiques selon les conditions climatiques">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <!-- Conteneur pour les effets météo animés -->
    <div id="weatherParticles" class="weather-particles"></div>
    
    <div class="container">
        <h1 class="main-title">🌤️ Application Météo</h1>
        
        <!-- Barre de recherche -->
        <div class="weather-card search-container">
            <input 
                type="text" 
                id="citySearch" 
                class="search-input"
                placeholder="Rechercher une ville..."
                autocomplete="off"
            >
            <button id="searchBtn" class="search-btn">
                Rechercher
            </button>
            
            <!-- Liste d'autocomplétion -->
            <div id="autocompleteList" class="autocomplete-list hidden"></div>
        </div>
        
        <!-- Indicateur de chargement -->
        <div id="loading" class="loading hidden">
            <div class="loading-spinner"></div>
        </div>
        
        <!-- Message d'erreur -->
        <div id="errorMessage" class="error-message hidden"></div>
        
        <!-- Carte météo principale -->
        <div id="weatherDisplay" class="weather-display hidden">
            <div class="weather-card">
                <div class="weather-main">
                    <!-- Informations principales -->
                    <div class="weather-info-main">
                        <h2 id="cityName" class="city-name"></h2>
                        <p id="country" class="country-date"></p>
                        
                        <div class="weather-current">
                            <img id="weatherIcon" src="" alt="Météo" class="weather-icon">
                            <div class="weather-temp-info">
                                <p id="temperature" class="temperature"></p>
                                <p id="description" class="description"></p>
                            </div>
                        </div>
                        
                        <p id="feelsLike" class="feels-like"></p>
                    </div>
                    
                    <!-- Détails supplémentaires -->
                    <div class="weather-details">
                        <div class="detail-item">
                            <p class="detail-label">💧 Humidité</p>
                            <p id="humidity" class="detail-value"></p>
                        </div>
                        <div class="detail-item">
                            <p class="detail-label">💨 Vent</p>
                            <p id="windSpeed" class="detail-value"></p>
                        </div>
                        <div class="detail-item">
                            <p class="detail-label">🌡️ Min/Max</p>
                            <p id="tempMinMax" class="detail-value"></p>
                        </div>
                        <div class="detail-item">
                            <p class="detail-label">🔵 Pression</p>
                            <p id="pressure" class="detail-value"></p>
                        </div>
                        <div class="detail-item">
                            <p class="detail-label">👁️ Visibilité</p>
                            <p id="visibility" class="detail-value"></p>
                        </div>
                        <div class="detail-item">
                            <p class="detail-label">☁️ Nuages</p>
                            <p id="clouds" class="detail-value"></p>
                        </div>
                    </div>
                </div>
                
                <!-- Heures de lever/coucher du soleil -->
                <div class="sun-times">
                    <div class="sun-time-item">
                        <p class="sun-time-label">🌅 Lever du soleil</p>
                        <p id="sunrise" class="sun-time-value"></p>
                    </div>
                    <div class="sun-time-item">
                        <p class="sun-time-label">🌇 Coucher du soleil</p>
                        <p id="sunset" class="sun-time-value"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <script src="js/weather.js"></script>
</body>
</html>
