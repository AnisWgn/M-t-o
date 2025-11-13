<?php 
require_once 'include/meteo.php'; 
?>

<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="css/styles.css">
  <script src="js/search.js"></script>
</head>
<body>
  <div class="search-container">
    <input 
      type="text" 
      class="search-input" 
      id="citySearch" 
      placeholder="Rechercher une ville..."
    >
    <div class="suggestions" id="suggestions"></div>
  </div>
</body>
</html>