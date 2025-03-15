// Initialize and add the map
let map;
let directionsRenderer;
let directionsService;

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
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

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
    function placeMarker(autocomplete, marker, isStart) {
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
            calculateAndDisplayRoute();
        })
    }

    // Event listeners
    placeMarker(startAutocomplete, startMarker, true);
    placeMarker(endAutocomplete, endMarker, false);

    // Adjust map bounds to fit both markers
    function fitBounds() {
        const bounds = new google.maps.LatLngBounds();
        if (startMarker.getPosition()) bounds.extend(startMarker.getPosition());
        if (endMarker.getPosition()) bounds.extend(endMarker.getPosition());
        if (!bounds.isEmpty()) map.fitBounds(bounds);
    }

    function calculateAndDisplayRoute() {
        if (!startMarker.getPosition() || !endMarker.getPosition()) return;

        const request = {
            origin: startMarker.getPosition(),
            destination: endMarker.getPosition(),
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, (result, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(result);
            } else {
                alert("Could not find a route between these locations.");
            }
        }
    );
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