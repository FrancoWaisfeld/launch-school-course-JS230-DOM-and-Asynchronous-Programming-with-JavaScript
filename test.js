let ls = new Promise(resolve => {
  setTimeout(() => {
    resolve('Launch Schoool');
  }, 2000)
});

ls.then(response => {
  console.log(response);
});