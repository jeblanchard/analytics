const http = require("http");
const {saveToLocalStorage} = require("../../storage/data-lake/clients/local-storage");
const {access, rm} = require("node:fs/promises");

const successCallback = (res) => {
    const {statusCode, statusMessage} = res
    if (statusCode !== 200) {
        const failureMsg =
            `Test failed.\nGot a bad response code: ${statusCode}\nmessage: ${statusMessage}`
        console.error(failureMsg)
    } else {
        console.log('Got a 200 status code. Test passed.')
    }

}

http.get('http://localhost:3000/', successCallback)
