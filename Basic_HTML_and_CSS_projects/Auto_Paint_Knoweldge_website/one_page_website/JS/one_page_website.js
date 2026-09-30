// Find the gallery images and lightbox elements.
const galleryImages = document.querySelectorAll("#gallery > img");
const lightbox = document.getElementById("lightbox");
const enlargedImage = document.getElementById("lightbox-image");
const caption = document.getElementById("lightbox-caption");
const imageCount = document.getElementById("lightbox-count");
const closeButton = document.getElementById("lightbox-close");
const previousButton = document.getElementById("lightbox-prev");
const nextButton = document.getElementById("lightbox-next");

// Track the image currently displayed.
let currentIndex = 0;

// Display an image and wrap around at either end of the gallery.
function showImage(index) {
    currentIndex =
        (index + galleryImages.length) % galleryImages.length;

    const selectedImage = galleryImages[currentIndex];

    enlargedImage.src =
        selectedImage.dataset.full || selectedImage.src;

    enlargedImage.alt = selectedImage.alt;
    caption.textContent = selectedImage.alt;
    imageCount.textContent =
        `${currentIndex + 1} of ${galleryImages.length}`;
}

// Open the lightbox with the selected image.
function openLightbox(index) {
    showImage(index);
    lightbox.showModal();
}

// Allow each thumbnail to open with a click, Enter, or Space.
galleryImages.forEach(function (image, index) {
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-haspopup", "dialog");
    image.setAttribute("aria-label", "Enlarge: " + image.alt);

    image.addEventListener("click", function () {
        openLightbox(index);
    });

    image.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openLightbox(index);
        }
    });
});

// Close the lightbox.
closeButton.addEventListener("click", function () {
    lightbox.close();
});

// Show the previous or next image.
previousButton.addEventListener("click", function () {
    showImage(currentIndex - 1);
});

nextButton.addEventListener("click", function () {
    showImage(currentIndex + 1);
});

// Support keyboard navigation.
// The dialog automatically supports Escape to close.
lightbox.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        event.preventDefault();
        showImage(currentIndex - 1);
    } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showImage(currentIndex + 1);
    }
});

