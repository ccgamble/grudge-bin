describe('template', function(){
  var grudge, $subject;
  
  beforeEach(function(){
    var grudge = {id: 1, data: {name: 'Beth'}}
    var subject = template(grudge)
    var name = grudge.data.name
    var id = grudge.id
    $subject = $(subject)
  });

  it('generates list-item', function(){
    $subject.is('list-item')
  })
  
  it('generates link', function() {
    $subject.is('href')
  })

  it('contains name and id information', function(){
    var hasNameInSubjectText = $subject.text().indexOf(name) > 0
    expect(hasNameInSubjectText)
  })
})

describe('total count', function(){
  it('should return the total count', function() {
    var grudges = [{id: 1, data: {name: 'Beth'}}, {id: 2, data: {name: 'Alison'}}]
    expect(countTotal(grudges)).to.equal(2)
    
    grudges.push({id: 3, data: {name: 'Lindsay'}})
    expect(countTotal(grudges)).to.equal(3)
  })
})

describe ('filter unforgiven', function(){
  it('should filter the unforgiven grudges', function() {
    var grudges = [{id: 1, data: {name: 'Beth', forgiven: 'false'}}, {id: 2, data: {name: 'Alison', forgiven: 'false'}}]
    expect(filterUnforgiven(grudges).length).to.equal(2)
    
    grudges = [{id: 1, data: {name: 'Beth', forgiven: 'false'}}, {id: 2, data: {name: 'Alison', forgiven: 'true'}}]
    expect(filterUnforgiven(grudges).length).to.equal(1)
  })
})

describe ('filter forgiven', function(){
  it('should filter the forgiven grudges', function() {
    var grudges = [{id: 1, data: {name: 'Beth', forgiven: 'false'}}, {id: 2, data: {name: 'Alison', forgiven: 'false'}}]
    expect(filterForgiven(grudges).length).to.equal(0)
    
    grudges = [{id: 1, data: {name: 'Beth', forgiven: 'false'}}, {id: 2, data: {name: 'Alison', forgiven: 'true'}}]
    expect(filterForgiven(grudges).length).to.equal(1)
  })
})



