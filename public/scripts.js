$('.input-submit-btn').on('click', (e) => {
  e.preventDefault();
  postGrudge();
})

addGrudge = (data) => {
  $('.display-name').append(`<li>${data.grudge.data.name}</li>`)
}

postGrudge = () => {
  $.ajax({
    url: '/api/grudges',
    type: 'post',
    data: {
      name: $('.name-input').val(),
      description: $('.description-input').val(),
      date: $('.date-input').val(),
      forgiven: false
    },
    success: addGrudge
  })
}