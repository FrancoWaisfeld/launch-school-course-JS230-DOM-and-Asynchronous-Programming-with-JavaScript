document.addEventListener('DOMContentLoaded', () => {
  let displayImage = document.querySelector('#display_image');
  let thumbnails = document.querySelectorAll('.thumbnail')
  let defaultThumbnail = thumbnails[0];
  let previousThumbnail = defaultThumbnail;

  function fadeIn(element) {
    return new Promise((resolve, reject) => {
      let opacity = 0;
      let timer = setInterval(() => {
        if (opacity >= 0.99) {
          clearInterval(timer);
          resolve();
        }

        opacity = opacity + 0.01;
        element.style.opacity = opacity;
      }, 5);
    })
  }

  function fadeOut(element) {
    return new Promise((resolve, reject) => {
      let opacity = 1;
      let timer = setInterval(() => {
        if (opacity <= 0.01) {
          clearInterval(timer);
          resolve();
        }
        opacity = opacity - 0.01;
        element.style.opacity = opacity;
      }, 5);
    })
  }

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', event => {
      previousThumbnail.classList.replace('active', 'hidden');
      thumbnail.classList.replace('hidden', 'active');  

      (async () => {
        await fadeOut(displayImage);
        displayImage.src = thumbnail.src;
        await fadeIn(displayImage);
      })();

      previousThumbnail = thumbnail;
   })
  })
});