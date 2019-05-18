class Controller {

  constructor () {
    this.establishmentData
  }

  execute() {
    chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    	if (!!message.name) {
        console.log(message)
        this.establishmentData = message

      }
    })

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.update(tabs[0].id, {url: tabs[0].url})
    })
  }

}
