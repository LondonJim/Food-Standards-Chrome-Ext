class EstablishmentParse {

  constructor(establishmentData) {
    this.establishmentData = establishmentData
    this.originalEstablishmentData = establishmentData
    this.wave = 1
  }

  // 5 checks on the food agency api with various iterations of the data, unless a result is recorded
  parseWaves = () => {
    let parseWave
    let that = this
    if (this.wave === 1) {
      parseWave = this._parseOne
    } else if (this.wave === 2) {
      parseWave = this._parseTwo
    } else if (this.wave === 3) {
      parseWave = this._parseThree
    } else if (this.wave === 4) {
      parseWave = this._parseFour
    } else if (this.wave === 5) {
      parseWave = this._parseFive
    }
    parseWave()
      .then(function(result) {
        that._sendResult()
          .then(function(result) {
            that._checkResult(result)
          })
      })
  }

  _sendResult = () => {
    let establishments = new Establishments(undefined, this.establishmentData.name,
                                            this.establishmentData.longitude,
                                            this.establishmentData.latitude,
                                            this.establishmentData.address,
                                            this.establishmentData.postcode)
    return establishments.establishmentData()
  }

  _checkResult = (result) => {
    if (result.establishments && result.establishments.length) {
      console.log("OK TO PROCEED")
      console.log(result.establishments.length)
      console.log(result.establishments[0].BusinessName)
      console.log(result)
    } else {
      if (this.wave === 5) {
        console.log("NO ESTABLISHMENTS FOUND")
      } else {
        this.wave++
        this.parseWaves()
      }
    }
  }

  // removes postcode data and relies solely on lat and long
  _parseFive = () => {
    console.log("parse 5")
    let that = this
    let promise = new Promise(function(resolve, reject) {
      that.establishmentData.address = ""
      resolve(that.establishmentData)
    })
    return promise
  }

  // only first word in name used
  _parseFour = () => {
    console.log("parse 4")
    let that = this
    let promise = new Promise(function(resolve, reject) {
      that.establishmentData.name = that.establishmentData.name.split(' ')[0]
      resolve(that.establishmentData)
    })
    return promise
  }

  // halfs postcode (a few postcodes recorded incorrectly by either party)
  _parseThree = () => {
    console.log("parse 3")
    let that = this
    let promise = new Promise(function(resolve, reject) {
      that.establishmentData.address = that.establishmentData.address.split(' ')[0]
      resolve(that.establishmentData)
    })
    return promise
  }

  // removes all words except first two
  _parseTwo = () => {
    console.log("parse 2")
    let that = this
    let promise = new Promise(function(resolve, reject) {
      if (that.establishmentData.name.split(' ').length > 2) {
        that.establishmentData.name = that.establishmentData.name.split(' ').slice(0, 2).join(' ')
      }
      resolve(that.establishmentData)
    })
    return promise
  }

  // initial parse of all data
  _parseOne = () => {
    let that = this
    let promise = new Promise(function(resolve, reject) {
      that.establishmentData.name = that._nameParse(that.establishmentData.name)
      that.establishmentData.address = that._addressParse(that.establishmentData.address)
      that.establishmentData.postcode = that._postcodeParse(that.establishmentData.postcode)
      that._checkAddressPostcode()
      if (that.establishmentData.name.split(' ').length <= 2) { that.wave++ }
      resolve(that.establishmentData)
    })
    return promise
  }

  _checkAddressPostcode() {
    let postcodeRegEx = /[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i
    console.log(postcodeRegEx.test(this.establishmentData.address))
    if ((postcodeRegEx.test(this.establishmentData.address))) {
      this.establishmentData.address = this._postcodeParse(this.establishmentData.address)
    } else {
      if (!(/^\s*$/.test(this.establishmentData.postcode)) || !!this.establishmentData.postcode.trim()) {
        this.establishmentData.address = this.establishmentData.postcode
      }
    }
  }

  _nameParse = (name) => {
    if (name !== undefined) {
      name = name.replace(/\([^)]*\)/g, '')
      name = name.replace(/cafe|Cafe|Restaurant|restaurant| and |The /, '')
      if (name.split(" ")[0].length < 3 && name.split(" ").length > 1) {
        name = name.split(' ').slice(1).join(' ')
      }
      name = name.replace(/[`~!@#$%^&*()_|+\--=?;:'",.<>\{\}\[\]\\\/]/gi, '')
      name = name.replace(/\s+/g, ' ')
      name = name.replace(/(^[\s]+|[\s]+$)/g, '')
    }
    return name
  }

  _addressParse = (address) => {
    if (address !== undefined) {
      address = address.replace(/\([^)]*\)/g, '')
      address = address.replace(/(^[\s]+|[\s]+$)/g, '')
    }
    return address
  }

  _postcodeParse = (postcode) => {
    if (postcode === undefined) { postcode = "" }
    if (!(/^\s*$/.test(postcode)) || !!postcode.trim()) {
      if (!!postcode.match(/[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i)) {
        postcode = postcode.match(/[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i).shift()
      } else {
        postcode = ""
      }
    }
    return postcode
  }

}
