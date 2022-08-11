const axios = require('axios').default;

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;
const GOOGLE_API_KEY = '';

type GoogleGeocodingResponse = {
    results: { geometry: { location: { lat: number, lng: number } } }[];
    status: 'OK' | 'ZERO_RESULTS';
};

function searchAddressHandler(event: Event){
    event.preventDefault();
    const enteredAddress = addressInput.value;

    // @ts-ignore
    axios.get<GoogleGeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`
    ).then((response: any) => {
        if (response.data.status !== 'OK') {
            throw new Error('Could not fetch location!')
        }
       const coordinates = response.data.results[0].geometry.location;
        // @ts-ignore
        const map = new google.maps.Map(document.getElementById("map"), {
            center: coordinates,
            zoom: 16,
        });

        new google.maps.Marker({
            position: coordinates,
            map: map,
        });
    }).catch((err: Error) => {
        alert(err.message);
        console.log(err);
    });
}

form.addEventListener('submit', searchAddressHandler);
