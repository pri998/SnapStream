const APIkey = '46128788-d5ced31eb9ad445b482897ca4'; //my API key
const imageGallery = document.getElementById('image-gallery');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

// fetching images based on the search query
let currentPage = 1; // Track the current page
const imagesPerPage = 15; // Number of images per page

async function fetchImages(query = 'painting', page = 1, per_page = imagesPerPage) {
    try {
        const response = await fetch(`https://pixabay.com/api/?key=${APIkey}&q=${encodeURIComponent(query)}&image_type=photo&per_page=${per_page}&page=${page}`);
        if (!response.ok) {
            throw new Error('Failed to fetch images');
        }
        const data = await response.json();

        //checking if no images found
        const noImages = data.hits.length === 0;

        return { images: data.hits, totalHits: data.totalHits, noImages }; // returning both images and totalHits
    } catch (error) {
        console.error('Error fetching images:', error);
        alert('Error fetching images. Please try again later.');
        return { images: [], totalHits: 0, noImages: true };
    }
}


// To Display images in the gallery
function displayImages(images,noImages) {
    imageGallery.innerHTML = '';

    if (noImages) {
        // showing message when no images are found
        const noImagesMessage = document.createElement('p');
        noImagesMessage.innerText = 'No images found for this keyword. Please try a different search term.';
        noImagesMessage.className = 'noImagesMessage'; // adding a class for styling
        imageGallery.appendChild(noImagesMessage);
        return;
    }

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.webformatURL;
        imgElement.alt = image.tags;
        imgElement.className = 'thumbnail';

        // adding click event for detailed view
        imgElement.addEventListener('click', () => {
            const modal = document.createElement('div'); //creating a modal for the detailed view
            modal.className = 'modal';
            modal.style.display = 'block';

            const modalContent = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <img src="${image.largeImageURL}" class="modal-image">
                    <div class="image-details">
                        <h2>${image.tags}</h2>
                        <p>Photo by: ${image.user}</p>
                    </div>
                    <button id="download-button">Download</button>
                    <button id="favorite-button">Favorite</button>
                    <button id="share-button">Share</button>
                </div>
            `;

            modal.innerHTML = modalContent;
            document.body.appendChild(modal);

            // closing modal on click of the close button
            modal.querySelector('.close').addEventListener('click', () => {
                modal.style.display = 'none';
                modal.remove();
            });

            // implementing download functionality
            document.getElementById('download-button').addEventListener('click', () => {
                const link = document.createElement('a');
                link.href = image.largeImageURL;
                link.download = 'pixabay-image.jpg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });

            // implementing favorite functionality
            document.getElementById('favorite-button').addEventListener('click', () => {
                let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                favorites.push(image.largeImageURL);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                alert('Image added to favorites');
            });

            // implementing share functionality
            document.getElementById('share-button').addEventListener('click', () => {
                if (navigator.share) {
                    navigator.share({
                        title: 'Check out this image!',
                        url: image.largeImageURL
                    }).then(() => {
                        console.log('Image shared successfully');
                    }).catch(err => {
                        console.error('Error sharing image:', err);
                    });
                } else {
                    alert('Sharing not supported on this browser');
                }
            });
        });

        imageGallery.appendChild(imgElement);
    });
}


function createPagination(totalHits, currentPage, query) {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = ''; // clearing existing pagination

    const totalPages = Math.ceil(totalHits / imagesPerPage);

    // Creating previous button
    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.innerText = 'Previous';
        prevButton.addEventListener('click', () => {
            fetchImages(query, currentPage - 1).then(({ images }) => {
                displayImages(images);
                createPagination(totalHits, currentPage - 1, query);
            });
        });
        paginationContainer.appendChild(prevButton);
    }

    // Creating next button
    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.innerText = 'Next';
        nextButton.addEventListener('click', () => {
            fetchImages(query, currentPage + 1).then(({ images }) => {
                displayImages(images);
                createPagination(totalHits, currentPage + 1, query);
            });
        });
        paginationContainer.appendChild(nextButton);
    }
}

// Adding event listener for the search button
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        currentPage = 1; // Reseting to the first page on a new search
        fetchImages(query, currentPage).then(({ images, totalHits, noImages }) => {
            displayImages(images, noImages);
            createPagination(totalHits, currentPage, query);
        });
    } else {
        alert('Please enter a search term');
    }
});

// Fetching and displaying images on page load
fetchImages(undefined, currentPage).then(({ images, totalHits, noImages }) => {
    displayImages(images, noImages);
    createPagination(totalHits, currentPage, 'painting');
});


const quotes = [
    "Sunday's calm is a gentle reminder, Rest, recharge, let your spirit wander.",
    "Monday is the start of a new week, A blank page waiting for you to speak.",
    "Tuesday's journey is just begun, Chase your dreams and have some fun.",
    "Wednesday whispers halfway there, Keep moving forward, success is near.",
    "Thursday is the gateway to the end, Stay strong, you're on the mend.",
    "Friday's here, the weekend's glow, Time to relax and let life flow.",
    "Saturday's freedom is yours to embrace, Enjoy each moment at your own pace."
];
function displayQuoteOfTheDay() {
    const today = new Date().getDay();
    const quote = quotes[today];
    document.getElementById('daily-quote').innerText = quote;
}

// Calling this function when the page loads
window.onload = function() {
    displayQuoteOfTheDay();
};
