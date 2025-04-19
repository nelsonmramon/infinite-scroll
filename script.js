const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
//Photos Array
let photosArray = [];

//Unsplash API
const count = 10;
const apiKey = "CuLEMnZWHaQOf9dcZz-48xdHt0_ozOSAEra9CnZr6hI";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
const imageLoaded = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
};

//Load More Photos
const loadMoreImages = () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
};

//Helper Function to Set Attributes on DOM Elements
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttributes(key, attributes[key]);
  }
};

//Create Elements For Links & Photos, Add to DOM
const displayPhotos = () => {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  //Run Function for each object in photosArray
  photosArray.forEach((photo) => {
    //Create <a> to link to Unsplash
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");
    // setAttributes(item, {
    //   href: photo.links.html,
    //   target: "_blank",
    // });

    //Create <img> for a photo
    const image = document.createElement("img");
    image.setAttribute("src", photo.urls.regular);
    image.setAttribute("alt", photo.alt_description);
    image.setAttribute("title", photo.alt_description);
    // setAttributes(image, {
    //   src: photo.urls.regular,
    //   alt: photo.alt.description,
    //   title: photo.alt_description,
    // });

    //Event Listener, check when each is finished loading
    image.addEventListener("load", imageLoaded);

    //Put <img>inside <a>,then put both inside imageContainer Element
    item.appendChild(image);
    imageContainer.appendChild(item);
  });
};

//Get photos from Unsplash API
const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    //const data = await response.json();
    photosArray = await response.json();
    //console.log(photosArray);
    displayPhotos();
  } catch (error) {
    //Catch error here
  }
};

//Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", loadMoreImages);

//On load
getPhotos();
