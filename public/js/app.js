$(() => {
    // Report form UI enhancements
    $("#called911").on("change", () => {
        $("#policeResponse").toggleClass("hidden");
    });

    $("#madeReport").on("change", () => {
        $("#policeReport").toggleClass("hidden");
    });

    $("#haveLawyer").on("change", () => {
        $("#lawyerInfo").toggleClass("hidden");
    });
    
    //Mapbox Functionality
    mapboxgl.accessToken = "pk.eyJ1IjoidHJhdmlzc291dGhhcmQiLCJhIjoiY2tiaTNkODI5MGJhdjJ5bTh1ZGtzazdlNSJ9.a7G1oI8IkOxDuH8kBnEfcA";
    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/travissouthard/ckjd6y5j624ll19phixshuo24',
        center: [-75.163597, 40.0],
        zoom: 9.25
    });

    let coords;
    
    if ($("#lngLat").val()) {
        coords = $("#lngLat").val().split(",")
        
        let marker = new mapboxgl.Marker({
            draggable: true
        }).setLngLat(coords).addTo(map);
        
        marker.on("dragend", () => {
            let coordObj = marker.getLngLat();
            let lngLat = [coordObj.lng, coordObj.lat].join();
            $("#lngLat").val(lngLat)
        })
    } else if ($(".lngLat").length > 0) {
        let markers = [];
        
        $(".lngLat").map(i => {
            coords = $(".lngLat")[i].id.split(",");
            let marker = new mapboxgl.Marker().setLngLat(coords).addTo(map);
            markers.push(marker)
        })
    }
});