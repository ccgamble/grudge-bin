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
  $('.display-name').text('')
  $('.grudge-items').html('')
  res.map(function(grudge) {
    $('.display-name').append(`<li><a href="/api/grudges/${grudge.id}" class="indvidual-name" id="${grudge.id}">${grudge.data.name}</a></li>`)
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

$(document).on('click', '.indvidual-name', (e) => {
  e.preventDefault()
  const id = e.target.id
  getIndividualData(id);
})

getIndividualData = (id) => {
  $.ajax({
    type: 'GET',
    url: `/api/grudges/${id}`
  }).then(function(res) {
    displayIndvidualInfo(res);
  })
}

displayIndvidualInfo = (res) => {
  $('.individual-name').text(res[0].data.name)
  $('.individual-description').text(res[0].data.description)
}