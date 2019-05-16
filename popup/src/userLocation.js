class UserLocation {

  constructor() {
    this.coordinates = {}
    this.errorMessage = ""
  }

  getLocation = () => {
   navigator.geolocation.getCurrentPosition(this.setPosition, this.showError)
  }

  setPosition = (position) => {
    this.coordinates = {'latitude': position.coords.latitude,
                        'longitude': position.coords.longitude}
  }

  showError = (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        this.errorMessage = "User denied the request for Geolocation."
        break;
      case error.POSITION_UNAVAILABLE:
        this.errorMessage = "Location information is unavailable."
        break;
      case error.TIMEOUT:
        this.errorMessage = "The request to get user location timed out."
        break;
      case error.UNKNOWN_ERROR:
        this.errorMessage = "An unknown error occurred."
        break;
    }
  }

  getCoordinates = () => {
    return this.coordinates
  }

  getErrorMessage = () => {
    return this.errorMessage
  }

}
