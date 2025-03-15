// Initialize and add the map
let map;
let startMarker, endMarker;
const apiKey = "AIzaSyCxWwT-kAXhrioTvdwVf1YflLJ7yxOdqgs"; // Replace with your actual API key

async function initMap() {

    let locationRadius = 5000; // Radius of locations from waypoints
    let numberOfStops = 10; // Total number of stops
    let waypointPickRate = 30; // Distance between waypoints on the route

    const defaultPosition = { lat: 49.2827, lng: -123.1207 };

    // Load Google Maps
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    //@ts-ignore
    const { PlacesService } = await google.maps.importLibrary("places");

    map = new Map(document.getElementById("map"), {
        zoom: 2,
        center: defaultPosition,
        mapId: "TRIP_PLANNER_ID",
        streetViewControl: false,
    });

    placesService = new PlacesService(map);

    // Search box elements
    const startInput = document.getElementById("startingLocation");
    const endInput = document.getElementById("destination");

    // Create autocomplete search boxes
    const startAutocomplete = new google.maps.places.Autocomplete(startInput);
    const endAutocomplete = new google.maps.places.Autocomplete(endInput);

    // Create markers
    startMarker = new google.maps.Marker({ map: map });
    endMarker = new google.maps.Marker({ map: map });

    // Store polyline to display the route
    let routePolyline = null;

    // Function to place marker and update route
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
            map.setZoom(10);
            fitBounds();
            computeRoute();
        });
    }

    // Attach event listeners
    placeMarker(startAutocomplete, startMarker);
    placeMarker(endAutocomplete, endMarker);

    // Adjust map bounds to fit both markers
    function fitBounds() {
        const bounds = new google.maps.LatLngBounds();
        if (startMarker.getPosition()) bounds.extend(startMarker.getPosition());
        if (endMarker.getPosition()) bounds.extend(endMarker.getPosition());
        if (!bounds.isEmpty()) map.fitBounds(bounds);
    }

    // Fetch route using Google Routes API
    async function computeRoute() {
        if (!startMarker.getPosition() || !endMarker.getPosition()) return;

        const requestBody = {
            origin: {
                location: {
                    latLng: {
                        latitude: startMarker.getPosition().lat(),
                        longitude: startMarker.getPosition().lng()
                    }
                }
            },
            destination: {
                location: {
                    latLng: {
                        latitude: endMarker.getPosition().lat(),
                        longitude: endMarker.getPosition().lng()
                    }
                }
            },
            travelMode: "DRIVE",
            computeAlternativeRoutes: false
        };

        try {
            const response = await fetch(
                `https://routes.googleapis.com/directions/v2:computeRoutes?key=AIzaSyCxWwT-kAXhrioTvdwVf1YflLJ7yxOdqgs`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Goog-FieldMask":
                            "routes.polyline,routes.distanceMeters,routes.duration,routes.legs"
                    },
                    body: JSON.stringify(requestBody)
                }
            );

            const data = await response.json();

            if (data.routes && data.routes.length > 0) {
                const route = data.routes[0];
                drawRoute(route.polyline.encodedPolyline);

                // Extract and display travel time
                const travelTime = route.duration;
                console.log("Travel Time Object:", travelTime); // Log the duration object
                displayTravelTime(travelTime);
                findInterestingPlaces(route.polyline.encodedPolyline);
            } else {
                alert("No route found.");
            }
        } catch (error) {
            console.error("Error fetching route:", error);
        }
    }

    // Function to draw polyline on the map
    function drawRoute(encodedPolyline) {
        if (routePolyline) {
            routePolyline.setMap(null); // Remove previous polyline
        }

        const decodedPath = google.maps.geometry.encoding.decodePath(encodedPolyline);
        routePolyline = new google.maps.Polyline({
            path: decodedPath,
            geodesic: true,
            strokeColor: "#4285F4",
            strokeOpacity: 0.8,
            strokeWeight: 5,
            map: map
        });
    }

    // Function to display travel time on the webpage
    function displayTravelTime(duration) {
        const travelTimeElement = document.getElementById("travelTime");
        travelTimeElement.textContent = `Travel Time: ${duration.text || duration}`; // Access the correct property
    }

    // Add marker
    function addPlaceMarker(place) {
        const marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            title: place.name,
            icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
            }
        });

        const infoWindow = new google.maps.InfoWindow({
            content: "<strong>" + place.name + "</strong>",
        });

        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        })

        console.log("Added place:", place.name);
    }

    function findInterestingPlaces(encodedPolyline) {
        console.log("Finding interesting place");
        const decodedPath = google.maps.geometry.encoding.decodePath(encodedPolyline);
        const waypoints = decodedPath.filter((_, index) => index % waypointPickRate === 0); // Pick every n-th point

        waypoints.forEach((point) => {

            const request = {
                location: point,
                radius: locationRadius, // search radius from path
                types: ["tourist_attraction", "park", "museum", "cafe", "amusement_park", "aquarium", "art_gallery", "zoo"], // Types of places
            };

            placesService.nearbySearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
                    addPlaceMarker(results[0]);
                }
            });
        });
    }
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