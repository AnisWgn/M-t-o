//Récupération des variables de configuration depuis le fichier .env (injectées par PHP)
const api_Key = config.Api_Key;
const base_Url = config.Base_Url;
const url = config.Url;
const city = config.City;

//Si la clé API n'est pas définie, alors on affiche une erreur
if (!api_Key || api_Key === ''){
    console.error("La clé API n'est pas définie. Vérifiez votre fichier .env")
    alert("La clé API n'est pas définie. Vérifiez votre fichier .env (Voir la console pour plus de détails)")
}

//Fonction pour récupérer les données météo
async function getWeather(){
    try {
        //Récupération des données météo en format JSON
        const response = await fetch(url);
        //Si la réponse n'est pas ok, alors on afficher une erreur
        if (!response.ok){
            throw new Error('Erreur lors de la récupération des données météo')
        }
        const data = await response.json();

        //Récupération des données météo en format JSON
        const temperature = data.main.temp;
        const feelsLike = data.main.feels_like;
        const tempMin = data.main.temp_min;
        const tempMax = data.main.temp_max;
        const pressure = data.main.pressure;
        const humidity = data.main.humidity;
        const seaLevel = data.main.sea_level;
        const grndLevel = data.main.grnd_level;
        const windSpeed = data.wind.speed;
        const clouds = data.clouds.all;
        const summary = data.weather[0].description;

        //Affichage des données météo selon les variables définies
        console.log('Météo à', city, ':');
        console.log(summary);
        console.log('Température:', temperature, '°C');
        console.log('Température ressentie:', feelsLike, '°C');
        console.log('Température minimale:', tempMin, '°C');
        console.log('Température maximale:', tempMax, '°C');
        console.log('Pression:', pressure, 'hPa');
        console.log('Humidité:', humidity, '%');
        console.log('Niveau de la mer:', seaLevel, 'm');
        console.log('Niveau du sol:', grndLevel, 'm');
        console.log('Vitesse du vent:', windSpeed, 'm/s');
        console.log('Nuages:', clouds, '%');

    //Si une erreur est survenue pendant le try, alors on affiche l'erreur dans la console ainsi que sur le navigateur
    } catch (error){
        console.error('Erreur lors de la récupération des données météo;', error.message)
        alert('Erreur lors de la récupération des données météo (voir la console pour plus de détails)')
    }
}

//Fonction pour rechercher les villes dans l'API OpenWeather
async function searchCitiesOpenWeather(query) {
    const API_KEY = 'VOTRE_CLE_OPENWEATHER';
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`;
    
    try {
      const response = await fetch(url);
      const cities = await response.json();
      return cities.map(city => ({
        name: city.name,
        country: city.country,
        state: city.state,
        lat: city.lat,
        lon: city.lon,
        displayName: `${city.name}, ${city.state ? city.state + ', ' : ''}${city.country}`
      }));
    } catch (error) {
      console.error(error);
    }
  }

//Appel de la fonction pour récupérer les données météo
getWeather();