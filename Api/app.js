const express = require('express');
const cors = require('cors');
const { ScreenshotMachine } = require('./functions/ScreenshotMachine');
const app = express();
require('dotenv').config();
const path = require('path')
const { UploadFile, LinkFile } = require('./functions/Upload_Link_File');

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=> {
    res.end('hello from server')
})

app.get('/screenshot', async (req, res) => {
    const url = req.query.url;
    console.log("Received request for URL:", url);
    ScreenshotMachine(url)
    .then(([screenshotUrl,fileName]) => {
        const filePath = path.join(__dirname,fileName);
        fileId = UploadFile(fileName,filePath);
        res.send(screenshotUrl);
        console.log(fileId)
        res.end();
    })
    .catch(error => {
    console.error(error);
    });
    
    
});


app.listen(3001, () => {
    console.log('server is running in port 3001')
})
