const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 5;
const apiKey = 'wg242yciadE9kSG5ho7vhLYBWsI3NutUTYxL1GCeVcQ';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}
// Do Not Repeat Yourself (DRY) Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
        photosArray.forEach((photo) => {
            // Create <a> to link to Unspalsh
            const item = document.createElement('a');
            // Replaced next 2 items with DRY helper function below
                // item.setAttribute('href', photo.links.html);
                // item.setAttribute('target', '_blank');
            setAttributes(item, {
                href: photo.links.html,
                target: '_blank',
            });
            // Create <img> for photo
            const img = document.createElement('img');
            // Replaced next 3 items with DRY helper function below
                // img.setAttribute('src', photo.urls.regular);
                // img.setAttribute('alt', photo.alt_description);
                // img.setAttribute('title', photo.alt_description);
            setAttributes(img, {
                src: photo.urls.regular,
                alt: photo.alt_description,
                title: photo.alt_desription,
            });

            // Event Listener, cehck when each is finished loading
            img.addEventListener('load', imageLoaded);

            // Put <img> inside <a>, then put both inside imageContainer Element
            item.appendChild(img);
            imageContainer.appendChild(item);
        });
    }

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        
        displayPhotos();
    } catch (error) {
        // Catch Error Here
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();