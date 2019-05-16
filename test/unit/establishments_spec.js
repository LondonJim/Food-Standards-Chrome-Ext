const rewire = require('rewire')
const fetchMock = require('fetch-mock')
fetch = require('node-fetch')

fetchMock.get('*', {establishments: 'data'});

let establishments = rewire('../../popup/src/establishments.js')

Establishments = establishments.__get__('Establishments')

describe('.GetRestaurantInfo', () => {


  describe('#establishmentData', () => {

    it('should return results', (done) => {
      establishments = new Establishments('https://test-url/','')
      establishments.establishmentData().then(function (results) {
        expect(results).toEqual({establishments: 'data'})
        done()
      })
    })

  })
})
