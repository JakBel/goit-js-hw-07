import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const qs = (selector) => document.querySelector(selector);
const galleryContainer = qs('.gallery');
console.log(galleryContainer);

const photoContainer = galleryItems
  .map(
    item =>
      `<div class="gallery__item"> <a class="gallery__link" href="${item.original}"> <img class="gallery__image" src="${item.preview}" data-source="${item.original}" alt="${item.description}"/></a> </div>`
  )
  .join('');
galleryContainer.insertAdjacentHTML('beforeend', photoContainer);
console.log(photoContainer);

const keyClosing = (event, instance) => {
  if ('Escape' === event.key) {
    instance.close();
  }
  console.log(event.key);
};

const qsa = (selector) => document.querySelectorAll(selector);
const images = qsa('.gallery__item .gallery__image');
console.log(images);
images.forEach(image => {
  image.addEventListener('click', event => {
    event.preventDefault();

    basicLightbox
      .create(
        `<img width="1400" height="900" src="${image.dataset.source}" loading="lazy" alt="${image.alt}">`,
        {
          onClose: instance => {
            galleryContainer.removeEventListener('keydown', event =>
              keyClosing(event, instance)
            );
            return true;
          },
          onShow: instance => {
            galleryContainer.addEventListener('keydown', event =>
              keyClosing(event, instance)
            );
            return true;
          },
        }
      )
      .show();
  });
});
