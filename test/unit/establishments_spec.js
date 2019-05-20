const rewire = require('rewire')
const sinon = require('sinon')
const fetchMock = require('fetch-mock')
fetch = require('node-fetch')

fetchMock.get('*', { establishments: 'data' }, { overwriteRoutes: false });

let establishments = rewire('../../popup/src/establishments.js')

Establishments = establishments.__get__('Establishments')

describe('.Establishments', () => {

  describe('#establishmentData', () => {

    it('should return results', (done) => {
      establishments = new Establishments(undefined,'testName', 32, 96)
      establishments.url = "http://mock-api-site"
      sinon.stub(establishments, '_createUrl')

      establishments.establishmentData().then(function (results) {
        expect(results).toEqual({ establishments: 'data' })
        done()
      })
    })

  })
})
