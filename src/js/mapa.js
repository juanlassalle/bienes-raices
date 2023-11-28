(function() {
    const lat =document.querySelector('#lat').value || -26.8323;
    const lng =document.querySelector('#lng').value || -65.2190;
    const mapa = L.map('mapa').setView([lat, lng ], 13);
    let marker;

    //Utlizo Provider y Geocoder
    const geocodeService=L.esri.Geocoding.geocodeService() 

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    //El Pin
    marker=new L.marker([lat,lng],{
        draggable:true,
        autoPan:true
    })
    .addTo(mapa)
    //Detectar el movimiento del pin
   marker.on('moveend',function(event){
        marker=event.target
        const posicion=marker.getLatLng();
        mapa.panTo(new L.LatLng(posicion.lat, posicion.lng))

        //Obtengo la información de las calles al soltar el pin
        geocodeService.reverse().latlng(posicion,13).run(function(error,resultado){
            //console.log(resultado)

            marker.bindPopup(resultado.address.LongLabel)

            //Llenar los campos
            document.querySelector('.calle').textContent=resultado?.address?.Address ?? ''
            document.querySelector('#calle').value=resultado?.address?.Address ?? ''
            document.querySelector('#lat').value=resultado?.latlng?.lat ?? ''
            document.querySelector('#lng').value=resultado?.latlng?.lng ?? ''
        }) 

    })

})()