setTimeout(() => {  // 1
  setTimeout(() => { // 6
    // q(); // 12
  }, 15);

  // d(); // 7

  setTimeout(() => { // 8
    // n(); // 10
  }, 5);

  // z(); // 9
}, 10);

setTimeout(() => { // 2
  // s(); // 11
}, 20);

setTimeout(() => { // 3
  // f(); // 4
});

// g(); // 5

// f g d z n s q