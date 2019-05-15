const rewire = require('rewire')

let mockNavigator = rewire('../helpers/mockNavigator.js')
let getUserLocation = rewire('../../popup/src/getUserLocation.js')

MockNavigator = mockNavigator.__get__('MockNavigator')
GetUserLocation = getUserLocation.__get__('GetUserLocation')

describe('.GetUserLocation', () => {

  beforeEach(() => {
    navigator = new MockNavigator
  })

  describe('#getLocation', () => {
    it('should return results', () => {
      spyOn(navigator.geolocation,"getCurrentPosition")
        .and.callFake(function() {
          let position = { coords: { latitude: 32, longitude: -96 } };
          arguments[0](position)
        })
      getUserLocation = new GetUserLocation()
      getUserLocation.getLocation()
      expect(getUserLocation.getCoordinates()).toEqual({ 'latitude': 32,
                                                         'longitude': -96 })
    })

    describe('#getLocation', () => {
      it('should return error', () => {
        let error = { code: true, PERMISSION_DENIED: true }
        spyOn(navigator.geolocation,"getCurrentPosition")
          .and.callFake(function() { arguments[1](error) })
        getUserLocation = new GetUserLocation()
        getUserLocation.getLocation()
        expect(getUserLocation.getErrorMessage()).toEqual("User denied the request for Geolocation.")
      })

      it('should return error', () => {
        let error = { code: true, POSITION_UNAVAILABLE: true }
        spyOn(navigator.geolocation,"getCurrentPosition")
          .and.callFake(function() { arguments[1](error) })
        getUserLocation = new GetUserLocation()
        getUserLocation.getLocation()
        expect(getUserLocation.getErrorMessage()).toEqual("Location information is unavailable.")
      })

      it('should return error', () => {
        let error = { code: true, TIMEOUT: true }
        spyOn(navigator.geolocation,"getCurrentPosition")
          .and.callFake(function() { arguments[1](error) })
        getUserLocation = new GetUserLocation()
        getUserLocation.getLocation()
        expect(getUserLocation.getErrorMessage()).toEqual("The request to get user location timed out.")
      })

      it('should return error', () => {
        let error = { code: true, UNKNOWN_ERROR: true }
        spyOn(navigator.geolocation,"getCurrentPosition")
          .and.callFake(function() { arguments[1](error) })
        getUserLocation = new GetUserLocation()
        getUserLocation.getLocation()
        expect(getUserLocation.getErrorMessage()).toEqual("An unknown error occurred.")
      })
    })
  })
})
