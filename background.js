parseData = (data) => {
  return {
          name: data[0].name,
          latitude: data[0].geo.latitude,
          longitude: data[0].geo.longitude,
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
            parseData(formData[key])
          }
        });
      }
    }
  },
  {urls: ["https://*.facebook.com/*"]},
  ["requestBody"]
);
