// Initialize and add the map
let map;

async function initMap() {
    // The location of Vancouver
    const defaultPosition = { lat: 49.2827, lng: -123.1207 };
    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // The map, centered at Vancouver
    map = new Map(document.getElementById("map"), {
        zoom: 2,
        center: defaultPosition,
        mapId: "TRIP_PLANNER_ID",
        streetViewControl: false,
    });

    // Search box element
    const startInput = document.getElementById("startingLocation");
    const endInput = document.getElementById("destination");

    // Create autocomplete search boxes
    const startAutocomplete = new google.maps.places.Autocomplete(startInput);
    const endAutocomplete = new google.maps.places.Autocomplete(endInput);

    // Create start and end markers
    const startMarker = new google.maps.Marker({
        map: map,
        //draggable: true,
    });
    const endMarker = new google.maps.Marker({
        map: map,
        //draggable: true,
    });

    // Place start and end markers
    function placeMarker(autocomplete, marker) {
        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (!place.geometry) {
                alert("No details available for this location");
                return;
            }
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);
            map.setCenter(place.geometry.location);
            map.setZoom(15);
            fitBounds();
        })
    }

    // Event listeners
    placeMarker(startAutocomplete, startMarker);
    placeMarker(endAutocomplete, endMarker);

    // Adjust map bounds to fit both markers
    function fitBounds() {
        const bounds = new google.maps.LatLngBounds();
        if (startMarker.getPosition()) bounds.extend(startMarker.getPosition());
        if (endMarker.getPosition()) bounds.extend(endMarker.getPosition());
        if (!bounds.isEmpty()) map.fitBounds(bounds);
    }

    /*
    // Add marker on click
    google.maps.event.addListener(map, "click", (event) => {
        // add Marker
        addMarker({location:event.latLng});
    });
    */

    /*
    // Add a marker in Vancouver
    const marker = new AdvancedMarkerElement({
        map: map,
        position: defaultPosition,
        title: "Vancouver",
    });
    */

    /*
    // Add Marker
    function addMarker(property) {
        const marker = new AdvancedMarkerElement({
            position: property.location,
            map: map
        });
    }
    */

    //addMarker({location:{ lat: 49.2827, lng: -123.1207 }});
}

initMap();

function getTripInfo() {
    const tripType = document.getElementById('tripType').value;
    const tripLength = document.getElementById('tripLength').value;
    const startingLocation = document.getElementById('startingLocation').value;
    const destination = document.getElementById('destination').value;
    const days = document.getElementById('days').value;
    const dayTripHours = document.getElementById('dayTripHours').value;
    const dayTripStops = document.getElementById('dayTripStops').value;
    const roadTripHours = document.getElementById('roadTripHours').value;
    const roadTripStops = document.getElementById('roadTripStops').value;
  
  
    const dayTripDiv = document.getElementById('dayTrip');
    const roadTripDiv = document.getElementById('roadTrip');
    if (tripLength === 'dayTrip') {
      dayTripDiv.style.display = 'block';
      roadTripDiv.style.display = 'none';
    } else if (tripLength === 'roadTrip') {
      dayTripDiv.style.display = 'none';
      roadTripDiv.style.display = 'block';
    } else {
      dayTripDiv.style.display = 'none';
      roadTripDiv.style.display = 'none';
    }
    return { tripType, tripLength, startingLocation, destination, days, dayTripHours, dayTripStops, roadTripHours, roadTripStops };
    //console.log(tripType, tripLength, startingLocation, destination, days, dayTripHours, dayTripStops, roadTripHours, roadTripStops);
  }