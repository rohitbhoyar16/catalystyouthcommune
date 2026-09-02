const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Endpoint to handle registrations
app.post('/api/register', (req, res) => {
    const { teamName, captainName, contactNumber, transactionId } = req.body;

    // Create a data object
    const newRegistration = {
        date: new Date().toISOString(),
        teamName,
        captainName,
        contactNumber,
        transactionId
    };

    // In a real app, save this to MongoDB or a Database. 
    // Here we append it to a local JSON/text file for simplicity.
    fs.appendFile('registrations.json', JSON.stringify(newRegistration) + ',\n', (err) => {
        if (err) {
            console.error('Failed to save data', err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        console.log(`New Registration: ${teamName} - Txn ID: ${transactionId}`);
        res.status(200).json({ message: 'Registration successful' });
    });
});

app.listen(PORT, () => {
    console.log(`Catalyst Backend running on http://localhost:${PORT}`);
});