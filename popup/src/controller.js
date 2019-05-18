class Controller {

  constructor () {
    this.establishmentData
  }

  execute() {
    chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    	if (!!message.name) {
        console.log(message)
        this.establishmentData = message
        EstablishmentParse.parse(this.establishmentData)
          .then(function(result) {
            this.getEstablishmentData()
              .then(function(result) {
                console.log(result)
              })
          })
      }
    })

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.update(tabs[0].id, {url: tabs[0].url})
    })
  }

  getEstablishmentData = () => {
    establishments = new Establishments(undefined, this.establishmentData.name,
                                        this.establishmentData.longitude,
                                        this.establishmentData.latitude,
                                        this.establishmentData.address,
                                        this.establishmentData.postcode)
    return establishments.establishmentData()
  }
}
