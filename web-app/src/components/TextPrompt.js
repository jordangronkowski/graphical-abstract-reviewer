// FILE: src/components/TextPrompt.js
import React from 'react';

const TextPrompt = ({ onTextChange }) => {
    const handleChange = (event) => {
        onTextChange(event.target.value);
    };

    return (
        <input
            type="text"
            id="textPrompt"
            placeholder="Enter your text prompt here"
            style={{ width: '100%', marginBottom: '20px' }}
            onChange={handleChange}
        />
    );
};

export default TextPrompt;