class Controller {

  constructor () {
    this.establishmentData
  }

  execute = () => {
    let that = this
    chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    	if (!!message.name) {
        that.establishmentData = message
        that._parseEstablishmentData()
      }
    })

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.update(tabs[0].id, {url: tabs[0].url})
    })
  }

  _parseEstablishmentData = () => {
    let establishmentParse = new EstablishmentParse(this.establishmentData)
    establishmentParse.parseWaves()
  }
}
