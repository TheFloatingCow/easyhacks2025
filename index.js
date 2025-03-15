// Initialize and add the map
let map;

async function initMap() {
    // The location of Vancouver
    const position = { lat: 49.2827, lng: -123.1207 };
    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // The map, centered at Vancouver
    map = new Map(document.getElementById("map"), {
        zoom: 9,
        center: position,
        mapId: "DEMO_MAP_ID",
    });

    // Add marker on click
    google.maps.event.addListener(map, "click", (event) => {
        // add Marker
        addMarker({location:event.latLng});
    })

    /*
    // Add a marker in Vancouver
    const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: "Vancouver",
    });
    */

    // Add Marker
    function addMarker(property) {
        const marker = new AdvancedMarkerElement({
            position: property.location,
            map: map
        });
    }

    addMarker({location:{ lat: 49.2827, lng: -123.1207 }});
}

initMap();