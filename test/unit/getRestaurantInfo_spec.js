const rewire = require('rewire')
const fetchMock = require('fetch-mock')
fetch = require('node-fetch')

fetchMock.get('*', {establishments: 'data'});

let getRestaurantInfo = rewire('../../popup/src/getRestaurantInfo.js')

GetRestaurantInfo = getRestaurantInfo.__get__('GetRestaurantInfo')

describe('.GetRestaurantInfo', () => {


  describe('#restaurantData', () => {

    it('should return results', (done) => {
      getRestaurantInfo = new GetRestaurantInfo('https://test-url/','')
      getRestaurantInfo.restaurantData().then(function (results) {
        expect(results).toEqual({establishments: 'data'})
        done()
      })
    })

  })
})
