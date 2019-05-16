class Establishments {

  constructor(baseUrl = "http://api.ratings.food.gov.uk/Establishments?",
              name, longitude, latitude, maxDistanceLimit = 5) {
    this.baseUrl = baseUrl
    this.name = name
    this.longitude = longitude
    this.latitude = latitude
    this.maxDistanceLimit = maxDistanceLimit
    this.establishmentInfo = {}
    this.url = ""
  }

  establishmentData = () => {
    this._createUrl()
    return fetch(this.url, {
      headers: { 'x-api-version': '2' }
    })
    .then(results => this.establishmentInfo = results.json())
  }

  _createUrl = () => {
    this.url = this.baseUrl
               + "name=" + this.name
               + "&longitude=" + this.longitude
               + "&latitude=" + this.latitude
               + "&maxDistanceLimit=" + this.maxDistanceLimit
  }

}
