$(document).ready(function() {
  getGrudges();
});

$('.input-submit-btn').on('click', (e) => {
  e.preventDefault();
  postGrudge();
  getGrudges();
})

postGrudge = () => {
  $.ajax({
    url: '/api/grudges',
    type: 'POST',
    data: {
      name: $('.name-input').val(),
      description: $('.description-input').val(),
      date: $('.date-input').val(),
      forgiven: false
    }
  })
}

getGrudges = () => {
  $.ajax({
    type: 'GET',
    url: '/api/grudges'
  }).then(function(res) {
    addNames(res)
    countTotal(res);
    countUnforgiven(res);
    countForgiven(res);
  })
}

addNames = (res) => {
  res.map(function(grudge) {
    $('.display-name').append(`<li>${grudge.data.name}</li>`)
  })
}

countTotal = (res) => {
  $('.total-count').text(res.length)
}

countUnforgiven = (res) => {
  let unforgiven = res.filter(function(grudge) {
    return grudge.data.forgiven === 'false'
  })
  return $('.unforgiven-count').text(unforgiven.length)  
}

countForgiven = (res) => {
  let forgiven = res.filter(function(grudge) {
    return grudge.data.forgiven === 'true'
  })
  return $('.forgiven-count').text(forgiven.length)  
}