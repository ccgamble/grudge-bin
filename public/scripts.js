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
  res.map(function(grudge) {
    $('.display-name').append(`
      <li><a
      href="/api/grudges/${grudge.id}" class="indvidual-name" id="${grudge.id}">
      ${grudge.data.name}
      </a></li>`)
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
  let id = res[0].id
  $('.individual-name').text(res[0].data.name);
  $('.individual-description').text(res[0].data.description);
  $('.toggle-forgive').html(`
    <input class="forgive-btn" id=${id} type="button" value="toggle forgive">`)
}

$(document).on('click', '.forgive-btn', (e) => {
  e.preventDefault()
  let id = e.target.id
  updateForgiveness(id)
})

updateForgiveness = (id) => {
  $.get(`/api/grudges/${id}`, function(res) {
    $.ajax({
      type: 'PUT',
      url: `/api/grudges/${id}`,
      data: {
        name: res[0].data.name,
        description: res[0].data.description,
        date: res[0].data.date,
        forgiven: toggleForgive(res[0].data)
      }
    }).then(function(data) {
      getGrudges()
    })
  })
}

toggleForgive = (data) => {
  if (data.forgiven === "false") {
    return true
  }
  if (data.forgiven === "true") {
    return false
  }
}
