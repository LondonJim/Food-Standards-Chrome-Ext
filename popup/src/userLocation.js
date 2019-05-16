class UserLocation {

  constructor() {
    this.returnedData = {}
  }

  setLocation = () => {
   navigator.geolocation.getCurrentPosition(this._setPosition, this._showError)
   return this.returnedData
  }

  _setPosition = (position) => {
    this.returnedData = {'latitude': position.coords.latitude,
                         'longitude': position.coords.longitude}
  }

  _showError = (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        this.returnedData = { error: "User denied the request for Geolocation." }
        break;
      case error.POSITION_UNAVAILABLE:
        this.returnedData = { error: "Location information is unavailable." }
        break;
      case error.TIMEOUT:
        this.returnedData = { error: "The request to get user location timed out." }
        break;
      case error.UNKNOWN_ERROR:
        this.returnedData = { error: "An unknown error occurred." }
        break;
    }
  }
}
