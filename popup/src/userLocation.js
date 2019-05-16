class UserLocation {

  constructor() {
    this.returnedData = {}
  }

  setLocation = () => {
    let that = this
    let promise = new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          resolve( that._setPosition(position) )
        },
        function(error) {
          resolve( that._showError(error) )
        },
      )
    })
    return promise
  }

  _setPosition = (position) => {
    return {'latitude': position.coords.latitude,
            'longitude': position.coords.longitude}
  }

  _showError = (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        return { error: "User denied the request for Geolocation." }
      case error.POSITION_UNAVAILABLE:
        return { error: "Location information is unavailable." }
      case error.TIMEOUT:
        return { error: "The request to get user location timed out." }
      case error.UNKNOWN_ERROR:
        return { error: "An unknown error occurred." }
    }
  }
}
