// FILE: src/App.js
import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import TextPrompt from './components/TextPrompt';
import SubmitButton from './components/SubmitButton';

const App = () => {
    const [file, setFile] = useState(null);
    const [textPrompt, setTextPrompt] = useState('');
    const [output, setOutput] = useState('');

    const handleFileSelect = (selectedFile) => {
        setFile(selectedFile);
    };

    const handleTextChange = (text) => {
        setTextPrompt(text);
    };

    const handleSubmit = async () => {
        if (!file || !textPrompt) {
            alert('Please provide both an image and a text prompt.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('textPrompt', textPrompt);

        try {
            const response = await fetch('/api/openai', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            setOutput(result.output);
        } catch (error) {
            console.error('Error:', error);
            setOutput('An error occurred while processing your request.');
        }
    };

    return (
        <div>
            <FileUpload onFileSelect={handleFileSelect} />
            <TextPrompt onTextChange={handleTextChange} />
            <SubmitButton onSubmit={handleSubmit} />
            <div id="output" style={{ marginTop: '20px' }}>
                {output}
            </div>
        </div>
    );
};

export default App;