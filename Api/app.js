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
    try {
        const [screenshotUrl, fileName] = await ScreenshotMachine(url);
        console.log(screenshotUrl)
        const filePath = path.join(__dirname, fileName);
        const fileId = await UploadFile(fileName, filePath);
        const [webContentLink,webViewLink] = await LinkFile(fileId);
        res.send({screenshotUrl,webContentLink,webViewLink});
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
    
    
});


app.listen(3001, () => {
    console.log('server is running in port 3001')
})
