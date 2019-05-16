const rewire = require('rewire')

let mockNavigator = rewire('../helpers/mockNavigator.js')
let userLocation = rewire('../../popup/src/userLocation.js')

MockNavigator = mockNavigator.__get__('MockNavigator')
UserLocation = userLocation.__get__('UserLocation')

describe('setLocation in .UserLocation calling', () => {

  beforeEach(() => {
    navigator = new MockNavigator
  })

  describe('_setLocation returning results', () => {
    it('should return results', () => {
      spyOn(navigator.geolocation,"getCurrentPosition")
        .and.callFake(function() {
          let position = { coords: { latitude: 32, longitude: -96 } };
          arguments[0](position)
        })
      userLocation = new UserLocation()

      expect(userLocation.setLocation()).toEqual({ 'latitude': 32,
                                                   'longitude': -96 })
    })

    // Second describe used below because I needed to reset the spyOn but
    // jasmine doesn't let you in the same describe block
    describe('_showError return results', () => {
      it('should return PERMISSION_DENIED error', () => {
        let error = { code: true, PERMISSION_DENIED: true }
        spyOn(navigator.geolocation,"getCurrentPosition")
          .and.callFake(function() { arguments[1](error) })
        userLocation = new UserLocation()

        expect(userLocation.setLocation())
          .toEqual({ error: "User denied the request for Geolocation." })
      })

      it('should return POSITION_UNAVAILABLE error', () => {
        let error = { code: true, POSITION_UNAVAILABLE: true }
        spyOn(navigator.geolocation,"getCurrentPosition")
          .and.callFake(function() { arguments[1](error) })
        userLocation = new UserLocation()

        expect(userLocation.setLocation())
          .toEqual({ error: "Location information is unavailable." })
      })

      it('should return TIMEOUT error', () => {
        let error = { code: true, TIMEOUT: true }
        spyOn(navigator.geolocation,"getCurrentPosition")
          .and.callFake(function() { arguments[1](error) })
        userLocation = new UserLocation()

        expect(userLocation.setLocation())
          .toEqual({ error: "The request to get user location timed out." })
      })

      it('should return UNKNOWN_ERROR error', () => {
        let error = { code: true, UNKNOWN_ERROR: true }
        spyOn(navigator.geolocation,"getCurrentPosition")
          .and.callFake(function() { arguments[1](error) })
        userLocation = new UserLocation()

        expect(userLocation.setLocation())
          .toEqual({ error: "An unknown error occurred." })
      })
    })
  })
})
