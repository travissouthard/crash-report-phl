$(() => {
    $("#called911").on("change", () => {
        $("#policeResponse").toggleClass("hidden");
    });

    $("#madeReport").on("change", () => {
        $("#policeReport").toggleClass("hidden");
    });

    $("#haveLawyer").on("change", () => {
        $("#lawyerInfo").toggleClass("hidden");
    });
    
    // Mapbox Things
    mapboxgl.accessToken = "pk.eyJ1IjoidHJhdmlzc291dGhhcmQiLCJhIjoiY2tiaTNkODI5MGJhdjJ5bTh1ZGtzazdlNSJ9.a7G1oI8IkOxDuH8kBnEfcA";
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/travissouthard/ckjd6y5j624ll19phixshuo24', // stylesheet location
        center: [-75.163597, 40.0], // starting position [lng, lat]
        zoom: 9.25 // starting zoom
    });
    let marker = new mapboxgl.Marker({
        draggable: true
    }).setLngLat([-75.2032832, 39.9631334]).addTo(map);
});