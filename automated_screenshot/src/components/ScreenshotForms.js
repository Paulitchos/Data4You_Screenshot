import axios from 'axios';
import React, { useState } from 'react';

export const ScreenshotForms = () => {

    const [url, setUrl] = useState('');
    const [imageData, setImageData] = useState('');
    const [contentLink,setContentLink] = useState('');
    const [viewLink,setViewLink] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
        const response = await axios.get(`http://localhost:3001/screenshot?url=${encodeURIComponent(url)}`);
        const dataUrl = response.data.screenshotUrl;
        const contentUrl =  response.data.webContentLink;
        const viewUrl = response.data.webViewLink;
        console.log(response.data);
        setImageData(dataUrl);
        setContentLink(contentUrl);
        setViewLink(viewUrl);
        } catch (error) {
        console.log(error);
        }
        setLoading(false);
    }

    return (
        <div className="screenshot-form">
            <form onSubmit={handleSubmit}>
                <h2>Generate Website Screenshot</h2>
                <div className="form-group">
                    <input
                        id="url-input"
                        type="text"
                        className="form-control"
                        placeholder="Enter URL"
                        value={url}
                        onChange={event => setUrl(event.target.value)}
                    />
                    <div>
                        <button type="submit" className="btn btn-primary">Generate Screenshot</button>
                    </div>
                </div>
                
            </form>
            {loading && <div className="loader">Loading...</div>}
            {imageData &&
            <>
            <div className="screenshot-image-container">
                    <img src={imageData} alt="Screenshot of website" />
            </div>
            <div className="link-container">
                <p className="link-label">Content link:</p>
                <a className="link" href={contentLink} target="_blank">{contentLink}</a>
                <p className="link-label">View link:</p>
                <a className="link" href={viewLink} target="_blank">{viewLink}</a>
            </div>
            </>    
            }
        </div>
    );
}