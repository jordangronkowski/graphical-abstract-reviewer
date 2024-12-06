// FILE: server/openai.js
const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs');
const path = require('path');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const processRequest = async (file, textPrompt) => {
    try {
        const filePath = path.join(__dirname, file.name);
        await file.mv(filePath);

        const response = await openai.createImage({
            prompt: textPrompt,
            n: 1,
            size: '1024x1024',
            response_format: 'url',
        });

        fs.unlinkSync(filePath); // Clean up the uploaded file

        return response.data.data[0].url;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to process the request.');
    }
};

module.exports = { processRequest };