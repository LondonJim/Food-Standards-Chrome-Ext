class Establishments {

  constructor(baseUrl = "http://api.ratings.food.gov.uk/Establishments?",
              name, longitude, latitude, address, postcode, maxDistanceLimit = 1) {
    this.baseUrl = baseUrl
    this.name = name
    this.longitude = longitude
    this.latitude = latitude
    this.address = address
    this.postcode = postcode
    this.maxDistanceLimit = maxDistanceLimit
    this.establishmentInfo = {}
    this.url = ""
  }

  establishmentData = () => {
    this._createUrl()
    return fetch(this.url, {
      headers: { 'x-api-version': '2' }
    })
    .then(results => results.json())
  }

  _createUrl = () => {
    this.url = this.baseUrl
               + "name=" + this.name
               + "&address=" + this.address
               + "&longitude=" + this.longitude
               + "&latitude=" + this.latitude
               + "&maxDistanceLimit=" + this.maxDistanceLimit
    console.log(this.url)
  }

}
