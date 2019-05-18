let sortedData = {}

parseData = (data) => {
  sortedData = {
                name: data[0].name,
                latitude: data[0].geo.latitude,
                longitude: data[0].geo.longitude,
                address: data[0].address.streetAddress,
                postcode: data[0].address.postalCode
               }
}

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if(details.method == "POST") {
      let formData = details.requestBody.formData;
      if(formData) {
        Object.keys(formData).forEach(key => {
          if (key == "cd[JSON-LD]") {
            let data = JSON.parse(formData[key][0])
            parseData(data)
            chrome.runtime.sendMessage(sortedData)
          }
        })
      }
    }
  },
  {urls: ["https://*.facebook.com/*"]},
  ["requestBody"]
)
