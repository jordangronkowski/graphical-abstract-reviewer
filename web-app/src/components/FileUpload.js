// FILE: src/components/FileUpload.js
import React, { useState } from 'react';

const FileUpload = ({ onFileSelect }) => {
    const [dragOver, setDragOver] = useState(false);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            onFileSelect(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragOver(false);
        const file = event.dataTransfer.files[0];
        if (file) {
            onFileSelect(file);
        }
    };

    return (
        <div
            id="dropbox"
            className={dragOver ? 'dragover' : ''}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <input type="file" onChange={handleFileSelect} style={{ display: 'none' }} />
            Drop your PNG or JPG file here
        </div>
    );
};

export default FileUpload;