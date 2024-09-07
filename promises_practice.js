let promise = new Promise(((resolve) => {
  setTimeout(() => {
    resolve('Launch School');
  }, 2000);
}));

promise.then((value) => {
  console.log(value);
})

let rejectPromise = new Promise(((resolve, reject) => {
  setTimeout(() => {
    reject('Error: Not Launch School');
  }, 2000);
}));

rejectPromise.catch((value => {
  console.log(value);
}));