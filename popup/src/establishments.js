class Establishments {

  constructor(url = "http://api.ratings.food.gov.uk/Establishments?name=Cafe Rose&longitude=-0.124193&latitude=51.411579&maxDistanceLimit=5") {
    this.url = url
    this.establishmentInfo = {}
  }

  establishmentData = () => {
    return fetch(this.url, {
      headers: { 'x-api-version': '2' }
    })
    .then(results => this.establishmentInfo = results.json())
  }

}
