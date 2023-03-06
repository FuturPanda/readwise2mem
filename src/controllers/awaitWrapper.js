const awaitWrapper = (promise) => {
  return Promise.allSettled([promise]).then(function ([{ value, reason }]) {
    return [value, reason];
  });
};
export default awaitWrapper;
