document.addEventListener('DOMContentLoaded', event => {
  const templates = {};
  let photos;
  let currentPhotoId;

  document.querySelectorAll('script[type="text/x-handlebars"]').forEach(template => {
    templates[template["id"]] = Handlebars.compile(template['innerHTML']);
  });

  document.querySelectorAll('[data-type=partial]').forEach(template => {
    Handlebars.registerPartial(template['id'], template['innerHTML']);
  });

  fetch('photos')
  .then(response => response.json())
  .then(json => {
    photos = json;
    renderPhotos();
    currentPhotoId = photos[0].id;
    renderPhotoInformation(currentPhotoId);
    getCommentsFor(currentPhotoId);
  })

  function renderPhotos() {
    let slides = document.querySelector('#slides');
    slides.insertAdjacentHTML('beforeend', templates.photos({photos: photos }));
  }

  function renderPhotoInformation(idx) {
    let photo = photos.filter(item => {
      return item.id === idx;
    })[0];

    let header = document.querySelector('section > header');
    header.innerHTML = templates.photo_information(photo);
  }

  function getCommentsFor(id) {
    fetch(`comments?photo_id=${id}`)
    .then(response => response.json())
    .then(comments => {
      let commentsList = document.querySelector('#comments ul')
      commentsList.innerHTML = templates.photo_comments({comments: comments});
    });
  }

  function getNextPhotoID(currentID) {
    if (currentID >= photos.length) {
      return 1;
    }

    return currentID + 1;
  }

  function getPreviousPhotoID(currentID) {
    if (currentID === 1) {
      return photos.length;
    }

    return currentID - 1;
  }

  document.querySelector('a.next').addEventListener('click', event => {
    event.preventDefault();

    document.querySelector(`[data-id="${currentPhotoId}"]`).classList.add('hide');
    document.querySelector(`[data-id="${currentPhotoId}"]`).classList.remove('show');

    currentPhotoId = getNextPhotoID(currentPhotoId);

    document.querySelector(`[data-id="${currentPhotoId}"]`).classList.add('show');
    document.querySelector(`[data-id="${currentPhotoId}"]`).classList.remove('hide');

    renderPhotoInformation(currentPhotoId);
    getCommentsFor(currentPhotoId);
  });

  document.querySelector('a.prev').addEventListener('click', event => {
    event.preventDefault();

    document.querySelector(`[data-id="${currentPhotoId}"]`).classList.add('hide');
    document.querySelector(`[data-id="${currentPhotoId}"]`).classList.remove('show');

    currentPhotoId = getPreviousPhotoID(currentPhotoId);

    document.querySelector(`[data-id="${currentPhotoId}"]`).classList.add('show');
    document.querySelector(`[data-id="${currentPhotoId}"]`).classList.remove('hide');

    renderPhotoInformation(currentPhotoId);
    getCommentsFor(currentPhotoId);
  });

  document.querySelector('section > header').addEventListener('click', event => {
    event.preventDefault();

    let button = event.target;

    if (button.tagName === 'A') {
      let href = button.getAttribute('href');
      let text = button.textContent;

      fetch(href, {
        method:'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `photo_id=${currentPhotoId}`,
      })
      .then(response => response.json())
      .then(json => {
        button.textContet = text.replace(/\d+/, json.total);
        fetch("/photos")
        .then(response => response.json())
        .then(json => {
          photos = json
          renderPhotoInformation(currentPhotoId);
        });
      });
    }
  });

  document.querySelector('form[action="/comments/new"]').addEventListener('submit', event => {
    event.preventDefault();
    let form = event.target;
    let href = form.getAttribute("action");
    let method = form.getAttribute("method");
    let data = new FormData(form);
    data.set('photo_id', currentPhotoId);

    fetch(href, {
      method: method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: new URLSearchParams([...data])
    })
    .then(response => response.json())
    .then(json => {
      let commentList = document.querySelector('#comments ul');
      commentList.insertAdjacentHTML('beforeend', templates.photo_comments(json));
      form.reset();
      getCommentsFor(currentPhotoId);
    });
  });
});

