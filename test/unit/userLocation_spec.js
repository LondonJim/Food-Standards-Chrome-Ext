const rewire = require('rewire')

let mockNavigator = rewire('../helpers/mockNavigator.js')
let userLocation = rewire('../../popup/src/userLocation.js')

MockNavigator = mockNavigator.__get__('MockNavigator')
UserLocation = userLocation.__get__('UserLocation')

describe('#setLocation', () => {

  beforeEach(() => {
    navigator = new MockNavigator
  })

  it('should return results', () => {
    spyOn(navigator.geolocation,"getCurrentPosition").and.stub()
    userLocation = new UserLocation()
    
    expect(userLocation.setLocation()).toEqual({})
  })
})
