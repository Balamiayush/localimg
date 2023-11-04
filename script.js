const fileInput = document.getElementById('fileInput');
const imageGallery = document.getElementById('imageGallery');

// Load previously uploaded images from local storage
const storedImages = JSON.parse(localStorage.getItem('uploadedImages')) || [];

// Function to update local storage with the current gallery of images
function updateLocalStorage() {
    const images = Array.from(imageGallery.querySelectorAll('.image-container img')).map(img => img.src);
    localStorage.setItem('uploadedImages', JSON.stringify(images));
}

// Function to add a new image to the gallery and local storage
function addImageToGallery(imageSrc) {
    const img = new Image();
    img.src = imageSrc;

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    img.onload = function () {
        // Define the maximum width and height in pixels for each image
        const maxWidth = 400;
        const maxHeight = 400;

        // Calculate the new dimensions while maintaining the aspect ratio
        let newWidth, newHeight;
        if (img.width > img.height) {
            newWidth = maxWidth;
            newHeight = (img.height / img.width) * maxWidth;
        } else {
            newHeight = maxHeight;
            newWidth = (img.width / img.height) * maxHeight;
        }

        img.style.maxWidth = newWidth + 'px';
        img.style.maxHeight = newHeight + 'px';

        imageContainer.appendChild(img);
        imageGallery.appendChild(imageContainer);

        // Save the updated gallery in local storage
        updateLocalStorage();
    };
}

// Add previously uploaded images to the gallery
if (storedImages.length > 0) {
    for (const imageSrc of storedImages) {
        addImageToGallery(imageSrc);
    }
}

fileInput.addEventListener('change', function () {
    const files = fileInput.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const imageSrc = e.target.result;
                addImageToGallery(imageSrc);
            };

            reader.readAsDataURL(file);
        }
    }

    // Clear the file input to allow multiple uploads
    fileInput.value = '';
});
