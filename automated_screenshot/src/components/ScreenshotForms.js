import axios from 'axios';
import React, { useState } from 'react';

export const ScreenshotForms = () => {

    const [url, setUrl] = useState('');
    const [imageData, setImageData] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const response = await axios.get(`http://localhost:3001/screenshot?url=${encodeURIComponent(url)}`);
        const dataUrl = response.data; // this will be the URL returned by your server
        setImageData(dataUrl);
        } catch (error) {
        console.log(error);
        }
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
            {imageData && 
                <div className="screenshot-image-container">
                    <img src={imageData} alt="Screenshot of website" />
                </div>
            }
        </div>
    );
}