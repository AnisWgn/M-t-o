# 🌤️ Application Météo Moderne

Application météo interactive avec animations dynamiques selon les conditions climatiques.

## ✨ Fonctionnalités

- 🔍 **Recherche de villes** avec autocomplétion intelligente
- 🎨 **Backgrounds dynamiques** qui changent selon la météo
- 🌈 **Animations immersives** :
  - ☀️ Soleil pulsant pour temps clair (jour)
  - 🌙 Lune et étoiles scintillantes (nuit)
  - ☁️ Nuages défilants pour temps nuageux
  - 🌧️ Gouttes de pluie animées
  - ❄️ Flocons de neige qui tombent
  - ⛈️ Effet d'orage intense
- 📊 **Informations détaillées** :
  - Température actuelle et ressentie
  - Min/Max du jour
  - Humidité, vent, pression
  - Visibilité et couverture nuageuse
  - Heures de lever/coucher du soleil
- 📱 **Design responsive** adapté à tous les écrans

## 🗂️ Structure du projet

```
Météo2/
├── index.php           # Structure HTML
├── css/
│   └── style.css      # Tous les styles et animations
├── js/
│   └── weather.js     # Logique de l'application
└── README.md          # Documentation
```

## 🚀 Installation

1. **Cloner ou télécharger** le projet dans votre serveur web local (Laragon, XAMPP, etc.)

2. **Obtenir une clé API OpenWeatherMap** :
   - Créer un compte gratuit sur [OpenWeatherMap](https://openweathermap.org/api)
   - Copier votre clé API

3. **Configurer la clé API** :
   - Ouvrir `js/weather.js`
   - Remplacer `YOUR_API_KEY_HERE` par votre clé API à la ligne 6 :
   ```javascript
   const API_KEY = 'VOTRE_CLE_API_ICI';
   ```

4. **Lancer l'application** :
   - Ouvrir `http://localhost/Météo2/` dans votre navigateur

## 🎨 Personnalisation

### Modifier les couleurs

Dans `css/style.css`, modifier les variables CSS :
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --text-dark: #1f2937;
    --text-light: #6b7280;
}
```

### Ajouter des villes à l'autocomplétion

Dans `js/weather.js`, modifier le tableau `cities` :
```javascript
const cities = [
    'Votre Ville, FR',
    // ... autres villes
];
```

### Modifier les effets météo

Dans `js/weather.js`, ajuster les fonctions de création d'effets :
- `createStars(count)` : nombre d'étoiles
- `createClouds(count)` : nombre de nuages
- `createRain(count)` : intensité de la pluie
- `createSnow(count)` : nombre de flocons

## 🌐 API utilisée

**OpenWeatherMap API** (gratuite)
- Endpoint météo : `https://api.openweathermap.org/data/2.5/weather`
- Format : JSON
- Langue : Français
- Unités : Métriques (°C, km/h)

## 📝 Technologies

- **HTML5** : Structure sémantique
- **CSS3** : Animations et transitions avancées
- **JavaScript ES6+** : Logique moderne avec async/await
- **OpenWeatherMap API** : Données météo en temps réel

## 🎯 Conditions météo supportées

| Condition | Background | Effets |
|-----------|------------|--------|
| Ciel dégagé (jour) | Gradient chaud | Soleil animé |
| Ciel dégagé (nuit) | Gradient sombre | Lune + étoiles |
| Nuageux | Gradient gris | Nuages défilants |
| Pluie/Bruine | Gradient bleu foncé | Gouttes de pluie |
| Orage | Gradient très sombre | Pluie intense |
| Neige | Gradient blanc/bleu | Flocons tombants |
| Brouillard | Gradient gris clair | Nuages épais |

## 🐛 Dépannage

**Erreur "Ville non trouvée"** :
- Vérifier l'orthographe de la ville
- Essayer avec le nom en anglais

**Erreur "Clé API invalide"** :
- Vérifier que la clé est bien configurée dans `js/weather.js`
- Vérifier que la clé est active sur OpenWeatherMap

**Les animations ne s'affichent pas** :
- Vérifier la console du navigateur (F12)
- S'assurer que `css/style.css` est bien chargé

## 📄 Licence

Projet libre d'utilisation pour usage personnel et éducatif.

## 👨‍💻 Auteur

Créé avec ❤️ pour un projet d'apprentissage

## 🔄 Mises à jour futures

- [ ] Prévisions sur 5 jours
- [ ] Localisation automatique
- [ ] Mode sombre/clair manuel
- [ ] Sauvegarde des villes favorites
- [ ] Support multilingue
- [ ] Graphiques de température

---

**Enjoy the weather! 🌈**

