const rewire = require('rewire')
const sinon = require('sinon')
const fetchMock = require('fetch-mock')
fetch = require('node-fetch')

fetchMock.get('*', { establishments: { BusinessName: "Test" } }, { overwriteRoutes: false });

let establishments = rewire('../../popup/src/establishments.js')
let establishmentParse = rewire('../../popup/src/establishmentParse.js')

Establishments = establishments.__get__('Establishments')
EstablishmentParse = establishmentParse.__get__('EstablishmentParse')

describe('.EstablishmentParse', () => {

  describe('#parseWaves', () => {

    it('should return results', () => {

      let mockData = { name: "Test Name (Here)",
                       latitude: 32,
                       longitude: 92,
                       address: "Test Street (here)",
                       postcode: "TE3 TY1"}

      newEstablishmentParse = new EstablishmentParse(mockData)
      newEstablishmentParse.parseWaves()
      expect(newEstablishmentParse.establishmentData).toEqual({ name: "Test Name",
                                                                latitude: 32,
                                                                longitude: 92,
                                                                address: "Test Street",
                                                                postcode: ""})
      expect(newEstablishmentParse.wave).toEqual(2)
    })
  })
})
