class EstablishmentParse {

  constructor(establishmentData) {
    this.establishmentData = establishmentData
  }

  parse = () => {
    let that = this
    let promise = new Promise(function(resolve, reject) {
      let establishmentDataParsed = { name: that._stringParse(that.establishmentData.name),
                                      latitude: that.establishmentData.latitude,
                                      longitude: that.establishmentData.longitude,
                                      address: that._stringParse(that.establishmentData.address),
                                      postcode : that._postcodeParse() }

      resolve(establishmentDataParsed)
    })
    return promise
  }

  _stringParse = (str) => {
    str = str.replace(/\([^)]*\)/g, '')
    str = str.replace(/(^[\s]+|[\s]+$)/g, '')
    return str
  }

  _postcodeParse = () => {
    let postcode = this.establishmentData.postcode
    postcode = postcode.replace(/ .*/,'')
    return postcode
  }

}
