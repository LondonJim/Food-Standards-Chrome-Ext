const rewire = require('rewire')

let establishmentParse = rewire('../../popup/src/establishmentParse.js')

EstablishmentParse = establishmentParse.__get__('EstablishmentParse')

describe('.EstablishmentParse', () => {

  describe('#establishmentParse', () => {

    it('should return results', (done) => {
      let mockData = { name: "Test Name (Here)",
                       latitude: 32,
                       longitude: 92,
                       address: "123 Test Street (here)",
                       postcode: "TE3 TY1"}
      establishmentParse = new EstablishmentParse(mockData)

      establishmentParse.parseWaves().then(function (result) {
        expect(result).toEqual({ name: "Test Name",
                                 latitude: 32,
                                 longitude: 92,
                                 address: "123 Test Street",
                                 postcode: "TE3"})
        done()
      })
    })
  })
})
