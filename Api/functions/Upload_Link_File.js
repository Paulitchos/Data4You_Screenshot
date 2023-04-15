const fs = require('fs')
const {google} = require('googleapis');

const CLIENT_ID=process.env.REACT_CLIENT_ID
const CLIENT_SECRET=process.env.REACT_CLIENT_SECRET
const REDIRECT_URI=process.env.REACT_REDIRECT_URI
const REFRESH_TOKEN=process.env.REACT_REFRESH_TOKEN

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
)

oauth2Client.setCredentials({refresh_token:REFRESH_TOKEN})

const drive = google.drive({
    version:'v3',
    auth:oauth2Client
})

exports.UploadFile = async function(fileName,filePath){
    try {
        const response = await drive.files.create({
            requestBody:{
                name:fileName+'test.jpg',
                mimeType:'image/jpg'
            },
            media: {
                mimeType:'image/jpg',
                body: fs.createReadStream(filePath)
            }
        })
        //console.log(response.data)
        return response.data.id
    } catch (error) {
        console.log(error.message)
    }
}

exports.LinkFile = async function(fileId){
    try {
        await drive.permissions.create({
            fileId: fileId,
            requestBody:{
                role:'reader',
                type:'anyone'
            }
        })
        const result = await drive.files.get({
            fileId:fileId,
            fields:'webViewLink, webContentLinkl'
        })
        console.log(result.data)
    } catch (error) {
        console.log(error.message)
    }
}