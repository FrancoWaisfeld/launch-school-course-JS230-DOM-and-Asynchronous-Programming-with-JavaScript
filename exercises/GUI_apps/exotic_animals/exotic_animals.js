document.addEventListener('DOMContentLoaded', () => {
  let figures = document.querySelectorAll('figure');
  figures.forEach(figure => {
    let timerID;
    figure.addEventListener('mouseover', event => {
      let figcaption = event.currentTarget.querySelector('figcaption');
      timerID = setTimeout(() => {
        if (event.target.tagName = 'IMG') {
          figcaption.style.display = 'inline-block';
        }
      }, 2000);
    }, false);

    figure.addEventListener('mouseout', event => {
      if (timerID) {
        clearTimeout(timerID);
      }

      if (event.target.tagName = 'IMG') {
        event.currentTarget.querySelector('figcaption').style.display = 'none';
      }
    });
  });
});