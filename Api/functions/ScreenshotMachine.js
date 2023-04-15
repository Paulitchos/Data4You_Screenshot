const { v4: uuidv4 } = require('uuid');

exports.ScreenshotMachine = async function(weburl){
    const screenshotmachine = require('screenshotmachine');
    const customerKey = process.env.REACT_APP_API_KEY;
        secretPhrase = ''; //leave secret phrase empty, if not needed
        options = {
        //mandatory parameter
        url : weburl,
        // all next parameters are optional, see our website screenshot API guide for more details
        dimension : '1920x1080', // or "1366xfull" for full length screenshot
        device : 'desktop',
        format: 'jpg',
        cacheLimit: '0',
        delay: '200',
        zoom: '100'
    }

    var apiUrl = screenshotmachine.generateScreenshotApiUrl(customerKey, secretPhrase, options);

    //put link to your html code
    //console.log('<img src="' + apiUrl + '">');

    //or save screenshot as an image
    const fs = require('fs');
    const output = `./photos/${uuidv4()}_${weburl}.jpg`;

    return new Promise((resolve, reject) => {
        screenshotmachine.readScreenshot(apiUrl).pipe(fs.createWriteStream(output).on('close', function() {
          //console.log('Screenshot saved as ' + output);
          resolve([apiUrl, output]);
        })).on('error', reject);
    });
}