require('dotenv').config();

const fetch = require('node-fetch');

//Récupération des variables d'environnement
const api_Key = process.env.Api_Key;
const base_Url = process.env.Base_Url;
const url = process.env.Url;
const city = process.env.City;

if (!api_Key){
    throw new Error("La clé API n'est pas définie. Vérifier votre fichier .env")
}
