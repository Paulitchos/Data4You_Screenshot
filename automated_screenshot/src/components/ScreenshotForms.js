import axios from 'axios';
import React, { useState } from 'react';

export const ScreenshotForms = () => {

    const [url, setUrl] = useState('');
    const [screenshotUrl, setScreenshotUrl] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        getScreenshot(url);
    }

    
    async function getScreenshot(url) {
        const apiKey = process.env.REACT_APP_API_KEY;
        let apiUrl = `https://api.screenshotmachine.com/?key=${apiKey}&url=${url}&dimension=1920x1080&device=desktop&format=jpg&cacheLimit=14&delay=0&zoom=100`;
        console.log(apiUrl)
        console.log(process.env)
        axios.get(apiUrl)
        .then(response => {
        setScreenshotUrl(apiUrl);
        })
        .catch(error => {
        console.log(error);
        });

        
    }

    return (
        <div className="screenshot-form">
            <form onSubmit={handleSubmit}>
                <label htmlFor="url-input" className="form-label">Enter URL:</label>
                <div className="form-group">
                <input
                    id="url-input"
                    type="text"
                    class="form-control"
                    value={url}
                    onChange={event => setUrl(event.target.value)}
                />
                <button type="submit" className="btn btn-primary">Generate Screenshot</button>
                </div>
            </form>
            {screenshotUrl && 
                <div className="screenshot-image-container">
                    <img src={screenshotUrl} alt="Screenshot of website" />
                </div>
            }
        </div>
    );
}