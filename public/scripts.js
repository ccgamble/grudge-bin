$('.input-submit-btn').on('click', (e) => {
  e.preventDefault();
  postGrudge();
})

addGrudge = (data) => {
  $('.grudge-display').append(`
    <ul>
      <li>Name: ${data.grudge.data.name}</li>
      <li>Offense: ${data.grudge.data.description}</li>
      <li>Date: ${data.grudge.data.date}</li>
      <li>Forgiven: ${data.grudge.data.forgiven}</li>
    </ul>
    `)
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