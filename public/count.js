countTotal = (grudges) => {
  return grudges.length
};

filterUnforgiven = (grudges) => {
  return grudges.filter(function(grudge) {
    return grudge.data.forgiven === 'false'
  });
}

filterForgiven = (grudges) => {
  return grudges.filter(function(grudge) {
    return grudge.data.forgiven === 'true'
  });
}