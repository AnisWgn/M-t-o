<?php
// Fonction pour lire le fichier .env
function loadEnv($path) {
    if (!file_exists($path)) {
        return [];
    }
    
    $env = [];
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    
    foreach ($lines as $line) {
        // Ignorer les commentaires
        if (strpos(trim($line), '#') === 0) {
            continue;
        }
        
        // Séparer la clé et la valeur
        if (strpos($line, '=') !== false) {
            list($key, $value) = explode('=', $line, 2);
            $key = trim($key);
            $value = trim($value);
            // Supprimer les guillemets si présents
            $value = trim($value, '"\'');
            $env[$key] = $value;
        }
    }
    
    return $env;
}

// Charger les variables d'environnement
$env = loadEnv(__DIR__ . '/.env');

// Récupérer les variables ou utiliser des valeurs par défaut
$apiKey = $env['Api_Key'] ?? '';
$baseUrl = $env['Base_Url'] ?? 'https://api.openweathermap.org/data/2.5';
$city = $env['City'] ?? 'Paris';

// Construire l'URL complète
$url = $baseUrl . '/weather?q=' . urlencode($city) . '&appid=' . urlencode($apiKey) . '&units=metric&lang=fr';
?>