//my API key
const APIkey = '46128788-d5ced31eb9ad445b482897ca4'; 
const imageGallery = document.getElementById('image-gallery');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
let currentPage = 1; 
const imagesPerPage = 15; 

// Fetch images from Pixabay
async function fetchImages(query = 'day dreams', page = 1, per_page = imagesPerPage) {
    try {
        const response = await fetch(`https://pixabay.com/api/?key=${APIkey}&q=${encodeURIComponent(query)}&image_type=photo&per_page=${per_page}&page=${page}`);
        if (!response.ok) throw new Error('Failed to fetch images');
        const data = await response.json();
        const noImages = data.hits.length === 0;
        return { images: data.hits, totalHits: data.totalHits, noImages };
    } catch (error) {
        console.error('Error fetching images:', error);
        alert('Error fetching images. Please try again later.');
        return { images: [], totalHits: 0, noImages: true };
    }
}

// Display fetched images
function displayImages(images, noImages) {
    imageGallery.innerHTML = '';
    if (noImages) {
        const noImagesMessage = document.createElement('p');
        noImagesMessage.innerText = 'No images found for this keyword. Please try a different search term.';
        noImagesMessage.className = 'noImagesMessage';
        imageGallery.appendChild(noImagesMessage);
        return;
    }
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.webformatURL;
        imgElement.alt = image.tags;
        imgElement.className = 'thumbnail';

        imgElement.addEventListener('click', () => {
            const modal = document.createElement('div');
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
                    <button id="favorite-button">Favourite</button>
                    <button id="share-button">Share</button>
                </div>
            `;
            modal.innerHTML = modalContent;
            document.body.appendChild(modal);

            modal.querySelector('.close').addEventListener('click', () => {
                modal.style.display = 'none';
                modal.remove();
            });

            // Download image
            document.getElementById('download-button').addEventListener('click', () => {
                const imageUrl = image.largeImageURL;
                const fileName = image.tags ? `${image.tags.replace(/ /g, "_")}.jpg` : 'downloaded_image.jpg';
                
                // For mobile
                if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
                    const a = document.createElement('a');
                    a.href = imageUrl;
                    a.target = '_blank';
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    return;
                }
                // For desktop
                fetch(imageUrl)
                    .then(response => {
                        if (!response.ok) throw new Error('Failed to fetch image');
                        return response.blob();
                    })
                    .then(blob => {
                        const blobURL = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = blobURL;
                        a.download = fileName;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(blobURL);
                    })
                    .catch(err => {
                        console.error('Download failed:', err);
                        alert('Failed to download image. Please try again.');
                    });
            });

            // Add image to favorites
            document.getElementById('favorite-button').addEventListener('click', () => {
                let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                if (!favorites.includes(image.largeImageURL)) {
                    favorites.push(image.largeImageURL);
                    localStorage.setItem('favorites', JSON.stringify(favorites));
                    alert('Image added to favorites');
                } else {
                    alert('This image is already in your favorites');
                }
            });

            // Share image
            document.getElementById('share-button').addEventListener('click', async () => {
                try {
                    const response = await fetch(image.largeImageURL);
                    if (!response.ok) throw new Error('Failed to fetch the image for sharing');
                    const blob = await response.blob();
                    const fileName = image.tags ? `${image.tags.replace(/ /g, "_")}.jpg` : 'shared_image.jpg';
                    const imageFile = new File([blob], fileName, { type: blob.type });

                    if (navigator.share) {
                        await navigator.share({
                            files: [imageFile],
                            title: 'Check out this image!',
                            text: 'Look at this amazing image I found on SnapStream!',
                        });
                        console.log('Image shared successfully');
                    } else {
                        throw new Error('Sharing API not supported');
                    }
                } catch (error) {
                    console.error('Error sharing image:', error);
                    alert('Sharing not supported on this device or failed to share.');
                }
            });
        });
        imageGallery.appendChild(imgElement);
    });
}

// Create pagination buttons
function createPagination(totalHits, currentPage, query) {
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(totalHits / imagesPerPage);

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

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        currentPage = 1;
        fetchImages(query, currentPage).then(({ images, totalHits, noImages }) => {
            displayImages(images, noImages);
            createPagination(totalHits, currentPage, query);
        });
    } else {
        alert('Please enter a search term');
    }
});

fetchImages(undefined, currentPage).then(({ images, totalHits, noImages }) => {
    displayImages(images, noImages);
    createPagination(totalHits, currentPage, 'day dreams');
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

// Show daily quote based on the day
function displayQuoteOfTheDay() {
    const today = new Date().getDay();
    const quote = quotes[today];
    document.getElementById('daily-quote').innerText = quote;
}

window.onload = function() {
    displayQuoteOfTheDay();
};

// Favorites modal
const favoritesButton = document.getElementById('favorites-button');
const favoritesModal = document.createElement('div');
favoritesModal.className = 'modal';
favoritesModal.id = 'favorites-modal';
favoritesModal.style.display = 'none';
favoritesModal.innerHTML = `
    <div class="modal-content">
        <span class="close" id="close-favorites">&times;</span>
        <h2>My Favourite Images</h2>
        <div id="favorites-gallery"></div>
        <button id="clear-favorites-button">Clear Favorites</button>
    </div>
`;
document.body.appendChild(favoritesModal);

// Display favorite images in modal
function displayFavorites() {
    const favoritesGallery = document.getElementById('favorites-gallery');
    favoritesGallery.innerHTML = '';
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
        favoritesGallery.innerHTML = '<p>No favorite images found.</p>';
        return;
    }
    favorites.forEach(url => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Favorite Image';
        img.className = 'thumbnail';

        img.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.style.display = 'block';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <img src="${url}" class="modal-image">
                    <div class="image-details">
                        <h2>Favourite Image</h2>
                        <p>This image was marked as your favorite.</p>
                    </div>
                    <button id="download-button">Download</button>
                    <button id="remove-favorite-button">Remove from Favourites</button>
                    <button id="share-button">Share</button>
                </div>
            `;
            document.body.appendChild(modal);

            modal.querySelector('.close').addEventListener('click', () => {
                modal.remove();
            });

            // Download image
            document.getElementById('download-button').addEventListener('click', () => {
                const imageUrl = url;
                const fileName = 'favorite_image.jpg';
                if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
                    const a = document.createElement('a');
                    a.href = imageUrl;
                    a.target = '_blank';
                    a.download = fileName;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    return;
                }
                fetch(imageUrl)
                    .then(response => {
                        if (!response.ok) throw new Error('Failed to fetch image');
                        return response.blob();
                    })
                    .then(blob => {
                        const blobURL = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = blobURL;
                        a.download = fileName;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(blobURL);
                    })
                    .catch(err => {
                        console.error('Download failed:', err);
                        alert('Failed to download image. Please try again.');
                    });
            });

            // Remove from favorites
            document.getElementById('remove-favorite-button').addEventListener('click', () => {
                let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
                favorites = favorites.filter((fav) => fav !== url);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                modal.remove();
                displayFavorites();
                alert('Image removed from favourites');
            });

            // Share favorite image
            document.getElementById('share-button').addEventListener('click', () => {
                if (navigator.share) {
                    navigator.share({
                        title: 'Check out this image!',
                        url: url
                    })
                    .then(() => console.log('Image shared successfully'))
                    .catch(err => console.error('Error sharing image:', err));
                } else {
                    alert('Sharing not supported on this browser');
                }
            });
        });
        favoritesGallery.appendChild(img);
    });
}

