//Unsplash API
const count = 10;
const apiKey = "CuLEMnZWHaQOf9dcZz-48xdHt0_ozOSAEra9CnZr6hI";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Get photos from Unsplash API
const getPhotos = async ()=>{
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
    }catch(error){

    }
}

//On load
getPhotos();
