const rewire = require('rewire')

let mockNavigator = rewire('../helpers/mockNavigator.js')
let userLocation = rewire('../../popup/src/userLocation.js')

MockNavigator = mockNavigator.__get__('MockNavigator')
UserLocation = userLocation.__get__('UserLocation')

describe('#setLocation', () => {

  it('should return results', () => {
    navigator = new MockNavigator
    const promiseData = {test: "test"}
    spyOn(navigator.geolocation,"getCurrentPosition").and.returnValue(Promise.resolve(promiseData))
    userLocation = new UserLocation()

    userLocation.setLocation()
      .then((result) => {
        expect(result).toEqual({test: "test"})
      })
  })
})
