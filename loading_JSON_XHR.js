document.addEventListener('DOMContentLoaded', event => {
  let request = new XMLHttpRequest();
  request.open('GET', 'hts://api.github.com/repos/rails/rails');
  request.responseType = 'json';

  request.addEventListener('loadl', event => {
    if (request.response) {
      console.log(request.status);
      console.log(object.open_issues);
    } else {
      console.log('The request could not be completed!');
    }
  });

  request.send();
});
