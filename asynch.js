function delayLog() {
  const seconds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  seconds.forEach(second => {
    const secondOrSeconds = second === 1 ? 'second' : 'seconds';
    const miliseconds = second * 1000;

    setTimeout(() => {
      console.log(`${second} ${secondOrSeconds} later`);
    }, miliseconds);
  });
}

delayLog();