// Open favorites modal
favoritesButton.addEventListener('click', () => {
    const favoritesModal = document.getElementById('favorites-modal');
    favoritesModal.style.display = 'block';
    displayFavorites();
});
// Close favorites modal
document.getElementById('close-favorites').addEventListener('click', () => {
    const favoritesModal = document.getElementById('favorites-modal');
    favoritesModal.style.display = 'none';
});
// Close modal on outside click
window.addEventListener('click', (event) => {
    const favoritesModal = document.getElementById('favorites-modal');
    if (event.target === favoritesModal) {
        favoritesModal.style.display = 'none';
    }
});
// Clear all favorites
document.getElementById('clear-favorites-button').addEventListener('click', () => {
    localStorage.removeItem('favorites');
    displayFavorites();
    alert('All favorites have been cleared!');
});

// Trigger search on Enter key
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        triggerSearch();
    }
});
// Trigger search on button click
searchButton.addEventListener('click', () => {
    triggerSearch();
});

// Handle search functionality
function triggerSearch() {
    const query = searchInput.value.trim();
    if (query) {
        currentPage = 1;
        fetchImages(query, currentPage).then(({ images, totalHits, noImages }) => {
            displayImages(images, noImages);
            createPagination(totalHits, currentPage, query);
        });
    } else {
        alert('Please enter a search term');
    }
}

