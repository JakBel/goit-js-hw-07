import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => document.querySelectorAll(selector);

const galleryContainer = qs('.gallery');
const imagesContainer = galleryItems
    .map(item =>
        `<div class="gallery__item"> <a class="gallery__link" href="${item.original}"> <img class="gallery__image" src="${item.preview}" data-source="${item.original}" alt=${item.description}"/></a> </div>`)
    .join('');
galleryContainer.insertAdjacentHTML('beforeend', imagesContainer);

const keyClosing = (event, istance) => {
    if ('Escape' === event.key) {
        istance.close();
    }
};

const images = qsa('.gallery__item gallery__image');
images.forEach(image => {
    image.addEventListener('click', event => {
        event.preventDefault();

        const instance = basicLightbox.create(
            `<img src="${image.original}">`,
            {
                onClose: instance => {
                    galleryContainer.removeEventListener('keydown', event =>
                        keyClosing(event, instance));
                    return true;
                },
                onShow: instance => {
                    galleryContainer.addEventListener('keydown', event =>
                        keyClosing(event, instance));
                    return true;
                },
            }
        );

        if (event.target.src === image.preview) {
            instance.show();
        }
    });
});