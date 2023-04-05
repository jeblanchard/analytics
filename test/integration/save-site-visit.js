const http = require("http");

const successCallback = (res) => {
    const {statusCode, statusMsg} = res
    if (statusCode !== 200) {
        const failureMsg =
            `Test failed.\nGot a bad response code: ${statusCode}\nmessage: ${statusMsg}`
        console.error(failureMsg)
    } else {
        console.log('Got a 200 status code. Test passed.')
    }
}

http.get('http://localhost:3000/', successCallback)

