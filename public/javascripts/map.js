mapboxgl.accessToken = 'pk.eyJ1IjoicmFjaGVsZGx0IiwiYSI6ImNrYzdsMG9qZTBxOGMyc2xqMzV2ejd1czEifQ.4f9dZK4w0vGTCrStvdKzlQ';
var mapboxClient = mapboxSdk({
    accessToken: mapboxgl.accessToken
});
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [13.399557, 52.510008],
    zoom: 11.1
});

const nav = new mapboxgl.NavigationControl();
map.addControl(nav, "top-right");

function addPin(options) {
    return new mapboxgl.Marker(options).setLngLat(options.coord).addTo(map);
}

function getCenter() {
    return map.getCenter();
}

if(typeof markerList != "undefined"){
    markerList.forEach( marker => {map
        if (marker.lngLat) {
            addPin({
                coord: marker.coord
            });
        } else {
            mapboxClient.geocoding
            .forwardGeocode({
                query: `${marker.address}`,
                autocomplete: false,
                limit: 1
            })
            .send()
            .then(function (response) {
                if (
                    response &&
                    response.body &&
                    response.body.features &&
                    response.body.features.length
                ) {
                    var feature = response.body.features[0];
                    addPin({
                        coord: feature.center
                    });
                    let marker = new mapboxgl.Marker()
                    marker.setLngLat(feature.center)
                    marker.addTo(map);
                    //map.setCenter(feature.center)
                }
                // var popup = new mapboxgl.Popup({ closeOnClick: false })
                //     .setLngLat([13.4, 52.52])
                //     .setHTML('<h1>Hello World!</h1>')
                //     .addTo(map);
            });
        }
    });
}

// marker.getElement().addEventListener("click", (event) => {
//     // window.location.href = `/newKebab/${shopName._id}`;
//     // console.log(`/newKebab/${shopName._id}`);
//     console.log('hello');
//   });

//   popup.setHTML(

//     `<div> <a href="/show/${shopName._id}">${address.shopName}</a></div>`

//   );




// map.on('click', 'places', function(e) {
//     var coordinates = e.features[0].geometry.coordinates.slice();
//     var description = e.features[0].properties.description;
     
//     // Ensure that if the map is zoomed out such that multiple
//     // copies of the feature are visible, the popup appears
//     // over the copy being pointed to.
//     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//     coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//     }
     
//     new mapboxgl.Popup()
//     .setLngLat(coordinates)
//     .setHTML(description)
//     .addTo(map);
//     });
     
//     // Change the cursor to a pointer when the mouse is over the places layer.
//     map.on('mouseenter', 'places', function() {
//     map.getCanvas().style.cursor = 'pointer';
//     });
     
//     // Change it back to a pointer when it leaves.
//     map.on('mouseleave', 'places', function() {
//     map.getCanvas().style.cursor = '';
//     });