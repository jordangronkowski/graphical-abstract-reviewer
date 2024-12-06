// FILE: server/server.js
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// Manually load environment variables from .env file
const envPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim().replace(/(^"|"$)/g, '');
        }
    });
}

const openai = require('./openai');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(fileUpload());
app.use(express.json());

app.post('/api/openai', async (req, res) => {
    try {
        const { textPrompt } = req.body;
        const file = req.files.file;

        if (!file || !textPrompt) {
            return res.status(400).send('File and text prompt are required.');
        }

        const result = await openai.processRequest(file, textPrompt);
        res.json({ output: result });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while processing your request.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});