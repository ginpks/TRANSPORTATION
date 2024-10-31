// index.js

// Google Maps API Key
const API_KEY = 'API-key';
let map, userMarker, markerCluster;
const locations = [];

// Get current location and initialize map
function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        locations.push({ key: 'You', location: pos });
        createMap(pos); // Initialize map with user's location
      },
      (error) => {
        console.error('Error getting location:', error);
        // Set a default location if geolocation fails
        const defaultPos = { lat: -33.8567844, lng: 151.213108 };
        createMap(defaultPos);
      }
    );
  } else {
    // Geolocation not available
    const defaultPos = { lat: -33.8567844, lng: 151.213108 };
    createMap(defaultPos);
  }
}

// Function to initialize the Google Map
function createMap(center) {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: center,
    mapId: 'da37f3254c6a6d1c',
  });

  addMarkers();
}

// Add markers to the map
function addMarkers() {
  const markers = locations.map((location) => {
    const marker = new google.maps.Marker({
      position: location.location,
      map: map,
      title: location.key,
    });

    marker.addListener('click', () => {
      map.panTo(marker.getPosition());
      console.log('Marker clicked:', marker.getPosition().toString());
    });

    return marker;
  });

  // Initialize MarkerClusterer if available
  if (typeof MarkerClusterer !== 'undefined') {
    markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });
  }
}

// Load Google Maps Script
function loadGoogleMapsScript() {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;
  script.async = true;
  document.head.appendChild(script);
}

loadGoogleMapsScript();

