class Controller {

  constructor (userLocation = new UserLocation()) {
    this.userLocation = userLocation
    this.restaurantData = []
    this.userCoords = {}
  }

  execute() {
    let establishments
    this.userLocation.setLocation()
      .then(function(result) {
        console.log(result)
        establishments = new Establishments(undefined, "Cafe Rose",
                                            result.longitude, result.latitude)
        return establishments.establishmentData()
      })
      .then(function(result) {
        console.log(result.establishments)
      })
  }
}
