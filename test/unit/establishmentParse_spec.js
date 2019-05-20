const rewire = require('rewire')
const sinon = require('sinon')

let establishmentParse = rewire('../../popup/src/establishmentParse.js')

EstablishmentParse = establishmentParse.__get__('EstablishmentParse')

describe('.EstablishmentParse', () => {

  describe('#parseWaves', () => {

    it('should return results', () => {

      let mockData = { name: "Test Name (Here)",
                       latitude: 32,
                       longitude: 92,
                       address: "123 Test Street (here)",
                       postcode: "TE3 TY1"}

      newEstablishmentParse = new EstablishmentParse(mockData)
      spyOn(newEstablishmentParse, '_sortParseWave')
      sinon.stub(newEstablishmentParse, '_parseOne')

      newEstablishmentParse.parseWaves()
      expect(newEstablishmentParse._sortParseWave.calls.mostRecent().args[0]).toEqual(newEstablishmentParse._parseOne)
    })
  })
})