const surpriseButton = document.getElementById('surprise-button');

// Fetch a random high-rated image
async function fetchRandomHighRatedImage() {
    try {
        const categories = [
            'luck','blessings','magic','paradise','aurora','sunrise','sunset','moonlight','stars',
            'rainbow','celebration','music','dance','nature','city','photography','technology',
            'flowers','ocean','landscape','golden hour','shadows','daydream'
        ];
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const randomPage = Math.floor(Math.random() * 20) + 1;
        const response = await fetch(`https://pixabay.com/api/?key=${APIkey}&q=${encodeURIComponent(randomCategory)}&image_type=photo&order=popular&per_page=3&page=${randomPage}`);
        if (!response.ok) throw new Error('API request failed');
        const data = await response.json();
        if (data.hits && data.hits.length > 0) {
            const randomImage = data.hits[Math.floor(Math.random() * data.hits.length)];
            displayRandomImage(randomImage);
        } else {
            alert('No random image found. Trying again...');
            fetchRandomHighRatedImage();
        }
    } catch (error) {
        console.error('Error fetching random image:', error);
        alert('Failed to fetch a random image. Please try again later.');
    }
}

// Show floating party emojis
function triggerPartyAnimation() {
    const emojiCount = 10;
    for (let i = 0; i < emojiCount; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'party-emoji';
        emoji.innerText = '🎉';
        emoji.style.left = `${Math.random() * 100}vw`;
        emoji.style.top = `${Math.random() * 20}vh`;
        document.body.appendChild(emoji);
        setTimeout(() => {
            emoji.remove();
        }, 2000);
    }
}

const surpriseQuotes = [
    "Believe you are capable of achieving your destiny and you're halfway there!!",
    "The only limit to our realization of tomorrow is our doubts of today!!",
    "Dream big and dare to fail!!",
    "Act as if what you do makes a difference. It does!!",
    "Success is not final, failure is not fatal: it is the courage to continue that counts!!",
    "Keep your face always toward the sunshine—and shadows will fall behind you!!",
    "You are braver than you believe, stronger than you seem, and smarter than you think!!",
    "Opportunities don't happen. You create them!!",
    "Hardships often prepare ordinary people for an extraordinary destiny!!",
    "Don't watch the clock; do what it does. Keep going!!"
];

// Get a random quote from the surprise list
function getRandomQuote() {
    return surpriseQuotes[Math.floor(Math.random() * surpriseQuotes.length)];
}

// Display random image in a modal
function displayRandomImage(image) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    const randomQuote = getRandomQuote();
    const modalContent = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <blockquote class="surprise-quote">${randomQuote}</blockquote>
            <img src="${image.largeImageURL}" class="modal-image">
            <div class="image-details">
                <h2>${image.tags}</h2>
                <p>Photo by: ${image.user}</p>
                <button id="favorite-button">Add to My Favourites</button>
            </div>
        </div>
    `;
    modal.innerHTML = modalContent;
    document.body.appendChild(modal);

    modal.querySelector('.close').addEventListener('click', () => {
        modal.style.display = 'none';
        modal.remove();
    });

    document.getElementById('favorite-button').addEventListener('click', () => {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (!favorites.includes(image.largeImageURL)) {
            favorites.push(image.largeImageURL);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert('Image added to favorites!');
        } else {
            alert('Image already in favorites!');
        }
    });
}

// Surprise Me button click
surpriseButton.addEventListener('click', () => {
    triggerPartyAnimation();
    fetchRandomHighRatedImage();
});
